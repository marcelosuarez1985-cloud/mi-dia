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

// Búsqueda pensada para que salga primero alguien explicando la postura,
// no una compilación de gente entrenando.
function videoDe(ejercicio) {
  const q = 'cómo hacer ' + (ejercicio.busca || ejercicio.nombre) + ' técnica correcta postura';
  return 'https://www.youtube.com/results?search_query=' + encodeURIComponent(q);
}
