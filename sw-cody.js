const CACHE_NAME = 'jumpup-cody-v4';
const ASSETS = [
  '/jumpup-app/coway_cody_app.html',
  '/jumpup-app/manifest-cody.json',
  '/jumpup-app/icon-cody-192.png',
  '/jumpup-app/icon-cody-512.png'
];

self.addEventListener('install', function(e){
  e.waitUntil(
    caches.open(CACHE_NAME).then(function(cache){
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function(e){
  e.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(
        keys.filter(function(k){ return k !== CACHE_NAME; })
            .map(function(k){ return caches.delete(k); })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function(e){
  e.respondWith(
    caches.match(e.request).then(function(cached){
      return cached || fetch(e.request);
    })
  );
});
