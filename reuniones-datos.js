// ═══════════════════════════════════════════════════════════
//  Temas de reunión — GENERADO AUTOMÁTICAMENTE, no editar a mano.
//
//  Sale de exportar a CSV la página 2 de los tableros de Canva
//  (esa página es una hoja, no un kanban de tarjetas).
//  Lo regenera herramientas/generar-datos.sh
//
//  El equipo sigue trabajando en Canva como siempre.
// ═══════════════════════════════════════════════════════════

const REUNIONES_ACTUALIZADO = '2026-09-09';
const REUNIONES = ['ECOA.RE Directorio', 'GIGNiT'];

const TEMAS = [
  { reunion: "ECOA.RE Directorio", estado: "🔁Recurrente", tema: "Mastermind de Programa", tarea: "Tocar temas de programa.", responsable: "TODOS", vence: "25/5/2026", propone: "Marcelo Suárez", desde: "25/5/2026" },
  { reunion: "ECOA.RE Directorio", estado: "✅️ Listo", tema: "Mini equipos Flacso", tarea: "Armar miniequipos con los estudiantes de flacso", responsable: "Fernando Ferrara", vence: "2/9/2026", propone: "Fernando Ferrara", desde: "31/8/2026" },
  { reunion: "ECOA.RE Directorio", estado: "✅️ Listo", tema: "Libro de Acta (N° 57)", tarea: "Leerlo", responsable: "Marcelo Suárez", vence: "3/9/2026", propone: "Marcelo Suárez", desde: "31/8/2026" },
  { reunion: "ECOA.RE Directorio", estado: "✅️ Listo", tema: "Viaje a Córdoba: Reunidos", tarea: "Chequear si vamos, cómo ajustar los días de Parque Chacabuco.", responsable: "Todos", vence: "3/9/2026", propone: "Fernando Ferrara", desde: "10/8/2026" },
  { reunion: "ECOA.RE Directorio", estado: "✅️ Listo", tema: "tutoriales para planillas para estudiantes de segundo año", tarea: "chequear", responsable: "Marcelo Suárez", vence: "3/9/2026", propone: "Fernando Ferrara", desde: "17/8/2026" },
  { reunion: "ECOA.RE Directorio", estado: "✅️ Listo", tema: "Conferencia 2026", tarea: "Definir como juntamos las 3 sedes", responsable: "Miguel Brito", vence: "5/9/2026", propone: "Fernando Ferrara", desde: "24/8/2026" },
  { reunion: "ECOA.RE Directorio", estado: "✅️ Listo", tema: "Sombreros insuficientes para dinamica(Sombreros para pensar)", tarea: "Conseguir y/o comprar sombreros para dinamica", responsable: "Marcelo Suárez", vence: "3/9/2026", propone: "Miguel Brito", desde: "3/9/2026" },
  { reunion: "ECOA.RE Directorio", estado: "✅️ Listo", tema: "App de cobro", tarea: "Necesitamos pedirles los cuits a los estudiantes", responsable: "Marcelo Suárez", vence: "3/9/2026", propone: "Marcelo Suárez", desde: "29/8/2026" },
  { reunion: "ECOA.RE Directorio", estado: "✅️ Listo", tema: "Libro de Acta (N° 57)", tarea: "Leerlo", responsable: "Marcelo Suárez", vence: "3/9/2026", propone: "Marcelo Suárez", desde: "31/8/2026" },
  { reunion: "ECOA.RE Directorio", estado: "✅️ Listo", tema: "un acuerdo fase 3", tarea: "acuerdo con pedido de Manjari", responsable: "Fernando Ferrara", vence: "7/9/2026", propone: "Fernando Ferrara", desde: "31/8/2026" },
  { reunion: "ECOA.RE Directorio", estado: "✏️ En proceso", tema: "Construcción de fichas de BUYER PERSONA", tarea: "Llamar a los que ya pasaron por la formación para que nos cuenten como le sirvió en su vida profesional las herramientas que aprendieron con nosotros.", responsable: "Marcelo Suárez", vence: "30/9/2026", propone: "Alejandro Ortíz", desde: "" },
  { reunion: "ECOA.RE Directorio", estado: "✏️ En proceso", tema: "Construcción de fichas de BUYER PERSONA", tarea: "Completar nosotros mismos nuestras experiencias con las personas diferentes profesiones.", responsable: "Marcelo Suárez", vence: "30/9/2026", propone: "Alejandro Ortíz", desde: "" },
  { reunion: "ECOA.RE Directorio", estado: "✏️ En proceso", tema: "Construcción de fichas de BUYER PERSONA", tarea: "Fusionar estos 3 resultados en las fichas finales.", responsable: "Marcelo Suárez", vence: "30/9/2026", propone: "Alejandro Ortíz", desde: "" },
  { reunion: "ECOA.RE Directorio", estado: "⌛En cola", tema: "Marketing", tarea: "Marketing: Incorporar sección cursos en la web.", responsable: "Alejandro Ortíz", vence: "30/9/2026", propone: "Alejandro Ortíz", desde: "" },
  { reunion: "ECOA.RE Directorio", estado: "✏️ En proceso", tema: "Linkedin", tarea: "Armar la plataforma de Linkedin.", responsable: "Todos", vence: "30/9/2026", propone: "Marcelo Suárez", desde: "5/2/2026" },
  { reunion: "ECOA.RE Directorio", estado: "⌛En cola", tema: "Plan de Ex estudiantes", tarea: "Recontactar a los que por fuerza mayor se bajaron y volver a ofrecerles otras propuestas.", responsable: "Fernando Ferrara", vence: "30/9/2026", propone: "Alejandro Ortíz", desde: "23/7/2026" },
  { reunion: "ECOA.RE Directorio", estado: "🔁Recurrente", tema: "Rol de subidor de materiales audiovisuales", tarea: "Subir a One Drive el material audiovisual de las sedes", responsable: "Fernando Ferrara", vence: "No tiene fecha", propone: "Marcelo Suárez", desde: "6/7/2026" },
  { reunion: "ECOA.RE Directorio", estado: "✏️ En proceso", tema: "Customer Journey", tarea: "Actualizar estado y pactar nuevos seguimientos.", responsable: "Todos", vence: "30/9/2026", propone: "Marcelo Suárez", desde: "13/7/2026" },
  { reunion: "ECOA.RE Directorio", estado: "⌛En cola", tema: "Video tutorial ingreso plataforma", tarea: "Realizar un video instructivo para los estudiantes", responsable: "Marcelo Suárez", vence: "30/9/2026", propone: "Alejandro Ortíz", desde: "6/8/2026" },
  { reunion: "ECOA.RE Directorio", estado: "⌛En cola", tema: "Incubadora 2027", tarea: "Formación para los nuevos ingresantes", responsable: "Marcelo Suárez", vence: "1/11/2026", propone: "Marcelo Suárez", desde: "27/7/2026" },
  { reunion: "ECOA.RE Directorio", estado: "⌛En cola", tema: "Planilla CRM (Customer Relationship Management)", tarea: "Analizar la planilla para rever las fórmulas.", responsable: "Marcelo Suárez", vence: "30/9/2026", propone: "Alejandro Ortíz", desde: "3/8/2026" },
  { reunion: "ECOA.RE Directorio", estado: "✏️ En proceso", tema: "Intensivo Noviembre", tarea: "Comenzar los preparativos. Lugar, fecha, cantidad de días.", responsable: "Todos", vence: "17/9/2026", propone: "Fernando Ferrara", desde: "10/8/2026" },
  { reunion: "ECOA.RE Directorio", estado: "⌛En cola", tema: "Cuentas PRO", tarea: "Observar las suscripciones que tengamos", responsable: "Alejandro Ortíz", vence: "30/9/2026", propone: "Marcelo Suárez", desde: "17/8/2026" },
  { reunion: "ECOA.RE Directorio", estado: "❌ Sin empezar", tema: "Alternar la presencia de los 4 en las sedes", tarea: "", responsable: "Todos", vence: "30/9/2026", propone: "Alejandro Ortíz", desde: "27/8/2026" },
  { reunion: "ECOA.RE Directorio", estado: "✅️ Listo", tema: "Libro de Acta (N° 58)", tarea: "Leerlo", responsable: "Fernando Ferrara", vence: "7/9/2026", propone: "Marcelo Suárez", desde: "3/9/2026" },
  { reunion: "ECOA.RE Directorio", estado: "❌ Sin empezar", tema: "Libro de Acta (N° 59)", tarea: "Leerlo", responsable: "Alejandro Ortíz", vence: "10/9/2026", propone: "Marcelo Suárez", desde: "7/9/2026" },
  { reunion: "GIGNiT", estado: "⌛En cola", tema: "Diplomatura “Coaching para Líder de Equipos”", tarea: "Armar un nuevo curso", responsable: "Marcelo Suárez", vence: "30/8/2026", propone: "Marcelo Suárez", desde: "4/3/2026" },
  { reunion: "GIGNiT", estado: "✅️ Listo", tema: "Cobranzas", tarea: "Armar para el 2027 un sistema de cobranza automatico", responsable: "Marcelo Suárez", vence: "2/9/2026", propone: "Alejandro Ortíz", desde: "26/8/2026" },
  { reunion: "GIGNiT", estado: "✅️ Listo", tema: "Libro de Acta (N° 61)", tarea: "Leerlo", responsable: "Miguel Brito", vence: "2/9/2026", propone: "Marcelo Suárez", desde: "31/8/2026" },
  { reunion: "GIGNiT", estado: "✅️ Listo", tema: "Libro de Acta (N° 62)", tarea: "Leerlo", responsable: "Marcelo Suárez", vence: "4/9/2026", propone: "Marcelo Suárez", desde: "2/9/2026" },
  { reunion: "GIGNiT", estado: "⌛En cola", tema: "Proyecto Podcast", tarea: "Con los audios de las clases, realizar un podcast.", responsable: "Alejandro Ortíz", vence: "31/10/2026", propone: "Alejandro Ortíz", desde: "6/3/2026" },
  { reunion: "GIGNiT", estado: "❌ Sin empezar", tema: "Página en LinkedIn", tarea: "Crear una página de empresa.", responsable: "Alejandro Ortíz", vence: "30/10/2026", propone: "Alejandro Ortíz", desde: "26/6/2026" },
  { reunion: "GIGNiT", estado: "⌛En cola", tema: "Tomar aprendizajes de las bajas.", tarea: "Realizar un formulario de Feedback para los estudiantes que se fueron.", responsable: "Alejandro Ortíz", vence: "28/2/2027", propone: "Alejandro Ortíz", desde: "13/7/2026" },
  { reunion: "GIGNiT", estado: "✏️ En proceso", tema: "Curso “Coaching y Liderazgo” (intro al coaching)", tarea: "Debatir: temas, niveles, módulos, fecha de inicio.", responsable: "Marcelo Suárez", vence: "30/9/2026", propone: "Alejandro Ortíz", desde: "20/7/2026" },
  { reunion: "GIGNiT", estado: "❌ Sin empezar", tema: "Postítulo para el año que viene", tarea: "Hacer videos complementarios con conceptos de Coaching Ontológico para ofrecer una nivelación. (7CCOP y otros conceptos básicos/necesarios para la formación)", responsable: "Marcelo Suárez", vence: "31/12/2026", propone: "Alejandro Ortíz", desde: "20/7/2026" },
  { reunion: "GIGNiT", estado: "⌛En cola", tema: "Carteles para colocar en instituciones", tarea: "Diseñar cartel A3 con la oferta de GIGNiT tanto para B2C como para B2B.", responsable: "Marcelo Suárez", vence: "30/9/2026", propone: "Alejandro Ortíz", desde: "22/7/2026" },
  { reunion: "GIGNiT", estado: "❌ Sin empezar", tema: "Enrolamiento Postitulo 2027", tarea: "Organizar seguimiento para interesados", responsable: "Miguel Brito", vence: "30/11/2026", propone: "Marcelo Suárez", desde: "24/7/2026" },
  { reunion: "GIGNiT", estado: "❌ Sin empezar", tema: "Página web", tarea: "Revisar y Rediseñar landing del Postítulo", responsable: "Alejandro Ortíz", vence: "30/9/2026", propone: "Alejandro Ortíz", desde: "25/7/2026" },
  { reunion: "GIGNiT", estado: "❌ Sin empezar", tema: "Página web", tarea: "Diseño de landing para Servicios Empresariales", responsable: "Alejandro Ortíz", vence: "31/10/2026", propone: "Alejandro Ortíz", desde: "25/7/2026" },
  { reunion: "GIGNiT", estado: "❌ Sin empezar", tema: "Planificar clase 29 (Digital multiformatos)", tarea: "Diseñar clase con herramientas de la IA enfocados al diseño de negocio.", responsable: "Marcelo Suárez", vence: "12/10/2026", propone: "Marcelo Suárez", desde: "26/8/2026" },
  { reunion: "GIGNiT", estado: "✏️ En proceso", tema: "Postítulo 2027 (Venta)", tarea: "Contactar a personas interesadas para el postitulo", responsable: "Miguel Brito", vence: "31/10/2026", propone: "Miguel Brito", desde: "26/8/2026" },
  { reunion: "GIGNiT", estado: "❌ Sin empezar", tema: "Generar videos para campaña Postitulo 2027", tarea: "Hay 2 videos centrales que preparar: Video anzuelo que resuelve un problema e invita al postítulo. Video que explica de punta a punta el “cómo” del Postítulo.", responsable: "Alejandro Ortíz", vence: "30/9/2026", propone: "Alejandro Ortíz", desde: "2/9/2026" },
  { reunion: "GIGNiT", estado: "✅️ Listo", tema: "Libro de Acta (N° 63)", tarea: "Leerlo", responsable: "Alejandro Ortíz", vence: "7/9/2026", propone: "Marcelo Suárez", desde: "4/9/2026" },
  { reunion: "GIGNiT", estado: "✏️ En proceso", tema: "Dossier empresarial", tarea: "Armar un Dossier Informativo de la empresa", responsable: "Todos", vence: "11/9/2026", propone: "Marcelo Suárez", desde: "6/7/2026" },
  { reunion: "GIGNiT", estado: "", tema: "Brochure del Postítulo", tarea: "Rediseñar para colocar semipresencial, nuevo precio, nueva gráfica (formal, profesional, etc.)", responsable: "", vence: "30/9/2026", propone: "Alejandro Ortíz", desde: "7/9/2026" },
  { reunion: "GIGNiT", estado: "❌ Sin empezar", tema: "Formulario de Inscripción para Postítulo 2027", tarea: "Duplicar el anterior y colocar dato de CUIL.", responsable: "Miguel Brito", vence: "30/9/2026", propone: "Alejandro Ortíz", desde: "7/9/2026" },
  { reunion: "GIGNiT", estado: "✅️ Listo", tema: "Libro de Acta (N° 64)", tarea: "Leerlo", responsable: "Miguel Brito", vence: "9/9/2026", propone: "Marcelo Suárez", desde: "7/9/2026" },
  { reunion: "GIGNiT", estado: "✏️ En proceso", tema: "TPI: Trabajo Práctico Integrador", tarea: "Revisar y compartir en la clase del lunes 14/09 a los estudiantes", responsable: "Alejandro Ortíz", vence: "14/9/2026", propone: "Alejandro Ortíz", desde: "9/9/2026" },
  { reunion: "GIGNiT", estado: "❌ Sin empezar", tema: "Libro de Acta (N° 65)", tarea: "Leerlo", responsable: "Marcelo Suárez", vence: "11/9/2026", propone: "Marcelo Suárez", desde: "9/9/2026" },
];
