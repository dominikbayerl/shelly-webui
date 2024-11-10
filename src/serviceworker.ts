const cacheName = "shelly-webui";

self.addEventListener("install", (evt) => {
    console.log('[Service Worker] Install');
    evt.waitUntil((async () => {
        const cache = await caches.open(cacheName);
        console.log('[Service Worker] Caching all: app shell and content');
        return cache.addAll([
            './',
            'index.css',
            'index.js'
        ]);
    })());
});

self.addEventListener('fetch', (evt) => {
    evt.respondWith(
        caches.match(evt.request).then(function (response) {
            return response || fetch(evt.request);
        })
    );
});
