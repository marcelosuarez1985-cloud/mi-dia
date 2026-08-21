// ═══════════════════════════════════════════════════════════
//  Planes B y C — qué hacer cuando algo no se cumple
//
//  La regla que puso Marce en el brief: cuando no puede cumplir algo,
//  el asistente NO lo borra ni lo deja vacío. Ofrece la alternativa más
//  cercana posible, en este orden:
//
//    1. Mismo día, otro horario
//    2. Actividad sustituta el mismo día
//    3. Mover al día libre más cercano
//    4. Descartar y anotarlo — sin culpa, sólo registro
// ═══════════════════════════════════════════════════════════

// Clases del SportClub Flores que sirven de reemplazo.
// dias: 1 = lunes ... 6 = sábado
const CLASES_CLUB = [
  { nombre: 'Yoga terapéutica',    hora: 12 * 60, dur: 60, dias: [1, 5] },
  { nombre: 'Cycle',               hora: 13 * 60, dur: 60, dias: [1, 2, 3, 4, 5] },
  { nombre: 'Movilidad articular', hora: 14 * 60, dur: 60, dias: [2, 4] },
  { nombre: 'Stretching',          hora: 15 * 60, dur: 60, dias: [1, 3, 5] }
];

const TRASLADO_CLUB = 5;   // tres cuadras

// Un bloque de trabajo se corre; una reunión o una clase, no.
function esMovible(ev) {
  return ev.tipo === 'trabajo';
}

// Compromisos que no se tocan: si una alternativa choca con esto, no se ofrece.
const TIPOS_DUROS = ['reunion', 'docencia', 'familia'];

// Qué se cruza con esa franja. Devuelve la lista, no un sí o un no:
// casi todas las clases del club chocan con el bloque de comida, y esconderlas
// por eso dejaría a Marce sin ninguna opción.
function choquesEn(desde, hasta, evsDelDia, excluir) {
  return evsDelDia.filter(e =>
    !e.todoElDia && e !== excluir &&
    Math.min(e.minIni, e.minSalida) < hasta && e.minFin > desde
  );
}

function franjaLibre(desde, hasta, evsDelDia, excluir) {
  return choquesEn(desde, hasta, evsDelDia, excluir).length === 0;
}

// Primer hueco de al menos `minutos` a partir de `desde`
function primerHueco(minutos, desde, evsDelDia, excluir) {
  const TOPE = 21 * 60;
  const bordes = evsDelDia
    .filter(e => !e.todoElDia && !esMovible(e) && e !== excluir && e.minFin > desde)
    .map(e => [Math.min(e.minIni, e.minSalida), e.minFin])
    .sort((a, b) => a[0] - b[0]);
  let cursor = desde;
  for (const [a, b] of bordes) {
    if (a - cursor >= minutos) return cursor;
    cursor = Math.max(cursor, b);
    if (cursor + minutos > TOPE) return null;
  }
  return cursor + minutos <= TOPE ? cursor : null;
}

// ───────── El cálculo principal ─────────
// Devuelve la lista de planes, del mejor al peor, con horarios reales.
function planesPara(ev, evsDelDia, hoy) {
  const planes = [];
  const ahora = hoy.minutos;
  const diaSemana = new Date(ev.clave + 'T12:00:00').getDay();
  const esTrote = /trote/.test(ev.titulo.toLowerCase());

  if (esTrote) {
    // El trote del sábado tiene sus propias alternativas
    const hueco = primerHueco(60, ahora + 15, evsDelDia, ev);
    if (hueco !== null) {
      planes.push({
        letra: 'B', que: 'Cardio en el gimnasio (cinta o bici)',
        cuando: hhmm(hueco) + '–' + hhmm(hueco + 60),
        porque: 'No depende del horario de nadie, entrás y lo hacés.'
      });
    }
    planes.push({
      letra: 'C', que: 'Pasarlo al domingo temprano',
      cuando: 'domingo a la mañana',
      porque: 'Sólo si no te come el tiempo de familia. Si lo invade, no va.'
    });
  } else {
    // 1) Clases del club que todavía no pasaron hoy
    for (const c of CLASES_CLUB) {
      if (!c.dias.includes(diaSemana)) continue;
      const salida = c.hora - TRASLADO_CLUB;
      if (salida < ahora + 10) continue;                       // ya no llegás
      const cruces = choquesEn(salida, c.hora + c.dur, evsDelDia, ev);
      if (cruces.some(e => TIPOS_DUROS.includes(e.tipo))) continue;   // pisa algo que no se mueve
      const molestos = cruces.filter(e => !esMovible(e));
      planes.push({
        letra: 'B', que: c.nombre + ' en el club',
        cuando: hhmm(c.hora) + '–' + hhmm(c.hora + c.dur) + ' · salís ' + hhmm(salida),
        porque: molestos.length
          ? 'Tendrías que correr «' + molestos[0].titulo.replace(/^[^\wÁÉÍÓÚáéíóúÑñ]+/, '') + '».'
          : 'Entra hoy mismo sin tocar nada de lo que ya tenés.'
      });
    }
    // 2) Caminata en el primer hueco que aparezca
    const hueco = primerHueco(40, ahora + 15, evsDelDia, ev);
    if (hueco !== null) {
      planes.push({
        letra: planes.length ? 'C' : 'B',
        que: 'Caminata de 30–40 minutos',
        cuando: hhmm(hueco) + '–' + hhmm(hueco + 40),
        porque: 'No necesitás club ni horario. Mueve el bloque de trabajo si hace falta.'
      });
    }
  }

  // 3) Registrarlo y seguir
  planes.push({
    letra: planes.length ? 'D' : 'B',
    que: 'Anotarlo como no cumplido',
    cuando: 'sin reprogramar',
    porque: 'Un día perdido no rompe el plan. Arrastrarlo con culpa, sí.'
  });

  return planes;
}

// ───────── Registro de cumplimiento ─────────
function registroEntrenamientos() {
  return Guardado.leer('cumplimiento', {});
}

function marcarEntrenamiento(ev, estado, detalle) {
  const reg = registroEntrenamientos();
  reg[ev.id] = { titulo: ev.titulo, clave: ev.clave, estado, detalle: detalle || '' };
  Guardado.escribir('cumplimiento', reg);
}

function estadoEntrenamiento(ev) {
  const r = registroEntrenamientos()[ev.id];
  return r ? r : null;
}

// Resumen de la semana: cuántos entrenamientos cumpliste
function resumenSemana(eventos, hoy) {
  const reg = registroEntrenamientos();
  const inicio = new Date(hoy.clave + 'T12:00:00');
  inicio.setDate(inicio.getDate() - ((inicio.getDay() + 6) % 7));   // lunes de esta semana
  const desde = partes(inicio).clave;

  const dela = eventos.filter(e =>
    e.tipo === 'entrenamiento' && e.clave >= desde && e.clave <= hoy.clave);
  let hechos = 0, reemplazados = 0, perdidos = 0;
  for (const e of dela) {
    const r = reg[e.id];
    if (!r) continue;
    if (r.estado === 'hecho') hechos++;
    else if (r.estado === 'reemplazado') reemplazados++;
    else if (r.estado === 'no') perdidos++;
  }
  const sinMarcar = dela.length - hechos - reemplazados - perdidos;
  return { total: dela.length, hechos, reemplazados, perdidos, sinMarcar };
}
