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
    if (/p\.c\.|parque chacabuco/.test(t)) return 70;  // cerca: ingresa 1 h antes
    return 120;                                         // resto de las sedes: 2 h antes
  }
  return 0;
}

function lugarDe(ev, tipo) {
  if (ev.lugar) return ev.lugar;
  const t = ev.titulo.toLowerCase();
  if (/sportclub|flores|musculaci|zumba|nataci/.test(t)) return 'SportClub Flores';
  if (/p\.c\./.test(t)) return 'Parque Chacabuco';
  if (/v\.p\./.test(t)) return 'Villa del Parque';
  if (/trote/.test(t)) return 'Salida desde casa';
  if (tipo === 'reunion') return 'Virtual';
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
function calcularCierre(eventos, hoy, ahora) {
  const futuros = eventos.filter(e => e.ini > ahora && !e.todoElDia && e.clave !== hoy.clave);
  if (!futuros.length) return null;
  const manana = futuros[0];
  const salidaManana = manana.traslado > 0 ? manana.minIni - manana.traslado : manana.minIni;
  const levantarse = salidaManana - MIN_PREP_MANANA;
  const dormido = levantarse - HORAS_DE_SUENO * 60;
  const soltar = dormido - MINUTOS_PARA_DORMIRSE;
  const p = partes(manana.ini);

  let minAhora = hoy.minutos, minSoltar = ((soltar % 1440) + 1440) % 1440;
  if (minSoltar < 6 * 60) minSoltar += 1440;
  if (minAhora < 6 * 60) minAhora += 1440;

  return {
    soltar: hhmm(soltar),
    yaPaso: minAhora > minSoltar,
    explicacion: `Mañana (${p.diaSemana}) arrancás con «${manana.titulo}» ${manana.hhmmIni}` +
      (manana.traslado > 0 ? `, salís de casa ${hhmm(salidaManana)}` : '') +
      `. Contando ${MIN_PREP_MANANA} min para prepararte y ${HORAS_DE_SUENO} h de sueño, ` +
      `te levantás ${hhmm(levantarse)} y tendrías que estar durmiendo ${hhmm(dormido)}. ` +
      `Es la hora tope, no una recomendación: si cortás antes, mejor.`
  };
}
