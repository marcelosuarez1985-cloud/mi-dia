// ═══════════════════════════════════════════════════════════
//  Comidas del mediodía — plan fijo de lunes a viernes
//
//  Es fijo a propósito: Marce compra una vez por semana y sabe
//  cada mañana qué le toca cocinar al mediodía. No rota ni sorprende.
//
//  Condiciones:
//    · proteico (28–40 g por porción)
//    · 25 minutos de cocción como techo
//    · cantidades para DOS porciones (Marce y su mujer)
//    · miércoles y jueves son días largos: la clase termina 22:00,
//      así que esos días el plato tiene que rendir más
//
//  Los platos de fin de semana (tortilla de papa, carne picada,
//  bife a la plancha) NO van acá a propósito: están anotados en
//  comidas-fin-de-semana.md y no se muestran en la app.
//
//  IMPORTANTE: son ideas de cocina rápida, no un plan nutricional.
//  Las cantidades y cualquier ajuste por salud los define un profesional.
// ═══════════════════════════════════════════════════════════

// 1 = lunes ... 5 = viernes. proteina = gramos por porción.
const PLAN_SEMANAL = {
  1: {
    nombre: 'Wok de pollo con verduras y salsa de soja',
    proteina: 40, minutos: 20, diaLargo: false,
    ingredientes: '400 g de pechuga · 1 morrón rojo · 1 zucchini · 1 cebolla · salsa de soja',
    pasos: 'Pollo en tiras a fuego fuerte 6 min. Sumás morrón, zucchini y cebolla, 5 min más. Soja al final.'
  },
  2: {
    nombre: 'Merluza al horno con limón y brócoli',
    proteina: 35, minutos: 20, diaLargo: false,
    ingredientes: '400 g de filetes de merluza · 1 brócoli · 1 limón · 2 dientes de ajo',
    pasos: 'Horno fuerte. Filetes con limón, ajo y aceite, 12–15 min. Brócoli al vapor 6 min en el microondas.'
  },
  3: {
    nombre: 'Milanesa de pollo al horno con ensalada',
    proteina: 40, minutos: 25, diaLargo: true,
    ingredientes: '4 milanesas de pollo · 1 lechuga · 2 tomates',
    pasos: 'Horno a 200°, 20 min dando vuelta a la mitad. Ensalada mientras tanto. Al horno queda liviana.'
  },
  4: {
    nombre: 'Pollo a la plancha con puré de calabaza',
    proteina: 40, minutos: 25, diaLargo: true,
    ingredientes: '400 g de pechuga · 1 calabaza chica (~1 kg)',
    pasos: 'Calabaza en cubos al microondas 8 min y pisarla. Pechuga abierta al medio, 5 min por lado.'
  },
  5: {
    nombre: 'Atún con garbanzos, cebolla morada y aceitunas',
    proteina: 35, minutos: 5, diaLargo: false,
    ingredientes: '2 latas de atún al natural · 1 lata de garbanzos · 1 cebolla morada · aceitunas · cherries',
    pasos: 'Sin cocción: atún escurrido, garbanzos enjuagados, cebolla en pluma, aceitunas y cherries. Aceite de oliva.'
  }
};

// Devuelve el plato fijo de ese día. Sábado y domingo no tienen plan acá.
function comidaDelDia(clave) {
  // Mediodía para que el huso horario no corra el día
  const dia = new Date(clave + 'T12:00:00').getDay();  // 0 = domingo
  return PLAN_SEMANAL[dia] || null;
}
