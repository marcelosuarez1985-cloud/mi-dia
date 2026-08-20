// ═══════════════════════════════════════════════════════════
//  Programa de clases 2026 — Escuela de Coaching Ontológico
//  Fuente: planilla "Coordinacion_Staff_Delfos_Flacso_2026"
//  Cada fila: [fecha, sede, unidad-clase, tema, responsable]
//
//  Sedes:  D1 = Delfos (Recoleta) 1er año   jueves 19:00–22:00
//          D2 = Delfos (Recoleta) 2do año   jueves 19:00–22:00
//          FL = FLACSO (Recoleta) 1er año   jueves 18:30–21:00
//          VP = Villa del Parque 1er año    miércoles 19:00–22:00
//          PC = Parque Chacabuco 1er año    sábados 09:00–12:00
// ═══════════════════════════════════════════════════════════

const YO = 'MARCE';

const SEDES = {
  D1: { nombre: 'Delfos (Recoleta)', detalle: '1er año', hora: '19:00–22:00' },
  D2: { nombre: 'Delfos (Recoleta)', detalle: '2do año', hora: '19:00–22:00' },
  FL: { nombre: 'FLACSO (Recoleta)', detalle: '1er año', hora: '18:30–21:00' },
  VP: { nombre: 'Villa del Parque',  detalle: '1er año', hora: '19:00–22:00' },
  PC: { nombre: 'Parque Chacabuco',  detalle: '1er año', hora: '09:00–12:00' }
};

const PROGRAMA = [
["2026-08-20","D1","U6-2","Gestión emocional I (1)(2)","FER"],
["2026-08-20","D2","U6-2","Cond. Certificación / Fase 3 / Sunesis (3) / C.O. F2","MARCE"],
["2026-08-20","FL","U1-2","Qué es y qué hace un Coach / El Circo de las Mariposas","MAIK"],
["2026-08-22","PC","U6-2","Gestión emocional I (1)(2)","FER"],
["2026-08-26","VP","U6-3","Ontología: Juicios I (1)(2)","FER"],
["2026-08-27","D1","U6-3","Ontología: Juicios I (1)(2)","FER"],
["2026-08-27","D2","U6-3","Coaching Etapa 4 DESCUBRIMIENTO / C.O. F2","MARCE"],
["2026-08-27","FL","U1-3","Ontología: Raíces del pensamiento occidental / Mi manera de ser","ALE"],
["2026-08-29","PC","U6-3","Ontología: Juicios I (1)(2)","FER"],
["2026-09-02","VP","U6-4","Sombreros para pensar (1)(2)","MAIK"],
["2026-09-03","D1","U6-4","Sombreros para pensar (1)(2)","MAIK"],
["2026-09-03","D2","U6-4","Coaching Etapa 5 PLAN DE ACCIÓN (1)(2)","MARCE"],
["2026-09-03","FL","U1-4","Enemigos del aprendizaje / Las corbatas","FER"],
["2026-09-05","PC","U6-4","Sombreros para pensar (1)(2)","MAIK"],
["2026-09-09","VP","U7-1","Acto expresivo / Indagación / Directivo + Disposiciones corporales (1)","MARCE"],
["2026-09-10","D1","U7-1","Acto expresivo / Indagación / Directivo + Disposiciones corporales (1)","MARCE"],
["2026-09-10","D2","U7-1","Coaching Etapas 6 y 7 (1)(2)","ALE"],
["2026-09-10","FL","U2-1","Poder y Control","MAIK"],
["2026-09-12","PC","U7-1","Acto expresivo / Indagación / Directivo + Disposiciones corporales (1)","MARCE"],
["2026-09-16","VP","U7-2","Disposiciones corporales (2)(3)","FER"],
["2026-09-17","D1","U7-2","Disposiciones corporales (2)(3)","FER"],
["2026-09-17","D2","U7-2","Coaching Etapas 6 y 7 (3) / C.O. F3","MARCE"],
["2026-09-17","FL","U2-2","Trabajo en equipo / El Juego de la NASA","ALE"],
["2026-09-19","PC","U7-2","Disposiciones corporales (2)(3)","FER"],
["2026-09-23","VP","U7-3","Ontología: Juicios II (1)(2)","ALE"],
["2026-09-24","D1","U7-3","Ontología: Juicios II (1)(2)","ALE"],
["2026-09-24","D2","U7-3","7CCOP C5 Gestión emocional (1)(2)","MARCE"],
["2026-09-24","FL","U2-3","Aprendizaje (1)(2)","FER"],
["2026-09-26","PC","U7-3","Ontología: Juicios II (1)(2)","ALE"],
["2026-09-30","VP","U7-4","Gestión emocional II – Neurociencias (1)(2)","MAIK"],
["2026-10-01","D1","U7-4","Gestión emocional II – Neurociencias (1)(2)","MAIK"],
["2026-10-01","D2","U7-4","7CCOP C6 Valoración y gestión corporal / C.O. F3","MARCE"],
["2026-10-01","FL","U2-4","Ontología: Postulados y Principios (1)(2)","ALE"],
["2026-10-03","PC","U7-4","Gestión emocional II – Neurociencias (1)(2)","MAIK"],
["2026-10-08","--","","FERIADO — no hay clase en ninguna sede","—"],
["2026-10-14","VP","U8-1","Medición de entendimiento 1","GUARDIANES"],
["2026-10-15","D1","U8-1","Medición de entendimiento 1","GUARDIANES"],
["2026-10-15","D2","U8-1","Medición de entendimiento 3","ALE"],
["2026-10-15","FL","U3-1","Compromiso (1)(2) / La rueda de la vida","MARCE"],
["2026-10-17","PC","U8-1","Medición de entendimiento 1","GUARDIANES"],
["2026-10-21","VP","U8-2","Víctima o Protagonista / Dinámica: El barco","FER"],
["2026-10-22","D1","U8-2","Víctima o Protagonista / Dinámica: El barco","FER"],
["2026-10-22","D2","U8-2","Reconstrucción lingüística de E y EA (1) / Noche de corazón","MARCE"],
["2026-10-22","FL","U3-2","Valores Fundamentales (1)(2)","ALE"],
["2026-10-24","PC","U8-2","Víctima o Protagonista / Dinámica: El barco","FER"],
["2026-10-28","VP","U8-3","Responsabilidad / Túnel de los abrazos","ALE"],
["2026-10-29","D1","U8-3","Responsabilidad / Túnel de los abrazos","ALE"],
["2026-10-29","D2","U8-3","Reconstrucción lingüística de E y EA (2)(3)","MARCE"],
["2026-10-29","FL","U3-3","Transparencia y Quiebre","MAIK"],
["2026-10-31","PC","U8-3","Responsabilidad / Túnel de los abrazos","ALE"],
["2026-11-04","VP","U8-4","Confianza (1)(2)","MAIK"],
["2026-11-05","D1","U8-4","Confianza (1)(2)","MAIK"],
["2026-11-05","D2","U8-4","7CCOP C7 Facilitación / C.O. F3","MARCE"],
["2026-11-05","FL","U3-4","Dinámica: Filmación (1)(2)","FER"],
["2026-11-07","PC","U8-4","Confianza (1)(2)","MAIK"],
["2026-11-11","VP","U9-1","El Escuchar (1)(2)","MARCE"],
["2026-11-12","D1","U9-1","El Escuchar (1)(2)","MARCE"],
["2026-11-12","D2","U9-1","Méritos / SECOP / C.O. F3","ALE"],
["2026-11-12","FL","U4-1","Medición de entendimiento 0","MAIK"],
["2026-11-14","PC","U9-1","El Escuchar (1)(2)","MARCE"],
["2026-11-18","VP","U9-2","El Escuchar (3) / Logro y Resultado","FER"],
["2026-11-19","D1","U9-2","El Escuchar (3) / Logro y Resultado","FER"],
["2026-11-19","D2","U9-2","Ética y Coaching (1)(2)","MARCE"],
["2026-11-19","FL","U4-2","Mini Equipos presentan sus nombres","ALE"],
["2026-11-21","PC","U9-2","El Escuchar (3) / Logro y Resultado","FER"],
["2026-11-25","VP","U9-3","Gestión emocional III (1)(2)","ALE"],
["2026-11-26","D1","U9-3","Gestión emocional III (1)(2)","ALE"],
["2026-11-26","D2","U9-3","Valores Instrumentales (1)(2)","MARCE"],
["2026-11-26","FL","U4-3","Identidad / Película Rey León","MAIK"],
["2026-11-28","PC","U9-3","Gestión emocional III (1)(2)","ALE"],
["2026-12-02","VP","U9-4","El guerrero pacífico / Ego vs Ser (1)(2)","MAIK"],
["2026-12-03","D1","U9-4","El guerrero pacífico / Ego vs Ser (1)(2)","MAIK"],
["2026-12-03","D2","U9-4","Valores Instrumentales (3) / C.O. F3","MARCE"],
["2026-12-03","FL","U4-4","Misión / Declarando mi misión","FER"],
["2026-12-05","PC","U9-4","El guerrero pacífico / Ego vs Ser (1)(2)","MAIK"],
["2026-12-09","VP","U10-1","Narrativas / Tarea grupal: Thriller","MARCE"],
["2026-12-10","D1","U10-1","Narrativas / Tarea grupal: Thriller","MARCE"],
["2026-12-10","D2","U10-1","Medición oral final (1)(2)","ALE"],
["2026-12-10","FL","U5-1","Visión / Dinámica: Fogón","MAIK"],
["2026-12-12","PC","U10-1","Narrativas / Tarea grupal: Thriller","MARCE"],
["2026-12-17","D1","U10-2","CIERRE DE AÑO — Entrega de diplomas D.O. N°1","MARCE"],
["2026-12-17","D2","U10-2","CIERRE DE AÑO — Ronda de certificación / Diplomas / Méritos","MARCE + ALE + MAIK"],
["2026-12-17","FL","U5-2","Afirmaciones y Declaraciones (1)(2)","FER"]
];

// Todas las clases de una fecha (clave con formato "2026-08-20")
function clasesDelDia(clave) {
  return PROGRAMA.filter(f => f[0] === clave).map(f => ({
    clave: f[0],
    sedeCod: f[1],
    unidad: f[2],
    tema: f[3],
    responsable: f[4],
    sede: SEDES[f[1]] || null,
    esMio: f[4].indexOf(YO) !== -1
  }));
}

// Las clases de ese día que das vos
function misClasesDelDia(clave) {
  return clasesDelDia(clave).filter(c => c.esMio);
}

// La próxima clase tuya a partir de una fecha
function miProximaClase(claveDesde) {
  const fila = PROGRAMA.find(f => f[0] >= claveDesde && f[4].indexOf(YO) !== -1);
  if (!fila) return null;
  return clasesDelDia(fila[0]).find(c => c.esMio);
}
