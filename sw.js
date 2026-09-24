const CACHE_NAME = 'tomurcukids-v1';

const APP_FILES = [
  './',
  './index.html',
  './manifest.webmanifest',

  './icons/icon-180.png',
  './icons/icon-192.png',
  './icons/icon-512.png',

  './images/pumpkins/pumpkin1.PNG',
  './images/pumpkins/pumpkin2.PNG',
  './images/pumpkins/pumpkin3.PNG',
  './images/pumpkins/pumpkin4.PNG'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_FILES))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys =>
        Promise.all(
          keys
            .filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request)
      .then(cachedFile => cachedFile || fetch(event.request))
  );
});