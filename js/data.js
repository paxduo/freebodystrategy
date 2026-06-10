/* =========================================================================
   LibreNow — content data (bilingual EN/ES)
   All legal content here is GENERAL INFORMATION drafted for review by the
   licensed attorneys in the Red Legal network. Nothing ships to users as
   "attorney-reviewed" until an attorney approves it in the dashboard.
   ========================================================================= */

// ---------- Know Your Rights cards ----------
const RIGHTS_CARDS = [
  {
    id: "door",
    icon: "🚪",
    title: { en: "If ICE comes to your home", es: "Si ICE llega a tu casa" },
    points: {
      en: [
        "You do NOT have to open the door. Opening the door is how most home arrests happen.",
        "Ask (through the door) if they have a warrant SIGNED BY A JUDGE. An ICE administrative form (I-200/I-205) is NOT a judicial warrant and does not let them enter.",
        "Ask them to slide the warrant under the door or show it through a window. Check it has your correct name and address and a judge's signature.",
        "You have the right to remain silent. You do not have to answer questions about where you were born or how you entered the U.S.",
        "Do not lie and do not show false documents. Stay calm and do not run."
      ],
      es: [
        "NO tienes que abrir la puerta. La mayoría de los arrestos en casa ocurren porque alguien abre la puerta.",
        "Pregunta (a través de la puerta) si tienen una orden FIRMADA POR UN JUEZ. Un formulario administrativo de ICE (I-200/I-205) NO es una orden judicial y no les permite entrar.",
        "Pídeles que pasen la orden por debajo de la puerta o la muestren por la ventana. Verifica que tenga tu nombre y dirección correctos y la firma de un juez.",
        "Tienes derecho a guardar silencio. No tienes que contestar preguntas sobre dónde naciste o cómo entraste a EE. UU.",
        "No mientas y no muestres documentos falsos. Mantén la calma y no corras."
      ]
    },
    sayThis: {
      en: "“I do not consent to your entry. I am exercising my right to remain silent. I want to speak with a lawyer.”",
      es: "“No doy mi consentimiento para que entren. Estoy ejerciendo mi derecho a guardar silencio. Quiero hablar con un abogado.”"
    }
  },
  {
    id: "street",
    icon: "🚶",
    title: { en: "If you are stopped on the street or at work", es: "Si te detienen en la calle o en el trabajo" },
    points: {
      en: [
        "Ask: “Am I free to go?” If they say yes, walk away calmly.",
        "You have the right to remain silent. You may say so out loud.",
        "You do not have to consent to a search of yourself or your belongings.",
        "Do not sign anything you do not understand — especially anything that could be a stipulated removal or voluntary departure form.",
        "You have the right to record the encounter where lawful in your state."
      ],
      es: [
        "Pregunta: “¿Soy libre de irme?” Si dicen que sí, retírate con calma.",
        "Tienes derecho a guardar silencio. Puedes decirlo en voz alta.",
        "No tienes que dar consentimiento para que te registren a ti o tus pertenencias.",
        "No firmes nada que no entiendas — especialmente algo que pueda ser una salida voluntaria o una orden de deportación estipulada.",
        "Tienes derecho a grabar el encuentro donde sea legal en tu estado."
      ]
    },
    sayThis: {
      en: "“I am exercising my right to remain silent. I do not consent to a search. I want to speak with a lawyer.”",
      es: "“Estoy ejerciendo mi derecho a guardar silencio. No doy consentimiento para un registro. Quiero hablar con un abogado.”"
    }
  },
  {
    id: "detained",
    icon: "🏛️",
    title: { en: "If you are detained", es: "Si estás detenido/a" },
    points: {
      en: [
        "Do not sign anything without talking to a lawyer. Signing can give up your right to see an immigration judge.",
        "You have the right to call your family and your consulate.",
        "Memorize (or have your family keep) your A-Number (alien registration number, starts with 'A'). It is the key to locating you and your case.",
        "You have the right to ask for a bond hearing before an immigration judge in many cases (see the Libertad module).",
        "If you fear returning to your country, SAY SO clearly and repeatedly — it triggers protection screening (credible/reasonable fear interview).",
        "You have the right to be represented by a lawyer at no expense to the government — and free/low-cost legal aid lists must be provided to you."
      ],
      es: [
        "No firmes nada sin hablar con un abogado. Firmar puede renunciar a tu derecho de ver a un juez de inmigración.",
        "Tienes derecho a llamar a tu familia y a tu consulado.",
        "Memoriza (o que tu familia guarde) tu Número A (número de registro de extranjero, empieza con 'A'). Es la clave para localizarte a ti y tu caso.",
        "En muchos casos tienes derecho a pedir una audiencia de fianza ante un juez de inmigración (ver el módulo Libertad).",
        "Si tienes miedo de regresar a tu país, DILO claramente y repetidamente — eso activa una entrevista de miedo creíble/razonable.",
        "Tienes derecho a un abogado sin costo para el gobierno — y deben darte listas de ayuda legal gratuita o de bajo costo."
      ]
    },
    sayThis: {
      en: "“I will not sign anything. I want a hearing before an immigration judge. I want to call my lawyer.”",
      es: "“No voy a firmar nada. Quiero una audiencia ante un juez de inmigración. Quiero llamar a mi abogado.”"
    }
  },
  {
    id: "plan",
    icon: "📋",
    title: { en: "Family preparedness plan", es: "Plan de preparación familiar" },
    points: {
      en: [
        "Keep copies of important documents (IDs, A-Number, any immigration filings, children's birth certificates) with a trusted person.",
        "Set up a childcare power of attorney / caregiver authorization in case of detention.",
        "Save the ICE Detainee Locator (locator.ice.gov) and the EOIR case hotline 1-800-898-7180 (or acis.eoir.justice.gov).",
        "Agree on a family code word and an emergency contact who knows how to reach a lawyer.",
        "Do NOT carry documents from your country of origin that show nationality (e.g., foreign passport) day-to-day if avoidable; never carry false documents."
      ],
      es: [
        "Guarda copias de documentos importantes (identificaciones, Número A, trámites de inmigración, actas de nacimiento de los niños) con una persona de confianza.",
        "Prepara una carta poder para el cuidado de tus hijos en caso de detención.",
        "Guarda el localizador de detenidos de ICE (locator.ice.gov) y la línea de casos de EOIR 1-800-898-7180 (o acis.eoir.justice.gov).",
        "Acuerden una palabra clave familiar y un contacto de emergencia que sepa cómo llamar a un abogado.",
        "NO cargues a diario documentos de tu país que muestren tu nacionalidad (p. ej., pasaporte extranjero) si puedes evitarlo; nunca cargues documentos falsos."
      ]
    },
    sayThis: {
      en: "Preparation is power. A 30-minute family plan can change everything later. / La preparación es poder.",
      es: "La preparación es poder. Un plan familiar de 30 minutos puede cambiarlo todo después."
    }
  }
];

// ---------- Removal defense screener ----------
// Each question sets a fact flag; relief options match on flags.
const SCREENER_QUESTIONS = [
  { id: "inProceedings", q: { en: "Are you (or your loved one) currently in removal (deportation) proceedings or detained?", es: "¿Estás tú (o tu ser querido) actualmente en proceso de deportación o detenido/a?" },
    help: { en: "This includes having received a Notice to Appear (NTA) or having a court date.", es: "Esto incluye haber recibido una Notificación de Comparecencia (NTA) o tener fecha de corte." } },
  { id: "lpr", q: { en: "Has the person ever been a lawful permanent resident (green card holder)?", es: "¿La persona ha sido alguna vez residente permanente legal (tarjeta verde)?" },
    help: { en: "", es: "" } },
  { id: "tenYears", q: { en: "Has the person lived in the U.S. continuously for 10 years or more?", es: "¿La persona ha vivido en EE. UU. continuamente por 10 años o más?" },
    help: { en: "Count from first arrival; certain departures or an NTA can 'stop the clock'. An attorney will verify.", es: "Cuenta desde la primera llegada; ciertas salidas o una NTA pueden 'parar el reloj'. Un abogado lo verificará." } },
  { id: "uscRelative", q: { en: "Does the person have a U.S. citizen or green-card-holder spouse, parent, or child?", es: "¿La persona tiene cónyuge, padre/madre o hijo/a ciudadano/a de EE. UU. o residente permanente?" },
    help: { en: "For some defenses the child must be under 21; an attorney will confirm which relatives qualify.", es: "Para algunas defensas el hijo/a debe ser menor de 21 años; un abogado confirmará qué familiares califican." } },
  { id: "fear", q: { en: "Is the person afraid of being harmed, persecuted, or tortured if returned to their home country?", es: "¿La persona tiene miedo de sufrir daño, persecución o tortura si regresa a su país?" },
    help: { en: "Because of race, religion, nationality, political opinion, membership in a particular social group, or by/with consent of the government.", es: "Por raza, religión, nacionalidad, opinión política, pertenencia a un grupo social particular, o por/con consentimiento del gobierno." } },
  { id: "crimeVictim", q: { en: "Has the person been the victim of a serious crime in the U.S. (e.g., assault, domestic violence, robbery, trafficking)?", es: "¿La persona ha sido víctima de un delito grave en EE. UU. (p. ej., agresión, violencia doméstica, robo, trata de personas)?" },
    help: { en: "Helping (or being willing to help) police or prosecutors matters for U visas.", es: "Ayudar (o estar dispuesto/a a ayudar) a la policía o fiscales importa para visas U." } },
  { id: "abuse", q: { en: "Has the person been abused by a U.S. citizen or resident spouse or parent?", es: "¿La persona ha sido abusada por un cónyuge o padre/madre ciudadano/a o residente de EE. UU.?" },
    help: { en: "Physical or extreme emotional abuse can qualify under VAWA (applies to all genders).", es: "El abuso físico o emocional extremo puede calificar bajo VAWA (aplica a todos los géneros)." } },
  { id: "lawfulEntry", q: { en: "Did the person enter the U.S. with a visa or other lawful inspection (even if it expired)?", es: "¿La persona entró a EE. UU. con visa u otra inspección legal (aunque haya vencido)?" },
    help: { en: "Lawful entry can open the door to adjusting status inside the U.S. through a qualifying relative.", es: "La entrada legal puede abrir la puerta a arreglar el estatus dentro de EE. UU. a través de un familiar que califique." } },
  { id: "childArrival", q: { en: "Did the person arrive in the U.S. as a child (before age 16)?", es: "¿La persona llegó a EE. UU. siendo niño/a (antes de los 16 años)?" },
    help: { en: "", es: "" } },
  { id: "tpsCountry", q: { en: "Is the person from a country that may have Temporary Protected Status (TPS) — e.g., Venezuela, Haiti, El Salvador, Honduras, Ukraine, others?", es: "¿La persona es de un país que puede tener Estatus de Protección Temporal (TPS) — p. ej., Venezuela, Haití, El Salvador, Honduras, Ucrania, otros?" },
    help: { en: "TPS designations change frequently — the attorney network keeps this current.", es: "Las designaciones de TPS cambian con frecuencia — la red de abogados lo mantiene al día." } },
  { id: "badArrest", q: { en: "Were there problems with the arrest — no warrant shown, entry without consent, racial profiling, or rights not respected?", es: "¿Hubo problemas con el arresto — no mostraron orden, entraron sin consentimiento, perfil racial, o no respetaron sus derechos?" },
    help: { en: "Constitutional violations can support motions to suppress evidence or terminate proceedings.", es: "Las violaciones constitucionales pueden apoyar mociones para suprimir evidencia o terminar el proceso." } },
  { id: "ntaDefect", q: { en: "Did the charging document (NTA) leave out the hearing date/time, or have wrong information?", es: "¿La Notificación de Comparecencia (NTA) omitió la fecha/hora de audiencia o tenía información incorrecta?" },
    help: { en: "Defective NTAs have supported motions to terminate (Pereira v. Sessions; Niz-Chavez v. Garland).", es: "Las NTA defectuosas han apoyado mociones para terminar el caso (Pereira v. Sessions; Niz-Chavez v. Garland)." } },
  { id: "equities", q: { en: "Does the person have strong community ties — long employment, U.S.-citizen children, caregiving role, military family, serious medical needs in the family?", es: "¿La persona tiene fuertes lazos comunitarios — empleo de muchos años, hijos ciudadanos, rol de cuidador/a, familia militar, necesidades médicas serias en la familia?" },
    help: { en: "Equities support prosecutorial discretion requests, bond, and discretionary relief.", es: "Los lazos apoyan solicitudes de discreción fiscal, fianza y alivios discrecionales." } }
];

// ---------- Relief option library ----------
// match(answers) returns "strong" | "maybe" | null
const RELIEF_OPTIONS = [
  {
    id: "cancellationLPR",
    statute: "INA § 240A(a)",
    name: { en: "Cancellation of Removal (LPR)", es: "Cancelación de Deportación (Residentes)" },
    desc: {
      en: "For green card holders with 5+ years as an LPR and 7+ years of continuous residence after lawful admission, without an aggravated felony conviction. The judge can cancel removal entirely and the person keeps the green card.",
      es: "Para residentes permanentes con 5+ años como LPR y 7+ años de residencia continua tras admisión legal, sin condena por delito agravado. El juez puede cancelar la deportación por completo y la persona conserva su residencia."
    },
    match: (a) => (a.lpr ? "strong" : null)
  },
  {
    id: "cancellationNonLPR",
    statute: "INA § 240A(b)",
    name: { en: "Cancellation of Removal (non-LPR) — “the 10-year law”", es: "Cancelación de Deportación (no residentes) — “la ley de los 10 años”" },
    desc: {
      en: "Requires 10 years of continuous physical presence, good moral character, and proof that removal would cause exceptional and extremely unusual hardship to a U.S. citizen or LPR spouse, parent, or child. If granted, the person gets a green card.",
      es: "Requiere 10 años de presencia física continua, buen carácter moral, y prueba de que la deportación causaría dificultades excepcionales y extremadamente inusuales a un cónyuge, padre/madre o hijo/a ciudadano/a o residente. Si se otorga, la persona obtiene la residencia."
    },
    match: (a) => (a.tenYears && a.uscRelative ? "strong" : a.tenYears || a.uscRelative ? "maybe" : null)
  },
  {
    id: "asylum",
    statute: "INA § 208 / § 241(b)(3) / CAT",
    name: { en: "Asylum, Withholding of Removal & CAT Protection", es: "Asilo, Retención de Deportación y Protección CAT" },
    desc: {
      en: "For people who fear persecution on account of race, religion, nationality, political opinion, or membership in a particular social group — or torture. Asylum generally must be filed within 1 year of arrival (with exceptions), but withholding and CAT have no deadline and remain available even with the 1-year bar. Asylum leads to a green card; all three stop deportation to the country of feared harm.",
      es: "Para personas que temen persecución por raza, religión, nacionalidad, opinión política o pertenencia a un grupo social particular — o tortura. El asilo generalmente debe pedirse dentro de 1 año de la llegada (con excepciones), pero la retención y CAT no tienen plazo y siguen disponibles aun con la barrera de 1 año. El asilo lleva a la residencia; los tres detienen la deportación al país del daño temido."
    },
    match: (a) => (a.fear ? "strong" : null)
  },
  {
    id: "adjustment",
    statute: "INA § 245(a) / § 245(i)",
    name: { en: "Adjustment of Status through a Family Member", es: "Ajuste de Estatus por un Familiar" },
    desc: {
      en: "A U.S. citizen spouse, adult child, or parent (and in some cases an LPR relative) can petition, and with a lawful entry the person may get a green card without leaving the U.S. — even during removal proceedings. Old petitions filed by 4/30/2001 can unlock § 245(i) for people who entered without inspection.",
      es: "Un cónyuge, hijo/a adulto/a o padre/madre ciudadano/a (y en algunos casos un familiar residente) puede pedirte, y con una entrada legal la persona puede obtener la residencia sin salir de EE. UU. — incluso durante el proceso de deportación. Peticiones antiguas presentadas antes del 30/4/2001 pueden activar § 245(i) para quienes entraron sin inspección."
    },
    match: (a) => (a.uscRelative && a.lawfulEntry ? "strong" : a.uscRelative ? "maybe" : null)
  },
  {
    id: "uvisa",
    statute: "INA § 101(a)(15)(U)",
    name: { en: "U Visa (crime victims)", es: "Visa U (víctimas de delitos)" },
    desc: {
      en: "For victims of qualifying crimes who suffered substantial harm and are helpful to law enforcement. Requires a police/prosecutor certification. Pending bona fide U petitions support deferred action, work permits, and strong arguments to pause or close removal proceedings.",
      es: "Para víctimas de delitos calificados que sufrieron daño sustancial y cooperan con las autoridades. Requiere una certificación policial o de la fiscalía. Una petición U de buena fe pendiente apoya acción diferida, permiso de trabajo y argumentos fuertes para pausar o cerrar el proceso de deportación."
    },
    match: (a) => (a.crimeVictim ? "strong" : null)
  },
  {
    id: "vawa",
    statute: "INA § 204(a) / § 240A(b)(2)",
    name: { en: "VAWA Self-Petition / VAWA Cancellation", es: "Auto-petición VAWA / Cancelación VAWA" },
    desc: {
      en: "Survivors of battery or extreme cruelty by a U.S. citizen or LPR spouse or parent can self-petition confidentially (no abuser involvement) or seek a special 3-year cancellation of removal. Applies to all genders.",
      es: "Sobrevivientes de maltrato o crueldad extrema por un cónyuge o padre/madre ciudadano/a o residente pueden auto-peticionar confidencialmente (sin participación del abusador) o pedir una cancelación especial de 3 años. Aplica a todos los géneros."
    },
    match: (a) => (a.abuse ? "strong" : null)
  },
  {
    id: "tps",
    statute: "INA § 244",
    name: { en: "Temporary Protected Status (TPS)", es: "Estatus de Protección Temporal (TPS)" },
    desc: {
      en: "Nationals of designated countries can get protection from removal and a work permit while the designation lasts. Designations and re-registration windows change often — the attorney network verifies current eligibility.",
      es: "Nacionales de países designados pueden obtener protección contra la deportación y permiso de trabajo mientras dure la designación. Las designaciones y ventanas de reinscripción cambian seguido — la red de abogados verifica la elegibilidad actual."
    },
    match: (a) => (a.tpsCountry ? "maybe" : null)
  },
  {
    id: "daca",
    statute: "DACA (policy)",
    name: { en: "DACA (arrived as a child)", es: "DACA (llegó de niño/a)" },
    desc: {
      en: "Deferred Action for Childhood Arrivals has faced litigation that limits new grants, but existing grants/renewals and related arguments (long presence since childhood, education, equities) remain powerful for discretion and bond. Attorney review of the current litigation posture is essential.",
      es: "DACA ha enfrentado litigios que limitan nuevas aprobaciones, pero las renovaciones existentes y los argumentos relacionados (presencia larga desde la niñez, educación, lazos) siguen siendo poderosos para discreción y fianza. Es esencial que un abogado revise el estado actual del litigio."
    },
    match: (a) => (a.childArrival ? "maybe" : null)
  },
  {
    id: "suppress",
    statute: "Motions — 4th/5th Amendment; 8 C.F.R. regs",
    name: { en: "Motion to Suppress / Motion to Terminate (unlawful arrest)", es: "Moción de Supresión / Terminación (arresto ilegal)" },
    desc: {
      en: "If agents entered without consent or a judicial warrant, used egregious racial profiling, or violated regulations, the evidence of alienage may be suppressed and the case terminated. Document everything about the arrest immediately while memories are fresh.",
      es: "Si los agentes entraron sin consentimiento ni orden judicial, usaron perfil racial flagrante o violaron reglamentos, la evidencia puede ser suprimida y el caso terminado. Documenta todo sobre el arresto de inmediato mientras los recuerdos están frescos."
    },
    match: (a) => (a.badArrest ? "strong" : null)
  },
  {
    id: "terminate",
    statute: "Pereira v. Sessions; Niz-Chavez v. Garland",
    name: { en: "Motion to Terminate (defective NTA)", es: "Moción para Terminar (NTA defectuosa)" },
    desc: {
      en: "A Notice to Appear missing the time/place of the hearing or with other defects can support termination of proceedings and can preserve the 10-year clock for cancellation (the 'stop-time rule' requires a compliant NTA).",
      es: "Una Notificación de Comparecencia sin fecha/lugar de audiencia u otros defectos puede apoyar la terminación del proceso y puede preservar el reloj de 10 años para la cancelación (la regla de 'parar el tiempo' requiere una NTA válida)."
    },
    match: (a) => (a.ntaDefect ? "strong" : null)
  },
  {
    id: "pd",
    statute: "Prosecutorial discretion / deferred action",
    name: { en: "Prosecutorial Discretion & Administrative Closure", es: "Discreción Fiscal y Cierre Administrativo" },
    desc: {
      en: "ICE attorneys can agree to dismiss, administratively close, or deprioritize cases with strong equities (long residence, U.S. citizen children, caregiving, medical issues, military family). Availability shifts with policy — the attorney network tracks current guidance and local practice.",
      es: "Los fiscales de ICE pueden aceptar desestimar, cerrar administrativamente o despriorizar casos con lazos fuertes (residencia larga, hijos ciudadanos, cuidado de familiares, temas médicos, familia militar). La disponibilidad cambia con la política — la red de abogados sigue la guía actual y la práctica local."
    },
    match: (a) => (a.equities ? "maybe" : null)
  },
  {
    id: "voluntaryDeparture",
    statute: "INA § 240B",
    name: { en: "Voluntary Departure (last-resort safety net)", es: "Salida Voluntaria (último recurso)" },
    desc: {
      en: "If no other defense succeeds, leaving voluntarily instead of under a removal order avoids the 10-year reentry bar that comes with a removal order and preserves future options. Never accept this without an attorney first checking every other defense above.",
      es: "Si ninguna otra defensa funciona, salir voluntariamente en lugar de bajo orden de deportación evita el castigo de 10 años que trae una orden de deportación y preserva opciones futuras. Nunca la aceptes sin que un abogado revise primero todas las demás defensas."
    },
    match: (a) => (a.inProceedings ? "maybe" : null)
  }
];

// ---------- Libertad: release-from-detention pathways ----------
const BOND_PATHS = [
  {
    id: "bondHearing",
    icon: "⚖️",
    statute: "INA § 236(a); 8 C.F.R. § 1003.19",
    name: { en: "Immigration Bond Hearing", es: "Audiencia de Fianza de Inmigración" },
    desc: {
      en: "Most people detained during removal proceedings can ask the immigration judge for a custody redetermination (bond) at or before the first hearing — no special form is required; you or your lawyer can request it orally or in writing. The judge weighs danger to the community and flight risk. Strong evidence of community ties wins bonds.",
      es: "La mayoría de las personas detenidas durante el proceso pueden pedir al juez de inmigración una audiencia de fianza en o antes de la primera audiencia — no se requiere formulario especial; tú o tu abogado pueden pedirla oral o por escrito. El juez evalúa peligro a la comunidad y riesgo de fuga. La evidencia fuerte de lazos comunitarios gana fianzas."
    }
  },
  {
    id: "joseph",
    icon: "🔍",
    statute: "Matter of Joseph; INA § 236(c)",
    name: { en: "Challenging “Mandatory” Detention (Joseph Hearing)", es: "Impugnar la Detención “Obligatoria” (Audiencia Joseph)" },
    desc: {
      en: "ICE often claims someone is subject to mandatory detention because of a criminal record. You can demand a hearing to show ICE has charged the wrong category — many convictions do not actually trigger § 236(c). If you win, you get a regular bond hearing.",
      es: "ICE a menudo alega que alguien está sujeto a detención obligatoria por antecedentes penales. Puedes exigir una audiencia para demostrar que ICE aplicó la categoría equivocada — muchas condenas en realidad no activan § 236(c). Si ganas, obtienes una audiencia de fianza regular."
    }
  },
  {
    id: "parole",
    icon: "🕊️",
    statute: "INA § 212(d)(5); 8 C.F.R. § 212.5(b)",
    name: { en: "Humanitarian Parole / ICE Custody Review", es: "Parole Humanitario / Revisión de Custodia de ICE" },
    desc: {
      en: "Asylum seekers classified as “arriving aliens” and others who can't get an IJ bond can request release directly from ICE: parole for urgent humanitarian reasons, medical needs, pregnancy, caregiver status, or because the person is not a flight risk/danger. Submit a written parole request with identity documents and a sponsor letter.",
      es: "Los solicitantes de asilo clasificados como “extranjeros que llegan” y otros que no pueden obtener fianza del juez pueden pedir la libertad directamente a ICE: parole por razones humanitarias urgentes, necesidades médicas, embarazo, rol de cuidador/a, o porque la persona no es riesgo de fuga ni peligro. Presenta una solicitud escrita de parole con documentos de identidad y carta de un patrocinador."
    }
  },
  {
    id: "habeas",
    icon: "🏛️",
    statute: "28 U.S.C. § 2241; Zadvydas v. Davis",
    name: { en: "Federal Habeas Corpus (prolonged detention)", es: "Habeas Corpus Federal (detención prolongada)" },
    desc: {
      en: "When detention becomes unreasonably prolonged (often 6+ months) — including after a final removal order when removal is not reasonably foreseeable (Zadvydas) — a habeas petition in federal district court can force a bond hearing or release. This is a powerful tool the attorney network coordinates.",
      es: "Cuando la detención se vuelve excesivamente prolongada (a menudo 6+ meses) — incluso después de una orden final cuando la deportación no es razonablemente previsible (Zadvydas) — una petición de habeas en corte federal puede forzar una audiencia de fianza o la libertad. Es una herramienta poderosa que coordina la red de abogados."
    }
  },
  {
    id: "alternatives",
    icon: "📱",
    statute: "ATD programs",
    name: { en: "Alternatives to Detention (ATD)", es: "Alternativas a la Detención (ATD)" },
    desc: {
      en: "Where full release isn't immediately granted, ask for alternatives: release on recognizance, order of supervision, check-ins, or monitoring — anything that gets the person home with family while the case proceeds. Always frame ATD as the constitutionally adequate, less-restrictive option.",
      es: "Cuando no se otorga la libertad completa de inmediato, pide alternativas: libertad bajo palabra, orden de supervisión, citas de control o monitoreo — cualquier cosa que regrese a la persona a casa con su familia mientras avanza el caso. Siempre presenta ATD como la opción adecuada y menos restrictiva."
    }
  }
];

// Bond evidence packet checklist
const BOND_CHECKLIST = {
  title: { en: "Bond / Parole Evidence Packet — what the family gathers", es: "Paquete de Evidencia para Fianza / Parole — lo que reúne la familia" },
  items: [
    { en: "Sponsor letter: a relative or friend with lawful status offering their address and support, with a copy of their status document and proof of address", es: "Carta del patrocinador: un familiar o amigo con estatus legal que ofrece su dirección y apoyo, con copia de su documento de estatus y comprobante de domicilio" },
    { en: "Proof of family ties: marriage certificate, children's birth certificates (especially U.S. citizen children)", es: "Prueba de lazos familiares: acta de matrimonio, actas de nacimiento de los hijos (especialmente hijos ciudadanos)" },
    { en: "Proof of residence over time: leases, utility bills, mail going back years", es: "Prueba de residencia a través del tiempo: contratos de renta, recibos de servicios, correspondencia de varios años" },
    { en: "Work history: employer letter, pay stubs, tax returns (ITIN filings count and help show good moral character)", es: "Historial de trabajo: carta del empleador, talones de pago, declaraciones de impuestos (las declaraciones con ITIN cuentan y ayudan a mostrar buen carácter moral)" },
    { en: "Community support letters: church, school, neighbors, coaches — signed, with contact info", es: "Cartas de apoyo comunitario: iglesia, escuela, vecinos, entrenadores — firmadas y con datos de contacto" },
    { en: "Medical/hardship evidence: diagnoses or special needs of family members who depend on the detained person", es: "Evidencia médica/de dificultad: diagnósticos o necesidades especiales de familiares que dependen de la persona detenida" },
    { en: "Rehabilitation evidence if there is any criminal record: completion certificates, clean record since, character letters", es: "Evidencia de rehabilitación si hay antecedentes: certificados de programas, récord limpio desde entonces, cartas de carácter" },
    { en: "Certificates: English classes, training, volunteering — anything showing contribution and stability", es: "Certificados: clases de inglés, capacitaciones, voluntariado — todo lo que muestre contribución y estabilidad" }
  ]
};

// ---------- Standard case stages (family portal timeline) ----------
const CASE_STAGES = [
  { en: "Detained / case opened", es: "Detención / caso abierto" },
  { en: "Bond or parole request", es: "Solicitud de fianza o parole" },
  { en: "Master calendar hearing", es: "Audiencia preliminar (master)" },
  { en: "Individual (merits) hearing", es: "Audiencia individual (de fondo)" },
  { en: "Decision / appeal", es: "Decisión / apelación" }
];

// Allow the Node server to reuse the exact same content and matching rules
// the browser uses (single source of truth for legal-content versioning).
if (typeof module !== "undefined" && module.exports) {
  module.exports = { RIGHTS_CARDS, SCREENER_QUESTIONS, RELIEF_OPTIONS, BOND_PATHS, BOND_CHECKLIST, CASE_STAGES };
}
