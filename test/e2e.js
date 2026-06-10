#!/usr/bin/env node
/* LibreNow end-to-end test: full product workflow against a live server.
   Run: node test/e2e.js */

"use strict";

const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");
const os = require("os");

const PORT = 18000 + Math.floor(Math.random() * 1000);
const BASE = `http://127.0.0.1:${PORT}`;
const DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "librenow-test-"));

let passed = 0;
let failed = 0;

function check(name, cond, extra) {
  if (cond) {
    passed++;
    console.log("  ✓ " + name);
  } else {
    failed++;
    console.error("  ✗ " + name + (extra ? " — " + JSON.stringify(extra) : ""));
  }
}

const jars = {}; // named cookie jars

async function call(pathname, { method = "GET", body, jar, csrf = true, expect } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (csrf) headers["X-Requested-With"] = "LibreNow";
  if (jar && jars[jar]) headers["Cookie"] = jars[jar];
  const res = await fetch(BASE + pathname, { method, headers, body: body ? JSON.stringify(body) : undefined });
  const setCookie = res.headers.get("set-cookie");
  if (jar && setCookie) jars[jar] = setCookie.split(";")[0];
  let data = {};
  try { data = await res.json(); } catch (_) {}
  if (expect !== undefined) check(`${method} ${pathname} → ${expect}`, res.status === expect, { got: res.status, data });
  return { status: res.status, data };
}

async function main() {
  console.log("Starting server on port " + PORT + " (data dir: " + DATA_DIR + ")");
  const server = spawn(process.execPath, [path.join(__dirname, "..", "server.js")], {
    env: { ...process.env, PORT: String(PORT), LIBRENOW_DATA_DIR: DATA_DIR, ADMIN_EMAIL: "admin@test.local", ADMIN_PASSWORD: "test-admin-password-123" },
    stdio: ["ignore", "pipe", "pipe"]
  });
  server.stderr.on("data", (d) => process.stderr.write("[server] " + d));

  // wait for server
  for (let i = 0; i < 50; i++) {
    try {
      await fetch(BASE + "/api/health");
      break;
    } catch {
      await new Promise((r) => setTimeout(r, 100));
    }
  }

  try {
    console.log("\n— static & health —");
    const home = await fetch(BASE + "/");
    check("GET / serves app shell", home.status === 200 && (await home.text()).includes("LibreNow"));
    const css = await fetch(BASE + "/css/styles.css");
    check("GET /css/styles.css", css.status === 200);
    const traversal = await fetch(BASE + "/..%2Fserver.js");
    check("path traversal blocked", traversal.status !== 200 || !(await traversal.text()).includes("scryptSync"));
    const health = (await call("/api/health", { expect: 200 })).data;
    check("not demo mode", health.demo === false);
    check("audit chain valid at boot", health.auditChainValid === true);

    console.log("\n— CSRF & auth gates —");
    await call("/api/intake", { method: "POST", body: {}, csrf: false, expect: 403 });
    await call("/api/queue", { expect: 401 });
    await call("/api/audit", { expect: 401 });

    console.log("\n— anonymous intake —");
    const intake = (
      await call("/api/intake", {
        method: "POST",
        body: { language: "es", answers: { inProceedings: true, tenYears: true, uscRelative: true, badArrest: true, matchesInjected: true } },
        expect: 201
      })
    ).data;
    check("intake returns case code", /^LN-\d{4}-\d{4}$/.test(intake.caseCode), intake);
    check("intake returns family code", /^FAM-[A-Z2-9]{8}$/.test(intake.familyCode), intake);

    console.log("\n— family portal: guidance hidden until sign-off —");
    await call("/api/family/lookup", { method: "POST", body: { caseCode: intake.caseCode, familyCode: "FAM-WRONG999" }, expect: 404 });
    const famBefore = (await call("/api/family/lookup", { method: "POST", body: { caseCode: intake.caseCode, familyCode: intake.familyCode }, expect: 200 })).data;
    check("review pending before sign-off", famBefore.reviewStatus === "pending");
    check("guidance EMPTY before sign-off", famBefore.guidance.length === 0);
    check("raw answers never exposed to family", famBefore.answers === undefined);

    console.log("\n— admin login & attorney onboarding —");
    await call("/api/login", { method: "POST", body: { email: "admin@test.local", password: "wrong" }, jar: "admin", expect: 401 });
    const admin = (await call("/api/login", { method: "POST", body: { email: "admin@test.local", password: "test-admin-password-123" }, jar: "admin", expect: 200 })).data;
    check("admin role", admin.role === "admin");

    const invite = (
      await call("/api/invites", {
        method: "POST",
        jar: "admin",
        body: { name: "Prof. A. Ayala, Esq.", email: "ayala@test.local", barNumber: "7654321", barState: "CA", role: "attorney" },
        expect: 201
      })
    ).data;
    check("invite token issued", typeof invite.token === "string" && invite.token.length >= 32);

    await call("/api/invites/accept", { method: "POST", body: { token: invite.token, password: "short" }, expect: 400 });
    await call("/api/invites/accept", { method: "POST", body: { token: invite.token, password: "ayala-secure-pass-2026" }, expect: 201 });
    await call("/api/invites/accept", { method: "POST", body: { token: invite.token, password: "ayala-secure-pass-2026" }, expect: 404 }); // single-use

    const ayala = (await call("/api/login", { method: "POST", body: { email: "ayala@test.local", password: "ayala-secure-pass-2026" }, jar: "ayala", expect: 200 })).data;
    check("attorney bar number on account", ayala.barNumber === "7654321");
    await call("/api/audit", { jar: "ayala", expect: 403 }); // attorney is not admin

    console.log("\n— review & sign-off workflow —");
    const queue = (await call("/api/queue", { jar: "ayala", expect: 200 })).data.queue;
    const review = queue.find((r) => r.caseCode === intake.caseCode);
    check("intake visible in attorney queue", !!review && review.status === "pending", queue);

    const detail = (await call("/api/reviews/" + review.id, { jar: "ayala", expect: 200 })).data;
    check("server-side matches computed (client cannot inject)", detail.case.matches.every((m) => m.reliefId !== "matchesInjected"));
    check("matches include 10-yr cancellation", detail.case.matches.some((m) => m.reliefId === "cancellationNonLPR" && m.level === "strong"), detail.case.matches);
    check("matches include motion to suppress", detail.case.matches.some((m) => m.reliefId === "suppress"));

    await call("/api/reviews/" + review.id + "/signoff", { method: "POST", jar: "ayala", body: { attest: false }, expect: 400 }); // attestation required
    const signed = (await call("/api/reviews/" + review.id + "/signoff", { method: "POST", jar: "ayala", body: { attest: true, note: "Verified 240A(b) elements; suppress motion viable." }, expect: 200 })).data;
    check("sign-off carries account identity", signed.signoff.name === "Prof. A. Ayala, Esq." && signed.signoff.barNumber === "7654321");
    await call("/api/reviews/" + review.id + "/signoff", { method: "POST", jar: "ayala", body: { attest: true }, expect: 409 }); // no double sign-off

    console.log("\n— case status management —");
    await call("/api/cases/" + intake.caseCode + "/update", { method: "POST", jar: "ayala", body: { label: "Carlos M.", stage: 1, nextDate: "2026-07-15", bondStatus: "Bond hearing scheduled" }, expect: 200 });

    console.log("\n— family portal after sign-off —");
    const famAfter = (await call("/api/family/lookup", { method: "POST", body: { caseCode: intake.caseCode, familyCode: intake.familyCode }, expect: 200 })).data;
    check("review approved", famAfter.reviewStatus === "approved");
    check("guidance now visible", famAfter.guidance.length > 0);
    check("signed-by shown to family", famAfter.signedBy && famAfter.signedBy.name === "Prof. A. Ayala, Esq.");
    check("stage/date/bond updated", famAfter.stage === 1 && famAfter.nextDate === "2026-07-15" && famAfter.bondStatus === "Bond hearing scheduled");
    check("family never sees bar number of reviewer beyond name/state", famAfter.signedBy.barNumber === undefined);

    console.log("\n— audit log —");
    const auditData = (await call("/api/audit", { jar: "admin", expect: 200 })).data;
    check("audit chain intact end-to-end", auditData.chainValid === true);
    const actions = auditData.entries.map((e) => e.action);
    for (const a of ["bootstrap.admin_created", "case.created", "invite.created", "attorney.onboarded", "review.signed_off", "case.updated"]) {
      check("audit records " + a, actions.includes(a));
    }

    console.log("\n— rate limiting —");
    let limited = false;
    for (let i = 0; i < 25; i++) {
      const r = await call("/api/family/lookup", { method: "POST", body: { caseCode: "LN-0000-0000", familyCode: "FAM-NOPE0000" } });
      if (r.status === 429) { limited = true; break; }
    }
    check("family lookup rate-limited against code enumeration", limited);

    console.log("\n— persistence across restart —");
    server.kill();
    await new Promise((r) => setTimeout(r, 300));
    const server2 = spawn(process.execPath, [path.join(__dirname, "..", "server.js")], {
      env: { ...process.env, PORT: String(PORT), LIBRENOW_DATA_DIR: DATA_DIR, ADMIN_EMAIL: "admin@test.local", ADMIN_PASSWORD: "test-admin-password-123" },
      stdio: ["ignore", "pipe", "pipe"]
    });
    for (let i = 0; i < 50; i++) {
      try { await fetch(BASE + "/api/health"); break; } catch { await new Promise((r) => setTimeout(r, 100)); }
    }
    const famPersist = (await call("/api/family/lookup", { method: "POST", body: { caseCode: intake.caseCode, familyCode: intake.familyCode }, expect: 200 })).data;
    check("case + sign-off survive restart (encrypted at rest)", famPersist.reviewStatus === "approved" && famPersist.guidance.length > 0);
    const raw = fs.readFileSync(path.join(DATA_DIR, "librenow.db"), "utf8");
    check("data file is encrypted (no plaintext case codes)", !raw.includes(intake.caseCode) && raw.includes("aes-256-gcm"));
    server2.kill();
  } finally {
    try { server.kill(); } catch (_) {}
    fs.rmSync(DATA_DIR, { recursive: true, force: true });
  }

  console.log(`\n${passed} passed, ${failed} failed`);
  process.exit(failed ? 1 : 0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
