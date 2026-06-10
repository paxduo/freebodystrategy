/* =========================================================================
   LibreNow — app logic (prototype)
   No backend: state lives in localStorage so the full workflow can be
   demoed end-to-end. See README for the production architecture.
   ========================================================================= */

let lang = localStorage.getItem("ln_lang") || "es"; // Spanish-first by design

// ---------- UI strings ----------
const UI = {
  nav_home: { en: "Home", es: "Inicio" },
  nav_rights: { en: "Know Your Rights", es: "Conoce Tus Derechos" },
  nav_defense: { en: "Mi Defensa", es: "Mi Defensa" },
  nav_libertad: { en: "Libertad", es: "Libertad" },
  nav_familia: { en: "Mi Familia", es: "Mi Familia" },
  nav_red: { en: "Red Legal", es: "Red Legal" },
  lang_btn: { en: "Español", es: "English" },

  disclaimer: {
    en: "⚠️ PROTOTYPE — General legal information, not legal advice. No attorney-client relationship is created. Guidance becomes “attorney-reviewed” only after a licensed attorney in the Red Legal network signs off on your specific case.",
    es: "⚠️ PROTOTIPO — Información legal general, no es asesoría legal. No se crea una relación abogado-cliente. La guía es “revisada por abogado” solo cuando un abogado licenciado de la Red Legal la aprueba para tu caso específico."
  },
  privacy: {
    en: "🔒 Privacy by design: this prototype stores nothing on any server. Never enter real names, A-Numbers, or addresses into a demo. In production, we collect the minimum, encrypt everything, and never share data with enforcement.",
    es: "🔒 Privacidad por diseño: este prototipo no guarda nada en ningún servidor. Nunca escribas nombres reales, Números A o direcciones en una demostración. En producción, recolectamos lo mínimo, ciframos todo y jamás compartimos datos con autoridades migratorias."
  },

  hero_title_1: { en: "Your rights don't have papers.", es: "Tus derechos no necesitan papeles." },
  hero_sub: {
    en: "Free, bilingual, attorney-backed guidance to fight deportation, get out of detention, and keep families together — while the case is fought the right way.",
    es: "Guía gratuita, bilingüe y respaldada por abogados para luchar contra la deportación, salir de detención y mantener a las familias unidas — mientras el caso se pelea como se debe."
  },
  hero_cta_defense: { en: "Find my defenses →", es: "Encontrar mis defensas →" },
  hero_cta_libertad: { en: "Get someone released →", es: "Liberar a alguien →" },
  hero_cta_rights: { en: "Know your rights", es: "Conoce tus derechos" },

  home_card_rights_t: { en: "Conoce Tus Derechos", es: "Conoce Tus Derechos" },
  home_card_rights_p: { en: "What to do at the door, on the street, and in detention. Scripts you can read out loud.", es: "Qué hacer en la puerta, en la calle y en detención. Frases que puedes leer en voz alta." },
  home_card_defense_t: { en: "Mi Defensa", es: "Mi Defensa" },
  home_card_defense_p: { en: "Answer 13 questions. We map every defense to removal the law allows — then a real attorney reviews it.", es: "Contesta 13 preguntas. Mapeamos cada defensa contra la deportación que permite la ley — y luego un abogado de verdad la revisa." },
  home_card_libertad_t: { en: "Libertad", es: "Libertad" },
  home_card_libertad_p: { en: "Bond hearings, parole, habeas — every legal tool to bring your person home while the case continues.", es: "Audiencias de fianza, parole, habeas — cada herramienta legal para traer a tu persona a casa mientras sigue el caso." },
  home_card_familia_t: { en: "Mi Familia", es: "Mi Familia" },
  home_card_familia_p: { en: "Follow the case together. Clear stages, next court date, and what the family can do right now.", es: "Sigan el caso juntos. Etapas claras, próxima fecha de corte y qué puede hacer la familia ahora mismo." },
  home_card_red_t: { en: "Red Legal", es: "Red Legal" },
  home_card_red_p: { en: "A crowdsourced network of licensed attorneys reviews and signs off on every piece of case guidance.", es: "Una red colaborativa de abogados licenciados revisa y aprueba cada guía de caso." },

  rights_head: { en: "Conoce Tus Derechos / Know Your Rights", es: "Conoce Tus Derechos" },
  rights_sub: { en: "The Constitution protects everyone on U.S. soil — regardless of immigration status. Tap a card. Practice the script out loud with your family.", es: "La Constitución protege a todas las personas en suelo estadounidense — sin importar su estatus migratorio. Toca una tarjeta. Practica las frases en voz alta con tu familia." },

  defense_head: { en: "Mi Defensa — Removal Defense Screener", es: "Mi Defensa — Evaluador de Defensas" },
  defense_sub: { en: "13 yes/no questions. No names needed. At the end you'll see every potential defense, ranked, ready to send to the attorney network for review.", es: "13 preguntas de sí/no. No se necesitan nombres. Al final verás cada defensa posible, clasificada, lista para enviar a la red de abogados para revisión." },
  yes: { en: "Yes", es: "Sí" },
  no: { en: "No", es: "No" },
  not_sure: { en: "Not sure", es: "No sé" },
  start_screener: { en: "Start (2 minutes)", es: "Comenzar (2 minutos)" },
  restart: { en: "Start over", es: "Empezar de nuevo" },
  results_head: { en: "Potential defenses found", es: "Defensas potenciales encontradas" },
  results_sub: { en: "“Strong lead” = your answers match the core requirements. “Worth exploring” = partially matches; an attorney should dig deeper. This is not a decision — it's the map your lawyer starts from.", es: "“Pista fuerte” = tus respuestas coinciden con los requisitos centrales. “Vale explorar” = coincide parcialmente; un abogado debe investigar más. Esto no es una decisión — es el mapa desde donde empieza tu abogado." },
  no_results: { en: "No automatic matches — but that does NOT mean there is no defense. One-on-one attorney review finds options screeners can't. Submit for review below.", es: "No hubo coincidencias automáticas — pero eso NO significa que no haya defensa. La revisión individual de un abogado encuentra opciones que un cuestionario no puede. Envía tu caso para revisión abajo." },
  badge_strong: { en: "Strong lead", es: "Pista fuerte" },
  badge_maybe: { en: "Worth exploring", es: "Vale explorar" },
  submit_review: { en: "Send to attorney network for review 📤", es: "Enviar a la red de abogados para revisión 📤" },
  submitted_msg: { en: "✅ Submitted! Your results entered the Red Legal review queue (see the Red Legal tab). An attorney will sign off before this becomes case guidance.", es: "✅ ¡Enviado! Tus resultados entraron a la cola de revisión de la Red Legal (ver la pestaña Red Legal). Un abogado firmará antes de que esto sea guía de caso." },

  libertad_head: { en: "Libertad — Get Released While You Fight", es: "Libertad — Sal Libre Mientras Peleas Tu Caso" },
  libertad_sub: { en: "Detention is not the end of the case — it's the first fight. Most people have at least one legal path to come home to their family while removal proceedings continue.", es: "La detención no es el fin del caso — es la primera batalla. La mayoría de las personas tienen al menos un camino legal para volver a casa con su familia mientras continúa el proceso." },
  libertad_locate_t: { en: "Step 1 — Locate your person", es: "Paso 1 — Localiza a tu persona" },
  libertad_locate_p: {
    en: "Use the official ICE Detainee Locator (locator.ice.gov) with the A-Number or name + country of birth. Check the immigration court status line: 1-800-898-7180 or acis.eoir.justice.gov.",
    es: "Usa el Localizador de Detenidos de ICE (locator.ice.gov) con el Número A o nombre + país de nacimiento. Consulta la línea de la corte de inmigración: 1-800-898-7180 o acis.eoir.justice.gov."
  },
  libertad_paths_t: { en: "Step 2 — Pick the release pathway", es: "Paso 2 — Elige el camino hacia la libertad" },
  libertad_packet_t: { en: "Step 3 — Build the evidence packet (the family's superpower)", es: "Paso 3 — Arma el paquete de evidencia (el superpoder de la familia)" },
  libertad_packet_p: { en: "Judges grant bond when the packet proves community ties. Families can gather almost all of it before the lawyer even files. Check items off as you collect them:", es: "Los jueces otorgan fianza cuando el paquete demuestra lazos comunitarios. La familia puede reunir casi todo antes de que el abogado presente la solicitud. Marca cada documento al conseguirlo:" },
  packet_progress: { en: "packet complete", es: "del paquete completo" },

  familia_head: { en: "Mi Familia — Case Status for the People Who Love You", es: "Mi Familia — Estado del Caso para Quienes Te Aman" },
  familia_sub: { en: "Enter the LibreNow case code your attorney coordinator gave you. Family members and trusted supporters see the same clear picture — no legal jargon, no panic.", es: "Escribe el código de caso LibreNow que te dio tu coordinador legal. Familiares y personas de confianza ven el mismo panorama claro — sin tecnicismos, sin pánico." },
  familia_input_label: { en: "Case code (try the demo codes: LN-2026-0417 or LN-2026-0533)", es: "Código de caso (prueba los códigos demo: LN-2026-0417 o LN-2026-0533)" },
  familia_btn: { en: "View case", es: "Ver caso" },
  familia_notfound: { en: "Case code not found. In the live version, codes are issued privately to the family — never searchable by name.", es: "Código no encontrado. En la versión real, los códigos se entregan en privado a la familia — nunca se pueden buscar por nombre." },
  familia_next: { en: "Next court date", es: "Próxima fecha de corte" },
  familia_bond: { en: "Release status", es: "Estado de libertad" },
  familia_share: { en: "Share status with family 📲", es: "Compartir estado con la familia 📲" },
  familia_official: { en: "Always verify hearing dates on the official EOIR system: 1-800-898-7180 / acis.eoir.justice.gov", es: "Siempre verifica las fechas de audiencia en el sistema oficial de EOIR: 1-800-898-7180 / acis.eoir.justice.gov" },

  red_head: { en: "Red Legal — Attorney Review Network", es: "Red Legal — Red de Abogados Revisores" },
  red_sub: { en: "Every screener result becomes case guidance only after a licensed attorney reviews and signs it. Attorneys: review the queue below. (Prototype: sign-off is simulated locally.)", es: "Cada resultado del evaluador se convierte en guía de caso solo después de que un abogado licenciado lo revisa y firma. Abogados: revisen la cola abajo. (Prototipo: la firma se simula localmente.)" },
  red_col_id: { en: "ID", es: "ID" },
  red_col_case: { en: "Case", es: "Caso" },
  red_col_module: { en: "Module", es: "Módulo" },
  red_col_summary: { en: "Guidance to review", es: "Guía a revisar" },
  red_col_status: { en: "Status", es: "Estado" },
  red_col_action: { en: "Action", es: "Acción" },
  red_signoff: { en: "Review & sign off", es: "Revisar y firmar" },
  red_signed_by: { en: "Signed by", es: "Firmado por" },
  red_status_pending: { en: "Pending review", es: "Pendiente" },
  red_status_approved: { en: "Attorney-approved", es: "Aprobado por abogado" },
  red_prompt_name: { en: "Attorney name (as licensed):", es: "Nombre del abogado (como aparece en su licencia):" },
  red_prompt_bar: { en: "Bar number & state (verified against the bar registry in production):", es: "Número de colegiatura y estado (verificado contra el registro en producción):" },
  red_join_t: { en: "Are you an immigration attorney or law professor?", es: "¿Eres abogado/a de inmigración o profesor/a de derecho?" },
  red_join_p: { en: "Join the crowdsourced review network. One signed review can mean one more parent home for dinner. Pro bono hours, real impact, your license protected by structured review protocols.", es: "Únete a la red colaborativa de revisión. Una revisión firmada puede significar un padre o madre más cenando en casa. Horas pro bono, impacto real, tu licencia protegida por protocolos estructurados de revisión." },
  red_join_btn: { en: "Join the Red Legal ✊", es: "Únete a la Red Legal ✊" },
  red_join_done: { en: "Thanks! In production this opens attorney onboarding with bar verification.", es: "¡Gracias! En producción esto abre el registro de abogados con verificación de colegiatura." },

  share_pitch: { en: "Every share can save a family. Pásalo. 💛", es: "Cada vez que lo compartes puedes salvar a una familia. Pass it on. 💛" },
  share_whatsapp: { en: "WhatsApp", es: "WhatsApp" },
  share_copy: { en: "Copy link", es: "Copiar enlace" },
  share_copied: { en: "Link copied! Pásalo 💛", es: "¡Enlace copiado! Pass it on 💛" },
  share_text: {
    en: "Your rights don't have papers. 🇺🇸✊ Free bilingual deportation-defense guidance, attorney-reviewed: LibreNow",
    es: "Tus derechos no necesitan papeles. 🇺🇸✊ Guía gratuita y bilingüe de defensa contra la deportación, revisada por abogados: LibreNow"
  },

  hotline: { en: "🚨 If a raid or arrest is happening RIGHT NOW: stay silent, don't open the door, don't sign — and call your local rapid response hotline.", es: "🚨 Si una redada o arresto está pasando AHORA MISMO: guarda silencio, no abras la puerta, no firmes — y llama a tu línea de respuesta rápida local." },

  footer: {
    en: "LibreNow™ — Defensa. Familia. Libertad. | Prototype build. General information only — not legal advice and no attorney-client relationship until an attorney in the Red Legal network takes your case. If you are in proceedings, official case info: 1-800-898-7180.",
    es: "LibreNow™ — Defensa. Familia. Libertad. | Versión prototipo. Solo información general — no es asesoría legal y no existe relación abogado-cliente hasta que un abogado de la Red Legal tome tu caso. Si estás en proceso, información oficial del caso: 1-800-898-7180."
  }
};

const t = (key) => (UI[key] ? UI[key][lang] : key);
const tt = (obj) => (obj ? obj[lang] || obj.en : "");

// ---------- Router ----------
const VIEWS = ["home", "rights", "defense", "libertad", "familia", "red"];

function show(view) {
  VIEWS.forEach((v) => {
    document.getElementById("view-" + v).classList.toggle("active", v === view);
    document.getElementById("nav-" + v).classList.toggle("active", v === view);
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function toggleLang() {
  lang = lang === "es" ? "en" : "es";
  localStorage.setItem("ln_lang", lang);
  renderAll();
}

// ---------- Render: chrome ----------
function renderChrome() {
  document.documentElement.lang = lang;
  document.getElementById("disclaimer").textContent = t("disclaimer");
  document.getElementById("privacy").textContent = t("privacy");
  document.getElementById("langBtn").textContent = "🌐 " + t("lang_btn");
  VIEWS.forEach((v) => (document.getElementById("nav-" + v).textContent = t("nav_" + v)));
  document.getElementById("footerText").textContent = t("footer");
}

// ---------- Render: home ----------
function renderHome() {
  document.getElementById("view-home").innerHTML = `
    <section class="hero">
      <h2><span class="accent">Libre</span>Now</h2>
      <h2 style="font-size:1.4rem;">${t("hero_title_1")}</h2>
      <p>${t("hero_sub")}</p>
      <div class="cta-row">
        <button class="btn btn-gold" onclick="show('defense')">${t("hero_cta_defense")}</button>
        <button class="btn btn-green" onclick="show('libertad')">${t("hero_cta_libertad")}</button>
        <button class="btn btn-outline" onclick="show('rights')">${t("hero_cta_rights")}</button>
      </div>
    </section>
    <div class="card-grid">
      ${[
        ["rights", "✊", "home_card_rights_t", "home_card_rights_p", ""],
        ["defense", "🛡️", "home_card_defense_t", "home_card_defense_p", "blue"],
        ["libertad", "🕊️", "home_card_libertad_t", "home_card_libertad_p", "green"],
        ["familia", "👨‍👩‍👧‍👦", "home_card_familia_t", "home_card_familia_p", ""],
        ["red", "⚖️", "home_card_red_t", "home_card_red_p", "blue"]
      ]
        .map(
          ([view, emoji, tk, pk, cls]) => `
        <div class="card ${cls}">
          <span class="emoji">${emoji}</span>
          <h3>${t(tk)}</h3>
          <p>${t(pk)}</p>
          <button class="btn btn-ghost btn-sm" onclick="show('${view}')">→</button>
        </div>`
        )
        .join("")}
    </div>
    <div class="hotline">${t("hotline")}</div>
    ${shareBar()}
  `;
}

// ---------- Render: rights ----------
function renderRights() {
  document.getElementById("view-rights").innerHTML = `
    <h2 class="section-head">${t("rights_head")}</h2>
    <p class="section-sub">${t("rights_sub")}</p>
    ${RIGHTS_CARDS.map(
      (c) => `
      <details class="rights-card">
        <summary>${c.icon} ${tt(c.title)}</summary>
        <div class="body">
          <ul>${c.points[lang].map((p) => `<li>${p}</li>`).join("")}</ul>
          <div class="say-this">🗣️ ${tt(c.sayThis)}</div>
        </div>
      </details>`
    ).join("")}
    ${shareBar()}
  `;
}

// ---------- Screener ----------
let screenerState = { active: false, index: 0, answers: {} };

function renderDefense() {
  const el = document.getElementById("view-defense");
  const head = `
    <h2 class="section-head">${t("defense_head")}</h2>
    <p class="section-sub">${t("defense_sub")}</p>`;

  if (!screenerState.active && screenerState.index === 0) {
    el.innerHTML = `${head}
      <div class="screener-box" style="text-align:center;">
        <p style="font-size:2.2rem;margin:0;">🛡️</p>
        <button class="btn btn-gold" onclick="startScreener()">${t("start_screener")}</button>
      </div>`;
    return;
  }

  if (screenerState.active) {
    const q = SCREENER_QUESTIONS[screenerState.index];
    const pct = Math.round((screenerState.index / SCREENER_QUESTIONS.length) * 100);
    el.innerHTML = `${head}
      <div class="screener-box">
        <div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div>
        <div class="screener-q">${screenerState.index + 1}/${SCREENER_QUESTIONS.length} · ${tt(q.q)}</div>
        ${tt(q.help) ? `<div class="screener-help">💡 ${tt(q.help)}</div>` : ""}
        <div class="answer-row">
          <button class="btn btn-green" onclick="answer(true)">${t("yes")}</button>
          <button class="btn btn-ghost" onclick="answer(false)">${t("no")}</button>
          <button class="btn btn-ghost" onclick="answer(null)">${t("not_sure")}</button>
        </div>
      </div>`;
    return;
  }

  // Results
  const matches = RELIEF_OPTIONS.map((o) => ({ o, level: o.match(screenerState.answers) }))
    .filter((m) => m.level)
    .sort((a, b) => (a.level === "strong" ? -1 : 1) - (b.level === "strong" ? -1 : 1));

  el.innerHTML = `${head}
    <h3>${t("results_head")} (${matches.length})</h3>
    <p class="section-sub">${t("results_sub")}</p>
    ${
      matches.length
        ? matches
            .map(
              (m) => `
      <div class="result-item ${m.level}">
        <span class="badge ${m.level}">${m.level === "strong" ? t("badge_strong") : t("badge_maybe")}</span>
        <h4>${tt(m.o.name)}</h4>
        <div class="statute">${m.o.statute}</div>
        <p>${tt(m.o.desc)}</p>
      </div>`
            )
            .join("")
        : `<div class="result-item maybe"><p>${t("no_results")}</p></div>`
    }
    <div style="text-align:center;margin-top:1.2rem;">
      <button class="btn btn-gold" onclick="submitForReview()">${t("submit_review")}</button>
      <button class="btn btn-ghost" onclick="startScreener()">${t("restart")}</button>
    </div>
    <p id="submitMsg" style="text-align:center;font-weight:700;color:var(--verde);"></p>
    ${shareBar()}
  `;
}

function startScreener() {
  screenerState = { active: true, index: 0, answers: {} };
  renderDefense();
}

function answer(val) {
  const q = SCREENER_QUESTIONS[screenerState.index];
  // "Not sure" counts as a soft yes so the option surfaces for attorney review
  screenerState.answers[q.id] = val === null ? true : val;
  screenerState.index++;
  if (screenerState.index >= SCREENER_QUESTIONS.length) screenerState.active = false;
  renderDefense();
}

function submitForReview() {
  const matches = RELIEF_OPTIONS.map((o) => ({ o, level: o.match(screenerState.answers) })).filter((m) => m.level);
  const queue = loadQueue();
  const id = "REV-" + (1000 + queue.length + 1);
  const summaryEn = "Screener flagged: " + (matches.map((m) => `${m.o.name.en} (${m.level})`).join(", ") || "no auto-matches — full attorney intake needed");
  const summaryEs = "Resultados: " + (matches.map((m) => `${m.o.name.es} (${m.level === "strong" ? "fuerte" : "posible"})`).join(", ") || "sin coincidencias automáticas — se necesita entrevista completa con abogado");
  queue.push({
    id,
    caseCode: "LN-2026-" + String(Math.floor(Math.random() * 9000) + 1000),
    module: "Mi Defensa",
    summary: { en: summaryEn, es: summaryEs },
    status: "pending",
    attorney: null,
    signedAt: null
  });
  saveQueue(queue);
  document.getElementById("submitMsg").textContent = t("submitted_msg");
  renderRed();
}

// ---------- Libertad ----------
function renderLibertad() {
  const saved = JSON.parse(localStorage.getItem("ln_packet") || "{}");
  document.getElementById("view-libertad").innerHTML = `
    <h2 class="section-head">${t("libertad_head")}</h2>
    <p class="section-sub">${t("libertad_sub")}</p>

    <div class="checklist">
      <h4>📍 ${t("libertad_locate_t")}</h4>
      <p style="font-size:0.93rem;color:var(--gris);">${t("libertad_locate_p")}</p>
    </div>

    <h3>${t("libertad_paths_t")}</h3>
    ${BOND_PATHS.map(
      (p) => `
      <details class="rights-card">
        <summary>${p.icon} ${tt(p.name)}</summary>
        <div class="body">
          <div class="statute" style="font-size:0.8rem;color:var(--azul-claro);font-weight:700;">${p.statute}</div>
          <p style="font-size:0.94rem;">${tt(p.desc)}</p>
        </div>
      </details>`
    ).join("")}

    <h3 style="margin-top:1.6rem;">${t("libertad_packet_t")}</h3>
    <p class="section-sub">${t("libertad_packet_p")}</p>
    <div class="checklist">
      <h4>📦 ${tt(BOND_CHECKLIST.title)} — <span id="packetPct">0%</span> ${t("packet_progress")}</h4>
      ${BOND_CHECKLIST.items
        .map(
          (item, i) => `
        <label><input type="checkbox" data-packet="${i}" ${saved[i] ? "checked" : ""} onchange="packetCheck(this)"> ${tt(item)}</label>`
        )
        .join("")}
    </div>
    <div class="hotline">${t("hotline")}</div>
    ${shareBar()}
  `;
  updatePacketPct();
}

function packetCheck(box) {
  const saved = JSON.parse(localStorage.getItem("ln_packet") || "{}");
  saved[box.dataset.packet] = box.checked;
  localStorage.setItem("ln_packet", JSON.stringify(saved));
  updatePacketPct();
}

function updatePacketPct() {
  const saved = JSON.parse(localStorage.getItem("ln_packet") || "{}");
  const done = Object.values(saved).filter(Boolean).length;
  const pct = Math.round((done / BOND_CHECKLIST.items.length) * 100);
  const el = document.getElementById("packetPct");
  if (el) el.textContent = pct + "%";
}

// ---------- Familia ----------
function renderFamilia() {
  document.getElementById("view-familia").innerHTML = `
    <h2 class="section-head">${t("familia_head")}</h2>
    <p class="section-sub">${t("familia_sub")}</p>
    <div class="screener-box">
      <div class="field">
        <label>${t("familia_input_label")}</label>
        <input id="caseCodeInput" placeholder="LN-2026-XXXX" />
      </div>
      <button class="btn btn-blue" onclick="lookupCase()">${t("familia_btn")}</button>
      <div id="caseResult" style="margin-top:1.4rem;"></div>
    </div>
    <p class="note" style="margin-top:0.8rem;">${t("familia_official")}</p>
    ${shareBar()}
  `;
}

function lookupCase() {
  const code = document.getElementById("caseCodeInput").value.trim().toUpperCase();
  const c = DEMO_CASES.find((x) => x.caseCode === code);
  const out = document.getElementById("caseResult");
  if (!c) {
    out.innerHTML = `<p style="color:var(--rojo);font-weight:700;">${t("familia_notfound")}</p>`;
    return;
  }
  out.innerHTML = `
    <h3>👤 ${c.firstName} · <span style="font-weight:400;font-size:0.9rem;">${tt(c.facility)}</span></h3>
    <p><strong>${t("familia_next")}:</strong> ${c.nextDate} &nbsp;|&nbsp; <strong>${t("familia_bond")}:</strong> ${tt(c.bondStatus)}</p>
    <div class="timeline">
      ${c.stages
        .map(
          (s, i) => `
        <div class="timeline-step ${i < c.stage ? "done" : i === c.stage ? "current" : ""}">
          <h5>${i < c.stage ? "✅" : i === c.stage ? "🔶" : "⬜"} ${tt(s)}</h5>
        </div>`
        )
        .join("")}
    </div>
    <button class="btn btn-green btn-sm" onclick="shareCase('${c.caseCode}')">${t("familia_share")}</button>
  `;
}

function shareCase(code) {
  const c = DEMO_CASES.find((x) => x.caseCode === code);
  const msg =
    lang === "es"
      ? `Actualización del caso de ${c.firstName} en LibreNow: etapa ${c.stage + 1}/5 — ${tt(c.stages[c.stage])}. Próxima fecha: ${c.nextDate}. ${tt(c.bondStatus)}`
      : `Update on ${c.firstName}'s case via LibreNow: stage ${c.stage + 1}/5 — ${tt(c.stages[c.stage])}. Next date: ${c.nextDate}. ${tt(c.bondStatus)}`;
  shareText(msg);
}

// ---------- Red Legal (attorney dashboard) ----------
function loadQueue() {
  const stored = localStorage.getItem("ln_queue");
  return stored ? JSON.parse(stored) : SEED_REVIEW_QUEUE.slice();
}

function saveQueue(q) {
  localStorage.setItem("ln_queue", JSON.stringify(q));
}

function renderRed() {
  const queue = loadQueue();
  document.getElementById("view-red").innerHTML = `
    <h2 class="section-head">${t("red_head")}</h2>
    <p class="section-sub">${t("red_sub")}</p>
    <table class="review-table">
      <thead><tr>
        <th>${t("red_col_id")}</th><th>${t("red_col_case")}</th><th>${t("red_col_module")}</th>
        <th>${t("red_col_summary")}</th><th>${t("red_col_status")}</th><th>${t("red_col_action")}</th>
      </tr></thead>
      <tbody>
        ${queue
          .map(
            (r) => `
          <tr>
            <td>${r.id}</td>
            <td>${r.caseCode}</td>
            <td>${r.module}</td>
            <td>${tt(r.summary)}</td>
            <td><span class="badge ${r.status}">${r.status === "approved" ? t("red_status_approved") : t("red_status_pending")}</span>
              ${r.attorney ? `<br><span style="font-size:0.78rem;">${t("red_signed_by")}: ${r.attorney} · ${r.signedAt}</span>` : ""}</td>
            <td>${r.status === "pending" ? `<button class="btn btn-gold btn-sm" onclick="signOff('${r.id}')">${t("red_signoff")}</button>` : "✔︎"}</td>
          </tr>`
          )
          .join("")}
      </tbody>
    </table>

    <div class="card blue" style="margin-top:1.6rem;">
      <span class="emoji">👩‍⚖️</span>
      <h3>${t("red_join_t")}</h3>
      <p>${t("red_join_p")}</p>
      <button class="btn btn-blue" onclick="alert(t('red_join_done'))">${t("red_join_btn")}</button>
    </div>
    ${shareBar()}
  `;
}

function signOff(id) {
  const name = prompt(t("red_prompt_name"));
  if (!name) return;
  const bar = prompt(t("red_prompt_bar"));
  if (!bar) return;
  const queue = loadQueue();
  const item = queue.find((r) => r.id === id);
  item.status = "approved";
  item.attorney = `${name} (Bar: ${bar})`;
  item.signedAt = new Date().toISOString().slice(0, 10);
  saveQueue(queue);
  renderRed();
}

// ---------- Share / viral ----------
function shareBar() {
  return `
    <div class="share-bar">
      <span class="pitch">${t("share_pitch")}</span>
      <span class="share-buttons">
        <button class="btn btn-green btn-sm" onclick="shareWhatsApp()">💬 ${t("share_whatsapp")}</button>
        <button class="btn btn-ghost btn-sm" onclick="copyLink()">🔗 ${t("share_copy")}</button>
      </span>
    </div>`;
}

function shareText(msg) {
  const text = msg + " — " + window.location.href;
  if (navigator.share) {
    navigator.share({ text }).catch(() => {});
  } else {
    window.open("https://wa.me/?text=" + encodeURIComponent(text), "_blank");
  }
}

function shareWhatsApp() {
  shareText(t("share_text"));
}

function copyLink() {
  navigator.clipboard.writeText(t("share_text") + " — " + window.location.href).then(() => alert(t("share_copied")));
}

// ---------- Boot ----------
function renderAll() {
  renderChrome();
  renderHome();
  renderRights();
  renderDefense();
  renderLibertad();
  renderFamilia();
  renderRed();
}

document.addEventListener("DOMContentLoaded", () => {
  renderAll();
  show("home");
});
