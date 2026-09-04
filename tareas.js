// ═══════════════════════════════════════════════════════════
//  Tareas de la semana — lo que Marce tiene que hacer
//
//  Tres fuentes, en una sola lista ordenada por prioridad:
//    1. Los temas de Canva que son suyos o de "Todos" y siguen abiertos
//       (salen de reuniones-datos.js; lo Listo o Descartado no entra nunca).
//    2. TAREAS_MARCE: las que él me dicta y yo cargo acá.
//    3. Las que agrega desde el teléfono (quedan guardadas en ese teléfono).
//
//  Cuando tilda una tarea, queda marcada como hecha en el teléfono y no vuelve
//  a aparecer. Lo que está hecho, está hecho: nunca se rearma como pendiente.
// ═══════════════════════════════════════════════════════════

// Dominios de la vida: cada tarea pertenece a uno. Lo de Canva es siempre Laboral.
const DOMINIOS = {
  Laboral:  '💼',
  Hogar:    '🏠',
  Familia:  '👨‍👩‍👧',
  Salud:    '🩺',
  Personal: '🙂',
};
const DOMINIO_POR_DEFECTO = 'Personal';

// Las que Marce me dicta. Fechas d/m/aaaa. Cuando me diga que está hecha,
// se saca de acá (no se marca: se borra).
const TAREAS_MARCE = [
  { id: 'obra-social',        dominio: 'Salud',   texto: 'Llamar a la obra social para darte de alta de nuevo',
    vence: '4/9/2026',  nota: 'Si se puede, hoy mismo.' },
  { id: 'pago-delfos',        dominio: 'Laboral', texto: 'Pagar a la sede de Delfos',
    vence: '5/9/2026',  nota: 'Tiene que estar liquidado antes del lunes.' },
  { id: 'feedback-videos',    dominio: 'Laboral', texto: 'Dar feedback a los estudiantes por los videos de sus sesiones',
    vence: '5/9/2026',  nota: 'Antes del domingo.' },
  { id: 'devolucion-guias',   dominio: 'Laboral', texto: 'Devolver las guías que entregaron los de primer año',
    vence: '5/9/2026',  nota: 'Antes del domingo.' },
  { id: 'pago-villa-parque',  dominio: 'Laboral', texto: 'Pagar a Villa del Parque',
    vence: '9/9/2026',  nota: 'El miércoles que viene.' },
  { id: 'compras-mes',        dominio: 'Hogar',   texto: 'Compras del mes, con el presupuesto de $400.000',
    vence: '13/9/2026', nota: 'Este domingo no: hasta el domingo 13.' },
  { id: 'presentacion-22',    dominio: 'Laboral', texto: 'Presentación del 22 de septiembre: diseño e impresión',
    vence: '22/9/2026', nota: 'Primero el diseño, después la imprenta. No dejarlo para el final.' },
];

// ───────── Guardado en el teléfono ─────────
const Tareas = {
  propias() { return Guardado.leer('tareasPropias', []); },
  hechas()  { return Guardado.leer('tareasHechas', {}); },

  agregar(texto, venceISO, dominio) {
    texto = (texto || '').trim();
    if (!texto) return false;
    const lista = this.propias();
    // aaaa-mm-dd (lo que da el selector de fecha) → d/m/aaaa (como el resto de la app)
    const vence = venceISO ? venceISO.split('-').reverse().map(Number).join('/') : '';
    if (!DOMINIOS[dominio]) dominio = DOMINIO_POR_DEFECTO;
    lista.push({ id: String(Date.now()), texto, vence, dominio });
    Guardado.escribir('tareasPropias', lista);
    return true;
  },
  marcar(id, hoyClave) {
    const h = this.hechas();
    h[id] = hoyClave;
    Guardado.escribir('tareasHechas', h);
  },
  desmarcar(id) {
    const h = this.hechas();
    delete h[id];
    Guardado.escribir('tareasHechas', h);
  },
  borrarPropia(id) {
    Guardado.escribir('tareasPropias', this.propias().filter(t => t.id !== id));
  }
};

// ───────── La lista, ordenada por prioridad ─────────
// Primero lo vencido (lo más vencido arriba), después por fecha, y al final
// lo que no tiene fecha. Devuelve { pendientes, hechas }.
function listaDeTareas(hoyClave) {
  const hechas = Tareas.hechas();
  const todas = [];

  if (typeof temasPorUrgencia === 'function') {
    const g = temasPorUrgencia(hoyClave);
    for (const t of [].concat(g.vencidos, g.porVencer, g.faltaCompletar, g.enMarcha)) {
      if (!t.mio) continue;
      todas.push({
        id: 'canva:' + t.reunion + ':' + t.tema + ':' + t.tarea,
        texto: t.tema, nota: t.tarea, vence: t.vence, dias: t.dias,
        origen: t.reunion, deTodos: /todos/i.test(t.responsable), dominio: 'Laboral'
      });
    }
  }
  for (const t of TAREAS_MARCE) {
    todas.push({ id: 'marce:' + t.id, texto: t.texto, nota: t.nota || '', vence: t.vence,
                 dias: diasHasta(t.vence, hoyClave), origen: 'Tuya',
                 dominio: DOMINIOS[t.dominio] ? t.dominio : DOMINIO_POR_DEFECTO });
  }
  for (const t of Tareas.propias()) {
    todas.push({ id: 'tel:' + t.id, texto: t.texto, nota: '', vence: t.vence,
                 dias: diasHasta(t.vence, hoyClave), origen: 'Tuya', delTelefono: true,
                 dominio: DOMINIOS[t.dominio] ? t.dominio : DOMINIO_POR_DEFECTO });
  }

  const prioridad = t => (t.dias === null || t.dias === undefined) ? 9999 : t.dias;
  const pendientes = todas.filter(t => !hechas[t.id]).sort((a, b) => prioridad(a) - prioridad(b));
  const listas = todas.filter(t => hechas[t.id]).map(t => Object.assign(t, { hechaEl: hechas[t.id] }));
  return { pendientes, hechas: listas };
}

// Reparte las pendientes entre los bloques de trabajo del día: el primer
// bloque se lleva las más urgentes, el siguiente las que siguen, y así.
// Como máximo 4 por bloque, para que sea una lista y no un muro.
function tareasParaBloque(pendientes, indice, totalBloques) {
  if (!pendientes.length || totalBloques < 1) return [];
  const porBloque = Math.min(4, Math.ceil(pendientes.length / totalBloques));
  return pendientes.slice(indice * porBloque, (indice + 1) * porBloque);
}
