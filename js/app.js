/* =========================================================================
   LibreNow — app logic (full product)
   Static content (rights, defenses, bond pathways) works offline.
   Intake, the attorney dashboard, and the family portal talk to server.js.
   Only language preference and the bond checklist live in localStorage.
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
    en: "⚠️ General legal information — it becomes case guidance only after a licensed attorney in the Red Legal network reviews and signs off on your specific case. No attorney-client relationship exists until an attorney takes your case.",
    es: "⚠️ Información legal general — se convierte en guía de caso solo cuando un abogado licenciado de la Red Legal revisa y firma tu caso específico. No existe relación abogado-cliente hasta que un abogado tome tu caso."
  },
  privacy: {
    en: "🔒 Privacy by design: the screener is anonymous — no names, no A-Numbers. Case data is encrypted at rest, never shared with enforcement, and the family portal requires two private codes.",
    es: "🔒 Privacidad por diseño: el evaluador es anónimo — sin nombres, sin Números A. Los datos están cifrados, jamás se comparten con autoridades migratorias, y el portal familiar requiere dos códigos privados."
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
  home_card_familia_p: { en: "Follow the case together. Clear stages, next court date, and attorney-approved guidance.", es: "Sigan el caso juntos. Etapas claras, próxima fecha de corte y guía aprobada por abogados." },
  home_card_red_t: { en: "Red Legal", es: "Red Legal" },
  home_card_red_p: { en: "A crowdsourced network of licensed attorneys reviews and signs off on every piece of case guidance.", es: "Una red colaborativa de abogados licenciados revisa y aprueba cada guía de caso." },

  rights_head: { en: "Conoce Tus Derechos / Know Your Rights", es: "Conoce Tus Derechos" },
  rights_sub: { en: "The Constitution protects everyone on U.S. soil — regardless of immigration status. Tap a card. Practice the script out loud with your family.", es: "La Constitución protege a todas las personas en suelo estadounidense — sin importar su estatus migratorio. Toca una tarjeta. Practica las frases en voz alta con tu familia." },

  defense_head: { en: "Mi Defensa — Removal Defense Screener", es: "Mi Defensa — Evaluador de Defensas" },
  defense_sub: { en: "13 yes/no questions. 100% anonymous — no names, ever. At the end you'll see every potential defense and can send it to the attorney network for a signed review.", es: "13 preguntas de sí/no. 100% anónimo — nunca pedimos nombres. Al final verás cada defensa posible y podrás enviarla a la red de abogados para una revisión firmada." },
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
  submit_review: { en: "Send to attorney network for signed review 📤", es: "Enviar a la red de abogados para revisión firmada 📤" },
  submitting: { en: "Sending…", es: "Enviando…" },
  submitted_title: { en: "✅ Your case is in the attorney review queue", es: "✅ Tu caso está en la cola de revisión de abogados" },
  submitted_codes: { en: "WRITE THESE DOWN or screenshot them — they are shown only once and they are the ONLY way to follow the case. Share the family code only with people you trust.", es: "ANÓTALOS o toma captura de pantalla — se muestran solo una vez y son la ÚNICA forma de seguir el caso. Comparte el código familiar solo con personas de confianza." },
  submitted_case_code: { en: "Case code", es: "Código de caso" },
  submitted_family_code: { en: "Family code", es: "Código familiar" },
  submitted_next: { en: "When an attorney signs off, the full guidance appears in Mi Familia using these codes.", es: "Cuando un abogado firme, la guía completa aparecerá en Mi Familia usando estos códigos." },
  submit_failed: { en: "Could not reach the LibreNow server. Your answers stayed on this device. Start the server (node server.js) and try again.", es: "No se pudo conectar al servidor de LibreNow. Tus respuestas quedaron en este dispositivo. Inicia el servidor (node server.js) e intenta de nuevo." },

  libertad_head: { en: "Libertad — Get Released While You Fight", es: "Libertad — Sal Libre Mientras Peleas Tu Caso" },
  libertad_sub: { en: "Detention is not the end of the case — it's the first fight. Most people have at least one legal path to come home to their family while removal proceedings continue.", es: "La detención no es el fin del caso — es la primera batalla. La mayoría de las personas tienen al menos un camino legal para volver a casa con su familia mientras continúa el proceso." },
  libertad_locate_t: { en: "Step 1 — Locate your person", es: "Paso 1 — Localiza a tu persona" },
  libertad_locate_p: {
    en: "Use the official ICE Detainee Locator (locator.ice.gov) with the A-Number or name + country of birth. Check the immigration court status line: 1-800-898-7180 or acis.eoir.justice.gov.",
    es: "Usa el Localizador de Detenidos de ICE (locator.ice.gov) con el Número A o nombre + país de nacimiento. Consulta la línea de la corte de inmigración: 1-800-898-7180 o acis.eoir.justice.gov."
  },
  libertad_paths_t: { en: "Step 2 — Pick the release pathway", es: "Paso 2 — Elige el camino hacia la libertad" },
  libertad_packet_t: { en: "Step 3 — Build the evidence packet (the family's superpower)", es: "Paso 3 — Arma el paquete de evidencia (el superpoder de la familia)" },
  libertad_packet_p: { en: "Judges grant bond when the packet proves community ties. Families can gather almost all of it before the lawyer even files. Check items off as you collect them (saved only on this device):", es: "Los jueces otorgan fianza cuando el paquete demuestra lazos comunitarios. La familia puede reunir casi todo antes de que el abogado presente la solicitud. Marca cada documento al conseguirlo (se guarda solo en este dispositivo):" },
  packet_progress: { en: "packet complete", es: "del paquete completo" },

  familia_head: { en: "Mi Familia — Case Status for the People Who Love You", es: "Mi Familia — Estado del Caso para Quienes Te Aman" },
  familia_sub: { en: "Enter the two private codes from Mi Defensa (or from your attorney coordinator). Both are required — case status is never searchable by name.", es: "Escribe los dos códigos privados de Mi Defensa (o de tu coordinador legal). Ambos son obligatorios — el estado del caso nunca se puede buscar por nombre." },
  familia_case_label: { en: "Case code", es: "Código de caso" },
  familia_family_label: { en: "Family code", es: "Código familiar" },
  familia_btn: { en: "View case", es: "Ver caso" },
  familia_notfound: { en: "No case found with that combination of codes. Check both codes — too many wrong tries will pause lookups for a while.", es: "No se encontró un caso con esa combinación de códigos. Revisa ambos códigos — demasiados intentos fallidos pausarán las búsquedas por un tiempo." },
  familia_next: { en: "Next court date", es: "Próxima fecha de corte" },
  familia_bond: { en: "Release status", es: "Estado de libertad" },
  familia_review_pending: { en: "⏳ Attorney review in progress — the defense map will appear here once a licensed attorney signs off.", es: "⏳ Revisión de abogado en curso — el mapa de defensas aparecerá aquí cuando un abogado licenciado firme." },
  familia_review_changes: { en: "✏️ An attorney requested refinements — guidance is being updated.", es: "✏️ Un abogado pidió ajustes — la guía se está actualizando." },
  familia_guidance_head: { en: "Attorney-approved defense map", es: "Mapa de defensas aprobado por abogado" },
  familia_signed: { en: "Reviewed and signed by", es: "Revisado y firmado por" },
  familia_share: { en: "Share status with family 📲", es: "Compartir estado con la familia 📲" },
  familia_official: { en: "Always verify hearing dates on the official EOIR system: 1-800-898-7180 / acis.eoir.justice.gov", es: "Siempre verifica las fechas de audiencia en el sistema oficial de EOIR: 1-800-898-7180 / acis.eoir.justice.gov" },
  demo_hint: { en: "Demo mode — try these codes:", es: "Modo demo — prueba estos códigos:" },

  red_head: { en: "Red Legal — Attorney Review Network", es: "Red Legal — Red de Abogados Revisores" },
  red_sub: { en: "Every screener result becomes case guidance only after a licensed attorney reviews and signs it under their own verified account and bar number.", es: "Cada resultado del evaluador se convierte en guía de caso solo después de que un abogado licenciado lo revisa y firma con su propia cuenta verificada y número de colegiatura." },
  red_login_t: { en: "Attorney sign in", es: "Acceso para abogados" },
  red_email: { en: "Email", es: "Correo electrónico" },
  red_password: { en: "Password", es: "Contraseña" },
  red_login_btn: { en: "Sign in", es: "Entrar" },
  red_login_failed: { en: "Sign-in failed — check email and password.", es: "Acceso fallido — revisa el correo y la contraseña." },
  red_logout: { en: "Sign out", es: "Salir" },
  red_queue_head: { en: "Review queue", es: "Cola de revisión" },
  red_col_id: { en: "ID", es: "ID" },
  red_col_case: { en: "Case", es: "Caso" },
  red_col_summary: { en: "Guidance to review", es: "Guía a revisar" },
  red_col_status: { en: "Status", es: "Estado" },
  red_col_action: { en: "Action", es: "Acción" },
  red_open: { en: "Open", es: "Abrir" },
  red_status_pending: { en: "Pending review", es: "Pendiente" },
  red_status_approved: { en: "Attorney-approved", es: "Aprobado por abogado" },
  red_status_changes: { en: "Changes requested", es: "Cambios solicitados" },
  red_signed_by: { en: "Signed by", es: "Firmado por" },
  red_detail_answers: { en: "Screener answers", es: "Respuestas del evaluador" },
  red_detail_matches: { en: "Auto-matched defenses (verify each)", es: "Defensas auto-detectadas (verificar cada una)" },
  red_note: { en: "Review note (visible in audit log)", es: "Nota de revisión (visible en el registro de auditoría)" },
  red_attest: { en: "I am a licensed attorney in good standing. I have personally reviewed this case guidance and approve it under my bar number on file.", es: "Soy abogado/a licenciado/a en buen estado. He revisado personalmente esta guía de caso y la apruebo bajo mi número de colegiatura registrado." },
  red_signoff: { en: "Sign off ✍️", es: "Firmar ✍️" },
  red_request_changes: { en: "Request changes", es: "Pedir cambios" },
  red_attest_required: { en: "You must check the attestation box to sign off.", es: "Debes marcar la casilla de declaración para firmar." },
  red_note_required: { en: "A note is required to request changes.", es: "Se requiere una nota para pedir cambios." },
  red_case_admin: { en: "Case management (what the family sees)", es: "Gestión del caso (lo que ve la familia)" },
  red_label: { en: "Display label (e.g., first name + initial — optional)", es: "Etiqueta visible (p. ej., nombre e inicial — opcional)" },
  red_stage: { en: "Stage", es: "Etapa" },
  red_next_date: { en: "Next court date", es: "Próxima fecha de corte" },
  red_bond_status: { en: "Release status note", es: "Nota de estado de libertad" },
  red_save_case: { en: "Save case status", es: "Guardar estado del caso" },
  red_saved: { en: "Saved ✓", es: "Guardado ✓" },
  red_admin_head: { en: "Admin — grow the network", es: "Administración — crecer la red" },
  red_inv_name: { en: "Attorney name", es: "Nombre del abogado" },
  red_inv_email: { en: "Email", es: "Correo" },
  red_inv_bar: { en: "Bar number", es: "Número de colegiatura" },
  red_inv_state: { en: "Bar state", es: "Estado de colegiatura" },
  red_inv_role: { en: "Role", es: "Rol" },
  red_inv_create: { en: "Create invite", es: "Crear invitación" },
  red_inv_link: { en: "Invite link (send privately — bar number should be verified against the state bar registry before sending):", es: "Enlace de invitación (envíalo en privado — verifica el número contra el registro del colegio de abogados antes de enviarlo):" },
  red_roster: { en: "Network roster", es: "Miembros de la red" },
  red_audit_btn: { en: "View audit log", es: "Ver registro de auditoría" },
  red_audit_head: { en: "Audit log (hash-chained, tamper-evident)", es: "Registro de auditoría (cadena de hashes, a prueba de alteraciones)" },
  red_chain_ok: { en: "✅ Audit chain verified intact", es: "✅ Cadena de auditoría verificada intacta" },
  red_chain_bad: { en: "🚨 AUDIT CHAIN BROKEN — investigate immediately", es: "🚨 CADENA DE AUDITORÍA ROTA — investigar de inmediato" },
  red_join_t: { en: "Are you an immigration attorney or law professor?", es: "¿Eres abogado/a de inmigración o profesor/a de derecho?" },
  red_join_p: { en: "Join the crowdsourced review network. One signed review can mean one more parent home for dinner. Membership is by invitation after bar verification — contact the network admin.", es: "Únete a la red colaborativa de revisión. Una revisión firmada puede significar un padre o madre más cenando en casa. La membresía es por invitación tras verificar la colegiatura — contacta al administrador de la red." },
  invite_head: { en: "Accept your Red Legal invitation", es: "Acepta tu invitación a la Red Legal" },
  invite_sub: { en: "Set a password (minimum 10 characters) to activate your attorney account.", es: "Crea una contraseña (mínimo 10 caracteres) para activar tu cuenta de abogado." },
  invite_btn: { en: "Activate account", es: "Activar cuenta" },
  invite_done: { en: "Account activated — sign in above.", es: "Cuenta activada — inicia sesión arriba." },
  invite_failed: { en: "Invitation invalid or already used.", es: "Invitación inválida o ya utilizada." },
  server_needed: { en: "⚠️ The LibreNow server is not reachable. This module needs it. Run: node server.js (see README).", es: "⚠️ El servidor de LibreNow no está disponible. Este módulo lo necesita. Ejecuta: node server.js (ver README)." },

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
    en: "LibreNow™ — Defensa. Familia. Libertad. | General information only — guidance becomes attorney advice only when a licensed attorney of the Red Legal signs your case and takes representation. Official case info: 1-800-898-7180.",
    es: "LibreNow™ — Defensa. Familia. Libertad. | Solo información general — la guía se convierte en asesoría de abogado solo cuando un abogado licenciado de la Red Legal firma tu caso y asume la representación. Información oficial del caso: 1-800-898-7180."
  }
};

const t = (key) => (UI[key] ? UI[key][lang] : key);
const tt = (obj) => (obj ? obj[lang] || obj.en : "");
const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

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
let lastSubmission = null;

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
    <div id="submitArea" style="text-align:center;margin-top:1.2rem;">
      ${
        lastSubmission
          ? submittedBox()
          : `<button class="btn btn-gold" id="submitBtn" onclick="submitForReview()">${t("submit_review")}</button>`
      }
      <button class="btn btn-ghost" onclick="lastSubmission=null;startScreener()">${t("restart")}</button>
      <p id="submitMsg" style="font-weight:700;color:var(--rojo);"></p>
    </div>
    ${shareBar()}
  `;
}

function submittedBox() {
  return `
    <div class="result-item" style="text-align:left;">
      <h4>${t("submitted_title")}</h4>
      <p style="color:var(--rojo);font-weight:700;">${t("submitted_codes")}</p>
      <p style="font-size:1.3rem;"><strong>${t("submitted_case_code")}:</strong> <code>${esc(lastSubmission.caseCode)}</code><br>
         <strong>${t("submitted_family_code")}:</strong> <code>${esc(lastSubmission.familyCode)}</code></p>
      <p>${t("submitted_next")}</p>
    </div>`;
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

async function submitForReview() {
  const btn = document.getElementById("submitBtn");
  btn.disabled = true;
  btn.textContent = t("submitting");
  try {
    lastSubmission = await api("/intake", { method: "POST", body: { language: lang, answers: screenerState.answers } });
    renderDefense();
  } catch (e) {
    btn.disabled = false;
    btn.textContent = t("submit_review");
    document.getElementById("submitMsg").textContent = t("submit_failed");
  }
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
  const demoHint =
    LN_SERVER && LN_SERVER.demo && LN_SERVER.demoCases
      ? `<p class="note">${t("demo_hint")} ${LN_SERVER.demoCases.map((d) => `<code>${esc(d.caseCode)}</code> + <code>${esc(d.familyCode)}</code>`).join(" · ")}</p>`
      : "";
  document.getElementById("view-familia").innerHTML = `
    <h2 class="section-head">${t("familia_head")}</h2>
    <p class="section-sub">${t("familia_sub")}</p>
    ${LN_SERVER ? "" : `<div class="hotline">${t("server_needed")}</div>`}
    <div class="screener-box">
      <div class="field">
        <label>${t("familia_case_label")}</label>
        <input id="caseCodeInput" placeholder="LN-2026-XXXX" autocomplete="off" />
      </div>
      <div class="field">
        <label>${t("familia_family_label")}</label>
        <input id="familyCodeInput" placeholder="FAM-XXXXXXXX" autocomplete="off" />
      </div>
      <button class="btn btn-blue" onclick="lookupCase()">${t("familia_btn")}</button>
      ${demoHint}
      <div id="caseResult" style="margin-top:1.4rem;"></div>
    </div>
    <p class="note" style="margin-top:0.8rem;">${t("familia_official")}</p>
    ${shareBar()}
  `;
}

let lastCase = null;

async function lookupCase() {
  const out = document.getElementById("caseResult");
  const caseCode = document.getElementById("caseCodeInput").value;
  const familyCode = document.getElementById("familyCodeInput").value;
  try {
    lastCase = await api("/family/lookup", { method: "POST", body: { caseCode, familyCode } });
  } catch (e) {
    out.innerHTML = `<p style="color:var(--rojo);font-weight:700;">${e.status === 0 || !LN_SERVER ? t("server_needed") : t("familia_notfound")}</p>`;
    return;
  }
  const c = lastCase;
  const reviewLine =
    c.reviewStatus === "approved"
      ? ""
      : `<div class="result-item maybe"><p>${c.reviewStatus === "changes_requested" ? t("familia_review_changes") : t("familia_review_pending")}</p></div>`;
  out.innerHTML = `
    <h3>👤 ${esc(c.label || c.caseCode)}</h3>
    <p>${c.nextDate ? `<strong>${t("familia_next")}:</strong> ${esc(c.nextDate)}` : ""}
       ${c.bondStatus ? ` &nbsp;|&nbsp; <strong>${t("familia_bond")}:</strong> ${esc(c.bondStatus)}` : ""}</p>
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
    ${reviewLine}
    ${
      c.guidance.length
        ? `<h4>${t("familia_guidance_head")}</h4>
           <p class="note">${t("familia_signed")}: ${esc(c.signedBy.name)} (${esc(c.signedBy.barState)}) · ${esc(String(c.signedBy.at).slice(0, 10))}</p>` +
          c.guidance
            .map(
              (g) => `
          <div class="result-item ${g.level}">
            <span class="badge ${g.level}">${g.level === "strong" ? t("badge_strong") : t("badge_maybe")}</span>
            <h4>${tt(g.name)}</h4>
            <div class="statute">${esc(g.statute)}</div>
            <p>${tt(g.desc)}</p>
          </div>`
            )
            .join("")
        : ""
    }
    <button class="btn btn-green btn-sm" onclick="shareCaseStatus()">${t("familia_share")}</button>
  `;
}

function shareCaseStatus() {
  if (!lastCase) return;
  const c = lastCase;
  const stageName = tt(c.stages[c.stage]);
  const msg =
    lang === "es"
      ? `Actualización del caso ${c.label || c.caseCode} en LibreNow: etapa ${c.stage + 1}/${c.stages.length} — ${stageName}.${c.nextDate ? " Próxima fecha: " + c.nextDate + "." : ""}${c.bondStatus ? " " + c.bondStatus : ""}`
      : `Update on ${c.label || c.caseCode} via LibreNow: stage ${c.stage + 1}/${c.stages.length} — ${stageName}.${c.nextDate ? " Next date: " + c.nextDate + "." : ""}${c.bondStatus ? " " + c.bondStatus : ""}`;
  shareText(msg);
}

// ---------- Red Legal (attorney dashboard) ----------
let me = null;

async function renderRed() {
  const el = document.getElementById("view-red");
  const head = `
    <h2 class="section-head">${t("red_head")}</h2>
    <p class="section-sub">${t("red_sub")}</p>`;

  // Invite acceptance deep-link: /#invite=TOKEN
  const inviteToken = (location.hash.match(/^#invite=(\w+)$/) || [])[1];

  if (!LN_SERVER) {
    el.innerHTML = `${head}<div class="hotline">${t("server_needed")}</div>`;
    return;
  }

  try {
    me = await api("/me");
  } catch (_) {
    me = null;
  }

  if (!me) {
    el.innerHTML = `${head}
      ${inviteToken ? inviteForm(inviteToken) : ""}
      <div class="screener-box" style="max-width:430px;">
        <h3>🔐 ${t("red_login_t")}</h3>
        <div class="field"><label>${t("red_email")}</label><input id="loginEmail" type="email" autocomplete="username" /></div>
        <div class="field"><label>${t("red_password")}</label><input id="loginPassword" type="password" autocomplete="current-password" /></div>
        <button class="btn btn-gold" onclick="doLogin()">${t("red_login_btn")}</button>
        <p id="loginMsg" style="color:var(--rojo);font-weight:700;"></p>
        ${LN_SERVER.demo && LN_SERVER.demoLogin ? `<p class="note">${t("demo_hint")} <code>${esc(LN_SERVER.demoLogin.email)}</code> / <code>${esc(LN_SERVER.demoLogin.password)}</code></p>` : ""}
      </div>
      <div class="card blue" style="margin-top:1.6rem;">
        <span class="emoji">👩‍⚖️</span>
        <h3>${t("red_join_t")}</h3>
        <p>${t("red_join_p")}</p>
      </div>`;
    return;
  }

  let queueData;
  try {
    queueData = await api("/queue");
  } catch (_) {
    queueData = { queue: [] };
  }

  const statusBadge = (r) =>
    r.status === "approved"
      ? `<span class="badge approved">${t("red_status_approved")}</span>`
      : r.status === "changes_requested"
        ? `<span class="badge maybe">${t("red_status_changes")}</span>`
        : `<span class="badge pending">${t("red_status_pending")}</span>`;

  el.innerHTML = `${head}
    <p><strong>⚖️ ${esc(me.name)}</strong> · ${esc(me.email)} · Bar ${esc(me.barNumber)} (${esc(me.barState)}) ${me.role === "admin" ? "· ADMIN" : ""}
      <button class="btn btn-ghost btn-sm" onclick="doLogout()">${t("red_logout")}</button></p>

    <h3>${t("red_queue_head")} (${queueData.queue.filter((r) => r.status === "pending").length} ${t("red_status_pending").toLowerCase()})</h3>
    <table class="review-table">
      <thead><tr>
        <th>${t("red_col_id")}</th><th>${t("red_col_case")}</th>
        <th>${t("red_col_summary")}</th><th>${t("red_col_status")}</th><th>${t("red_col_action")}</th>
      </tr></thead>
      <tbody>
        ${queueData.queue
          .map(
            (r) => `
          <tr>
            <td>${esc(r.id)}</td>
            <td>${esc(r.caseCode)}${r.label ? "<br><span style='font-size:0.78rem;'>" + esc(r.label) + "</span>" : ""}</td>
            <td>${esc(tt(r.summary))}</td>
            <td>${statusBadge(r)}
              ${r.signoff ? `<br><span style="font-size:0.78rem;">${t("red_signed_by")}: ${esc(r.signoff.name)} · Bar ${esc(r.signoff.barNumber)} (${esc(r.signoff.barState)}) · ${esc(String(r.signoff.at).slice(0, 10))}</span>` : ""}</td>
            <td><button class="btn btn-blue btn-sm" onclick="openReview('${esc(r.id)}')">${t("red_open")}</button></td>
          </tr>`
          )
          .join("")}
      </tbody>
    </table>
    <div id="reviewDetail" style="margin-top:1.4rem;"></div>
    ${me.role === "admin" ? adminPanel() : ""}
    ${shareBar()}
  `;
  if (me.role === "admin") loadRoster();
}

function inviteForm(token) {
  return `
    <div class="screener-box" style="max-width:430px;margin-bottom:1.2rem;">
      <h3>✉️ ${t("invite_head")}</h3>
      <p class="note">${t("invite_sub")}</p>
      <div class="field"><label>${t("red_password")}</label><input id="invitePassword" type="password" autocomplete="new-password" /></div>
      <button class="btn btn-green" onclick="acceptInvite('${esc(token)}')">${t("invite_btn")}</button>
      <p id="inviteMsg" style="font-weight:700;"></p>
    </div>`;
}

async function acceptInvite(token) {
  const msg = document.getElementById("inviteMsg");
  try {
    await api("/invites/accept", { method: "POST", body: { token, password: document.getElementById("invitePassword").value } });
    msg.style.color = "var(--verde)";
    msg.textContent = t("invite_done");
    location.hash = "";
  } catch (e) {
    msg.style.color = "var(--rojo)";
    msg.textContent = e.message === "password_min_10_chars" ? t("invite_sub") : t("invite_failed");
  }
}

async function doLogin() {
  const msg = document.getElementById("loginMsg");
  try {
    await api("/login", {
      method: "POST",
      body: { email: document.getElementById("loginEmail").value, password: document.getElementById("loginPassword").value }
    });
    renderRed();
  } catch (_) {
    msg.textContent = t("red_login_failed");
  }
}

async function doLogout() {
  await api("/logout", { method: "POST" }).catch(() => {});
  me = null;
  renderRed();
}

async function openReview(id) {
  const box = document.getElementById("reviewDetail");
  const r = await api("/reviews/" + encodeURIComponent(id));
  const answered = SCREENER_QUESTIONS.map((q) => `<li>${tt(q.q)} — <strong>${r.case.answers[q.id] ? t("yes") : t("no")}</strong></li>`).join("");
  const matches = r.case.matches
    .map((m) => {
      const o = RELIEF_OPTIONS.find((x) => x.id === m.reliefId);
      return `<div class="result-item ${m.level}">
        <span class="badge ${m.level}">${m.level === "strong" ? t("badge_strong") : t("badge_maybe")}</span>
        <h4>${tt(o.name)}</h4><div class="statute">${esc(o.statute)}</div><p>${tt(o.desc)}</p></div>`;
    })
    .join("");

  box.innerHTML = `
    <div class="screener-box">
      <h3>${esc(r.id)} · ${esc(r.case.caseCode)} ${r.case.label ? "· " + esc(r.case.label) : ""}</h3>
      ${r.changeRequests.length ? `<p class="note">✏️ ${r.changeRequests.map((c) => esc(c.by) + ": " + esc(c.note)).join(" · ")}</p>` : ""}
      <details><summary style="cursor:pointer;font-weight:700;">${t("red_detail_answers")}</summary><ul style="font-size:0.88rem;">${answered}</ul></details>
      <h4 style="margin-top:1rem;">${t("red_detail_matches")}</h4>
      ${matches || `<p class="note">${t("no_results")}</p>`}

      ${
        r.status !== "approved"
          ? `
      <div class="field" style="margin-top:1rem;"><label>${t("red_note")}</label><textarea id="reviewNote" rows="3"></textarea></div>
      <label style="display:flex;gap:0.5rem;align-items:flex-start;font-size:0.9rem;margin-bottom:0.9rem;">
        <input type="checkbox" id="attestBox" style="margin-top:0.25rem;transform:scale(1.2);" /> ${t("red_attest")}</label>
      <button class="btn btn-gold" onclick="signOff('${esc(r.id)}')">${t("red_signoff")}</button>
      <button class="btn btn-ghost" onclick="requestChanges('${esc(r.id)}')">${t("red_request_changes")}</button>
      <p id="reviewMsg" style="color:var(--rojo);font-weight:700;"></p>`
          : `<p class="note">✔︎ ${t("red_signed_by")}: ${esc(r.signoff.name)} · Bar ${esc(r.signoff.barNumber)} (${esc(r.signoff.barState)}) · ${esc(String(r.signoff.at).slice(0, 10))}${r.signoff.note ? " — “" + esc(r.signoff.note) + "”" : ""}</p>`
      }

      <h4 style="margin-top:1.4rem;">${t("red_case_admin")}</h4>
      <div class="field"><label>${t("red_label")}</label><input id="caseLabel" value="${esc(r.case.label || "")}" maxlength="60" /></div>
      <div class="field"><label>${t("red_stage")}</label>
        <select id="caseStage">${CASE_STAGES.map((s, i) => `<option value="${i}" ${i === r.case.stage ? "selected" : ""}>${i + 1}. ${tt(s)}</option>`).join("")}</select>
      </div>
      <div class="field"><label>${t("red_next_date")}</label><input id="caseNextDate" type="date" value="${esc(r.case.nextDate || "")}" /></div>
      <div class="field"><label>${t("red_bond_status")}</label><input id="caseBondStatus" value="${esc(r.case.bondStatus || "")}" maxlength="300" /></div>
      <button class="btn btn-green" onclick="saveCase('${esc(r.case.caseCode)}')">${t("red_save_case")}</button>
      <span id="caseSaveMsg" style="color:var(--verde);font-weight:700;"></span>
    </div>`;
  box.scrollIntoView({ behavior: "smooth" });
}

async function signOff(id) {
  const msg = document.getElementById("reviewMsg");
  if (!document.getElementById("attestBox").checked) {
    msg.textContent = t("red_attest_required");
    return;
  }
  await api("/reviews/" + encodeURIComponent(id) + "/signoff", {
    method: "POST",
    body: { attest: true, note: document.getElementById("reviewNote").value }
  });
  renderRed();
}

async function requestChanges(id) {
  const msg = document.getElementById("reviewMsg");
  const note = document.getElementById("reviewNote").value.trim();
  if (!note) {
    msg.textContent = t("red_note_required");
    return;
  }
  await api("/reviews/" + encodeURIComponent(id) + "/request-changes", { method: "POST", body: { note } });
  renderRed();
}

async function saveCase(caseCode) {
  await api("/cases/" + encodeURIComponent(caseCode) + "/update", {
    method: "POST",
    body: {
      label: document.getElementById("caseLabel").value,
      stage: parseInt(document.getElementById("caseStage").value, 10),
      nextDate: document.getElementById("caseNextDate").value,
      bondStatus: document.getElementById("caseBondStatus").value
    }
  });
  document.getElementById("caseSaveMsg").textContent = t("red_saved");
}

function adminPanel() {
  return `
    <div class="screener-box" style="margin-top:1.6rem;">
      <h3>🛠️ ${t("red_admin_head")}</h3>
      <div class="field"><label>${t("red_inv_name")}</label><input id="invName" /></div>
      <div class="field"><label>${t("red_inv_email")}</label><input id="invEmail" type="email" /></div>
      <div class="field"><label>${t("red_inv_bar")}</label><input id="invBar" /></div>
      <div class="field"><label>${t("red_inv_state")}</label><input id="invState" maxlength="20" /></div>
      <div class="field"><label>${t("red_inv_role")}</label>
        <select id="invRole"><option value="attorney">Attorney</option><option value="admin">Admin</option></select></div>
      <button class="btn btn-gold" onclick="createInvite()">${t("red_inv_create")}</button>
      <p id="invMsg" style="word-break:break-all;"></p>
      <h4>${t("red_roster")}</h4>
      <div id="rosterBox" class="note"></div>
      <button class="btn btn-ghost btn-sm" onclick="loadAudit()">${t("red_audit_btn")}</button>
      <div id="auditBox" style="font-size:0.78rem;"></div>
    </div>`;
}

async function createInvite() {
  const msg = document.getElementById("invMsg");
  try {
    const inv = await api("/invites", {
      method: "POST",
      body: {
        name: document.getElementById("invName").value,
        email: document.getElementById("invEmail").value,
        barNumber: document.getElementById("invBar").value,
        barState: document.getElementById("invState").value,
        role: document.getElementById("invRole").value
      }
    });
    msg.innerHTML = `${t("red_inv_link")}<br><code>${esc(location.origin + inv.acceptPath)}</code>`;
    loadRoster();
  } catch (e) {
    msg.textContent = "⚠️ " + esc(e.message);
  }
}

async function loadRoster() {
  const box = document.getElementById("rosterBox");
  if (!box) return;
  try {
    const data = await api("/attorneys");
    box.innerHTML =
      data.attorneys.map((a) => `⚖️ ${esc(a.name)} — Bar ${esc(a.barNumber)} (${esc(a.barState)}) · ${esc(a.role)}`).join("<br>") +
      (data.pendingInvites.length ? "<br>✉️ " + data.pendingInvites.map((i) => esc(i.name) + " (" + esc(i.email) + ")").join(", ") : "");
  } catch (_) {}
}

async function loadAudit() {
  const box = document.getElementById("auditBox");
  const data = await api("/audit");
  box.innerHTML = `
    <h4>${t("red_audit_head")}</h4>
    <p style="font-weight:700;">${data.chainValid ? t("red_chain_ok") : t("red_chain_bad")}</p>
    ${data.entries
      .slice()
      .reverse()
      .map((e) => `<div>#${e.seq} · ${esc(e.ts)} · <strong>${esc(e.actor)}</strong> · ${esc(e.action)} · ${esc(JSON.stringify(e.details))}</div>`)
      .join("")}`;
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
  const text = msg + " — " + window.location.origin;
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
  navigator.clipboard.writeText(t("share_text") + " — " + window.location.origin).then(() => alert(t("share_copied")));
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

document.addEventListener("DOMContentLoaded", async () => {
  await probeServer();
  renderAll();
  show(location.hash.startsWith("#invite=") ? "red" : "home");
});
