// ═══════════════════════════════════════════════════════════
//  Rutina de SportClub Flores — octubre a diciembre 2026
//  Sacada de los 8 PDFs del mail del 26/10/2026 (sesiones 1 a 24).
//
//  Los 8 PDFs son idénticos: son tres entrenamientos que se repiten, y lo
//  único que cambia es el número de sesión. Por eso acá hay tres sesiones
//  y no veinticuatro. Se asume lunes = 1, miércoles = 2, viernes = 3.
//
//  Cada ejercicio abre una búsqueda de YouTube ya escrita, en vez de un
//  video fijo. Motivo: no puedo mirar los videos para confirmar que la
//  técnica esté bien explicada, y un link fijo se rompe con el tiempo.
//  Una búsqueda bien armada te deja la explicación buena arriba de todo.
//
//  `busca` es para los nombres que usa el club y en YouTube no dicen nada
//  ("TV - tirón de polea", "AMI - abductores").
// ═══════════════════════════════════════════════════════════

const RUTINA = [
  {
    numero: 1,
    calentamiento: [
      { nombre: 'Crunch', dosis: '3 × 20' },
      { nombre: 'Plancha lateral sobre codos', dosis: '3 × 40 seg' },
      { nombre: 'Extensiones en banco lumbar', dosis: '3 × 15' }
    ],
    principal: [
      { nombre: 'Sentadilla búlgara con mancuernas', dosis: '4 × 8 cada pierna', descanso: '1:40' },
      { nombre: 'Sentadilla + press vertical', dosis: '3 × 15', descanso: '1:30', nota: 'superserie con el remo',
        busca: 'sentadilla con press de hombros mancuernas' },
      { nombre: 'Remo en posición dividida con mancuerna', dosis: '3 × 10 cada brazo', descanso: '1:30', nota: 'superserie con la sentadilla' },
      { nombre: 'Press de banco inclinado con mancuernas', dosis: '3 × 12', descanso: '1:30' },
      { nombre: 'Flexión de rodilla a una pierna', dosis: '3 × 8 cada pierna', descanso: '1:30',
        busca: 'curl femoral a una pierna en máquina' },
      { nombre: 'Abductores en máquina', dosis: '3 × 15 + 8', descanso: '1:00' },
      { nombre: 'Extensión de codo sobre cabeza con disco', dosis: '3 × 8' }
    ]
  },
  {
    numero: 2,
    calentamiento: [
      { nombre: 'Crunch', dosis: '3 × 30' },
      { nombre: 'Plancha cruzando por debajo', dosis: '3 × 40 seg' },
      { nombre: 'Abdominales oblicuos rodilla flexionada', dosis: '3 × 20 por lado' }
    ],
    principal: [
      { nombre: 'Pullover en polea alta', dosis: '4 × 12', descanso: '1:30' },
      { nombre: 'Patada atrás en polea baja', dosis: '3 × 12 por lado', descanso: '1:30',
        busca: 'patada de glúteo en polea baja' },
      { nombre: 'Tirón de polea', dosis: '3 × 12-10-10', descanso: '1:30',
        busca: 'jalón al pecho en polea' },
      { nombre: 'Vuelo lateral en máquina', dosis: '3 × 10', descanso: '1:30',
        busca: 'elevaciones laterales en máquina' },
      { nombre: 'Isquiotibiales en máquina', dosis: '4 × 15', descanso: '1:30',
        busca: 'curl femoral en máquina' },
      { nombre: 'Aductores en máquina', dosis: '4 × 15 + 10', descanso: '1:30' },
      { nombre: 'Curl de bíceps en banco Scott', dosis: '3 × 12-12-10' }
    ]
  },
  {
    numero: 3,
    calentamiento: [
      { nombre: 'Plancha cruzando por debajo', dosis: '3 × 40 seg' },
      { nombre: 'Abdominales oblicuos rodilla flexionada', dosis: '3 × 25 por lado' },
      { nombre: 'Swimming', dosis: '3 × 20 en total', busca: 'swimming superman alternado lumbares' }
    ],
    principal: [
      { nombre: 'Peso muerto desde el suelo', dosis: '4 × 10', descanso: '1:30' },
      { nombre: 'Subidas al cajón', dosis: '3 × 10 por pierna' },
      { nombre: 'Remo bajo en máquina', dosis: '3 × 10-8-8', descanso: '1:30' },
      { nombre: 'Press de banco plano alterno con mancuernas', dosis: '3 × 10 en total', descanso: '1:30' },
      { nombre: 'Extensiones de rodilla en máquina', dosis: '4 × 10 + 10', descanso: '1:30' },
      { nombre: 'Extensión de codo con agarre en V', dosis: '4 × 12-12-10-10',
        busca: 'extensión de tríceps en polea agarre V' },
      { nombre: 'Deltoides posterior en contractora', dosis: '3 × 12',
        busca: 'deltoides posterior en máquina contractora' }
    ]
  }
];

// La sesión de ese día: lunes 1, miércoles 2, viernes 3.
function sesionDelDia(clave) {
  const dia = new Date(clave + 'T12:00:00').getDay();
  const numero = { 1: 1, 3: 2, 5: 3 }[dia];
  return RUTINA.find(s => s.numero === numero) || null;
}

// Un video por ejercicio, elegido el 04/11/2026.
//
// Criterio: tutorial en castellano, de un canal reconocido, que muestre la
// técnica de ese ejercicio y no una rutina entera. NO pude medir visitas ni
// verlos enteros: busqué en YouTube, leí título y canal de cada candidato y
// me quedé con el que viene de un canal más conocido. Si alguno no te cierra,
// decime cuál y lo cambio.
//
// Los que no están en esta lista abren una búsqueda de YouTube ya escrita.
const VIDEOS = {
  'Crunch': 'hl9Yu7UZqHU',                                         // Esther Losilla
  'Plancha lateral sobre codos': 'eqtilxuPKZg',                    // Amaiafit
  'Extensiones en banco lumbar': 'atEI-PfmpBI',                    // Vitar Club
  'Sentadilla búlgara con mancuernas': 'Xfa3Ql_NwmE',              // ATHLEAN-X Español
  'Sentadilla + press vertical': 'Rgh15uWbbEM',                    // Men's Health España
  'Remo en posición dividida con mancuerna': 'Pkr1WW3p05A',        // ATHLEAN-X Español
  'Press de banco inclinado con mancuernas': 'oTD5g77GgSA',        // Your House Fitness
  'Flexión de rodilla a una pierna': 'PPbjj-RtrJY',                // Entrenamiento.Pro
  'Abductores en máquina': '2vCRMi-lgJ4',                          // Galvistrainer
  'Extensión de codo sobre cabeza con disco': '1Ldwgg__Vvc',       // Entrenamiento Sputnik
  'Plancha cruzando por debajo': 'xa1uO7OqWN4',                    // Goldman Salud
  'Abdominales oblicuos rodilla flexionada': 'opo87zIgXcU',        // Ejercicios en Casa
  'Pullover en polea alta': 'wi9cpIbasgE',                         // Vitar Club
  'Patada atrás en polea baja': 'vHY4JUtKiFc',                     // Dr. Víctor López
  'Tirón de polea': 'EO9AmI-bu_0',                                 // Fit Generation
  'Vuelo lateral en máquina': 'oM27m1zdiA8',                       // David Ritter
  'Isquiotibiales en máquina': 'CBCPBnMzsMI',                      // Vitar Club
  'Aductores en máquina': 'KHoOH_klfDo',                           // Vida en Forma
  'Curl de bíceps en banco Scott': 'MSqzyRDIbt8',                  // Manuel Escalera
  'Swimming': 'TrhCFLMqL0w',                                       // Move to Excellence
  'Peso muerto desde el suelo': 'kancsOn7CJY',                     // Fit Generation
  'Subidas al cajón': 'E88WpLYnnSk',                               // Vitar Club
  'Remo bajo en máquina': 'nwdptbhYjTw',                           // Dr. Víctor López
  'Press de banco plano alterno con mancuernas': 'uii5wbbN99w',    // Dr. Víctor López
  'Extensiones de rodilla en máquina': 'Q2-N3JmOQvI',              // Galvistrainer
  'Extensión de codo con agarre en V': 'UQZdNqr5EhA',              // David Ritter
  'Deltoides posterior en contractora': 'QaBNLN_RUNg'              // Tu Fisioterapeuta Fit
};

function videoDe(ejercicio) {
  const id = VIDEOS[ejercicio.nombre];
  if (id) return 'https://www.youtube.com/watch?v=' + id;
  const q = 'cómo hacer ' + (ejercicio.busca || ejercicio.nombre) + ' técnica correcta postura';
  return 'https://www.youtube.com/results?search_query=' + encodeURIComponent(q);
}
