#!/usr/bin/env node
/* =========================================================================
   LibreNow server — full product backend (zero dependencies, Node 18+)

   - Anonymous case intake (screener answers only — no names, no A-numbers)
   - Attorney accounts: invite-based onboarding, scrypt password hashing,
     HttpOnly session cookies, role-based access (admin / attorney)
   - Review queue: guidance reaches a family ONLY after a licensed attorney
     signs off; every sign-off is recorded in a hash-chained audit log
   - Family portal: lookup requires BOTH the case code and a private family
     code (rate-limited, non-enumerable)
   - Storage: single JSON document encrypted at rest with AES-256-GCM

   Run:    node server.js            (PORT, LIBRENOW_SECRET, ADMIN_EMAIL,
                                      ADMIN_PASSWORD env vars supported)
   Demo:   node server.js --demo     (seeds demo cases + demo attorney)
   ========================================================================= */

"use strict";

const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const { RELIEF_OPTIONS, SCREENER_QUESTIONS, CASE_STAGES } = require("./js/data.js");

const ROOT = __dirname;
const DATA_DIR = process.env.LIBRENOW_DATA_DIR || path.join(ROOT, "data");
const DB_FILE = path.join(DATA_DIR, "librenow.db");
const KEY_FILE = path.join(DATA_DIR, ".key");
const PORT = parseInt(process.env.PORT || "8080", 10);
const DEMO = process.argv.includes("--demo");
const PROD = process.env.NODE_ENV === "production";

const SESSION_TTL_MS = 8 * 60 * 60 * 1000; // 8h
const MAX_BODY = 100 * 1024;

/* ---------------- encryption-at-rest ---------------- */

function loadKey() {
  if (process.env.LIBRENOW_SECRET) {
    const k = Buffer.from(process.env.LIBRENOW_SECRET, "hex");
    if (k.length !== 32) {
      console.error("LIBRENOW_SECRET must be 64 hex chars (32 bytes).");
      process.exit(1);
    }
    return k;
  }
  if (PROD) {
    console.error("In production you must set LIBRENOW_SECRET (64 hex chars). Generate: node -e \"console.log(crypto.randomBytes(32).toString('hex'))\"");
    process.exit(1);
  }
  fs.mkdirSync(DATA_DIR, { recursive: true });
  if (fs.existsSync(KEY_FILE)) return Buffer.from(fs.readFileSync(KEY_FILE, "utf8").trim(), "hex");
  const k = crypto.randomBytes(32);
  fs.writeFileSync(KEY_FILE, k.toString("hex"), { mode: 0o600 });
  console.log("⚠ Dev mode: generated local encryption key at data/.key — set LIBRENOW_SECRET in production.");
  return k;
}

const KEY = loadKey();

function encrypt(plaintext) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", KEY, iv);
  const enc = Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()]);
  return JSON.stringify({ v: 1, alg: "aes-256-gcm", iv: iv.toString("base64"), tag: cipher.getAuthTag().toString("base64"), data: enc.toString("base64") });
}

function decrypt(blob) {
  const { iv, tag, data } = JSON.parse(blob);
  const decipher = crypto.createDecipheriv("aes-256-gcm", KEY, Buffer.from(iv, "base64"));
  decipher.setAuthTag(Buffer.from(tag, "base64"));
  return Buffer.concat([decipher.update(Buffer.from(data, "base64")), decipher.final()]).toString("utf8");
}

/* ---------------- datastore ---------------- */

let db;

function freshDb() {
  return { attorneys: [], invites: [], cases: [], reviews: [], audit: [], meta: { demo: DEMO, createdAt: new Date().toISOString() } };
}

function loadDb() {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(DB_FILE)) return freshDb();
  return JSON.parse(decrypt(fs.readFileSync(DB_FILE, "utf8")));
}

function saveDb() {
  const tmp = DB_FILE + ".tmp";
  fs.writeFileSync(tmp, encrypt(JSON.stringify(db)), { mode: 0o600 });
  fs.renameSync(tmp, DB_FILE);
}

/* ---------------- tamper-evident audit log ---------------- */

function audit(actor, action, details) {
  const prevHash = db.audit.length ? db.audit[db.audit.length - 1].hash : "GENESIS";
  const entry = { seq: db.audit.length + 1, ts: new Date().toISOString(), actor, action, details, prevHash };
  entry.hash = crypto.createHash("sha256").update(prevHash + JSON.stringify({ ...entry, hash: undefined })).digest("hex");
  db.audit.push(entry);
}

function verifyAuditChain() {
  let prev = "GENESIS";
  for (const e of db.audit) {
    if (e.prevHash !== prev) return false;
    const h = crypto.createHash("sha256").update(prev + JSON.stringify({ ...e, hash: undefined })).digest("hex");
    if (h !== e.hash) return false;
    prev = e.hash;
  }
  return true;
}

/* ---------------- auth ---------------- */

const sessions = new Map(); // token -> { attorneyId, expiresAt }

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return { salt, hash };
}

function checkPassword(password, stored) {
  const hash = crypto.scryptSync(password, stored.salt, 64);
  return crypto.timingSafeEqual(hash, Buffer.from(stored.hash, "hex"));
}

function createSession(attorneyId) {
  const token = crypto.randomBytes(32).toString("hex");
  sessions.set(token, { attorneyId, expiresAt: Date.now() + SESSION_TTL_MS });
  return token;
}

function getSessionAttorney(req) {
  const cookies = parseCookies(req);
  const token = cookies.ln_session;
  if (!token) return null;
  const s = sessions.get(token);
  if (!s || s.expiresAt < Date.now()) {
    sessions.delete(token);
    return null;
  }
  const a = db.attorneys.find((x) => x.id === s.attorneyId && x.active);
  return a || null;
}

function parseCookies(req) {
  const out = {};
  (req.headers.cookie || "").split(";").forEach((c) => {
    const i = c.indexOf("=");
    if (i > 0) out[c.slice(0, i).trim()] = decodeURIComponent(c.slice(i + 1).trim());
  });
  return out;
}

/* ---------------- rate limiting ---------------- */

const buckets = new Map();

function rateLimit(key, limit, windowMs) {
  const now = Date.now();
  let b = buckets.get(key);
  if (!b || b.resetAt < now) {
    b = { count: 0, resetAt: now + windowMs };
    buckets.set(key, b);
  }
  b.count++;
  return b.count <= limit;
}

setInterval(() => {
  const now = Date.now();
  for (const [k, b] of buckets) if (b.resetAt < now) buckets.delete(k);
  for (const [t, s] of sessions) if (s.expiresAt < now) sessions.delete(t);
}, 60_000).unref();

/* ---------------- helpers ---------------- */

function json(res, code, obj) {
  const body = JSON.stringify(obj);
  res.writeHead(code, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff"
  });
  res.end(body);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on("data", (c) => {
      size += c.length;
      if (size > MAX_BODY) {
        reject(new Error("body_too_large"));
        req.destroy();
        return;
      }
      chunks.push(c);
    });
    req.on("end", () => {
      try {
        resolve(chunks.length ? JSON.parse(Buffer.concat(chunks).toString("utf8")) : {});
      } catch {
        reject(new Error("bad_json"));
      }
    });
    req.on("error", reject);
  });
}

function clientIp(req) {
  // Behind a reverse proxy, configure it to set X-Forwarded-For correctly.
  return (req.headers["x-forwarded-for"] || "").split(",")[0].trim() || req.socket.remoteAddress || "unknown";
}

function newCaseCode() {
  let code;
  do {
    code = `LN-${new Date().getFullYear()}-${crypto.randomInt(1000, 10000)}`;
  } while (db.cases.some((c) => c.caseCode === code));
  return code;
}

function newFamilyCode() {
  // 8 chars from an unambiguous alphabet — required ALONGSIDE the case code
  const alphabet = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
  let s = "FAM-";
  for (let i = 0; i < 8; i++) s += alphabet[crypto.randomInt(alphabet.length)];
  return s;
}

function computeMatches(answers) {
  return RELIEF_OPTIONS.map((o) => ({ reliefId: o.id, level: o.match(answers) })).filter((m) => m.level);
}

function reliefName(id, lang) {
  const o = RELIEF_OPTIONS.find((r) => r.id === id);
  return o ? o.name[lang] : id;
}

function buildSummary(matches) {
  if (!matches.length) {
    return {
      en: "No automatic matches — full attorney intake recommended",
      es: "Sin coincidencias automáticas — se recomienda entrevista completa con abogado"
    };
  }
  return {
    en: "Screener flagged: " + matches.map((m) => `${reliefName(m.reliefId, "en")} (${m.level})`).join(", "),
    es: "Resultados: " + matches.map((m) => `${reliefName(m.reliefId, "es")} (${m.level === "strong" ? "fuerte" : "posible"})`).join(", ")
  };
}

function publicGuidance(c, review) {
  // Families see guidance ONLY after attorney sign-off — and only the
  // approved options, never the raw screener answers.
  if (!review || review.status !== "approved") return [];
  return c.matches.map((m) => {
    const o = RELIEF_OPTIONS.find((r) => r.id === m.reliefId);
    return { id: m.reliefId, level: m.level, statute: o.statute, name: o.name, desc: o.desc };
  });
}

/* ---------------- API routes ---------------- */

const routes = [];

function route(method, pattern, handler, opts = {}) {
  routes.push({ method, pattern, handler, ...opts });
}

// --- public ---

route("GET", /^\/api\/health$/, (req, res) => {
  const out = { ok: true, demo: !!db.meta.demo, auditChainValid: verifyAuditChain() };
  if (db.meta.demo) {
    out.demoCases = db.cases.filter((c) => c.isDemo).map((c) => ({ caseCode: c.caseCode, familyCode: c.familyCode }));
    out.demoLogin = db.meta.demoLogin || null;
  }
  json(res, 200, out);
});

route("POST", /^\/api\/intake$/, async (req, res) => {
  if (!rateLimit("intake:" + clientIp(req), 30, 60 * 60 * 1000)) return json(res, 429, { error: "rate_limited" });
  const body = await readBody(req);
  const answers = {};
  for (const q of SCREENER_QUESTIONS) answers[q.id] = !!(body.answers && body.answers[q.id]);
  const matches = computeMatches(answers); // recomputed server-side: clients can't inject matches
  const c = {
    id: crypto.randomUUID(),
    caseCode: newCaseCode(),
    familyCode: newFamilyCode(),
    label: null,
    language: body.language === "en" ? "en" : "es",
    answers,
    matches,
    stage: 0,
    nextDate: null,
    bondStatus: null,
    createdAt: new Date().toISOString()
  };
  const review = {
    id: "REV-" + crypto.randomUUID().slice(0, 8).toUpperCase(),
    caseId: c.id,
    module: "Mi Defensa",
    summary: buildSummary(matches),
    status: "pending",
    signoff: null,
    changeRequests: [],
    createdAt: new Date().toISOString()
  };
  db.cases.push(c);
  db.reviews.push(review);
  audit("anonymous-intake", "case.created", { caseCode: c.caseCode, reviewId: review.id, matchCount: matches.length });
  saveDb();
  json(res, 201, { caseCode: c.caseCode, familyCode: c.familyCode, reviewId: review.id });
});

route("POST", /^\/api\/family\/lookup$/, async (req, res) => {
  if (!rateLimit("family:" + clientIp(req), 20, 15 * 60 * 1000)) return json(res, 429, { error: "rate_limited" });
  const body = await readBody(req);
  const caseCode = String(body.caseCode || "").trim().toUpperCase();
  const familyCode = String(body.familyCode || "").trim().toUpperCase();
  const c = db.cases.find((x) => x.caseCode === caseCode && x.familyCode === familyCode);
  if (!c) return json(res, 404, { error: "not_found" });
  const review = db.reviews.find((r) => r.caseId === c.id);
  json(res, 200, {
    caseCode: c.caseCode,
    label: c.label,
    stage: c.stage,
    stages: CASE_STAGES,
    nextDate: c.nextDate,
    bondStatus: c.bondStatus,
    reviewStatus: review ? review.status : "pending",
    signedBy: review && review.signoff ? { name: review.signoff.name, barState: review.signoff.barState, at: review.signoff.at } : null,
    guidance: publicGuidance(c, review)
  });
});

route("POST", /^\/api\/login$/, async (req, res) => {
  if (!rateLimit("login:" + clientIp(req), 10, 15 * 60 * 1000)) return json(res, 429, { error: "rate_limited" });
  const body = await readBody(req);
  const a = db.attorneys.find((x) => x.email === String(body.email || "").toLowerCase().trim() && x.active);
  if (!a || !checkPassword(String(body.password || ""), a.password)) {
    audit("anonymous", "auth.login_failed", { email: String(body.email || "").toLowerCase().trim() });
    saveDb();
    return json(res, 401, { error: "invalid_credentials" });
  }
  const token = createSession(a.id);
  audit(a.email, "auth.login", {});
  saveDb();
  res.setHeader("Set-Cookie", `ln_session=${token}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${SESSION_TTL_MS / 1000}${PROD ? "; Secure" : ""}`);
  json(res, 200, { id: a.id, name: a.name, email: a.email, role: a.role, barNumber: a.barNumber, barState: a.barState });
});

route("POST", /^\/api\/logout$/, (req, res) => {
  const token = parseCookies(req).ln_session;
  if (token) sessions.delete(token);
  res.setHeader("Set-Cookie", "ln_session=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0");
  json(res, 200, { ok: true });
});

route("POST", /^\/api\/invites\/accept$/, async (req, res) => {
  if (!rateLimit("invite:" + clientIp(req), 10, 15 * 60 * 1000)) return json(res, 429, { error: "rate_limited" });
  const body = await readBody(req);
  const inv = db.invites.find((i) => i.token === String(body.token || "") && !i.usedAt);
  if (!inv) return json(res, 404, { error: "invite_not_found_or_used" });
  const password = String(body.password || "");
  if (password.length < 10) return json(res, 400, { error: "password_min_10_chars" });
  const a = {
    id: crypto.randomUUID(),
    email: inv.email,
    name: inv.name,
    barNumber: inv.barNumber,
    barState: inv.barState,
    role: inv.role,
    password: hashPassword(password),
    active: true,
    createdAt: new Date().toISOString()
  };
  db.attorneys.push(a);
  inv.usedAt = new Date().toISOString();
  audit(a.email, "attorney.onboarded", { name: a.name, barNumber: a.barNumber, barState: a.barState, role: a.role });
  saveDb();
  json(res, 201, { ok: true, email: a.email });
});

// --- attorney (auth required) ---

route("GET", /^\/api\/me$/, (req, res, m, me) => {
  json(res, 200, { id: me.id, name: me.name, email: me.email, role: me.role, barNumber: me.barNumber, barState: me.barState });
}, { auth: true });

route("GET", /^\/api\/queue$/, (req, res, m, me) => {
  const queue = db.reviews
    .slice()
    .sort((a, b) => (a.status === "pending" ? -1 : 1) - (b.status === "pending" ? -1 : 1) || b.createdAt.localeCompare(a.createdAt))
    .map((r) => {
      const c = db.cases.find((x) => x.id === r.caseId);
      return {
        id: r.id, module: r.module, summary: r.summary, status: r.status,
        signoff: r.signoff ? { name: r.signoff.name, barNumber: r.signoff.barNumber, barState: r.signoff.barState, at: r.signoff.at } : null,
        changeRequests: r.changeRequests.length,
        caseCode: c.caseCode, label: c.label, stage: c.stage, createdAt: r.createdAt
      };
    });
  json(res, 200, { queue });
}, { auth: true });

route("GET", /^\/api\/reviews\/([\w-]+)$/, (req, res, m, me) => {
  const r = db.reviews.find((x) => x.id === m[1]);
  if (!r) return json(res, 404, { error: "not_found" });
  const c = db.cases.find((x) => x.id === r.caseId);
  json(res, 200, {
    id: r.id, module: r.module, summary: r.summary, status: r.status, signoff: r.signoff,
    changeRequests: r.changeRequests, createdAt: r.createdAt,
    case: {
      caseCode: c.caseCode, label: c.label, language: c.language, stage: c.stage,
      nextDate: c.nextDate, bondStatus: c.bondStatus, answers: c.answers, matches: c.matches, createdAt: c.createdAt
    }
  });
}, { auth: true });

route("POST", /^\/api\/reviews\/([\w-]+)\/signoff$/, async (req, res, m, me) => {
  const r = db.reviews.find((x) => x.id === m[1]);
  if (!r) return json(res, 404, { error: "not_found" });
  if (r.status === "approved") return json(res, 409, { error: "already_approved" });
  const body = await readBody(req);
  if (body.attest !== true) return json(res, 400, { error: "attestation_required", message: "Attorney must attest to having reviewed the case guidance." });
  r.status = "approved";
  // Identity comes from the verified account, never from free text
  r.signoff = { attorneyId: me.id, name: me.name, barNumber: me.barNumber, barState: me.barState, note: String(body.note || "").slice(0, 2000), at: new Date().toISOString() };
  audit(me.email, "review.signed_off", { reviewId: r.id, caseCode: db.cases.find((x) => x.id === r.caseId).caseCode, note: r.signoff.note });
  saveDb();
  json(res, 200, { ok: true, signoff: r.signoff });
}, { auth: true });

route("POST", /^\/api\/reviews\/([\w-]+)\/request-changes$/, async (req, res, m, me) => {
  const r = db.reviews.find((x) => x.id === m[1]);
  if (!r) return json(res, 404, { error: "not_found" });
  const body = await readBody(req);
  const note = String(body.note || "").slice(0, 2000);
  if (!note) return json(res, 400, { error: "note_required" });
  r.status = "changes_requested";
  r.changeRequests.push({ by: me.name, at: new Date().toISOString(), note });
  audit(me.email, "review.changes_requested", { reviewId: r.id, note });
  saveDb();
  json(res, 200, { ok: true });
}, { auth: true });

route("POST", /^\/api\/cases\/([\w-]+)\/update$/, async (req, res, m, me) => {
  const c = db.cases.find((x) => x.caseCode === m[1].toUpperCase());
  if (!c) return json(res, 404, { error: "not_found" });
  const body = await readBody(req);
  const changes = {};
  if (typeof body.stage === "number" && body.stage >= 0 && body.stage < CASE_STAGES.length) changes.stage = c.stage = body.stage;
  if (typeof body.nextDate === "string") changes.nextDate = c.nextDate = body.nextDate.slice(0, 10) || null;
  if (typeof body.bondStatus === "string") changes.bondStatus = c.bondStatus = body.bondStatus.slice(0, 300) || null;
  if (typeof body.label === "string") changes.label = c.label = body.label.slice(0, 60) || null;
  audit(me.email, "case.updated", { caseCode: c.caseCode, changes });
  saveDb();
  json(res, 200, { ok: true });
}, { auth: true });

// --- admin only ---

route("POST", /^\/api\/invites$/, async (req, res, m, me) => {
  const body = await readBody(req);
  const email = String(body.email || "").toLowerCase().trim();
  const name = String(body.name || "").trim();
  const barNumber = String(body.barNumber || "").trim();
  const barState = String(body.barState || "").trim();
  const role = body.role === "admin" ? "admin" : "attorney";
  if (!email || !name || !barNumber || !barState) return json(res, 400, { error: "email_name_barNumber_barState_required" });
  if (db.attorneys.some((a) => a.email === email)) return json(res, 409, { error: "email_exists" });
  const inv = { token: crypto.randomBytes(24).toString("hex"), email, name, barNumber, barState, role, createdAt: new Date().toISOString(), usedAt: null, invitedBy: me.email };
  db.invites.push(inv);
  audit(me.email, "invite.created", { email, name, barNumber, barState, role });
  saveDb();
  json(res, 201, { token: inv.token, acceptPath: "/#invite=" + inv.token });
}, { auth: true, admin: true });

route("GET", /^\/api\/attorneys$/, (req, res, m, me) => {
  json(res, 200, {
    attorneys: db.attorneys.map((a) => ({ name: a.name, email: a.email, role: a.role, barNumber: a.barNumber, barState: a.barState, active: a.active, createdAt: a.createdAt })),
    pendingInvites: db.invites.filter((i) => !i.usedAt).map((i) => ({ email: i.email, name: i.name, createdAt: i.createdAt }))
  });
}, { auth: true, admin: true });

route("GET", /^\/api\/audit$/, (req, res) => {
  json(res, 200, { chainValid: verifyAuditChain(), entries: db.audit.slice(-100) });
}, { auth: true, admin: true });

/* ---------------- static files ---------------- */

const MIME = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".svg": "image/svg+xml", ".png": "image/png", ".ico": "image/x-icon" };

function serveStatic(req, res, pathname) {
  if (pathname === "/") pathname = "/index.html";
  const file = path.normalize(path.join(ROOT, pathname));
  if (!file.startsWith(ROOT + path.sep)) return json(res, 403, { error: "forbidden" });
  const ext = path.extname(file);
  if (!MIME[ext] || !fs.existsSync(file) || !fs.statSync(file).isFile()) return json(res, 404, { error: "not_found" });
  res.writeHead(200, {
    "Content-Type": MIME[ext],
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "Referrer-Policy": "no-referrer",
    "Content-Security-Policy": "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; frame-ancestors 'none'"
  });
  fs.createReadStream(file).pipe(res);
}

/* ---------------- server ---------------- */

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, "http://localhost");
    const pathname = url.pathname;

    if (pathname.startsWith("/api/")) {
      // CSRF guard: state-changing requests must carry the app header
      if (req.method !== "GET" && req.headers["x-requested-with"] !== "LibreNow") {
        return json(res, 403, { error: "csrf_check_failed" });
      }
      for (const r of routes) {
        if (r.method !== req.method) continue;
        const m = pathname.match(r.pattern);
        if (!m) continue;
        let me = null;
        if (r.auth) {
          me = getSessionAttorney(req);
          if (!me) return json(res, 401, { error: "auth_required" });
          if (r.admin && me.role !== "admin") return json(res, 403, { error: "admin_only" });
        }
        return await r.handler(req, res, m, me);
      }
      return json(res, 404, { error: "not_found" });
    }

    if (req.method !== "GET") return json(res, 405, { error: "method_not_allowed" });
    serveStatic(req, res, pathname);
  } catch (e) {
    const code = e.message === "body_too_large" ? 413 : e.message === "bad_json" ? 400 : 500;
    json(res, code, { error: code === 500 ? "server_error" : e.message });
    if (code === 500) console.error(e);
  }
});

/* ---------------- bootstrap ---------------- */

function bootstrap() {
  db = loadDb();

  if (db.attorneys.length === 0) {
    const email = (process.env.ADMIN_EMAIL || "admin@librenow.local").toLowerCase();
    const password = process.env.ADMIN_PASSWORD || crypto.randomBytes(9).toString("base64url");
    db.attorneys.push({
      id: crypto.randomUUID(),
      email,
      name: process.env.ADMIN_NAME || "LibreNow Admin",
      barNumber: process.env.ADMIN_BAR || "ADMIN",
      barState: process.env.ADMIN_BAR_STATE || "—",
      role: "admin",
      password: hashPassword(password),
      active: true,
      createdAt: new Date().toISOString()
    });
    audit("system", "bootstrap.admin_created", { email });
    console.log("──────────────────────────────────────────────");
    console.log("First run — admin account created:");
    console.log("  email:    " + email);
    console.log("  password: " + (process.env.ADMIN_PASSWORD ? "(from ADMIN_PASSWORD env)" : password + "  ← shown ONCE, change it"));
    console.log("──────────────────────────────────────────────");
  }

  if (DEMO && !db.meta.demoSeeded) {
    db.meta.demo = true;
    db.meta.demoSeeded = true;
    const demoPassword = "demo-LibreNow-2026";
    db.attorneys.push({
      id: crypto.randomUUID(),
      email: "ayala@librenow.demo",
      name: "Prof. A. Ayala, Esq.",
      barNumber: "1234567",
      barState: "CA",
      role: "attorney",
      password: hashPassword(demoPassword),
      active: true,
      createdAt: new Date().toISOString()
    });
    db.meta.demoLogin = { email: "ayala@librenow.demo", password: demoPassword };

    const mk = (label, answers, stage, nextDate, bondStatus, approved) => {
      const matches = computeMatches(answers);
      const c = {
        id: crypto.randomUUID(), caseCode: newCaseCode(), familyCode: newFamilyCode(), label,
        language: "es", answers, matches, stage, nextDate, bondStatus, createdAt: new Date().toISOString(), isDemo: true
      };
      const r = {
        id: "REV-" + crypto.randomUUID().slice(0, 8).toUpperCase(), caseId: c.id, module: "Mi Defensa",
        summary: buildSummary(matches), status: approved ? "approved" : "pending",
        signoff: approved ? { attorneyId: db.attorneys[1].id, name: "Prof. A. Ayala, Esq.", barNumber: "1234567", barState: "CA", note: "Demo sign-off", at: new Date().toISOString() } : null,
        changeRequests: [], createdAt: new Date().toISOString()
      };
      db.cases.push(c);
      db.reviews.push(r);
      return c;
    };

    const c1 = mk("Carlos M.", { inProceedings: true, tenYears: true, uscRelative: true, badArrest: true, equities: true }, 1, "2026-06-24", "Audiencia de fianza solicitada — paquete de evidencia 80% completo", false);
    const c2 = mk("Rosa T.", { inProceedings: true, fear: true, tpsCountry: true, equities: true }, 2, "2026-08-12", "LIBERADA con fianza de $4,000 🎉 — preparando caso", true);
    audit("system", "bootstrap.demo_seeded", { cases: [c1.caseCode, c2.caseCode] });
    console.log("Demo mode — family portal codes:");
    console.log(`  ${c1.label}: ${c1.caseCode} / ${c1.familyCode}`);
    console.log(`  ${c2.label}: ${c2.caseCode} / ${c2.familyCode}`);
    console.log(`  Attorney login: ayala@librenow.demo / ${demoPassword}`);
  }

  saveDb();
}

if (require.main === module) {
  bootstrap();
  server.listen(PORT, () => console.log(`LibreNow listening on http://localhost:${PORT}${DEMO ? " (demo mode)" : ""}`));
}

module.exports = { server, bootstrap, get db() { return db; } };
