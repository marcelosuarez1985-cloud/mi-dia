// Service worker: hace que la app abra sin internet y que se pueda instalar.
const CACHE = 'mi-dia-v4';
const ARCHIVOS = ['./', './index.html', './app.js', './programa.js', './salidas.js', './manifest.json', './icono.svg'];

self.addEventListener('install', ev => {
  ev.waitUntil(caches.open(CACHE).then(c => c.addAll(ARCHIVOS)).then(() => self.skipWaiting()));
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

  // El resto: primero la copia guardada, y de fondo la actualizamos.
  ev.respondWith(
    caches.match(ev.request).then(guardado => {
      const red = fetch(ev.request).then(resp => {
        if (resp && resp.ok) caches.open(CACHE).then(c => c.put(ev.request, resp.clone()));
        return resp;
      }).catch(() => guardado);
      return guardado || red;
    })
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
