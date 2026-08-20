// ═══════════════════════════════════════════════════════════
//  Control de salidas: GPS + avisos que insisten
//  Vigila la próxima salida del día y registra si saliste a tiempo.
// ═══════════════════════════════════════════════════════════

const Guardado = {
  leer(clave, porDefecto) {
    try { return JSON.parse(localStorage.getItem('marce.' + clave)) ?? porDefecto; }
    catch { return porDefecto; }
  },
  escribir(clave, valor) {
    localStorage.setItem('marce.' + clave, JSON.stringify(valor));
  }
};

const Salidas = {
  vigilando: null,      // id del watchPosition activo
  eventoActual: null,   // evento cuya salida estamos vigilando
  avisosDados: null,    // qué avisos ya disparamos, para no repetirlos
  posicion: null,       // última posición conocida

  registro() { return Guardado.leer('registroSalidas', {}); },
  casa()     { return Guardado.leer('casa', null); },

  marcarCasa(alTerminar) {
    if (!navigator.geolocation) return alTerminar('Este navegador no tiene GPS.');
    navigator.geolocation.getCurrentPosition(
      pos => {
        Guardado.escribir('casa', { lat: pos.coords.latitude, lon: pos.coords.longitude });
        alTerminar(null);
      },
      err => alTerminar(traducirErrorGPS(err)),
      { enableHighAccuracy: true, timeout: 15000 }
    );
  },

  // Devuelve el estado de la salida de un evento: null | 'pendiente' | 'aviso' | 'tarde' | 'salio'
  estado(ev) {
    const reg = this.registro()[ev.id];
    if (reg && reg.salioA) return 'salio';
    return null;
  },

  registrarSalida(ev, minutoReal) {
    const reg = this.registro();
    reg[ev.id] = {
      titulo: ev.titulo,
      previsto: ev.salida,
      salioA: hhmm(minutoReal),
      diferencia: minutoReal - ev.minSalida
    };
    Guardado.escribir('registroSalidas', reg);
  },

  // Arranca la vigilancia del próximo evento con traslado del día de hoy
  vigilar(eventos, hoy, alCambiar) {
    const candidato = eventos.find(ev =>
      ev.clave === hoy.clave &&
      ev.traslado > 0 &&
      !this.estado(ev) &&
      hoy.minutos >= ev.minSalida - VIGILAR_DESDE &&
      hoy.minutos <= ev.minIni
    );

    if (!candidato) { this.detener(); return null; }
    if (this.eventoActual && this.eventoActual.id === candidato.id) return candidato;

    this.detener();
    this.eventoActual = candidato;
    this.avisosDados = new Set();

    if (navigator.geolocation && this.casa()) {
      this.vigilando = navigator.geolocation.watchPosition(
        pos => {
          this.posicion = pos.coords;
          const c = this.casa();
          const lejos = distancia(c.lat, c.lon, pos.coords.latitude, pos.coords.longitude);
          if (lejos > RADIO_CASA) {
            const ahora = partes(new Date());
            this.registrarSalida(this.eventoActual, ahora.minutos);
            this.detener();
            alCambiar();
          }
        },
        () => {},
        { enableHighAccuracy: true, maximumAge: 30000, timeout: 20000 }
      );
    }
    return candidato;
  },

  detener() {
    if (this.vigilando !== null) navigator.geolocation.clearWatch(this.vigilando);
    this.vigilando = null;
    this.eventoActual = null;
  },

  // Decide si hay que avisar y con qué texto. Se llama cada 30 segundos.
  // Usa umbrales "ya alcanzados" en vez de igualdad exacta: si un tick cae en
  // el minuto 6 y el siguiente en el 4, el aviso de los 5 minutos igual sale.
  revisarAvisos(ev, minutosAhora) {
    if (!ev || !this.avisosDados) return null;
    const faltan = ev.minSalida - minutosAhora;
    let clave = null, mensaje = null;

    if (faltan <= 0) {
      // Ya es la hora o pasó: insistimos cada INSISTIR_CADA minutos.
      const tramo = Math.floor((-faltan) / INSISTIR_CADA);
      clave = 'tarde-' + tramo;
      mensaje = faltan === 0 || tramo === 0
        ? `Es la hora. Salí ahora para llegar a ${ev.titulo}.`
        : `Vas ${duracionTexto(-faltan)} tarde para ${ev.titulo}. Salí.`;
    } else if (faltan <= AVISO_ANTES) {
      clave = 'previo';
      mensaje = `Andá saliendo: en ${duracionTexto(faltan)} tenés que salir para ${ev.titulo}.`;
    }

    if (clave && !this.avisosDados.has(clave)) {
      this.avisosDados.add(clave);
      notificar(mensaje);
      return mensaje;
    }
    return null;
  }
};

function traducirErrorGPS(err) {
  if (err.code === 1) return 'No diste permiso de ubicación. Habilitalo en el candado de la barra de direcciones.';
  if (err.code === 2) return 'No se pudo obtener la ubicación. Probá al aire libre o con los datos prendidos.';
  if (err.code === 3) return 'La ubicación tardó demasiado. Probá de nuevo.';
  return 'No se pudo leer la ubicación.';
}

function notificar(texto) {
  if (!('Notification' in window)) return;
  if (Notification.permission === 'granted') {
    new Notification('Asistente', { body: texto, tag: 'salida', renotify: true });
  }
  // vibración corta, si el teléfono la soporta
  if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
}

function pedirPermisoNotificaciones() {
  if (!('Notification' in window)) return Promise.resolve('no-soportado');
  if (Notification.permission === 'granted') return Promise.resolve('granted');
  return Notification.requestPermission();
}
