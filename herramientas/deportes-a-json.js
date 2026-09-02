// Lee los calendarios .ics de F1, River e Inter Miami y devuelve, en JSON, los
// partidos y sesiones de los próximos N días, ya con el nombre en criollo.
//
// Se usa para cargarlos en el Google Calendar de Marce. No se suscribe el
// calendario porque el conector no permite suscripciones: se crean los eventos.
const https = require('https');

const FUENTES = [
  { url: 'https://files-f1.motorsportcalendars.com/f1-calendar_p1_p2_p3_q_sprint_gp.ics', que: 'f1' },
  { url: 'https://ics.fixtur.es/v2/river-plate.ics',   que: 'futbol' },
  { url: 'https://ics.fixtur.es/v2/inter-miami-cf.ics', que: 'futbol' }
];

const DIAS = Number(process.argv[2] || 22);

const PAISES = {
  Australian:'Australia', Chinese:'China', Japanese:'Japón', Bahrain:'Bahréin',
  'Saudi Arabian':'Arabia Saudita', Miami:'Miami', Canadian:'Canadá',
  'Emilia Romagna':'Imola', Monaco:'Mónaco', Spanish:'España', Austrian:'Austria',
  British:'Gran Bretaña', Hungarian:'Hungría', Belgian:'Bélgica', Dutch:'Países Bajos',
  Italian:'Italia', Madrid:'Madrid', Azerbaijan:'Azerbaiyán', Singapore:'Singapur',
  'United States':'Estados Unidos', 'Mexico City':'México', Mexican:'México',
  'São Paulo':'Brasil', Brazilian:'Brasil', 'Las Vegas':'Las Vegas',
  Qatar:'Qatar', 'Abu Dhabi':'Abu Dhabi', Malaysian:'Malasia', Portuguese:'Portugal'
};

const SESIONES = [
  [/sprint.*qualif|sprint shootout/i, 'Clasificación sprint'],
  [/sprint/i,                         'Carrera sprint'],
  [/grand prix|gran premio/i,         'La carrera'],
  [/qualifying|clasific/i,            'Clasificación'],
  [/\bfp1\b|practice 1/i,             'Práctica 1'],
  [/\bfp2\b|practice 2/i,             'Práctica 2'],
  [/\bfp3\b|practice 3/i,             'Práctica 3']
];

function bajar(url) {
  return new Promise((ok, fallo) => {
    https.get(url, r => {
      if (r.statusCode >= 300 && r.statusCode < 400 && r.headers.location) {
        r.resume();
        return bajar(r.headers.location).then(ok, fallo);
      }
      if (r.statusCode !== 200) { r.resume(); return fallo(new Error(url + ' → ' + r.statusCode)); }
      let d = '';
      r.setEncoding('utf8');
      r.on('data', c => d += c);
      r.on('end', () => ok(d));
    }).on('error', fallo);
  });
}

// Las líneas largas de un .ics siguen en la línea siguiente con un espacio adelante
function desdoblar(texto) {
  return texto.replace(/\r\n/g, '\n').replace(/\n[ \t]/g, '');
}

function aFecha(v) {
  const m = v.match(/(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z/);
  if (!m) return null;                       // los de todo el día no nos sirven
  return new Date(Date.UTC(+m[1], m[2] - 1, +m[3], +m[4], +m[5], +m[6]));
}

function nombreF1(titulo) {
  const m = titulo.match(/\(([^)]+)\)/);
  const sesion = titulo.replace(/\s*\([^)]*\)\s*/, '');
  let que = '';
  for (const [re, n] of SESIONES) if (re.test(sesion)) { que = n; break; }
  let donde = '';
  if (m) {
    const bruto = m[1].replace(/\s*Grand Prix\s*$/i, '').trim();
    donde = 'GP de ' + (PAISES[bruto] || bruto);
  }
  return '🏎️ ' + (que || 'Fórmula 1') + (donde ? ' · ' + donde : '');
}

(async function () {
  const desde = new Date();
  const hasta = new Date(Date.now() + DIAS * 864e5);
  const salida = [];

  for (const f of FUENTES) {
    let texto;
    try { texto = desdoblar(await bajar(f.url)); }
    catch (e) { console.error('No pude bajar ' + f.url + ': ' + e.message); continue; }

    for (const bloque of texto.split('BEGIN:VEVENT').slice(1)) {
      const ini = (bloque.match(/^DTSTART[^:]*:(.+)$/m) || [])[1];
      const fin = (bloque.match(/^DTEND[^:]*:(.+)$/m) || [])[1];
      let sum   = (bloque.match(/^SUMMARY:(.+)$/m) || [])[1];
      if (!ini || !sum) continue;

      const d1 = aFecha(ini.trim());
      if (!d1 || d1 < desde || d1 > hasta) continue;
      const d2 = aFecha((fin || '').trim()) || new Date(d1.getTime() + 2 * 36e5);

      sum = sum.trim();
      // Si ya trae el resultado entre paréntesis, es un partido jugado
      if (/\(\d+-\d+\)\s*$/.test(sum)) continue;

      salida.push({
        titulo: f.que === 'f1' ? nombreF1(sum) : '⚽ ' + sum,
        inicio: d1.toISOString(),
        fin: d2.toISOString(),
        // Sólo avisamos de lo que se mira entero, no de cada práctica
        avisar: /La carrera|Carrera sprint/.test(f.que === 'f1' ? nombreF1(sum) : '') || f.que === 'futbol'
      });
    }
  }

  salida.sort((a, b) => new Date(a.inicio) - new Date(b.inicio));
  process.stdout.write(JSON.stringify(salida, null, 1));
})();
