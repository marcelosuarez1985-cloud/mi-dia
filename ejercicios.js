// ═══════════════════════════════════════════════════════════
//  Ejercicios de la rutina de SportClub Flores
//  Sacados de los 7 PDFs (sesiones 1 a 21, agosto a octubre 2026)
//
//  Cada ejercicio abre una búsqueda de YouTube ya escrita, en vez de un
//  video fijo. Motivo: no puedo mirar los videos para confirmar que la
//  técnica esté bien explicada, y un link fijo se rompe con el tiempo.
//  Una búsqueda bien armada te deja la explicación buena arriba de todo.
// ═══════════════════════════════════════════════════════════

const EJERCICIOS = [
  { grupo: 'Espalda',    nombre: 'Remo bajo en máquina' },
  { grupo: 'Espalda',    nombre: 'Jalones en máquina, agarre ancho' },
  { grupo: 'Espalda',    nombre: 'Face pull en polea baja' },
  { grupo: 'Lumbares',   nombre: 'Swimming (superman alternado)' },

  { grupo: 'Pecho',      nombre: 'Aperturas inclinadas con mancuernas' },
  { grupo: 'Pecho',      nombre: 'Aperturas pectoral alternado con mancuernas' },

  { grupo: 'Hombros',    nombre: 'Press Arnold' },

  { grupo: 'Tríceps',    nombre: 'Polea alta tríceps' },
  { grupo: 'Tríceps',    nombre: 'Press francés con barra en banco plano' },

  { grupo: 'Cuádriceps', nombre: 'Sentadilla en multipower' },
  { grupo: 'Cuádriceps', nombre: 'Extensión de rodillas en prensa' },
  { grupo: 'Isquios',    nombre: 'Curl femoral en máquina' },

  { grupo: 'Core',       nombre: 'Deadbug contralateral' },
  { grupo: 'Core',       nombre: 'Elevación de piernas en hollow' },
  { grupo: 'Abdomen',    nombre: 'Abdominal con rodillas flexionadas al pecho' },
  { grupo: 'Oblicuos',   nombre: 'Twist ruso con disco' },
  { grupo: 'Oblicuos',   nombre: 'Encogimientos laterales con manos detrás de la cabeza' },

  { grupo: 'Cardio',     nombre: 'Fartlek en cinta' },
  { grupo: 'Cardio',     nombre: 'Elíptica' },
  { grupo: 'Cardio',     nombre: 'Bicicleta estática' }
];

// Búsqueda pensada para que salga primero alguien explicando la postura,
// no una compilación de gente entrenando.
function videoDe(nombre) {
  const q = 'cómo hacer ' + nombre + ' técnica correcta postura';
  return 'https://www.youtube.com/results?search_query=' + encodeURIComponent(q);
}

function ejerciciosPorGrupo() {
  const grupos = {};
  for (const e of EJERCICIOS) (grupos[e.grupo] ||= []).push(e);
  return grupos;
}
