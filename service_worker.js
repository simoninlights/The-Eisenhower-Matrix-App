const staticCacheName = 'static-app-v1';
const dynamicCacheName = 'dynamic-app-v1';

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
    // console.log('Fetch', event.request.url);

    //Getting the object from even of our reuest
    const { request } = event;

    const url = new URL(request.url);
    if (url.origin === location.origin) {
        event.respondWith(cacheFirst(request))
    } else {
        event.respondWith(networkFirst(request));
    }

    event.respondWith(cacheFirst(event.request));
})


async function cacheFirst(request) {

    const cached = await caches.match(request);

    return cached ?? await fetch(request);
}

async function networkFirst(request) {

    const cache = await caches.open(dynamicCacheName);

    try {
        const response = await fetch(request);
        await cache.put(request, response.clone());
        return response;
    } catch (error) {
        const cached = cache.match(request);
        return cached ?? await  caches.match('offline/offline.html');
    }
    


}