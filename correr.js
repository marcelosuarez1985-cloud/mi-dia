// ═══════════════════════════════════════════════════════════
//  Plan para correr — San Silvestre 8K, jueves 31/12/2026
//
//  Dos salidas por semana: martes (más corta) y sábado (la larga).
//  Lunes, miércoles y viernes son las pesas de SportClub.
//
//  Cómo está pensado (armado el 04/11/2026, propuesta mía, NO de un profe):
//
//  - Se mide en MINUTOS, no en kilómetros. Marce tiene una base de caminata
//    enorme (64 km a Luján en octubre) pero Strava no registra ninguna salida
//    corriendo desde mayo. Por eso arranca alternando trote y caminata, que
//    sirve igual si ya venía corriendo o si no. Si las primeras salidas le
//    quedan chicas, se sube el ritmo del plan.
//  - Todo el trote es a "ritmo de conversación": que pueda hablar con frases
//    enteras. Si no puede, va más lento.
//  - Dos salidas por semana es el mínimo para un 8K. Alcanza para terminarlo;
//    no para hacer marca. La natación del jueves suma como aire sin impacto.
//  - La más larga llega a 55 minutos (unos 6-7 km) doce días antes. Los
//    últimos días se baja para llegar fresco.
// ═══════════════════════════════════════════════════════════

const CARRERA = { fecha: '2026-12-31', nombre: 'San Silvestre', km: 8 };

const CORRER_ENTRADA = '5 min caminando rápido, 10 elevaciones de talones y 10 balanceos de cada pierna.';
const CORRER_SALIDA  = '5 min caminando suave para bajar las pulsaciones.';

// tipo: 'suave' · 'larga' · 'ritmo' · 'previa'
const PLAN_CORRER = [
  { fecha: '2026-11-07', semana: 1, tipo: 'larga', min: 24, que: '6 veces: 2 min trote + 2 min caminata',
    nota: 'Es la primera. Sirve para ver cómo estás: si te sobra, no cambies nada todavía.' },

  { fecha: '2026-11-10', semana: 2, tipo: 'suave', min: 20, que: '4 veces: 4 min trote + 1 min caminata' },
  { fecha: '2026-11-14', semana: 2, tipo: 'larga', min: 30, que: '5 veces: 5 min trote + 1 min caminata' },

  { fecha: '2026-11-17', semana: 3, tipo: 'suave', min: 24, que: '4 veces: 5 min trote + 1 min caminata' },
  { fecha: '2026-11-21', semana: 3, tipo: 'larga', min: 36, que: '4 veces: 8 min trote + 1 min caminata' },

  { fecha: '2026-11-24', semana: 4, tipo: 'suave', min: 27, que: '3 veces: 8 min trote + 1 min caminata' },
  { fecha: '2026-11-28', semana: 4, tipo: 'larga', min: 39, que: '3 veces: 12 min trote + 1 min caminata' },

  { fecha: '2026-12-01', semana: 5, tipo: 'suave', min: 26, que: '2 veces: 12 min trote + 1 min caminata' },
  { fecha: '2026-12-05', semana: 5, tipo: 'larga', min: 42, que: '2 veces: 20 min trote + 2 min caminata' },

  { fecha: '2026-12-08', semana: 6, tipo: 'suave', min: 30, que: '30 min de trote seguido, bien suave',
    nota: 'Feriado: tenés la mañana libre.' },
  { fecha: '2026-12-12', semana: 6, tipo: 'larga', min: 45, que: '45 min de trote seguido',
    nota: 'Si tenés que caminar un rato, caminás y retomás. Lo que cuenta es el tiempo.' },

  { fecha: '2026-12-15', semana: 7, tipo: 'ritmo', min: 30, que: '30 min, y cada 5 min un minuto un poco más rápido (4 veces)',
    nota: 'Lo único con algo de ritmo. Más rápido es "me cuesta hablar", no una carrera.' },
  { fecha: '2026-12-19', semana: 7, tipo: 'larga', min: 55, que: '55 min de trote seguido',
    nota: 'La más larga del plan: unos 6-7 km. Si la hacés, el 8K lo tenés.' },

  { fecha: '2026-12-22', semana: 8, tipo: 'suave', min: 25, que: '25 min de trote seguido, suave' },
  { fecha: '2026-12-26', semana: 8, tipo: 'previa', min: 20, que: '20 min suaves',
    nota: 'Se baja a propósito para llegar fresco. No sumes nada.' },
  { fecha: '2026-12-29', semana: 8, tipo: 'previa', min: 15, que: '15 min suaves + 4 aceleraciones de 20 segundos',
    nota: 'Activación. Esta semana también hay que retirar el kit y llevar el apto médico: confirmá la fecha en la web de la carrera.' },

  { fecha: '2026-12-31', semana: 8, tipo: 'carrera', min: null, que: 'San Silvestre · 8 km',
    nota: 'Salí lento: los primeros 2 km tienen que parecerte fáciles. Si al final te sobra, aprovechás el último.' }
];

function entrenoDeCorrer(clave) {
  return PLAN_CORRER.find(p => p.fecha === clave) || null;
}

// "falta 1 semana", "faltan 8 semanas": cuánto queda hasta la carrera
function diasParaLaCarrera(hoyClave) {
  const a = new Date(hoyClave + 'T12:00:00'), b = new Date(CARRERA.fecha + 'T12:00:00');
  return Math.round((b - a) / 86400000);
}
