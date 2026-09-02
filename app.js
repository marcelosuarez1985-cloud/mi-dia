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
// Deportes que Marce sigue. Vienen de calendarios suscritos, no los carga él.
const DEPORTES = [
  // El emoji va primero: los eventos que carga la tarea automática ya vienen
  // con el nombre en castellano ("🏎️ Práctica 1 · GP de Italia"), y buscar sólo
  // los nombres en inglés del feed los dejaba afuera. Ya pasó.
  { re: /🏎️|f1|f[oó]rmula 1|gran premio|grand prix|gp de/i, icono: "🏎️", quien: "Colapinto" },
  { re: /river/i,     icono: "⚽", quien: "River" },
  { re: /inter miami/i, icono: "⚽", quien: "Messi" }
];

function deporteDe(titulo) {
  for (const d of DEPORTES) if (d.re.test(titulo)) return d;
  return null;
}

// Cómo se llama cada sesión de un fin de semana de Fórmula 1, en criollo.
const SESIONES_F1 = [
  [/sprint.*qualif|sprint shootout/i, 'Clasificación sprint'],
  [/sprint/i,                         'Carrera sprint'],
  [/grand prix|gran premio/i,         'La carrera'],
  [/qualifying|clasific/i,            'Clasificación'],
  [/\bfp1\b|practice 1/i,             'Práctica 1'],
  [/\bfp2\b|practice 2/i,             'Práctica 2'],
  [/\bfp3\b|practice 3/i,             'Práctica 3']
];

// Los nombres de los Grandes Premios vienen en inglés y como gentilicio.
const PAISES_F1 = {
  Australian:'Australia', Chinese:'China', Japanese:'Japón', Bahrain:'Bahréin',
  'Saudi Arabian':'Arabia Saudita', Miami:'Miami', Canadian:'Canadá',
  'Emilia Romagna':'Imola', Monaco:'Mónaco', Spanish:'España', Austrian:'Austria',
  British:'Gran Bretaña', Hungarian:'Hungría', Belgian:'Bélgica', Dutch:'Países Bajos',
  Italian:'Italia', Madrid:'Madrid', Azerbaijan:'Azerbaiyán', Singapore:'Singapur',
  'United States':'Estados Unidos', 'Mexico City':'México', Mexican:'México',
  'São Paulo':'Brasil', Brazilian:'Brasil', 'Las Vegas':'Las Vegas',
  Qatar:'Qatar', 'Abu Dhabi':'Abu Dhabi', Malaysian:'Malasia', Portuguese:'Portugal'
};

// "F1: FP2 (Italian Grand Prix)" → { que: 'Práctica 2', donde: 'GP de Italia' }
//
// Ojo: la sesión hay que buscarla SÓLO en la parte de afuera del paréntesis.
// Adentro siempre dice "Grand Prix", así que si se busca en todo el título
// las prácticas también salen como si fueran la carrera. Ya pasó.
function detalleF1(titulo) {
  const m = titulo.match(/\(([^)]+)\)/);
  const sesion = titulo.replace(/\s*\([^)]*\)\s*/, '');

  let que = '';
  for (const [re, nombre] of SESIONES_F1) if (re.test(sesion)) { que = nombre; break; }

  let donde = '';
  if (m) {
    const bruto = m[1].replace(/\s*Grand Prix\s*$/i, '').trim();
    donde = 'GP de ' + (PAISES_F1[bruto] || bruto);
  }
  return { que, donde };
}

function clasificar(titulo) {
  const t = titulo.toLowerCase();
  if (deporteDe(titulo)) return 'deporte';
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
    // Natación y Zumba son clases con horario fijo: hay que estar antes.
    // Al club son 10 minutos. Natación pide 5 más para cambiarse.
    if (/nataci/.test(t)) return 15;
    if (/zumba/.test(t))  return 10;
    return 5;    // musculación: entrás cuando llegás, no hay horario que perder
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
      // "INVITED" = te invitaron y no contestaste · "MAYBE" = dijiste quizás
      sinResponder: ev.respuesta === 'INVITED' || ev.respuesta === 'MAYBE',
      quizas: ev.respuesta === 'MAYBE',
      invitaba: ev.invitaba || '',
      // Un partido o una carrera no es un compromiso: se mira, no se va a
      // ningún lado. Por eso no ocupa el día, no tapa un bloque de trabajo y
      // no corre la hora de soltar el celular.
      deporte: deporteDe(ev.titulo),
      externo: ev.propio === false,
      calendario: ev.calendario || '',
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
  const conHora = evs.filter(e => !e.todoElDia && e.tipo !== 'deporte');
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
      && ev.tipo !== 'deporte'
      && ev.tipo !== 'trabajo';   // un bloque de trabajo en casa no fija la hora de levantarse
}

// A qué hora terminás hoy. Un bloque de trabajo cuenta: si el día se te va
// hasta las 19, terminaste a las 19.
function finDelDia(eventos, hoy) {
  const deHoy = eventos.filter(e => e.clave === hoy.clave && !e.todoElDia
                                 && e.tipo !== 'comida' && e.tipo !== 'deporte');
  if (!deHoy.length) return null;
  return Math.max(...deHoy.map(e => e.minFin));
}

// Nunca sugerimos soltar el teléfono antes de esta hora: si el día terminó
// a las 10:30, decirte "cortá 11:30" no tiene ningún sentido.
const PISO_SOLTAR = 19 * 60;

function horaDeSoltar(fin, tope) {
  return Math.min(Math.max(fin + 60, PISO_SOLTAR), tope);
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
    // Aunque mañana esté libre, hoy terminás a una hora: una después, cortá.
    const finLibre = finDelDia(eventos, hoy);
    const soltarLibre = finLibre === null ? null : horaDeSoltar(finLibre, 23 * 60);
    return {
      libre: soltarLibre === null,
      soltar: soltarLibre === null ? null : hhmm(soltarLibre),
      yaPaso: soltarLibre !== null && hoy.minutos > soltarLibre,
      explicacion: soltarLibre === null
        ? `Mañana no tenés nada fijo y hoy tampoco tenías nada agendado.${cola}`
        : `Hoy terminás ${hhmm(finLibre)}. Mañana no tenés nada fijo, así que la hora no ` +
          `depende de a qué hora te levantás: cortá una hora después de terminar.${cola}`
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
  let capado = soltar >= 0 || soltarReal > TOPE_MAXIMO;
  if (capado) soltarReal = TOPE_MAXIMO;

  // Regla de Marce: el día que termina temprano, se suelta temprano.
  // Una hora después de terminar la última actividad, y nunca más tarde que
  // lo que ya calculamos. Termina 21:00 → 22:00. Termina 19:00 → 20:00.
  const fin = finDelDia(eventos, hoy);
  let porFinDelDia = false;
  if (fin !== null) {
    const trasTerminar = horaDeSoltar(fin, TOPE_MAXIMO);
    if (trasTerminar < soltarReal) { soltarReal = trasTerminar; porFinDelDia = true; capado = false; }
  }

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
      (porFinDelDia
        ? `hoy terminás ${hhmm(fin)}, así que cortá una hora después y aprovechá el día corto. `
        : capado
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

  // Un evento ocupa desde que salís de casa hasta que volvés.
  // La vuelta importa: el sábado terminás en Parque Chacabuco a las 12:00 y
  // esa hora siguiente es el viaje, no tiempo libre.
  const ocupado = evsDelDia
    .filter(e => !e.todoElDia && e.tipo !== 'deporte')
    .map(e => [Math.min(e.minIni, e.minSalida), e.minFin + e.traslado])
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

// "mañana", "el lunes", "el jueves que viene" — según cuántos días falten.
// Existe porque la app decía "mañana" para cualquier cosa que no fuera hoy, y
// un sábado a la noche eso hacía aparecer el lunes como si fuera el domingo.
function cuandoEs(hoyClave, clave) {
  const dias = Math.round(
    (new Date(clave + 'T12:00:00') - new Date(hoyClave + 'T12:00:00')) / 86400000);
  if (dias <= 0) return 'hoy';
  if (dias === 1) return 'mañana';
  const nombre = new Date(clave + 'T12:00:00')
    .toLocaleDateString('es-AR', { weekday: 'long' });
  if (dias <= 6) return 'el ' + nombre;
  return 'el ' + nombre + ' que viene';
}

// ───────── Invitaciones sin responder ─────────
// Eventos que otro te mandó y siguen esperando un sí o un no. Aparecen aparte
// porque es fácil que se pierdan entre lo que ya está confirmado.
function invitacionesPendientes(eventos, hoyClave) {
  return eventos
    .filter(e => e.sinResponder && e.clave >= hoyClave)
    .sort((a, b) => a.ini - b.ini);
}

// El mail del que invita, en algo legible: "alejandrortiz84@gmail.com" → "alejandrortiz84"
function nombreDeMail(mail) {
  if (!mail) return '';
  return mail.split('@')[0].replace(/[._]/g, ' ');
}

// ───────── Deportes ─────────
// Cómo mostrar un partido o una sesión de F1 en criollo.
// "F1: FP2 (Italian Grand Prix)" → "🏎️ Práctica 2 · Italian Grand Prix"
function tituloDeporte(ev) {
  const d = ev.deporte;
  if (!d) return ev.titulo;
  // Si ya viene con el emoji adelante, es uno de los que cargó la tarea
  // automática: ya está en castellano y no hay nada que traducir.
  if (/^\s*(🏎|⚽)/u.test(ev.titulo)) return ev.titulo.trim();
  if (d.quien === 'Colapinto') {
    const f = detalleF1(ev.titulo);
    return d.icono + ' ' + (f.que || 'Fórmula 1') + (f.donde ? ' · ' + f.donde : '');
  }
  // Los feeds de fútbol traen el resultado entre paréntesis cuando ya se jugó
  return d.icono + ' ' + ev.titulo.replace(/\s*\(\d+-\d+\)\s*$/, '');
}

// Los próximos partidos y carreras, de hoy en adelante.
function proximosDeportes(eventos, hoyClave) {
  return eventos
    .filter(e => e.tipo === 'deporte' && e.clave >= hoyClave)
    .sort((a, b) => a.ini - b.ini);
}

// Agrupados por día, para que un fin de semana de F1 no sean cinco renglones sueltos
function deportesPorDia(eventos, hoyClave) {
  const dias = new Map();
  for (const e of proximosDeportes(eventos, hoyClave)) {
    if (!dias.has(e.clave)) dias.set(e.clave, []);
    dias.get(e.clave).push(e);
  }
  return [...dias.entries()];
}
