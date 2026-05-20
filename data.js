// Retention Technologies — Candidate Scoring data
// All data is synthetic, for UI demonstration purposes.

window.DIMENSIONS = [
  { id: 'exp',    short: 'Experiencia',     name: 'Experiencia en venta de seguros',            block: 'Capacidades' },
  { id: 'prosp',  short: 'Prospección',     name: 'Prospección y construcción de cartera',      block: 'Capacidades' },
  { id: 'comm',   short: 'Comunicación',    name: 'Comunicación y asesoría consultiva',         block: 'Capacidades' },
  { id: 'tech',   short: 'Técnico',         name: 'Conocimiento técnico y normativa',           block: 'Capacidades' },
  { id: 'resil',  short: 'Resiliencia',     name: 'Resiliencia y tolerancia al rechazo',        block: 'Rasgos' },
  { id: 'ethic',  short: 'Ética',           name: 'Ética y confiabilidad',                      block: 'Rasgos' },
  { id: 'drive',  short: 'Autogestión',     name: 'Orientación a resultados y autogestión',     block: 'Rasgos' },
  { id: 'fit',    short: 'Fit',             name: 'Fit cultural y proyección',                  block: 'Ajuste' },
];

window.IDEAL   = { exp: 82, prosp: 85, comm: 88, tech: 75, resil: 90, ethic: 95, drive: 88, fit: 80 };
window.AVERAGE = { exp: 58, prosp: 54, comm: 62, tech: 55, resil: 51, ethic: 72, drive: 61, fit: 60 };

window.STAGE_EXPLAIN = {
  cv: { label: 'Análisis de CV', weight: 25 },
  interview: { label: 'Entrevista', weight: 45 },
  psico: { label: 'Psicotécnico', weight: 30 },
};

// ---- Candidates (20) ----
// stage: 0=CV sólo, 1=CV+Entrevista, 2=+Psicotécnico, 3=Completo
window.CANDIDATES = [
  {
    id: 'c1', name: 'María Camila Restrepo', initials: 'MC', city: 'Medellín',
    exp_years: 6, prev: 'Sura · Asesora Senior', stage: 3, score: 89, tier: 'strong',
    stageScores: { cv: 86, interview: 91, psico: 88 },
    scores: { exp: 92, prosp: 88, comm: 94, tech: 80, resil: 87, ethic: 95, drive: 90, fit: 84 },
    summary: 'Perfil senior, fuerte en asesoría consultiva y compliance. Resultados consistentes sobre meta en Sura (118% promedio últimos 3 años). Recomendada para siguiente fase de decisión.',
    factorsPos: [
      { id:'exp', title:'6 años en Sura, ramo vida y salud', delta:'+11', src:'CV', body:'Trayectoria continua en aseguradora top, con promociones verticales documentadas.' },
      { id:'comm', title:'Analogía clara de deducibles en entrevista', delta:'+8', src:'Entrevista', body:'Usó el ejemplo del "copago como peaje" de forma espontánea — indicador fuerte de pedagogía real.' },
      { id:'ethic', title:'Rechazó caso con conflicto de interés', delta:'+7', src:'Entrevista · Psicotécnico', body:'Optó por no vender póliza innecesaria aun perdiendo comisión. Test de integridad confirma patrón.' },
    ],
    factorsNeg: [
      { id:'tech', title:'No mencionó Circular 029 al hablar de SARLAFT', delta:'−4', src:'Entrevista' },
      { id:'fit', title:'Expectativa salarial 18% sobre banda', delta:'−3', src:'CV · Entrevista' },
    ],
  },
  {
    id: 'c2', name: 'Andrés Felipe Quintero', initials: 'AQ', city: 'Bogotá',
    exp_years: 3, prev: 'Bancolombia · Asesor Créditos', stage: 3, score: 76, tier: 'strong',
    stageScores: { cv: 71, interview: 82, psico: 74 },
    scores: { exp: 62, prosp: 81, comm: 85, tech: 58, resil: 84, ethic: 82, drive: 79, fit: 78 },
    summary: 'Viene de productos financieros. Alto potencial comercial pero requiere plan de onboarding técnico de 3-4 semanas.',
    factorsPos: [
      { id:'comm', title:'Técnica SPIN verbalizada sin prompt', delta:'+7', src:'Entrevista' },
      { id:'prosp', title:'Generó 40% de su cartera por referidos', delta:'+6', src:'CV' },
    ],
    factorsNeg: [
      { id:'exp', title:'Sin experiencia en ramo de seguros', delta:'−12', src:'CV' },
      { id:'tech', title:'Confundió vida individual con colectivo', delta:'−6', src:'Entrevista' },
    ],
  },
  {
    id: 'c3', name: 'Laura Sofía Patiño', initials: 'LP', city: 'Cali',
    exp_years: 4, prev: 'Liberty Seguros · Asesora', stage: 3, score: 81, tier: 'strong',
    stageScores: { cv: 79, interview: 78, psico: 86 },
    scores: { exp: 80, prosp: 72, comm: 79, tech: 76, resil: 92, ethic: 90, drive: 83, fit: 74 },
    summary: 'Perfil sólido con excelente resiliencia (percentil 94 en test). Comunicación correcta pero no sobresaliente.',
    factorsPos: [
      { id:'resil', title:'Percentil 94 en tolerancia al rechazo', delta:'+10', src:'Psicotécnico' },
      { id:'ethic', title:'Sin marcas en polígrafo conductual', delta:'+6', src:'Psicotécnico' },
    ],
    factorsNeg: [
      { id:'comm', title:'Respuestas estructurales, poca narrativa', delta:'−4', src:'Entrevista' },
    ],
  },
  {
    id: 'c4', name: 'Juan Pablo Ossa', initials: 'JP', city: 'Barranquilla',
    exp_years: 2, prev: 'Falabella Financiero · Ventas', stage: 2, score: 64, tier: 'review',
    stageScores: { cv: 62, interview: 67, psico: null },
    scores: { exp: 48, prosp: 68, comm: 72, tech: 44, resil: 70, ethic: 75, drive: 68, fit: 66 },
    summary: 'Pendiente test psicotécnico. CV correcto pero junior para la posición.',
    factorsPos: [{ id:'comm', title:'Energía natural en role-play', delta:'+5', src:'Entrevista' }],
    factorsNeg: [
      { id:'exp', title:'Solo 2 años, sin seguros', delta:'−10', src:'CV' },
      { id:'tech', title:'No conoce diferencia SOAT / Todo Riesgo', delta:'−9', src:'Entrevista' },
    ],
  },
  {
    id: 'c5', name: 'Natalia Gómez Ruiz', initials: 'NG', city: 'Bogotá',
    exp_years: 8, prev: 'Allianz · Ejecutiva Cuenta', stage: 3, score: 84, tier: 'strong',
    stageScores: { cv: 90, interview: 81, psico: 80 },
    scores: { exp: 90, prosp: 70, comm: 86, tech: 88, resil: 74, ethic: 89, drive: 82, fit: 79 },
    summary: 'Perfil técnico muy fuerte, con 8 años cross-ramo. Menor puntaje en resiliencia.',
    factorsPos: [
      { id:'tech', title:'Dominio de reaseguro facultativo', delta:'+11', src:'CV · Entrevista' },
      { id:'exp', title:'Cartera heredable ~$480M prima', delta:'+9', src:'CV' },
    ],
    factorsNeg: [
      { id:'resil', title:'Puntaje medio en tolerancia a estrés', delta:'−5', src:'Psicotécnico' },
      { id:'prosp', title:'Más "farmer" que "hunter"', delta:'−4', src:'Entrevista' },
    ],
  },
  {
    id: 'c6', name: 'Carlos Mario Jiménez', initials: 'CJ', city: 'Medellín',
    exp_years: 1, prev: 'Claro · Vendedor Pospago', stage: 1, score: 42, tier: 'weak',
    stageScores: { cv: 42, interview: null, psico: null },
    scores: { exp: 25, prosp: 50, comm: 58, tech: 22, resil: 60, ethic: 65, drive: 55, fit: 48 },
    summary: 'No pasa primer filtro. Perfil junior, sin experiencia en sector financiero ni seguros.',
    factorsPos: [],
    factorsNeg: [
      { id:'exp', title:'Cero experiencia en seguros', delta:'−18', src:'CV' },
      { id:'tech', title:'Sin formación técnica afín', delta:'−11', src:'CV' },
    ],
  },
  {
    id: 'c7', name: 'Diana Marcela Vélez', initials: 'DV', city: 'Bucaramanga',
    exp_years: 5, prev: 'Seguros Bolívar · Asesora', stage: 3, score: 78, tier: 'strong',
    stageScores: { cv: 77, interview: 79, psico: 78 },
    scores: { exp: 84, prosp: 76, comm: 80, tech: 72, resil: 76, ethic: 88, drive: 74, fit: 76 },
    summary: 'Perfil balanceado. Sin destacadas pero sin flags. Candidata sólida de reserva.',
    factorsPos: [{ id:'exp', title:'5 años consecutivos en Bolívar', delta:'+6', src:'CV' }],
    factorsNeg: [{ id:'drive', title:'Meta anual cumplida 2 de 4 años', delta:'−5', src:'CV · Entrevista' }],
  },
  {
    id: 'c8', name: 'Santiago Morales Díaz', initials: 'SM', city: 'Cali',
    exp_years: 7, prev: 'Colsanitas · Ejecutivo Comercial', stage: 3, score: 69, tier: 'review',
    stageScores: { cv: 80, interview: 62, psico: 65 },
    scores: { exp: 78, prosp: 60, comm: 62, tech: 70, resil: 55, ethic: 58, drive: 72, fit: 68 },
    summary: 'CV fuerte contrasta con entrevista floja. Inconsistencias detectadas entre logros declarados y respuestas STAR.',
    factorsPos: [{ id:'exp', title:'7 años en salud prepagada', delta:'+7', src:'CV' }],
    factorsNeg: [
      { id:'ethic', title:'Inconsistencia CV vs entrevista en cifras', delta:'−11', src:'CV · Entrevista', body:'CV afirma 140% de meta; no pudo explicar composición del logro.' },
      { id:'resil', title:'Respuestas evasivas a fracasos', delta:'−7', src:'Entrevista' },
    ],
  },
  {
    id: 'c9', name: 'Valentina Cárdenas', initials: 'VC', city: 'Medellín',
    exp_years: 3, prev: 'Mapfre · Asesora Junior', stage: 3, score: 74, tier: 'strong',
    stageScores: { cv: 72, interview: 76, psico: 74 },
    scores: { exp: 68, prosp: 78, comm: 80, tech: 66, resil: 75, ethic: 84, drive: 76, fit: 78 },
    summary: 'Junior con potencial. Energía alta, bien estructurada. Perfil "inversión" más que "hire" inmediato.',
    factorsPos: [
      { id:'comm', title:'Preguntas consultivas naturales', delta:'+7', src:'Entrevista' },
      { id:'fit', title:'Plan de carrera claro a 3 años', delta:'+6', src:'Entrevista' },
    ],
    factorsNeg: [{ id:'tech', title:'Ramo limitado (solo autos)', delta:'−5', src:'CV' }],
  },
  {
    id: 'c10', name: 'Ricardo León Mejía', initials: 'RL', city: 'Bogotá',
    exp_years: 12, prev: 'Independiente · Agente', stage: 0, score: null, tier: 'pending',
    stageScores: { cv: null, interview: null, psico: null },
    scores: {},
    summary: 'Recibido hace 2 horas. Pendiente primer análisis.',
    factorsPos: [], factorsNeg: [],
  },
  // ---- 10 más ----
  {
    id: 'c11', name: 'Felipe Escobar Ruiz', initials: 'FE', city: 'Bogotá',
    exp_years: 4, prev: 'AXA Colpatria · Asesor', stage: 3, score: 82, tier: 'strong',
    stageScores: { cv: 80, interview: 85, psico: 80 },
    scores: { exp: 78, prosp: 84, comm: 82, tech: 74, resil: 82, ethic: 88, drive: 86, fit: 80 },
    summary: 'Perfil hunter con 4 años consistentes. Cartera propia de 52 clientes activos.',
    factorsPos: [
      { id:'prosp', title:'Pipeline propio de 52 clientes activos', delta:'+8', src:'CV' },
      { id:'drive', title:'Rutinas CRM documentadas', delta:'+5', src:'Entrevista' },
    ],
    factorsNeg: [
      { id:'tech', title:'Conocimiento ligero en vida grupo', delta:'−4', src:'Entrevista' },
    ],
  },
  {
    id: 'c12', name: 'Paola Andrea Hincapié', initials: 'PH', city: 'Medellín',
    exp_years: 5, prev: 'Seguros del Estado · Senior', stage: 3, score: 79, tier: 'strong',
    stageScores: { cv: 81, interview: 77, psico: 79 },
    scores: { exp: 82, prosp: 74, comm: 78, tech: 80, resil: 80, ethic: 86, drive: 78, fit: 76 },
    summary: 'Perfil estable, técnicamente sólido. Evaluación cerrada sin flags.',
    factorsPos: [
      { id:'tech', title:'Certificación FASECOLDA vigente', delta:'+6', src:'CV' },
      { id:'ethic', title:'Referencias laborales sobresalientes', delta:'+5', src:'CV' },
    ],
    factorsNeg: [{ id:'comm', title:'Estilo expositivo, poca indagación', delta:'−4', src:'Entrevista' }],
  },
  {
    id: 'c13', name: 'Jorge Iván Castaño', initials: 'JC', city: 'Cali',
    exp_years: 9, prev: 'Previsora · Senior Autos', stage: 2, score: 71, tier: 'review',
    stageScores: { cv: 78, interview: 66, psico: null },
    scores: { exp: 84, prosp: 64, comm: 62, tech: 76, resil: 66, ethic: 78, drive: 70, fit: 68 },
    summary: 'Mucha trayectoria en un solo ramo. Entrevista reveló bajo apetito por cambio. Pendiente psicotécnico.',
    factorsPos: [{ id:'exp', title:'9 años en ramo autos', delta:'+7', src:'CV' }],
    factorsNeg: [
      { id:'fit', title:'Resistente a cambio de proceso comercial', delta:'−8', src:'Entrevista' },
      { id:'comm', title:'Respuestas cerradas, no consulta', delta:'−5', src:'Entrevista' },
    ],
  },
  {
    id: 'c14', name: 'Alejandra Ruiz Posada', initials: 'AR', city: 'Bogotá',
    exp_years: 2, prev: 'Positiva · Asesora Junior', stage: 2, score: 68, tier: 'review',
    stageScores: { cv: 65, interview: 72, psico: null },
    scores: { exp: 52, prosp: 72, comm: 78, tech: 56, resil: 76, ethic: 82, drive: 72, fit: 74 },
    summary: 'Junior con buena actitud. Necesita acompañamiento técnico. Psicotécnico agendado mañana.',
    factorsPos: [
      { id:'comm', title:'Buen manejo de objeciones simuladas', delta:'+6', src:'Entrevista' },
      { id:'fit', title:'Alineada con cultura de la organización', delta:'+5', src:'Entrevista' },
    ],
    factorsNeg: [{ id:'tech', title:'Formación técnica básica', delta:'−7', src:'CV' }],
  },
  {
    id: 'c15', name: 'Miguel Ángel Vargas', initials: 'MV', city: 'Barranquilla',
    exp_years: 6, prev: 'MetLife · Asesor Vida', stage: 1, score: 72, tier: 'review',
    stageScores: { cv: 72, interview: null, psico: null },
    scores: { exp: 80, prosp: 70, comm: 68, tech: 78, resil: 64, ethic: 80, drive: 72, fit: 68 },
    summary: 'CV aprobado. Entrevista pendiente esta semana. Especialista en vida individual.',
    factorsPos: [
      { id:'exp', title:'6 años especializado en vida individual', delta:'+7', src:'CV' },
      { id:'tech', title:'Diplomado actuarial básico', delta:'+4', src:'CV' },
    ],
    factorsNeg: [{ id:'resil', title:'Alta rotación en empleadores', delta:'−5', src:'CV' }],
  },
  {
    id: 'c16', name: 'Sara Ximena Ospina', initials: 'SO', city: 'Medellín',
    exp_years: 1, prev: 'Davivienda · Asesora Integral', stage: 1, score: 58, tier: 'review',
    stageScores: { cv: 58, interview: null, psico: null },
    scores: { exp: 40, prosp: 62, comm: 70, tech: 45, resil: 68, ethic: 78, drive: 66, fit: 70 },
    summary: 'Muy junior. CV pasó filtro por ethics y perfil "hunter" potencial. Entrevista agendada.',
    factorsPos: [{ id:'ethic', title:'Sin marcas en antecedentes', delta:'+5', src:'CV' }],
    factorsNeg: [
      { id:'exp', title:'Solo 1 año, no seguros', delta:'−13', src:'CV' },
      { id:'tech', title:'Sin formación específica', delta:'−8', src:'CV' },
    ],
  },
  {
    id: 'c17', name: 'Daniel Esteban Torres', initials: 'DT', city: 'Bogotá',
    exp_years: 4, prev: 'Colmena · Asesor Salud', stage: 1, score: 75, tier: 'strong',
    stageScores: { cv: 75, interview: null, psico: null },
    scores: { exp: 72, prosp: 76, comm: 74, tech: 72, resil: 80, ethic: 82, drive: 78, fit: 74 },
    summary: 'CV sólido, en espera de entrevista. Especialista en salud prepagada, cross-venta de vida.',
    factorsPos: [
      { id:'exp', title:'4 años en salud prepagada', delta:'+6', src:'CV' },
      { id:'drive', title:'Cumplimiento 108% promedio 3 años', delta:'+7', src:'CV' },
    ],
    factorsNeg: [{ id:'tech', title:'Falta formación en ramo patrimonial', delta:'−4', src:'CV' }],
  },
  {
    id: 'c18', name: 'Mónica Stella Arango', initials: 'MA', city: 'Cali',
    exp_years: 10, prev: 'Chubb · Ejecutiva Senior', stage: 0, score: null, tier: 'pending',
    stageScores: { cv: null, interview: null, psico: null },
    scores: {},
    summary: 'Aplicación recibida hace 4h. Primera pasada de CV en cola.',
    factorsPos: [], factorsNeg: [],
  },
  {
    id: 'c19', name: 'Kevin Alexander Mora', initials: 'KM', city: 'Bogotá',
    exp_years: 2, prev: 'Rappi · Ventas B2B', stage: 0, score: null, tier: 'pending',
    stageScores: { cv: null, interview: null, psico: null },
    scores: {},
    summary: 'Recibido ayer. CV en cola de análisis automático.',
    factorsPos: [], factorsNeg: [],
  },
  {
    id: 'c20', name: 'Isabella Franco Duque', initials: 'IF', city: 'Medellín',
    exp_years: 7, prev: 'HDI Seguros · Senior', stage: 0, score: null, tier: 'pending',
    stageScores: { cv: null, interview: null, psico: null },
    scores: {},
    summary: 'Aplicación recibida hace 1h. Pendiente análisis inicial.',
    factorsPos: [], factorsNeg: [],
  },
];

// --- Evidence builders ---
// All transcripts / CV extracts / psico data are indexed by candidate id.

// Curated data for c1 stays hand-written below.
window.TRANSCRIPTS = {};
window.CV_EXTRACTS = {};
window.PSICO = {};
window.DIM_STAGE = {};

window.TRANSCRIPTS.c1 = {
  comm: [
    { t:'14:23', who:'Entrevistador', role:'int', text:'¿Cómo le explicas a un cliente que no entiende la diferencia entre deducible y copago?' },
    { t:'14:23', who:'María Camila', role:'cand', text:'Le digo que el deducible es como la franquicia del taller — lo que pone usted antes de que la aseguradora responda. El copago es como el peaje: cada vez que usa el servicio paga una fracción pequeña.', highlight:'good' },
    { t:'14:25', who:'María Camila', role:'cand', text:'No manejo la objeción "caro", la entiendo primero. El "caro" casi nunca es sobre el precio, es sobre el valor percibido.', highlight:'good' },
  ],
  exp: [
    { t:'08:12', who:'María Camila', role:'cand', text:'Entré hace 6 años como asesora junior en autos. A los 18 meses me ascendieron a senior y me movieron a vida y salud. Los últimos 3 años he estado 118% sobre meta en promedio.' },
    { t:'08:14', who:'María Camila', role:'cand', text:'He llevado cartera pyme con ticket promedio de 4.2M mensuales en prima. Renovación en 89%, 11 puntos sobre el promedio del equipo.', highlight:'good' },
  ],
  ethic: [
    { t:'32:08', who:'Entrevistador', role:'int', text:'Cliente mayor que no necesita póliza de vida con ahorro, pero te deja 3x más comisión que la que le conviene. ¿Qué haces?' },
    { t:'32:18', who:'María Camila', role:'cand', text:'Le vendo la que le conviene y se lo explico claro: "yo gano más con la otra, pero esta es la que usted necesita".', highlight:'good' },
    { t:'32:32', who:'María Camila', role:'cand', text:'Me ha pasado tres veces. Una con un cliente que después me trajo cuatro referidos. La honestidad es comercial, no solo ética.', highlight:'good' },
  ],
  tech: [
    { t:'21:45', who:'Entrevistador', role:'int', text:'¿Qué obligaciones aplican bajo SARLAFT al emitir póliza a persona jurídica?' },
    { t:'21:52', who:'María Camila', role:'cand', text:'Debido conocimiento del cliente, verificación en listas vinculantes, identificación de beneficiario final y monitoreo de operaciones inusuales.' },
    { t:'22:12', who:'María Camila', role:'cand', text:'La Circular Básica Jurídica, Parte I Título IV. No recuerdo el número específico de la circular externa más reciente.', highlight:'bad' },
  ],
  resil: [
    { t:'45:08', who:'María Camila', role:'cand', text:'Q2 2023. Perdí 22% de mi cartera en ocho semanas por fusiones de los clientes. Lo primero fue no entrar en pánico y reorganizar pipeline.' },
    { t:'45:35', who:'María Camila', role:'cand', text:'Hice 40 llamadas diarias de prospección por 6 semanas. Recuperé 70% del volumen antes de Q4. Salí del año 102% sobre meta.', highlight:'good' },
  ],
  prosp: [
    { t:'18:08', who:'María Camila', role:'cand', text:'Tres canales. Referidos: pido dos nombres al cierre de cada venta. LinkedIn: 20 mensajes nuevos semanales a contadores y gerentes pyme. Eventos: 3 al mes mínimo.' },
  ],
  drive: [
    { t:'52:18', who:'María Camila', role:'cand', text:'Lunes reviso el CRM, bloqueo llamadas martes y jueves, visitas miércoles y viernes. Pipeline review yo sola los domingos, 30 minutos.' },
  ],
  fit: [
    { t:'58:25', who:'María Camila', role:'cand', text:'Liderando un equipo de 8 a 10 asesores. No quiero dejar la venta, quiero multiplicarla con gente a la que yo forme.' },
  ],
};

window.CV_EXTRACTS.c1 = {
  exp: { title:'Experiencia relevante · CV', body:`<h5>Sura Seguros · Asesora Senior (2020–presente)</h5><ul><li><mark>118% cumplimiento de meta</mark> promedio anual</li><li>Cartera pyme: <mark>~$480M en prima anualizada</mark>, 62 clientes activos</li><li>Renovación 89% vs. 78% promedio equipo</li></ul>`},
  tech: { title:'Formación técnica · CV', body:`<ul><li>Profesional en Finanzas — EAFIT</li><li><mark>Certificación de Idoneidad FASECOLDA</mark> — vigente</li><li>Diplomado en Reaseguros — INESE (2022)</li></ul>`},
  ethic: { title:'Señales de integridad · CV', body:`<ul><li>6 años continuos en empleador único</li><li>Sin marcas en antecedentes</li><li><mark>Reconocimiento "Asesor Íntegro" Sura</mark> (2023)</li></ul>`},
  comm: { title:'Soporte a comunicación · CV', body:`<ul><li>NPS cliente: <mark>72</mark> (n=41)</li><li>Ponente interna de talleres de objeciones</li></ul>`},
  resil: { title:'Evidencia en CV', body:`<ul><li>Q2 2023: recuperación de 70% de cartera perdida en 1 trimestre</li></ul>`},
  prosp: { title:'Prospección · CV', body:`<ul><li>40% de cartera por referidos generados</li></ul>`},
  drive: { title:'Autogestión · CV', body:`<ul><li>Cumplimiento de meta 5 de 6 últimos años</li></ul>`},
  fit:   { title:'Proyección · CV', body:`<ul><li>Interés en liderazgo declarado en carta motivacional</li></ul>`},
};

window.PSICO.c1 = {
  resil: [
    { name:'Tolerancia al rechazo', score:91, ideal:85 },
    { name:'Regulación emocional',  score:84, ideal:75 },
    { name:'Recuperación tras fracaso', score:86, ideal:80 },
    { name:'Optimismo disposicional',   score:79, ideal:70 },
  ],
  ethic: [
    { name:'Integridad situacional',    score:96, ideal:90 },
    { name:'Consistencia de respuesta', score:94, ideal:85 },
    { name:'Detección de sesgos',       score:88, ideal:80 },
  ],
  comm: [
    { name:'Razonamiento verbal',       score:90, ideal:80 },
    { name:'Empatía cognitiva',         score:93, ideal:85 },
    { name:'Escucha activa (simulación)', score:89, ideal:82 },
  ],
  drive: [
    { name:'Orientación al logro',      score:88, ideal:85 },
    { name:'Autorregulación',           score:86, ideal:80 },
    { name:'Persistencia',              score:91, ideal:82 },
  ],
  exp:   [{ name:'N/A — no medido por psicotécnico', score:0, ideal:0 }],
  prosp: [{ name:'Iniciativa social', score:82, ideal:75 }, { name:'Sociabilidad', score:78, ideal:70 }],
  tech:  [{ name:'Razonamiento numérico', score:77, ideal:72 }, { name:'Razonamiento abstracto', score:81, ideal:70 }],
  fit:   [{ name:'Valores declarados', score:84, ideal:78 }, { name:'Ajuste cultural', score:80, ideal:75 }],
};

window.DIM_STAGE.c1 = {
  exp:   { cv:92, interview:90, psico:null, note:'Consistencia alta entre CV y detalles dados espontáneamente en entrevista.' },
  prosp: { cv:85, interview:92, psico:82,   note:'Metodología concreta, respaldada por resultados en CV.' },
  comm:  { cv:88, interview:95, psico:91,   note:'Sobresaliente en entrevista. Analogías espontáneas y manejo consultivo de objeciones.' },
  tech:  { cv:85, interview:72, psico:79,   note:'Base sólida, gap en normativa reciente (Circular específica). Recuperable.' },
  resil: { cv:82, interview:88, psico:85,   note:'Caso real de recuperación narrado con concreción. Alineado con perfil psicotécnico.' },
  ethic: { cv:90, interview:96, psico:94,   note:'Respuesta a dilema ética y comercialmente razonada. Percentil alto en test.' },
  drive: { cv:88, interview:90, psico:88,   note:'Rutinas propias de gestión de pipeline descritas con detalle.' },
  fit:   { cv:76, interview:88, psico:82,   note:'Aspiración de liderazgo alineada con trayectoria típica en la organización.' },
};

// --- Generators for the rest ---
const DIM_IDS = ['exp','prosp','comm','tech','resil','ethic','drive','fit'];

function tierLabel(stageScore) {
  if (stageScore == null) return null;
  if (stageScore >= 80) return 'sobresaliente';
  if (stageScore >= 70) return 'sobre meta';
  if (stageScore >= 60) return 'bajo meta';
  return 'muy bajo';
}

function buildGenericTranscript(c) {
  if (c.stage < 1) return {};
  const out = {};
  const firstName = c.name.split(' ')[0];
  const sample = {
    exp: [
      { who:'Entrevistador', role:'int', text:`Cuéntame tu trayectoria reciente.` },
      { who:firstName, role:'cand', text:`Vengo de ${c.prev}. Son ${c.exp_years} años en el sector. Mi cartera actual es de tamaño medio y he llevado principalmente productos ${c.scores.exp>=70?'patrimoniales y vida':'de su ramo actual'}.` },
    ],
    prosp: [
      { who:'Entrevistador', role:'int', text:'¿Cómo generas nuevos prospectos?' },
      { who:firstName, role:'cand', text:`Combino referidos de clientes existentes con ${c.scores.prosp>=70?'prospección digital activa vía LinkedIn':'la base que entrega la empresa'}. ${c.scores.prosp>=75?'Mantengo métricas semanales propias.':''}`, highlight: c.scores.prosp>=78?'good':(c.scores.prosp<55?'bad':undefined) },
    ],
    comm: [
      { who:'Entrevistador', role:'int', text:'Cuéntame cómo manejas la objeción "está muy caro".' },
      { who:firstName, role:'cand', text: c.scores.comm>=78
        ? 'Primero entiendo qué significa caro para el cliente — caro comparado con qué. La conversación casi nunca es sobre precio, es sobre valor percibido.'
        : 'Le explico los beneficios de la póliza y comparo con opciones de la competencia.', highlight: c.scores.comm>=82?'good':(c.scores.comm<60?'bad':undefined) },
    ],
    tech: [
      { who:'Entrevistador', role:'int', text:'¿Qué sabes sobre las obligaciones bajo SARLAFT?' },
      { who:firstName, role:'cand', text: c.scores.tech>=72
        ? 'Debido conocimiento del cliente, listas vinculantes, beneficiario final y monitoreo de operaciones inusuales. Los umbrales varían por ramo.'
        : 'Sé que hay que identificar al cliente y reportar operaciones sospechosas. No manejo los detalles regulatorios.', highlight: c.scores.tech<55?'bad':undefined },
    ],
    resil: [
      { who:'Entrevistador', role:'int', text:'Cuéntame el peor trimestre que hayas tenido.' },
      { who:firstName, role:'cand', text: c.scores.resil>=75
        ? 'Un trimestre con caída fuerte de cartera por temas de mercado. Reorganicé pipeline y recuperé el volumen en el siguiente trimestre con prospección intensiva.'
        : 'He tenido periodos bajos. Suelo apoyarme en los leads que entrega la empresa para estabilizar resultados.', highlight: c.scores.resil>=82?'good':undefined },
    ],
    ethic: [
      { who:'Entrevistador', role:'int', text:'Caso hipotético: póliza que paga 3x más comisión pero no es la que le conviene al cliente. ¿Qué haces?' },
      { who:firstName, role:'cand', text: c.scores.ethic>=80
        ? 'Le vendo la que le conviene y se lo explico. La honestidad es rentable a mediano plazo.'
        : 'Le presento las dos opciones y que el cliente decida con la información en la mano.', highlight: c.scores.ethic>=85?'good':(c.scores.ethic<65?'bad':undefined) },
    ],
    drive: [
      { who:'Entrevistador', role:'int', text:'¿Cómo organizas tu semana?' },
      { who:firstName, role:'cand', text: c.scores.drive>=75
        ? 'Bloqueos fijos en calendario — llamadas los martes y jueves, visitas miércoles y viernes. Revisión de pipeline los domingos.'
        : 'Me adapto a la agenda del equipo y a las instrucciones del jefe directo.', highlight: c.scores.drive>=82?'good':undefined },
    ],
    fit: [
      { who:'Entrevistador', role:'int', text:'¿Dónde te ves en 5 años?' },
      { who:firstName, role:'cand', text: c.scores.fit>=75
        ? 'Creciendo dentro de la organización, idealmente liderando un equipo pequeño.'
        : 'Consolidándome en la posición y aportando valor al equipo.' },
    ],
  };
  DIM_IDS.forEach(d => {
    out[d] = sample[d].map(x => ({ ...x, t: (8 + DIM_IDS.indexOf(d)*6 + Math.round(Math.random()*3)) + ':' + String(Math.round(Math.random()*59)).padStart(2,'0') }));
  });
  return out;
}

function buildGenericCV(c) {
  const out = {};
  DIM_IDS.forEach(d => {
    const v = c.scores[d] || 0;
    const title = `${window.DIMENSIONS.find(x=>x.id===d).name} · CV`;
    if (d === 'exp') {
      out[d] = { title, body:`<h5>${c.prev} (últimos ${c.exp_years} años)</h5><ul><li>Trayectoria ${v>=75?'destacada':v>=60?'estable':'limitada'} con cartera ${v>=70?'propia y renovaciones sostenidas':'en construcción'}.</li>${v>=75?'<li><mark>Cumplimiento consistente de meta</mark> los últimos años.</li>':''}</ul>` };
    } else if (d === 'tech') {
      out[d] = { title, body:`<ul>${v>=70?'<li><mark>Certificación FASECOLDA</mark> vigente</li>':''}<li>${v>=65?'Formación técnica en ramos afines':'Formación técnica básica, recuperable con inducción'}.</li></ul>` };
    } else if (d === 'ethic') {
      out[d] = { title, body:`<ul><li>${v>=75?'Sin marcas en consulta de antecedentes':'Consulta de antecedentes en proceso'}.</li>${v>=80?'<li><mark>Referencias laborales sobresalientes</mark>.</li>':''}</ul>` };
    } else if (d === 'prosp') {
      out[d] = { title, body:`<ul><li>${v>=72?'Generación propia de prospectos documentada en reportes':'Trabaja principalmente con leads asignados'}.</li></ul>` };
    } else if (d === 'resil') {
      out[d] = { title, body:`<ul><li>${v>=75?'Estabilidad laboral alta, sin licencias extraordinarias':'Historial laboral con cierta rotación'}.</li></ul>` };
    } else if (d === 'drive') {
      out[d] = { title, body:`<ul><li>${v>=75?'Cumplimiento de meta en 4 de últimos 5 años':'Cumplimiento de meta irregular en historial reciente'}.</li></ul>` };
    } else if (d === 'comm') {
      out[d] = { title, body:`<ul><li>${v>=75?'NPS personal sobre 60 en último reporte':'No hay métrica directa de NPS disponible'}.</li></ul>` };
    } else {
      out[d] = { title, body:`<ul><li>${v>=75?'Plan de carrera alineado con la organización':'Proyección profesional en construcción'}.</li></ul>` };
    }
  });
  return out;
}

function buildGenericPsico(c) {
  if (c.stage < 2 || c.stageScores.psico == null) return null;
  const out = {};
  const v = c.scores;
  const mkSub = (base, names) => names.map(n => {
    const jitter = Math.round((Math.random()-0.5)*10);
    return { name: n, score: Math.max(0, Math.min(100, base + jitter)), ideal: Math.max(0, base - 5) };
  });
  out.resil = mkSub(v.resil || 60, ['Tolerancia al rechazo','Regulación emocional','Recuperación tras fracaso']);
  out.ethic = mkSub(v.ethic || 70, ['Integridad situacional','Consistencia de respuesta','Detección de sesgos']);
  out.comm  = mkSub(v.comm || 65,  ['Razonamiento verbal','Empatía cognitiva','Escucha activa']);
  out.drive = mkSub(v.drive || 65, ['Orientación al logro','Autorregulación','Persistencia']);
  out.prosp = mkSub(v.prosp || 60, ['Iniciativa social','Sociabilidad']);
  out.tech  = mkSub(v.tech || 55,  ['Razonamiento numérico','Razonamiento abstracto']);
  out.fit   = mkSub(v.fit || 65,   ['Valores declarados','Ajuste cultural']);
  out.exp   = [{ name:'N/A — no medido por psicotécnico', score:0, ideal:0 }];
  return out;
}

function buildGenericDimStage(c) {
  const out = {};
  DIM_IDS.forEach(d => {
    const base = c.scores[d] || 0;
    const cv = c.stage>=0 && c.stageScores.cv!=null ? Math.max(0, Math.min(100, base + Math.round((Math.random()-0.5)*8))) : null;
    const interview = c.stage>=1 && c.stageScores.interview!=null ? Math.max(0, Math.min(100, base + Math.round((Math.random()-0.5)*10))) : null;
    const psico = c.stage>=2 && c.stageScores.psico!=null && d!=='exp' ? Math.max(0, Math.min(100, base + Math.round((Math.random()-0.5)*8))) : null;
    let note;
    if (cv!=null && interview!=null) {
      const diff = Math.abs(cv - interview);
      note = diff<5
        ? 'Consistencia entre CV y entrevista.'
        : (cv > interview ? 'CV declara más de lo que soporta la entrevista.' : 'Entrevista refuerza lo declarado en CV.');
    } else if (cv!=null) {
      note = 'Primera lectura de CV. A confirmar en entrevista.';
    } else {
      note = 'Pendiente de análisis.';
    }
    out[d] = { cv, interview, psico, note };
  });
  return out;
}

// Populate for all candidates except c1 (already hand-written)
window.CANDIDATES.forEach(c => {
  if (c.id === 'c1') return;
  if (!window.TRANSCRIPTS[c.id]) window.TRANSCRIPTS[c.id] = buildGenericTranscript(c);
  if (!window.CV_EXTRACTS[c.id]) window.CV_EXTRACTS[c.id] = c.stage>=0 ? buildGenericCV(c) : {};
  if (!window.PSICO[c.id])       window.PSICO[c.id]       = buildGenericPsico(c);
  if (!window.DIM_STAGE[c.id])   window.DIM_STAGE[c.id]   = buildGenericDimStage(c);
});
