# LibreNow™ — Defensa. Familia. Libertad.

**Tus derechos no necesitan papeles. / Your rights don't have papers.**

LibreNow is a full-stack, bilingual (Spanish-first) platform that helps immigrants
facing removal (deportation) proceedings and their families — with a crowdsourced
network of licensed attorneys signing off on every piece of case guidance.

## The five modules

1. **Conoce Tus Derechos** — know-your-rights cards with read-aloud scripts for
   home, street/workplace, and detention encounters, plus a family preparedness plan.
2. **Mi Defensa** — a 13-question **anonymous** screener (no names, no A-Numbers)
   that maps a person's facts to every potential defense to removal: cancellation
   of removal §240A(a)/(b), asylum/withholding/CAT, family-based adjustment
   §245(a)/(i), U visa, VAWA, TPS, DACA, motions to suppress/terminate,
   prosecutorial discretion, and voluntary departure as a last resort. Submitting
   creates a case in the attorney review queue and returns two private codes.
3. **Libertad** — release-from-detention toolkit: §236(a) bond hearings, Joseph
   hearings against "mandatory" detention, humanitarian parole, federal habeas for
   prolonged detention, alternatives to detention, and a family-driven bond
   evidence packet checklist.
4. **Mi Familia** — family members enter the **case code + family code** (both
   required, rate-limited, never searchable by name) to see the case stage
   timeline, next court date, release status, and — only after attorney
   sign-off — the approved defense map with the signing attorney's name.
5. **Red Legal** — the attorney workflow: invite-based onboarding (admin enters
   the attorney's bar number/state, to be verified against the state bar registry),
   a review queue, per-case screener detail, an attestation checkbox, sign-off
   under the attorney's verified account identity, request-changes flow, case
   status management, roster, and a **hash-chained tamper-evident audit log**.

## The sign-off model (what makes this defensible)

- Screener output is **never** shown to a family as guidance. It sits in the
  review queue until a licensed attorney opens the case, reviews the answers and
  auto-matched defenses, checks the attestation box, and signs.
- Sign-off identity comes from the attorney's **account** (name, bar number,
  bar state captured at invitation) — never from free-text input.
- Every consequential action (intake, invite, onboarding, sign-off, change
  request, case update, login) is written to an append-only audit log where each
  entry hashes the previous one; `GET /api/audit` verifies the chain.
- Matching is recomputed **server-side** — a malicious client cannot inject
  "defenses" into what an attorney is asked to approve.

## Running it

Zero dependencies. Node 18+.

```bash
node server.js                 # production-style start on :8080
node server.js --demo          # seeds 2 demo cases + a demo attorney login
node test/e2e.js               # 57-assertion end-to-end test of the full workflow
```

First run prints a one-time admin password (or set `ADMIN_EMAIL` /
`ADMIN_PASSWORD`). Demo mode prints demo family-portal codes and an attorney
login, and surfaces them in the UI.

### Environment variables

| Var | Purpose |
|---|---|
| `PORT` | listen port (default 8080) |
| `LIBRENOW_SECRET` | 64-hex-char AES-256 key for encryption at rest — **required in production** (`NODE_ENV=production`) |
| `LIBRENOW_DATA_DIR` | data directory (default `./data`) |
| `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `ADMIN_NAME` | bootstrap admin account |

### Deployment

Any Node host (Fly.io, Render, Railway, a VPS). Put it behind TLS (Caddy/nginx
or the platform's TLS), set `NODE_ENV=production` and `LIBRENOW_SECRET`, and
persist the data directory. The server sets CSP, frame-deny, nosniff and
no-referrer headers; sessions are HttpOnly + SameSite=Strict (+Secure in prod);
login, intake, invite-accept, and family lookup are rate-limited per IP.

## Architecture

```
index.html        app shell
css/styles.css    design system (Spanish-first, mobile-first)
js/data.js        single source of truth for legal content + matching rules
                  (shared by browser AND server via module export)
js/api.js         fetch client + server probe
js/app.js         router, i18n, screener, attorney dashboard, family portal
server.js         zero-dependency backend: encrypted JSON store (AES-256-GCM),
                  scrypt auth, sessions, invites, review queue, sign-off,
                  hash-chained audit log, rate limiting, static serving
test/e2e.js       full workflow test (spawns a real server)
```

Scale-up path: swap the JSON document store for Postgres behind the same API
surface; the route handlers are already organized around that boundary.

## ⚖️ Before going live with real users — the non-software work

The software enforces the review workflow, but **what makes output "legal
advice" is the licensed attorney signing it** — so launch requires:

- **UPL/ethics structuring** in each state served: supervising attorney of
  record, engagement/limited-scope letters, conflict checks, malpractice
  coverage. The attestation + audit log are designed to slot into that.
- **Bar verification**: admins must verify bar numbers against the state bar
  registry *before* sending invites (the invite flow says so); production
  should add automated registry checks.
- **Content review cadence**: every statement in `js/data.js` reviewed, dated,
  and re-reviewed by the network — TPS designations, DACA litigation, PD
  policy, and bond practice change constantly.
- **Privacy hardening**: the design already does data minimization (anonymous
  intake, two-code family lookup, encryption at rest, no trackers, no external
  resources). Before launch add: a written subpoena/legal-process response
  policy, security audit + threat model, quick-exit UX, and key management
  (KMS/HSM) for `LIBRENOW_SECRET`.
- **Partnerships**: law school clinics, NIPNLG, ILRC, CLINIC, ACLU affiliates —
  amplify existing networks rather than duplicating them.

## Disclaimer

LibreNow provides general legal information. It becomes case guidance only when
a licensed attorney in the Red Legal network reviews and signs the specific
case, and an attorney-client relationship exists only when an attorney takes
representation. Official case information: 1-800-898-7180 / acis.eoir.justice.gov.
