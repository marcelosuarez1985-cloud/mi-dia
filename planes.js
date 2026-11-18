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

// Un bloque de trabajo se corre; una reunión o una clase, no.
function esMovible(ev) {
  return ev.tipo === 'trabajo';
}

// Compromisos que no se tocan: si una alternativa choca con esto, no se ofrece.
const TIPOS_DUROS = ['reunion', 'docencia', 'familia'];

// Qué se cruza con esa franja. Devuelve la lista, no un sí o un no:
// (ya no se usa)
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
  const esTrote = /trote|correr/.test(ev.titulo.toLowerCase());

  if (esTrote) {
    // Salir a correr (sábado y martes) tiene sus propias alternativas
    if (diaSemana === 6) {
      planes.push({
        letra: 'B', que: 'Pasarlo al domingo temprano',
        cuando: 'domingo a la mañana',
        porque: 'Sólo si no te come el tiempo de familia. Si lo invade, no va.'
      });
    } else {
      // Entre semana no se pasa a otro día: el sábado ya tiene su salida.
      planes.push({
        letra: 'B', que: 'Correr más tarde, aunque sea 30 minutos',
        cuando: 'a la tarde, cuando cierres el último bloque de trabajo',
        porque: 'Media salida suma más que ninguna. Si tampoco entra, se anota y sigue.'
      });
    }
  } else {
    // 1) Caminata en el primer hueco que aparezca
    const hueco = primerHueco(40, ahora + 15, evsDelDia, ev);
    if (hueco !== null) {
      planes.push({
        letra: planes.length ? 'C' : 'B',
        que: 'Caminata de 30–40 minutos',
        cuando: hhmm(hueco) + '–' + hhmm(hueco + 40),
        porque: 'No necesitás ningún horario. Mueve el bloque de trabajo si hace falta.'
      });
    }
  }

  // 2) Registrarlo y seguir
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
