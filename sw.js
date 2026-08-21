// Service worker: hace que la app abra sin internet y que se pueda instalar.
const CACHE = 'mi-dia-v11';
const ARCHIVOS = ['./', './index.html', './app.js', './programa.js', './comidas.js', './salidas.js', './planes.js', './manifest.json', './icono.svg'];

self.addEventListener('install', ev => {
  // `cache: 'reload'` es clave: sin eso el navegador guarda la copia que ya
  // tenía en su propia caché y la app se queda con archivos viejos.
  ev.waitUntil(
    caches.open(CACHE)
      .then(c => Promise.all(ARCHIVOS.map(u =>
        fetch(u, { cache: 'reload' }).then(r => (r && r.ok) ? c.put(u, r) : null).catch(() => null)
      )))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', ev => {
  ev.waitUntil(
    caches.keys()
      .then(claves => Promise.all(claves.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', ev => {
  const url = new URL(ev.request.url);

  // Al calendario siempre vamos por internet: nunca servimos una copia vieja.
  if (url.hostname.endsWith('script.google.com') || url.hostname.endsWith('script.googleusercontent.com')) return;

  // El resto: PRIMERO internet, y la copia guardada sólo si no hay señal.
  //
  // Al revés (copia primero) el teléfono se queda pegado a una versión vieja
  // de la app y las correcciones no llegan nunca. Ya pasó una vez.
  ev.respondWith(
    fetch(ev.request)
      .then(resp => {
        if (resp && resp.ok) {
          const copia = resp.clone();
          caches.open(CACHE).then(c => c.put(ev.request, copia));
        }
        return resp;
      })
      .catch(() => caches.match(ev.request).then(guardado =>
        guardado || caches.match('./index.html')
      ))
  );
});

// Al tocar la notificación, traer la app al frente.
self.addEventListener('notificationclick', ev => {
  ev.notification.close();
  ev.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(lista => {
      for (const c of lista) if ('focus' in c) return c.focus();
      if (self.clients.openWindow) return self.clients.openWindow('./index.html');
    })
  );
});
