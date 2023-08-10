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
    'offline.html',
    'offline.css'
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


self.addEventListener('activate', async event => {
    const cacheNames = await caches.keys();
    await Promise.all(
        cacheNames
        .filter(name => name !== staticCacheName)
        .filter(name => name !== dynamicCacheName)
        .map(name => caches.delete(name))
    )
});


self.addEventListener('fetch', event => {
    // console.log('Fetch', event.request.url);

    //Getting the object from event of our request
    const { request } = event;

    const url = new URL(request.url);
    if (url.origin === location.origin) {
        event.respondWith(cacheFirst(request));
    } else {
        event.respondWith(networkFirst(request));
    }
})


async function cacheFirst(request) {
    // putting the Cache contents into the variable
    const cached = await caches.match(request);
    //Checking if there is something inside the cache
    //If there're nothing in cache we're fetching the request
    return cached ?? await fetch(request);
}

async function networkFirst(request) {
    //
    const cache = await caches.open(dynamicCacheName);

    try {
        //We're trying to get the data from the Server and store it to a variable
        const response = await fetch(request);
        //If we get the response from the server to a cache
        await cache.put(request, response.clone());
        //If everything is okay we return the server's response
        return response;
    } catch (error) {
        //If we didn't get the data from the server
        //we're trying to get the dat from cache
        const cached = cache.match(request);
        //If we don't have anything in cache we're showing the static html file with the error
        return cached ?? await caches.match('offline.html');
    }


}