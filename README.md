# LibreNow™ — Defensa. Familia. Libertad.

**Tus derechos no necesitan papeles. / Your rights don't have papers.**

LibreNow is a bilingual (Spanish-first) web platform that helps immigrants facing
removal (deportation) proceedings and their families:

1. **Conoce Tus Derechos** — know-your-rights cards with read-aloud scripts for
   home, street/workplace, and detention encounters, plus a family preparedness plan.
2. **Mi Defensa** — a 13-question anonymous screener that maps a person's facts to
   every potential defense to removal (cancellation of removal §240A(a)/(b),
   asylum/withholding/CAT, family-based adjustment §245(a)/(i), U visa, VAWA, TPS,
   DACA, motions to suppress/terminate, prosecutorial discretion, and voluntary
   departure as a last resort).
3. **Libertad** — a release-from-detention toolkit: §236(a) bond hearings, Joseph
   hearings to contest "mandatory" detention, humanitarian parole requests, federal
   habeas for prolonged detention, alternatives to detention, and a family-driven
   bond evidence packet checklist with progress tracking.
4. **Mi Familia** — a plain-language case status timeline that family members and
   trusted supporters can follow and share (with pointers to the official EOIR
   hotline / ACIS system for authoritative dates).
5. **Red Legal** — the attorney review network. Every piece of screener output
   enters a review queue and becomes case guidance **only after a licensed attorney
   reviews and signs off**. The dashboard simulates that workflow end-to-end.

## Running the prototype

No build, no dependencies. Open `index.html` in any browser, or:

```bash
python3 -m http.server 8000   # then visit http://localhost:8000
```

All state (language preference, screener submissions, attorney sign-offs, bond
packet progress) is stored in `localStorage` — nothing leaves the device.

## Architecture

```
index.html      app shell (header, nav, view containers)
css/styles.css  design system (Spanish-first, mobile-first, WCAG-minded contrast)
js/data.js      bilingual content: rights cards, screener questions, relief
                library, bond pathways, demo cases, seed review queue
js/app.js       router, i18n, screener engine, attorney dashboard, family
                portal, share/viral features
```

## ⚠️ This is a prototype — NOT yet a live legal-advice product

It is intentionally **not** "go-live ready," and saying otherwise would endanger
the exact people it's meant to help. Before launch:

### Legal & ethics
- [ ] **Unauthorized practice of law (UPL) review** in every state served. The
      attorney sign-off model must be structured (supervising attorney of record,
      engagement letters, conflicts checks) so output is legitimately attorney
      guidance, not software practicing law.
- [ ] **Attorney verification**: bar-registry verification at onboarding,
      malpractice coverage, and a supervising-attorney review protocol (the
      prototype's `prompt()` sign-off is a placeholder).
- [ ] **Content review**: every statement in `js/data.js` reviewed and dated by
      licensed immigration counsel, with a change-log; immigration law and agency
      policy (TPS designations, DACA litigation, PD memos, bond practice) change
      constantly and content must carry "last reviewed" dates.
- [ ] Clear, prominent scope-of-service disclosures in both languages.

### Privacy & safety (non-negotiable for this population)
- [ ] **Data minimization**: collect no names, A-Numbers, addresses, or
      nationality unless strictly required and consented; anonymous screener by
      default (as prototyped).
- [ ] End-to-end encryption at rest and in transit; U.S. counsel-controlled keys.
- [ ] **Subpoena/legal-process response policy** drafted *before* launch — data
      about undocumented users is a target. Prefer architectures where there is
      nothing to hand over.
- [ ] No third-party analytics/trackers; self-hosted fonts and assets only
      (the prototype already loads zero external resources).
- [ ] Quick-exit button and panic-safe design for users in unsafe situations.
- [ ] Security audit + threat model before any real user data is accepted.

### Product
- [ ] Real backend (cases, review queue, auth, audit log) replacing localStorage.
- [ ] Family portal codes issued out-of-band, never enumerable or name-searchable.
- [ ] Integration pointers kept current: ICE Detainee Locator (locator.ice.gov),
      EOIR ACIS (acis.eoir.justice.gov), EOIR hotline 1-800-898-7180, and local
      rapid-response hotline directory by region.
- [ ] Accessibility audit (WCAG 2.2 AA), plus indigenous-language expansion
      (K'iche', Mam, Haitian Creole are common needs in this population).
- [ ] Partnership review with established orgs (e.g., law school clinics, NIPNLG,
      ILRC, CLINIC, ACLU affiliates) — don't duplicate, amplify.

## Disclaimer

LibreNow provides **general legal information, not legal advice**. Using LibreNow
does not create an attorney-client relationship. Anyone in removal proceedings
should consult a licensed immigration attorney or DOJ-accredited representative.
Official case information: 1-800-898-7180 / acis.eoir.justice.gov.
