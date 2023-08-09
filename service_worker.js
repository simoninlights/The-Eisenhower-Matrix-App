const staticCacheName = 's-app-v1';

/* Storing the assets for cache */
const assetUrls = [
    'index.html',
    'style.css',
    'pwa.js',
    'model.js',
    'view.js',
    'controller.js',
    'manifest.json',
    'service_worker.js',
    'favicon.ico',
    'README.md',
]

self.addEventListener('install', async event => {
    console.log('[SW]: install');

    //Using async\await function for this listener
    const cache = await caches.open(staticCacheName);
    await cache.addAll(assetUrls);

    /* The same approach but without the async\await */
    // event.waitUntil(
    //     caches.open(staticCacheName).then(chache => chache.addAll(assetUrls))
    // )
});

self.addEventListener('activate', event => {
    console.log('[SW]: activate');
});

self.addEventListener('fetch', event => {
    console.log('Fetch', event.request.url);

    event.respondWith(cacheFirst(event.request));
})

async function cacheFirst(request) {
    const cached = await caches.match(request);

    return cached ?? await fetch(request);
}