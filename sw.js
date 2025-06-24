const APP_VERSION = '0.0.8';
const CACHE_NAME = `waterbuddy-v=${APP_VERSION}`; // bump when you deploy new version

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

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});