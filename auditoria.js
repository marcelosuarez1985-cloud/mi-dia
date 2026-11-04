// ═══════════════════════════════════════════════════════════
//  Auditoría de la rutina de SportClub para correr el 8K — 04/11/2026
//
//  Es una OPINIÓN MÍA armada leyendo estudios y notas de entrenadores, no una
//  indicación médica ni del profe. La rutina del profe es de "Tonificación
//  Fitness": sirve para estar fuerte y sano, pero no fue pensada para correr.
//  Nada de esto la reemplaza; son sugerencias para charlar con él.
//
//  Qué tan firme es lo que sé (para no venderte humo):
//   · Fuerza con cargas pesadas + saltos suaves mejoran un poco la economía de
//     carrera (revisión de 31 estudios, 2024, con evidencia de calidad media-baja).
//   · Gemelos y sóleo: recomendados por casi todos los kinesiólogos, pero la
//     prueba de que evitan lesiones es floja (opinión de expertos).
//   · Cadera (glúteo medio): los estudios dan resultados mezclados. Razonable,
//     no probado.
//   · Abdomen: un solo estudio chico a favor del trabajo de core; que el
//     "anti-rotación" sea mejor que el crunch es lógica, no medición.
//   · Tibial / pie: evidencia muy débil. Opcional.
// ═══════════════════════════════════════════════════════════

// 'sirve' = ayuda a correr · 'poco' = ayuda algo · 'nosuma' = no suma para correr (no hace mal)
const VEREDICTOS = {
  'Crunch': ['poco', 'Mueve el abdomen, pero correr pide un tronco quieto, no uno que se dobla. El dead bug es mejor.'],
  'Plancha lateral sobre codos': ['sirve', 'Entrena la cadera y el tronco de costado, que es lo que se te mueve en cada paso.'],
  'Extensiones en banco lumbar': ['poco', 'Da resistencia a la espalda baja. Sirve, sin ser clave.'],
  'Sentadilla búlgara con mancuernas': ['sirve', 'La mejor de la rutina para correr: una pierna por vez, igual que al trotar.'],
  'Sentadilla + press vertical': ['poco', 'La sentadilla suma; el press de hombros no. Con 15 repeticiones es más resistencia que fuerza.'],
  'Remo en posición dividida con mancuerna': ['nosuma', 'Espalda y postura. Está bien, pero no cambia tu carrera.'],
  'Press de banco inclinado con mancuernas': ['nosuma', 'Pecho. Estético, no ayuda a correr.'],
  'Flexión de rodilla a una pierna': ['sirve', 'Isquiotibiales de a una pierna: son los que más se lesionan al correr rápido.'],
  'Abductores en máquina': ['poco', 'Cadera de costado, pero sentado y sin equilibrio. Mejor los pasos laterales con banda, de pie.'],
  'Extensión de codo sobre cabeza con disco': ['nosuma', 'Tríceps. No suma.'],
  'Plancha cruzando por debajo': ['sirve', 'Tronco firme mientras se mueve un lado: se parece a lo que hace el cuerpo al correr.'],
  'Abdominales oblicuos rodilla flexionada': ['poco', 'Abdomen que gira. Correr pide lo contrario: no girar. Suma poco.'],
  'Pullover en polea alta': ['nosuma', 'Dorsales. No suma.'],
  'Patada atrás en polea baja': ['poco', 'Glúteo con poco peso y de costado. Sirve de apoyo, no de base.'],
  'Tirón de polea': ['nosuma', 'Espalda. No suma.'],
  'Vuelo lateral en máquina': ['nosuma', 'Hombros. No suma.'],
  'Isquiotibiales en máquina': ['sirve', 'Isquios: protegen el músculo de atrás del muslo.'],
  'Aductores en máquina': ['poco', 'Interior del muslo. Equilibra a los abductores; poco más.'],
  'Curl de bíceps en banco Scott': ['nosuma', 'Bíceps. No suma.'],
  'Swimming': ['poco', 'Espalda baja y glúteo con poca carga. Complementa.'],
  'Peso muerto desde el suelo': ['sirve', 'Glúteos, isquios y espalda juntos: la base de la fuerza para correr.'],
  'Subidas al cajón': ['sirve', 'Una pierna, subiendo y empujando: muy parecido a cada zancada.'],
  'Remo bajo en máquina': ['nosuma', 'Espalda. No suma.'],
  'Press de banco plano alterno con mancuernas': ['nosuma', 'Pecho. No suma.'],
  'Extensiones de rodilla en máquina': ['poco', 'Cuádriceps en máquina. Las subidas al cajón ya lo cubren mejor.'],
  'Extensión de codo con agarre en V': ['nosuma', 'Tríceps. No suma.'],
  'Deltoides posterior en contractora': ['nosuma', 'Hombro de atrás. No suma.']
};

// Lo que el profe NO da y para correr hace falta.
// `cuando` dice dónde entra sin pisar al jueves (que queda de descanso).
const EXTRAS_CORRER = [
  { nombre: 'Gemelo de pie, a una pierna', dosis: '3 × 10 por pierna, lento (3 seg subiendo, 3 bajando)',
    cuando: 'Martes y sábado, después de correr', video: 'mglUFGy0sKM',
    para: 'En cada paso el gemelo aguanta varias veces tu peso. Es lo más importante que falta, y lo primero que castiga un 8K sin base.',
    firmeza: 'Recomendado por casi todos los kinesiólogos; prueba de que evita lesiones: floja.' },
  { nombre: 'Sóleo (gemelo con la rodilla flexionada)', dosis: '3 × 12, sentado con una mancuerna sobre la rodilla',
    cuando: 'Martes y sábado, junto al gemelo', video: 'l5XRbpQwKF0',
    para: 'Es el músculo profundo de la pantorrilla y el que más trabaja al trotar. Se entrena con la rodilla doblada, que es distinto al gemelo.',
    firmeza: 'Misma firmeza que el gemelo: lógica sólida, estudios flojos.' },
  { nombre: 'Puente de glúteo a una pierna', dosis: '3 × 10 por pierna',
    cuando: 'Martes, después de correr', video: '7f4Ey9AnRyY',
    para: 'Glúteo y cadera firmes mientras apoyás una sola pierna, que es todo lo que hacés al correr.',
    firmeza: 'Razonable; los estudios de cadera dan resultados mezclados.' },
  { nombre: 'Pasos laterales con banda elástica', dosis: '2 × 12 pasos para cada lado',
    cuando: 'Sábado, antes de salir (calienta la cadera)', video: 'HgUZkJs1qeM',
    para: 'Glúteo medio, el que evita que la cadera se caiga de costado. Reemplaza a la máquina de abductores, que se hace sentado.',
    firmeza: 'Razonable; no está probado que cambie cómo corrés.' },
  { nombre: 'Dead bug (bicho muerto)', dosis: '3 × 8 por lado',
    cuando: 'Martes, en lugar del crunch o además', video: 'HN3wyEcYC2g',
    para: 'Abdomen que mantiene la columna quieta mientras se mueven brazos y piernas, como al correr.',
    firmeza: 'Un solo estudio chico a favor del core; la ventaja sobre el crunch es lógica, no medida.' },
  { nombre: 'Press Pallof (resistir el giro)', dosis: '3 × 10 por lado, con banda o polea',
    cuando: 'Lunes o viernes en el gimnasio, al final', video: 'W8Yf1uyUnoM',
    para: 'Entrena el tronco para NO girar cuando la pierna y el brazo se cruzan. Lo hacés en la polea del club.',
    firmeza: 'Misma firmeza que el dead bug.' },
  { nombre: 'Saltitos suaves (pogo)', dosis: '2 × 20 saltitos cortos, rápidos, sobre las puntas',
    cuando: 'Sólo desde el martes 24/11, antes de correr', video: 'NR82-6hthGc',
    para: 'Enseñan al tobillo y al gemelo a rebotar, como un resorte. Eso gasta menos energía al correr.',
    firmeza: 'De lo mejor respaldado: una revisión de 31 estudios (2024) muestra un efecto chico a favor. Empezar tarde y suave.' },
  { nombre: 'Puntas de pie contra la pared (tibial)', dosis: '2 × 15',
    cuando: 'Opcional, martes', video: 'eqodTFUWxiw',
    para: 'La parte de adelante de la pierna. Ayuda si te molestan las canillas.',
    firmeza: 'Muy débil. Hacelo sólo si sentís molestia ahí.' }
];

// Cosas a cuidar con lo que ya hacés (para charlar con el profe)
const AVISOS_RUTINA = [
  'El viernes (sesión 3) tiene peso muerto, cajón y extensiones, y el sábado corrés lo largo. Si el viernes terminás con las piernas pesadas, bajá una serie en cada uno.',
  'Las dos últimas semanas (desde el lunes 14/12) pedile al profe menos series de piernas. La última sesión pesada de piernas, antes del jueves 24/12; la semana de la carrera, sólo suave.',
  'Si el profe puede, que alguna semana te dé series más pesadas y cortas (5 o 6 repeticiones) en peso muerto y búlgara: es lo que más mejora la economía al correr. Con cuidado y sin apuro.',
  'El jueves de natación no se toca: es tu día de aflojar.'
];

const FIRMEZA_GENERAL = 'La fuerza pesada y los saltos suaves mejoran un poco el gasto de energía al correr (revisión de 31 estudios, 2024, evidencia media-baja). Para el resto la base es opinión de expertos. Esto es una sugerencia mía, no una indicación médica: consultalo con el profe y, si tenés dolor, con un kinesiólogo.';

function videoExtra(e) { return 'https://www.youtube.com/watch?v=' + e.video; }
