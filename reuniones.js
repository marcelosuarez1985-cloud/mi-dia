// ═══════════════════════════════════════════════════════════
//  Temas de reunión — generado desde el libro de actas de Canva
//  Tablero ECOA.RE Central, página 2 (es una hoja, se exporta a CSV).
//
//  NO editar a mano: se regenera exportando el tablero de nuevo.
//  El equipo sigue trabajando en Canva como siempre.
//
//  Estados tal como los usa el equipo:
//    ✅️ Listo · 🚮 Descartado · ✏️ En proceso · ⌛ En cola
//    ❌ Sin empezar · 🔁 Recurrente · (vacío) = sin categorizar
//
//  Los cerrados viejos no entran: son 246 y no aportan. Sólo se
//  incluyen los cerrados de los últimos 7 días, como repaso.
// ═══════════════════════════════════════════════════════════

const REUNIONES_ACTUALIZADO = '2026-08-25';

const TEMAS = [
  { estado: "🔁Recurrente", tema: "Mastermind de Programa", tarea: "Tocar temas de programa.", responsable: "TODOS", vence: "25/5/2026", propone: "Marcelo Suárez", desde: "25/5/2026" },
  { estado: "✏️ En proceso", tema: "Construcción de fichas de BUYER PERSONA", tarea: "Llamar a los que ya pasaron por la formación para que nos cuenten como le sirvió en su vida profesional las herramientas que aprendieron con nosotros.", responsable: "Marcelo Suárez", vence: "30/9/2026", propone: "Alejandro Ortíz", desde: "" },
  { estado: "✏️ En proceso", tema: "Construcción de fichas de BUYER PERSONA", tarea: "Completar nosotros mismos nuestras experiencias con las personas diferentes profesiones.", responsable: "Marcelo Suárez", vence: "30/9/2026", propone: "Alejandro Ortíz", desde: "" },
  { estado: "✏️ En proceso", tema: "Construcción de fichas de BUYER PERSONA", tarea: "Fusionar estos 3 resultados en las fichas finales.", responsable: "Marcelo Suárez", vence: "30/9/2026", propone: "Alejandro Ortíz", desde: "" },
  { estado: "⌛En cola", tema: "Marketing", tarea: "Marketing: Incorporar sección cursos en la web.", responsable: "Alejandro Ortíz", vence: "", propone: "Alejandro Ortíz", desde: "" },
  { estado: "✏️ En proceso", tema: "Linkedin", tarea: "Armar la plataforma de Linkedin.", responsable: "Todos", vence: "30/9/2026", propone: "Marcelo Suárez", desde: "5/2/2026" },
  { estado: "⌛En cola", tema: "Calendario de Talleres gratuitos con GIGNiT", tarea: "Armar y definir un calendario de talleres para toda la comunidad", responsable: "Miguel Brito", vence: "27/7/2026", propone: "Marcelo Suárez", desde: "27/2/2026" },
  { estado: "⌛En cola", tema: "Plan de Ex estudiantes", tarea: "Recontactar a los que por fuerza mayor se bajaron y volver a ofrecerles otras propuestas.", responsable: "Fernando Ferrara", vence: "30/9/2026", propone: "Alejandro Ortíz", desde: "23/7/2026" },
  { estado: "✏️ En proceso", tema: "Nombre de la charla de la conferencia", tarea: "Traer para esta fecha el nombre de la conferencia", responsable: "Todos", vence: "31/8/2026", propone: "Marcelo Suárez", desde: "2/7/2026" },
  { estado: "🔁Recurrente", tema: "Rol de subidor de materiales audiovisuales", tarea: "Subir a One Drive el material audiovisual de las sedes", responsable: "Fernando Ferrara", vence: "31/7/2026", propone: "Marcelo Suárez", desde: "6/7/2026" },
  { estado: "✏️ En proceso", tema: "Customer Jorney", tarea: "Actualizar estado y pactar nuevos seguimientos.", responsable: "Todos", vence: "30/9/2026", propone: "Marcelo Suárez", desde: "13/7/2026" },
  { estado: "⌛En cola", tema: "Video tutorial ingreso plataforma", tarea: "Realizar un video instructivo para los estudiantes", responsable: "Marcelo Suárez", vence: "30/9/2026", propone: "Alejandro Ortíz", desde: "6/8/2026" },
  { estado: "⌛En cola", tema: "Contratar Claude por su herramienta de CoWork", tarea: "Esto facilitaría  la parte operativa de la empresa ejemplo: Extraer contactos para base de datos, registrar Cobranzas, Gestión academica, Control de insumos.", responsable: "Marcelo Suárez", vence: "31/8/2026", propone: "Alejandro Ortíz", desde: "23/7/2026" },
  { estado: "⌛En cola", tema: "Incubadora 2027", tarea: "Formación para los nuevos ingresantes", responsable: "Marcelo Suárez", vence: "1/11/2026", propone: "Marcelo Suárez", desde: "27/7/2026" },
  { estado: "", tema: "Calendario talleres gratuitos", tarea: "Organizar fechas posibles ", responsable: "Miguel Brito", vence: "30/7/2026", propone: "Miguel Brito", desde: "27/7/2026" },
  { estado: "⌛En cola", tema: "Etiquetas/Listas", tarea: "Mostrar las listas", responsable: "Marcelo Suárez", vence: "22/8/2026", propone: "Marcelo Suárez", desde: "30/7/2026" },
  { estado: "", tema: "Planilla CRM (Customer Relationship Management)", tarea: "Analizar la planilla para rever las fórmulas.", responsable: "", vence: "", propone: "Alejandro Ortíz", desde: "3/8/2026" },
  { estado: "✏️ En proceso", tema: "Intensivo Noviembre", tarea: "Comenzar los preparativos. Lugar, fecha, cantidad de días.", responsable: "Todos", vence: "24/8/2026", propone: "Fernando Ferrara", desde: "10/8/2026" },
  { estado: "❌ Sin empezar", tema: "Viaje a Córdoba: Reunidos", tarea: "Chequear si vamos, cómo ajustar los días de Parque Chacabuco.", responsable: "Todos", vence: "22/8/2026", propone: "Fernando Ferrara", desde: "10/8/2026" },
  { estado: "⌛En cola", tema: "Cuentas PRO", tarea: "Observar las suscripciones que tengamos", responsable: "Todos", vence: "20/8/2026", propone: "Marcelo Suárez", desde: "17/8/2026" },
  { estado: "✅️ Listo", tema: "Programa de clases", tarea: "Presentar una nueva propuesta de distado de clases", responsable: "Marcelo Suárez", vence: "20/8/2026", propone: "Marcelo Suárez", desde: "17/8/2026" },
  { estado: "✅️ Listo", tema: "Libro de Acta (N° 53)", tarea: "Leerlo", responsable: "Marcelo Suárez", vence: "20/8/2026", propone: "Miguel Brito", desde: "17/8/2026" },
  { estado: "✏️ En proceso", tema: "Informe de la campaña 26/27", tarea: "Armar un informe para ver la eficiencia, ROAS, etc. de la campaña.", responsable: "Alejandro Ortíz", vence: "22/8/2026", propone: "Alejandro Ortíz", desde: "17/8/2026" },
  { estado: "✏️ En proceso", tema: "Social Funnel", tarea: "Estoy en un curso de funnel de ventas. Lo voy a probar un mes con el curso de oratoria y luego ver cómo adaptarlo a cursos cortos y a la carrera para la siguiente campaña. Traer�", responsable: "Alejandro Ortíz", vence: "22/9/2026", propone: "Alejandro Ortíz", desde: "17/8/2026" },
  { estado: "❌ Sin empezar", tema: "tutoriales para planillas para estudiantes de segundo año", tarea: "chequear", responsable: "Marcelo Suárez", vence: "20/8/2026", propone: "Fernando Ferrara", desde: "17/8/2026" },
  { estado: "", tema: "Grabación de la clase", tarea: "Se graba en Parque Chacabuco", responsable: "", vence: "", propone: "Fernando Ferrara", desde: "20/8/2026" },
  { estado: "❌ Sin empezar", tema: "Libro de Actas (N° 54)", tarea: "Leerlo", responsable: "Fernando Ferrara", vence: "24/8/2026", propone: "Marcelo Suárez", desde: "20/8/2026" },
  { estado: "", tema: "clase Juicios", tarea: "cualquier cambio o dinamica Ale le avisa a Fer", responsable: "", vence: "", propone: "Fernando Ferrara", desde: "24/8/2026" },
  { estado: "", tema: "Fase 3", tarea: "Acuerdos", responsable: "", vence: "", propone: "Fernando Ferrara", desde: "" },
  { estado: "", tema: "Libro de Actas (N° 55)", tarea: "Leerlo", responsable: "Alejandro Ortíz", vence: "", propone: "Marcelo Suárez", desde: "24/8/2026" },
];

// dd/m/yyyy → número comparable aaaammdd. Devuelve 0 si no hay fecha.
function fechaNum(f) {
  if (!f) return 0;
  const p = f.split('/');
  if (p.length !== 3) return 0;
  return Number(p[2]) * 10000 + Number(p[1]) * 100 + Number(p[0]);
}

function diasHasta(f, hoyClave) {
  const v = fechaNum(f);
  if (!v) return null;
  const h = Number(hoyClave.replace(/-/g, ''));
  const a = new Date(String(v).slice(0,4), String(v).slice(4,6) - 1, String(v).slice(6,8));
  const b = new Date(hoyClave + 'T12:00:00');
  return Math.round((a - b) / 86400000);
}

const CERRADO = /Listo|Descartado/;
// "Todos" como responsable es lo mismo que nadie: no hay una persona a cargo.
const SIN_DUENIO = /^(todos|todes)$/i;

// Agrupa los temas por urgencia. Cada tema aparece una sola vez,
// en el primer grupo que le corresponde.
function temasPorUrgencia(hoyClave) {
  const g = { vencidos: [], porVencer: [], faltaCompletar: [], enMarcha: [], cerrados: [] };
  for (const t of TEMAS) {
    const dias = diasHasta(t.vence, hoyClave);
    const cerrado = CERRADO.test(t.estado);
    const item = Object.assign({}, t, { dias });

    if (cerrado) { g.cerrados.push(item); continue; }
    if (dias !== null && dias < 0)  { g.vencidos.push(item); continue; }
    if (dias !== null && dias <= 7) { g.porVencer.push(item); continue; }

    const faltas = [];
    if (!t.estado) faltas.push('sin categorizar');
    if (!t.responsable) faltas.push('sin responsable');
    else if (SIN_DUENIO.test(t.responsable.trim())) faltas.push('responsable "todos" = nadie');
    if (!t.vence) faltas.push('sin fecha límite');
    if (faltas.length) { item.faltas = faltas; g.faltaCompletar.push(item); continue; }

    g.enMarcha.push(item);
  }
  g.vencidos.sort((a, b) => a.dias - b.dias);
  g.porVencer.sort((a, b) => a.dias - b.dias);
  return g;
}

function resumenReuniones(hoyClave) {
  const g = temasPorUrgencia(hoyClave);
  return { vencidos: g.vencidos.length, porVencer: g.porVencer.length,
           faltaCompletar: g.faltaCompletar.length, enMarcha: g.enMarcha.length,
           cerrados: g.cerrados.length };
}
