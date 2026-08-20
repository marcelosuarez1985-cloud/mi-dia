// ═══════════════════════════════════════════════════════════
//  Comidas del mediodía — opciones rápidas y con proteína
//
//  Condiciones que pidió Marce:
//    · liviano, para poder seguir trabajando después
//    · proteico, porque está entrenando seis días por semana
//    · 30 minutos de cocción como techo
//    · después le quedan 30 min para comer y un rato para descansar
//
//  Su bloque de comida es 13:30–15:00, así que el reparto es:
//    13:30 cocinar · 14:00 comer · 14:30 parar
//
//  IMPORTANTE: son ideas de cocina rápida, no un plan nutricional.
//  Las cantidades y cualquier ajuste por salud los define un profesional.
// ═══════════════════════════════════════════════════════════

// proteina: gramos aproximados por porción
// minutos: de cocción, sin contar el tiempo de comer
// rendidor: true = aguanta mejor los días que la clase termina 22:00
const COMIDAS = [
  {
    nombre: 'Bife a la plancha con ensalada de rúcula y tomate',
    proteina: 40, minutos: 15, rendidor: false,
    pasos: 'Plancha bien caliente, 3–4 min de cada lado. Mientras se hace, rúcula, tomate, aceite de oliva y limón.'
  },
  {
    nombre: 'Pollo a la plancha con puré de calabaza',
    proteina: 40, minutos: 25, rendidor: true,
    pasos: 'Calabaza en cubos al microondas 8 min y pisarla. Pechuga abierta al medio, 5 min por lado.'
  },
  {
    nombre: 'Atún con garbanzos, cebolla morada y aceitunas',
    proteina: 35, minutos: 5, rendidor: false,
    pasos: 'Sin cocción: lata de atún al natural escurrida, garbanzos de lata enjuagados, cebolla en pluma, aceitunas, aceite de oliva.'
  },
  {
    nombre: 'Merluza al horno con limón y brócoli',
    proteina: 35, minutos: 20, rendidor: false,
    pasos: 'Horno fuerte. Filetes con limón, ajo y aceite, 12–15 min. Brócoli al vapor 6 min en el microondas.'
  },
  {
    nombre: 'Wok de pollo con verduras y salsa de soja',
    proteina: 40, minutos: 20, rendidor: true,
    pasos: 'Pollo en tiras a fuego fuerte 6 min. Sumás morrón, zucchini y cebolla, 5 min más. Soja al final.'
  },
  {
    nombre: 'Revuelto de huevos con espinaca y queso',
    proteina: 30, minutos: 12, rendidor: false,
    pasos: 'Espinaca salteada 3 min, 3 huevos batidos, revolver a fuego bajo. Queso rallado al final.'
  },
  {
    nombre: 'Milanesa de pollo al horno con ensalada',
    proteina: 40, minutos: 25, rendidor: true,
    pasos: 'Horno a 200°, 20 min dando vuelta a la mitad. Ensalada mientras tanto. Al horno queda liviana.'
  },
  {
    nombre: 'Carne picada salteada con morrón y arroz',
    proteina: 35, minutos: 25, rendidor: true,
    pasos: 'Arroz en una olla, 15 min. En paralelo, carne picada con cebolla y morrón, 10 min.'
  },
  {
    nombre: 'Ensalada de pollo, palta y huevo duro',
    proteina: 38, minutos: 15, rendidor: false,
    pasos: 'Huevos 10 min desde que hierve. Pollo a la plancha en tiras. Palta, hojas verdes, aceite de oliva.'
  },
  {
    nombre: 'Lentejas de lata con huevo duro y verduras',
    proteina: 28, minutos: 15, rendidor: true,
    pasos: 'Lentejas enjuagadas, salteadas 5 min con cebolla y zanahoria. Huevo duro arriba.'
  },
  {
    nombre: 'Tortilla de papa y cebolla con claras',
    proteina: 30, minutos: 25, rendidor: true,
    pasos: 'Papa en rodajas finas al microondas 6 min. Mezclás con 2 huevos + 3 claras y cuajás en sartén.'
  },
  {
    nombre: 'Salmón a la plancha con ensalada de quinoa',
    proteina: 38, minutos: 20, rendidor: false,
    pasos: 'Quinoa 12 min en agua hirviendo. Salmón 4 min por lado, piel abajo primero.'
  }
];

// Elige la comida del día. Es determinística: el mismo día siempre da la misma,
// así no te cambia la sugerencia cada vez que abrís la app.
function comidaDelDia(clave, diaLargo) {
  const semilla = Number(clave.replace(/-/g, ''));
  const candidatas = diaLargo ? COMIDAS.filter(c => c.rendidor) : COMIDAS;
  const principal = candidatas[semilla % candidatas.length];
  // La alternativa siempre sale del listado completo y nunca repite la principal
  const otras = COMIDAS.filter(c => c.nombre !== principal.nombre);
  const alternativa = otras[(semilla * 7) % otras.length];
  return { principal, alternativa };
}
