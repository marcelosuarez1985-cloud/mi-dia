// ═══════════════════════════════════════════════════════════
//  Asistente personal de Marce — lógica principal
//  Este archivo NO contiene datos privados: se puede publicar.
//  El link del calendario se guarda en el teléfono (ver guardado.js)
// ═══════════════════════════════════════════════════════════

// ───────── Ajustes que podés cambiar ─────────
const TZ = 'America/Argentina/Buenos_Aires';
const HORAS_DE_SUENO        = 7.5;  // cuánto querés dormir
const MINUTOS_PARA_DORMIRSE = 30;   // colchón entre soltar el teléfono y estar durmiendo
const MIN_PREP_MANANA       = 45;   // desde que te levantás hasta salir de casa
const AVISO_ANTES           = 5;    // min antes de la salida en que te empieza a avisar
const INSISTIR_CADA         = 2;    // cada cuántos min te vuelve a insistir si no saliste
const RADIO_CASA            = 150;  // metros: más lejos que esto = ya saliste
const VIGILAR_DESDE         = 25;   // min antes de la salida en que prende el GPS
// ─────────────────────────────────────────────

const NOMBRES_MES = ['enero','febrero','marzo','abril','mayo','junio','julio',
                     'agosto','septiembre','octubre','noviembre','diciembre'];

const fmt = new Intl.DateTimeFormat('es-AR', {
  timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit',
  hour: '2-digit', minute: '2-digit', hourCycle: 'h23', weekday: 'long'
});

function partes(fecha) {
  const p = {};
  for (const { type, value } of fmt.formatToParts(fecha)) p[type] = value;
  return {
    clave: `${p.year}-${p.month}-${p.day}`,
    dia: Number(p.day),
    mes: Number(p.month) - 1,
    diaSemana: p.weekday,
    minutos: Number(p.hour) * 60 + Number(p.minute),
    hhmm: `${p.hour}:${p.minute}`
  };
}
function hhmm(mins) {
  mins = ((mins % 1440) + 1440) % 1440;
  return String(Math.floor(mins / 60)).padStart(2, '0') + ':' + String(mins % 60).padStart(2, '0');
}
function duracionTexto(mins) {
  if (mins < 0) mins = 0;
  const h = Math.floor(mins / 60), m = mins % 60;
  if (h > 0 && m > 0) return `${h} h ${m} min`;
  if (h > 0) return `${h} h`;
  return `${m} min`;
}
function esc(s) {
  return String(s).replace(/[&<>"]/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;' }[c]));
}

// ───────── Clasificación de eventos ─────────
function clasificar(titulo) {
  const t = titulo.toLowerCase();
  if (/musculaci|zumba|nataci|trote|gimnasio|cardio|yoga|stretching|cycle|movilidad|caminata|elongaci|bici|cinta/.test(t)) return 'entrenamiento';
  if (/comida|pausa|almuerzo|cena/.test(t)) return 'comida';
  if (/familia/.test(t)) return 'familia';
  if (/\btrabajo\b/.test(t)) return 'trabajo';
  if (/consejo|reuni|directorio/.test(t)) return 'reunion';
  if (/ecoa\.re|flacso|delfos|clínic|clinic|postítulo|postitulo|formaci|clase/.test(t)) return 'docencia';
  return 'otro';
}

// Regla de traslados de Marce
function minutosTraslado(titulo, lugar, tipo) {
  const t = (titulo + ' ' + (lugar || '')).toLowerCase();
  if (/virtual|zoom|meet|online/.test(t)) return 0;
  if (tipo === 'entrenamiento') {
    if (/casa|domicilio/.test(t)) return 0;
    return 5;                                          // SportClub Flores, 3 cuadras
  }
  if (tipo === 'docencia') {
    if (/p\.c\.|parque chacabuco/.test(t)) return 70;   // cerca: ingresa 1 h antes
    if (/flacso/.test(t)) return 60;                    // en FLACSO no prepara nada: 1 h alcanza
    return 120;                                          // resto de las sedes: 2 h antes
  }
  return 0;
}

function lugarDe(ev, tipo) {
  if (ev.lugar) return ev.lugar;
  const t = ev.titulo.toLowerCase();
  if (/sportclub|flores|musculaci|zumba|nataci/.test(t)) return 'SportClub Flores';
  if (/trote/.test(t)) return 'Salida desde casa';
  // Las reuniones de consejo (GIGNiT y ECOA.RE) son todas virtuales.
  // Va antes que las sedes para que un título con un día de la semana no la mande a una sede.
  if (tipo === 'reunion') return 'Virtual';
  // Sedes de las formaciones
  if (/p\.c\.|parque chacabuco|s[áa]bado/.test(t)) return 'Parque Chacabuco';
  if (/v\.p\.|villa del parque|mi[ée]rcoles/.test(t)) return 'Villa del Parque';
  if (/delfos|recoleta|jueves/.test(t)) return 'Delfos (Recoleta)';
  if (/flacso/.test(t)) return 'FLACSO';
  return '';
}

// ───────── Distancia entre dos puntos (metros) ─────────
function distancia(lat1, lon1, lat2, lon2) {
  const R = 6371000, rad = Math.PI / 180;
  const dLat = (lat2 - lat1) * rad, dLon = (lon2 - lon1) * rad;
  const a = Math.sin(dLat/2)**2 +
            Math.cos(lat1*rad) * Math.cos(lat2*rad) * Math.sin(dLon/2)**2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

// ───────── Normalizar los eventos que llegan de Google ─────────
function prepararEventos(crudos) {
  return crudos.map(ev => {
    const ini = new Date(ev.inicio), fin = new Date(ev.fin);
    const pi = partes(ini), pf = partes(fin);
    const tipo = clasificar(ev.titulo);
    const lugar = lugarDe(ev, tipo);
    const traslado = ev.todoElDia ? 0 : minutosTraslado(ev.titulo, lugar, tipo);
    return {
      id: `${pi.clave}|${ev.titulo}`,
      titulo: ev.titulo,
      descripcion: (ev.descripcion || '').trim(),
      todoElDia: ev.todoElDia,
      tipo, traslado, lugar,
      clave: pi.clave,
      ini, fin,
      minIni: pi.minutos,
      minFin: pf.clave === pi.clave ? pf.minutos : pf.minutos + 1440,
      hhmmIni: pi.hhmm,
      hhmmFin: pf.hhmm,
      salida: traslado > 0 ? hhmm(pi.minutos - traslado) : null,
      minSalida: pi.minutos - traslado
    };
  }).sort((a, b) => a.ini - b.ini);
}

// ───────── Alertas del día ─────────
function detectarAlertas(evs) {
  const alertas = [];
  const conHora = evs.filter(e => !e.todoElDia);
  for (let i = 1; i < conHora.length; i++) {
    const ant = conHora[i - 1], act = conHora[i];
    if (act.minIni < ant.minFin) {
      alertas.push(`Se superponen «${ant.titulo}» y «${act.titulo}».`);
    } else if (act.traslado > 0 && act.minSalida < ant.minFin) {
      alertas.push(`No te da el tiempo: «${ant.titulo}» termina ${ant.hhmmFin} y para «${act.titulo}» tendrías que salir de casa ${act.salida}.`);
    } else if (act.minIni === ant.minFin && act.traslado > 0) {
      alertas.push(`Sin margen entre «${ant.titulo}» y «${act.titulo}» — arrancan pegados.`);
    }
  }
  const ultimo = conHora[conHora.length - 1];
  if (ultimo && ultimo.minFin >= 22 * 60) {
    alertas.push(`Día largo: terminás ${ultimo.hhmmFin} y llegás a casa cerca de las 23.`);
  }
  return alertas;
}

// ───────── Cierre del día ─────────
// Una comida, un bloque de familia o un evento de todo el día NO cuentan como
// "hora de arranque": si los tomáramos como referencia saldrían horarios absurdos.
function esCompromisoReal(ev) {
  return !ev.todoElDia && ev.tipo !== 'comida' && ev.tipo !== 'familia'
      && ev.tipo !== 'trabajo';   // un bloque de trabajo en casa no fija la hora de levantarse
}

function calcularCierre(eventos, hoy, ahora) {
  // La clave del día de mañana, para saber si el próximo compromiso es mañana
  const manianaClave = partes(new Date(ahora.getTime() + 24 * 60 * 60 * 1000)).clave;

  const proximos = eventos.filter(e => e.ini > ahora && e.clave !== hoy.clave && esCompromisoReal(e));
  const prox = proximos[0];

  // Mañana no hay nada fijo: no hay hora tope real que calcular.
  if (!prox || prox.clave !== manianaClave) {
    let cola = '';
    if (prox) {
      const q = partes(prox.ini);
      cola = ` Tu próximo compromiso es «${prox.titulo}» el ${q.diaSemana} ${q.dia} a las ${prox.hhmmIni}.`;
    }
    return {
      libre: true,
      soltar: null,
      yaPaso: false,
      explicacion: `Mañana no tenés nada fijo, así que no hay una hora tope que dependa ` +
        `de a qué hora te levantás.${cola} Igual conviene cortar: un día libre no es motivo ` +
        `para arrastrar cansancio al resto de la semana.`
    };
  }

  const salidaManana = prox.traslado > 0 ? prox.minIni - prox.traslado : prox.minIni;
  const levantarse   = salidaManana - MIN_PREP_MANANA;
  const dormido      = levantarse - HORAS_DE_SUENO * 60;
  const soltar       = dormido - MINUTOS_PARA_DORMIRSE;
  const p = partes(prox.ini);

  // Techo: por más que la cuenta habilite trasnochar (ej. si mañana arrancás
  // tarde), nunca recomendamos cortar después de las 23:00.
  const TOPE_MAXIMO = 23 * 60;
  let soltarReal = ((soltar % 1440) + 1440) % 1440;
  // `soltar` negativo = la hora cae esta noche, que es lo esperable.
  // `soltar` positivo = la cuenta se fue a mañana a la mañana, o sea que
  // "podrías no dormir". Eso no es un consejo: en ese caso mandamos el tope.
  const capado = soltar >= 0 || soltarReal > TOPE_MAXIMO;
  if (capado) soltarReal = TOPE_MAXIMO;

  let minAhora = hoy.minutos, minSoltar = soltarReal;
  if (minSoltar < 6 * 60) minSoltar += 1440;
  if (minAhora  < 6 * 60) minAhora  += 1440;

  return {
    libre: false,
    capado,
    soltar: hhmm(soltarReal),
    yaPaso: minAhora > minSoltar,
    explicacion: `Mañana (${p.diaSemana}) arrancás con «${prox.titulo}» ${prox.hhmmIni}` +
      (prox.traslado > 0 ? `, salís de casa ${hhmm(salidaManana)}` : '') +
      `. Contando ${MIN_PREP_MANANA} min para prepararte y ${HORAS_DE_SUENO} h de sueño, ` +
      (capado
        ? `la cuenta te habilitaría a cortar más tarde, pero trasnochar no se compensa ` +
          `durmiendo hasta tarde: el tope queda en ${hhmm(TOPE_MAXIMO)}. `
        : `te levantás ${hhmm(levantarse)} y tendrías que estar durmiendo ${hhmm(dormido)}. `) +
      `Es la hora tope, no una recomendación: si cortás antes, mejor.`
  };
}

// ───────── Cruce con el programa de clases ─────────
// Une un evento del calendario con las filas del programa de esa fecha y sede.
const SEDE_POR_LUGAR = {
  'Delfos (Recoleta)': ['D1', 'D2'],
  'FLACSO (Recoleta)': ['FL'],
  'FLACSO':            ['FL'],
  'Villa del Parque':  ['VP'],
  'Parque Chacabuco':  ['PC']
};

function programaDeEvento(ev) {
  if (typeof clasesDelDia !== 'function') return [];
  const codigos = SEDE_POR_LUGAR[ev.lugar];
  if (!codigos) return [];
  return clasesDelDia(ev.clave).filter(c => codigos.indexOf(c.sedeCod) !== -1);
}

// Detecta que ese día das clase en una sede que no figura en tu calendario.
function clasesSinEvento(evsDelDia, clave) {
  if (typeof misClasesDelDia !== 'function') return [];
  const cubiertas = [];
  for (const ev of evsDelDia) {
    const cods = SEDE_POR_LUGAR[ev.lugar];
    if (cods) cubiertas.push(...cods);
  }
  return misClasesDelDia(clave).filter(c => cubiertas.indexOf(c.sedeCod) === -1);
}

// ───────── Clases de otras sedes, sin evento propio en el calendario ─────────
// Marce quiere ver qué se dicta en FLACSO aunque ese jueves no le toque a él.
function clasesInformativas(evsDelDia, clave) {
  if (typeof clasesDelDia !== 'function') return [];
  const cubiertas = [];
  for (const ev of evsDelDia) {
    const cods = SEDE_POR_LUGAR[ev.lugar];
    if (cods) cubiertas.push(...cods);
  }
  return clasesDelDia(clave)
    .filter(c => !c.esMio && c.sede && cubiertas.indexOf(c.sedeCod) === -1);
}

// ───────── Bloques de trabajo en los huecos del día ─────────
const TRABAJO_DESDE  = 9 * 60;    // no empezamos antes de las 09:00
const TRABAJO_HASTA  = 19 * 60;   // ni seguimos después de las 19:00
const HUECO_MINIMO   = 60;        // menos de una hora no da para sentarse a trabajar

function bloquesDeTrabajo(evsDelDia) {
  // Los domingos son de familia: no se agenda nada.
  if (evsDelDia.some(e => e.tipo === 'familia')) return [];
  // Si los bloques ya están cargados en el calendario, no los volvemos a calcular:
  // el calendario manda y así no aparecen duplicados.
  if (evsDelDia.some(e => e.tipo === 'trabajo')) return [];

  // Un evento ocupa desde que salís de casa hasta que termina.
  const ocupado = evsDelDia
    .filter(e => !e.todoElDia)
    .map(e => [Math.min(e.minIni, e.minSalida), e.minFin])
    .sort((a, b) => a[0] - b[0]);

  const libres = [];
  let cursor = TRABAJO_DESDE;
  for (const [desde, hasta] of ocupado) {
    if (desde > cursor) libres.push([cursor, Math.min(desde, TRABAJO_HASTA)]);
    cursor = Math.max(cursor, hasta);
    if (cursor >= TRABAJO_HASTA) break;
  }
  if (cursor < TRABAJO_HASTA) libres.push([cursor, TRABAJO_HASTA]);

  return libres
    .filter(([a, b]) => b - a >= HUECO_MINIMO)
    .map(([a, b]) => ({ desde: hhmm(a), hasta: hhmm(b), minutos: b - a, minIni: a, minFin: b }));
}

// ───────── Sugerencia de comida del mediodía ─────────
// Un día es "largo" cuando la última actividad termina 22:00 o más tarde:
// ahí la comida del mediodía es lo último sólido hasta pasadas las 22.
function esDiaLargo(evsDelDia) {
  return evsDelDia.some(e => !e.todoElDia && e.minFin >= 22 * 60);
}

function sugerenciaDeComida(ev) {
  if (typeof comidaDelDia !== 'function') return null;
  if (ev.tipo !== 'comida') return null;
  const plato = comidaDelDia(ev.clave);
  if (!plato) return null;                 // sábado y domingo no tienen plan fijo
  // Reparto del bloque: cocinar, comer, parar
  const comer = ev.minIni + plato.minutos;
  return {
    plato,
    horarios: `${hhmm(ev.minIni)} cocinar · ${hhmm(comer)} comer · ${hhmm(comer + 30)} parar`
  };
}
