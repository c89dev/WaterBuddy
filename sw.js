const CACHE_NAME = 'waterbuddy-v0.0.2'; // bump when you deploy new version

self.addEventListener('install', (event) => {
    self.skipWaiting(); // force update immediately
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim()) // Take control of clients
  );
});