// ═══════════════════════════════════════════════════════════
//  Temas de reunión — la lógica
//
//  Los datos NO están acá: están en reuniones-datos.js, que se genera solo
//  desde los tableros de Canva. Este archivo sí se edita a mano.
//
//  Estados tal como los usa el equipo:
//    ✅️ Listo · 🚮 Descartado · ✏️ En proceso · ⌛ En cola
//    ❌ Sin empezar · 🔁 Recurrente · (vacío) = sin categorizar
// ═══════════════════════════════════════════════════════════

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
// Los temas recurrentes no tienen una fecha límite real: no se evalúan por fecha.
const RECURRENTE = /Recurrente/;

// Agrupa los temas por urgencia. Cada tema aparece una sola vez,
// en el primer grupo que le corresponde.
function temasPorUrgencia(hoyClave, reunion) {
  const g = { vencidos: [], porVencer: [], faltaCompletar: [], enMarcha: [], cerrados: [] };
  for (const t of TEMAS) {
    if (reunion && t.reunion !== reunion) continue;
    const cerrado = CERRADO.test(t.estado);
    const recurrente = RECURRENTE.test(t.estado);
    const dias = recurrente ? null : diasHasta(t.vence, hoyClave);
    const item = Object.assign({}, t, { dias });

    if (cerrado) { g.cerrados.push(item); continue; }
    if (!recurrente && dias !== null && dias < 0)  { g.vencidos.push(item); continue; }
    if (!recurrente && dias !== null && dias <= 7) { g.porVencer.push(item); continue; }

    const faltas = [];
    if (!t.estado) faltas.push('sin categorizar');
    if (!t.responsable) faltas.push('sin responsable');
    if (!recurrente && !t.vence) faltas.push('sin fecha límite');
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
