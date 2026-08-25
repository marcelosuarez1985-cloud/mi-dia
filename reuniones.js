// ═══════════════════════════════════════════════════════════
//  Temas de reunión — generado desde el libro de actas de Canva
//  Tableros: ECOA.RE Central y GIGNiT - Mesa de trabajo, página 2 de cada
//  uno (son hojas, se exportan a CSV).
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
const REUNIONES = ['ECOA.RE Directorio', 'GIGNiT'];

const TEMAS = [
  { reunion: "ECOA.RE Directorio", estado: "🔁Recurrente", tema: "Mastermind de Programa", tarea: "Tocar temas de programa.", responsable: "TODOS", vence: "25/5/2026", propone: "Marcelo Suárez", desde: "25/5/2026" },
  { reunion: "ECOA.RE Directorio", estado: "✏️ En proceso", tema: "Construcción de fichas de BUYER PERSONA", tarea: "Llamar a los que ya pasaron por la formación para que nos cuenten como le sirvió en su vida profesional las herramientas que aprendieron con nosotros.", responsable: "Marcelo Suárez", vence: "30/9/2026", propone: "Alejandro Ortíz", desde: "" },
  { reunion: "ECOA.RE Directorio", estado: "✏️ En proceso", tema: "Construcción de fichas de BUYER PERSONA", tarea: "Completar nosotros mismos nuestras experiencias con las personas diferentes profesiones.", responsable: "Marcelo Suárez", vence: "30/9/2026", propone: "Alejandro Ortíz", desde: "" },
  { reunion: "ECOA.RE Directorio", estado: "✏️ En proceso", tema: "Construcción de fichas de BUYER PERSONA", tarea: "Fusionar estos 3 resultados en las fichas finales.", responsable: "Marcelo Suárez", vence: "30/9/2026", propone: "Alejandro Ortíz", desde: "" },
  { reunion: "ECOA.RE Directorio", estado: "⌛En cola", tema: "Marketing", tarea: "Marketing: Incorporar sección cursos en la web.", responsable: "Alejandro Ortíz", vence: "", propone: "Alejandro Ortíz", desde: "" },
  { reunion: "ECOA.RE Directorio", estado: "✏️ En proceso", tema: "Linkedin", tarea: "Armar la plataforma de Linkedin.", responsable: "Todos", vence: "30/9/2026", propone: "Marcelo Suárez", desde: "5/2/2026" },
  { reunion: "ECOA.RE Directorio", estado: "⌛En cola", tema: "Calendario de Talleres gratuitos con GIGNiT", tarea: "Armar y definir un calendario de talleres para toda la comunidad", responsable: "Miguel Brito", vence: "27/7/2026", propone: "Marcelo Suárez", desde: "27/2/2026" },
  { reunion: "ECOA.RE Directorio", estado: "⌛En cola", tema: "Plan de Ex estudiantes", tarea: "Recontactar a los que por fuerza mayor se bajaron y volver a ofrecerles otras propuestas.", responsable: "Fernando Ferrara", vence: "30/9/2026", propone: "Alejandro Ortíz", desde: "23/7/2026" },
  { reunion: "ECOA.RE Directorio", estado: "✏️ En proceso", tema: "Nombre de la charla de la conferencia", tarea: "Traer para esta fecha el nombre de la conferencia", responsable: "Todos", vence: "31/8/2026", propone: "Marcelo Suárez", desde: "2/7/2026" },
  { reunion: "ECOA.RE Directorio", estado: "🔁Recurrente", tema: "Rol de subidor de materiales audiovisuales", tarea: "Subir a One Drive el material audiovisual de las sedes", responsable: "Fernando Ferrara", vence: "31/7/2026", propone: "Marcelo Suárez", desde: "6/7/2026" },
  { reunion: "ECOA.RE Directorio", estado: "✏️ En proceso", tema: "Customer Jorney", tarea: "Actualizar estado y pactar nuevos seguimientos.", responsable: "Todos", vence: "30/9/2026", propone: "Marcelo Suárez", desde: "13/7/2026" },
  { reunion: "ECOA.RE Directorio", estado: "⌛En cola", tema: "Video tutorial ingreso plataforma", tarea: "Realizar un video instructivo para los estudiantes", responsable: "Marcelo Suárez", vence: "30/9/2026", propone: "Alejandro Ortíz", desde: "6/8/2026" },
  { reunion: "ECOA.RE Directorio", estado: "⌛En cola", tema: "Contratar Claude por su herramienta de CoWork", tarea: "Esto facilitaría  la parte operativa de la empresa ejemplo: Extraer contactos para base de datos, registrar Cobranzas, Gestión academica, Control de insumos.", responsable: "Marcelo Suárez", vence: "31/8/2026", propone: "Alejandro Ortíz", desde: "23/7/2026" },
  { reunion: "ECOA.RE Directorio", estado: "⌛En cola", tema: "Incubadora 2027", tarea: "Formación para los nuevos ingresantes", responsable: "Marcelo Suárez", vence: "1/11/2026", propone: "Marcelo Suárez", desde: "27/7/2026" },
  { reunion: "ECOA.RE Directorio", estado: "", tema: "Calendario talleres gratuitos", tarea: "Organizar fechas posibles ", responsable: "Miguel Brito", vence: "30/7/2026", propone: "Miguel Brito", desde: "27/7/2026" },
  { reunion: "ECOA.RE Directorio", estado: "⌛En cola", tema: "Etiquetas/Listas", tarea: "Mostrar las listas", responsable: "Marcelo Suárez", vence: "22/8/2026", propone: "Marcelo Suárez", desde: "30/7/2026" },
  { reunion: "ECOA.RE Directorio", estado: "", tema: "Planilla CRM (Customer Relationship Management)", tarea: "Analizar la planilla para rever las fórmulas.", responsable: "", vence: "", propone: "Alejandro Ortíz", desde: "3/8/2026" },
  { reunion: "ECOA.RE Directorio", estado: "✏️ En proceso", tema: "Intensivo Noviembre", tarea: "Comenzar los preparativos. Lugar, fecha, cantidad de días.", responsable: "Todos", vence: "24/8/2026", propone: "Fernando Ferrara", desde: "10/8/2026" },
  { reunion: "ECOA.RE Directorio", estado: "❌ Sin empezar", tema: "Viaje a Córdoba: Reunidos", tarea: "Chequear si vamos, cómo ajustar los días de Parque Chacabuco.", responsable: "Todos", vence: "22/8/2026", propone: "Fernando Ferrara", desde: "10/8/2026" },
  { reunion: "ECOA.RE Directorio", estado: "⌛En cola", tema: "Cuentas PRO", tarea: "Observar las suscripciones que tengamos", responsable: "Todos", vence: "20/8/2026", propone: "Marcelo Suárez", desde: "17/8/2026" },
  { reunion: "ECOA.RE Directorio", estado: "✅️ Listo", tema: "Programa de clases", tarea: "Presentar una nueva propuesta de distado de clases", responsable: "Marcelo Suárez", vence: "20/8/2026", propone: "Marcelo Suárez", desde: "17/8/2026" },
  { reunion: "ECOA.RE Directorio", estado: "✅️ Listo", tema: "Libro de Acta (N° 53)", tarea: "Leerlo", responsable: "Marcelo Suárez", vence: "20/8/2026", propone: "Miguel Brito", desde: "17/8/2026" },
  { reunion: "ECOA.RE Directorio", estado: "✏️ En proceso", tema: "Informe de la campaña 26/27", tarea: "Armar un informe para ver la eficiencia, ROAS, etc. de la campaña.", responsable: "Alejandro Ortíz", vence: "22/8/2026", propone: "Alejandro Ortíz", desde: "17/8/2026" },
  { reunion: "ECOA.RE Directorio", estado: "✏️ En proceso", tema: "Social Funnel", tarea: "Estoy en un curso de funnel de ventas. Lo voy a probar un mes con el curso de oratoria y luego ver cómo adaptarlo a cursos cortos y a la carrera para la siguiente campaña. Traer�", responsable: "Alejandro Ortíz", vence: "22/9/2026", propone: "Alejandro Ortíz", desde: "17/8/2026" },
  { reunion: "ECOA.RE Directorio", estado: "❌ Sin empezar", tema: "tutoriales para planillas para estudiantes de segundo año", tarea: "chequear", responsable: "Marcelo Suárez", vence: "20/8/2026", propone: "Fernando Ferrara", desde: "17/8/2026" },
  { reunion: "ECOA.RE Directorio", estado: "", tema: "Grabación de la clase", tarea: "Se graba en Parque Chacabuco", responsable: "", vence: "", propone: "Fernando Ferrara", desde: "20/8/2026" },
  { reunion: "ECOA.RE Directorio", estado: "❌ Sin empezar", tema: "Libro de Actas (N° 54)", tarea: "Leerlo", responsable: "Fernando Ferrara", vence: "24/8/2026", propone: "Marcelo Suárez", desde: "20/8/2026" },
  { reunion: "ECOA.RE Directorio", estado: "", tema: "clase Juicios", tarea: "cualquier cambio o dinamica Ale le avisa a Fer", responsable: "", vence: "", propone: "Fernando Ferrara", desde: "24/8/2026" },
  { reunion: "ECOA.RE Directorio", estado: "", tema: "Fase 3", tarea: "Acuerdos", responsable: "", vence: "", propone: "Fernando Ferrara", desde: "" },
  { reunion: "ECOA.RE Directorio", estado: "", tema: "Libro de Actas (N° 55)", tarea: "Leerlo", responsable: "Alejandro Ortíz", vence: "", propone: "Marcelo Suárez", desde: "24/8/2026" },
  { reunion: "GIGNiT", estado: "⌛En cola", tema: "Diplomatura “Coaching para Líder de Equipos”", tarea: "Armar un nuevo curso", responsable: "Marcelo Suárez", vence: "30/8/2026", propone: "Marcelo Suárez", desde: "4/3/2026" },
  { reunion: "GIGNiT", estado: "✅️ Listo", tema: "Página Web de GIGNiT", tarea: "Agregar una sección de Coaching Organizacional.", responsable: "Alejandro Ortíz", vence: "31/8/2026", propone: "Alejandro Ortíz", desde: "26/6/2026" },
  { reunion: "GIGNiT", estado: "✅️ Listo", tema: "Clase mentalidad emprendedora", tarea: "Hacer difusión para los Coaches o estudiantes avanzados", responsable: "Todos", vence: "24/8/2026", propone: "Marcelo Suárez", desde: "12/8/2026" },
  { reunion: "GIGNiT", estado: "✅️ Listo", tema: "Libro de Actas (N°58)", tarea: "Leerlo", responsable: "Miguel Brito", vence: "19/8/2026", propone: "Alejandro Ortíz", desde: "19/8/2026" },
  { reunion: "GIGNiT", estado: "✅️ Listo", tema: "Libro de Actas (N°59)", tarea: "Leerlo", responsable: "Marcelo Suárez", vence: "24/8/2026", propone: "Miguel Brito", desde: "19/8/2026" },
  { reunion: "GIGNiT", estado: "✅️ Listo", tema: "IA Agéntica", tarea: "Nueva forma de grabar el libro de actas", responsable: "Marcelo Suárez", vence: "24/8/2026", propone: "Marcelo Suárez", desde: "24/8/2026" },
  { reunion: "GIGNiT", estado: "✅️ Listo", tema: "Introducción de la clase", tarea: "Ale se encargará en 5 minutos al inicio de la clase de generar un contexto.", responsable: "Alejandro Ortíz", vence: "24/8/2026", propone: "Alejandro Ortíz", desde: "24/8/2026" },
  { reunion: "GIGNiT", estado: "❌ Sin empezar", tema: "Estrategía de enrolamiento", tarea: "Armar la campaña para obtener el Ebook, video, minicurso para el postítulo", responsable: "Alejandro Ortíz", vence: "31/8/2026", propone: "Alejandro Ortíz", desde: "4/3/2026" },
  { reunion: "GIGNiT", estado: "⌛En cola", tema: "CRM", tarea: "Investigar un software de seguimiento de clientes", responsable: "Alejandro Ortíz", vence: "31/8/2026", propone: "Alejandro Ortíz", desde: "2/3/2026" },
  { reunion: "GIGNiT", estado: "⌛En cola", tema: "Proyecto Podcast ", tarea: "Con los audios de las clases, realizar un podcast.", responsable: "Alejandro Ortíz", vence: "", propone: "Alejandro Ortíz", desde: "6/3/2026" },
  { reunion: "GIGNiT", estado: "✏️ En proceso", tema: "Reel de Ventas ", tarea: "Adaptar guion, grabar y publicar Reel en Redes y contactos.", responsable: "Miguel Brito", vence: "31/8/2026", propone: "Miguel Brito", desde: "28/5/2026" },
  { reunion: "GIGNiT", estado: "✏️ En proceso", tema: "Preparar propuesta para los Rotarios", tarea: "Apartir de contar con el tema propuesto por el Rotary Club, armar una propuesta Educativa para compartir un taller o curso.", responsable: "Miguel Brito", vence: "7/8/2026", propone: "Miguel Brito", desde: "25/6/2026" },
  { reunion: "GIGNiT", estado: "✏️ En proceso", tema: "Página en LinkedIn", tarea: "Crear una página de empresa.", responsable: "Alejandro Ortíz", vence: "31/8/2026", propone: "Alejandro Ortíz", desde: "26/6/2026" },
  { reunion: "GIGNiT", estado: "❌ Sin empezar", tema: "Dossier empresarial", tarea: "Armar un Dossier Informativo de la empresa", responsable: "Todos", vence: "31/8/2026", propone: "Marcelo Suárez", desde: "6/7/2026" },
  { reunion: "GIGNiT", estado: "✏️ En proceso", tema: "Brochure del mundo B2B", tarea: "Armar un brochure del mundo B2B", responsable: "Alejandro Ortíz", vence: "7/8/2026", propone: "Alejandro Ortíz", desde: "8/7/2026" },
  { reunion: "GIGNiT", estado: "❌ Sin empezar", tema: "Diseño y proyección de productos y servicios de la Academia GIGNiT", tarea: "Armar el calendario del 2026/2027 ", responsable: "Todos", vence: "30/8/2026", propone: "Marcelo Suárez", desde: "8/7/2026" },
  { reunion: "GIGNiT", estado: "❌ Sin empezar", tema: "Diseño y proyección de productos y servicios de la GIGNiT Enterprise", tarea: "Armar el calendario del 2026/2027 ", responsable: "Todos", vence: "30/8/2026", propone: "Alejandro Ortíz", desde: "8/7/2026" },
  { reunion: "GIGNiT", estado: "✏️ En proceso", tema: "Tomar aprendizajes de las bajas. ", tarea: "Realizar un formulario de Feedback para los estudiantes que se fueron.", responsable: "Alejandro Ortíz", vence: "29/7/2026", propone: "Alejandro Ortíz", desde: "13/7/2026" },
  { reunion: "GIGNiT", estado: "✏️ En proceso", tema: "Curso “Coaching y Liderazgo” (intro al coaching)", tarea: "Debatir: temas, niveles, módulos, fecha de inicio.", responsable: "Marcelo Suárez", vence: "10/8/2026", propone: "Alejandro Ortíz", desde: "20/7/2026" },
  { reunion: "GIGNiT", estado: "❌ Sin empezar", tema: "Postítulo para el año que viene", tarea: "Propongo un esquema con al menos una clase presencial al mes.", responsable: "Alejandro Ortíz", vence: "31/8/2026", propone: "Alejandro Ortíz", desde: "20/7/2026" },
  { reunion: "GIGNiT", estado: "❌ Sin empezar", tema: "Postítulo para el año que viene", tarea: "Hacer videos complementarios con conceptos de Coaching Ontológico para ofrecer una nivelación.", responsable: "Marcelo Suárez", vence: "", propone: "Alejandro Ortíz", desde: "20/7/2026" },
  { reunion: "GIGNiT", estado: "⌛En cola", tema: "Carteles para colocar en instituciones", tarea: "Diseñar cartel A3 con la oferta de GIGNiT tanto para B2C como para B2B.", responsable: "Marcelo Suárez", vence: "19/8/2026", propone: "Alejandro Ortíz", desde: "22/7/2026" },
  { reunion: "GIGNiT", estado: "❌ Sin empezar", tema: "Enrolamiento Postitulo 2027", tarea: "Organizar seguimiento para interesados", responsable: "Miguel Brito", vence: "30/11/2026", propone: "Marcelo Suárez", desde: "24/7/2026" },
  { reunion: "GIGNiT", estado: "", tema: "Página web", tarea: "Diseño de landing para los diferentes cursos", responsable: "", vence: "", propone: "Alejandro Ortíz", desde: "25/7/2026" },
  { reunion: "GIGNiT", estado: "", tema: "Página web", tarea: "Revisar y Rediseñar landing del Postítulo", responsable: "", vence: "", propone: "Alejandro Ortíz", desde: "25/7/2026" },
  { reunion: "GIGNiT", estado: "", tema: "Página web", tarea: "Diseño de landing para Servicios Empresariales", responsable: "", vence: "", propone: "Alejandro Ortíz", desde: "25/7/2026" },
  { reunion: "GIGNiT", estado: "✏️ En proceso", tema: "Feedback de María del Rotary", tarea: "Pedirle el feedback", responsable: "Miguel Brito", vence: "8/8/2026", propone: "Marcelo Suárez", desde: "29/7/2026" },
  { reunion: "GIGNiT", estado: "✏️ En proceso", tema: "Kit del Coach de Equipos", tarea: "Armar el material para darle formato para que sea fácilmente accesible para las campañas de marketing. Que se puedan descargar o bien acceder de manera online.", responsable: "Alejandro Ortíz", vence: "30/9/2026", propone: "Alejandro Ortíz", desde: "10/8/2026" },
  { reunion: "GIGNiT", estado: "✏️ En proceso", tema: "Customer jorney", tarea: "Hacer el paso N° 1 y 2 del viaje", responsable: "Alejandro Ortíz", vence: "21/8/2026", propone: "Marcelo Suárez", desde: "12/8/2026" },
  { reunion: "GIGNiT", estado: "✏️ En proceso", tema: "Grupo de Whatsapp", tarea: "Circulo de Maestría, sumar a las personas interesadas a este grupo", responsable: "Todos", vence: "25/8/2026", propone: "Marcelo Suárez", desde: "24/8/2026" },
  { reunion: "GIGNiT", estado: "❌ Sin empezar", tema: "Clase de Mentalidad Emprendedora", tarea: "Armar para próximas ediciones una mejor venta y show al invitar a las personas", responsable: "Todos", vence: "24/8/2026", propone: "Alejandro Ortíz", desde: "24/8/2026" },
  { reunion: "GIGNiT", estado: "", tema: "Conferencia en el Mamapalooza", tarea: "El 22 de septiembre Ale realizará una conferencia. Es una oportunidad para que el equipo GIGNiT esté presente como sponsor. Tener en cuenta para preparar el stand, actividades y ", responsable: "Todos", vence: "", propone: "Alejandro Ortíz", desde: "22/7/2026" },
  { reunion: "GIGNiT", estado: "", tema: "Clase de diseño en Canva", tarea: "Cambiar por Diseño en IA", responsable: "", vence: "", propone: "Marcelo Suárez", desde: "24/8/2026" },
  { reunion: "GIGNiT", estado: "", tema: "Libro de Acta (N° 60)", tarea: "Leerlo", responsable: "Alejandro Ortíz", vence: "", propone: "Marcelo Suárez", desde: "24/8/2026" },
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
function temasPorUrgencia(hoyClave, reunion) {
  const g = { vencidos: [], porVencer: [], faltaCompletar: [], enMarcha: [], cerrados: [] };
  for (const t of TEMAS) {
    if (reunion && t.reunion !== reunion) continue;
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

function resumenReuniones(hoyClave, reunion) {
  const g = temasPorUrgencia(hoyClave, reunion);
  return { vencidos: g.vencidos.length, porVencer: g.porVencer.length,
           faltaCompletar: g.faltaCompletar.length, enMarcha: g.enMarcha.length,
           cerrados: g.cerrados.length };
}
