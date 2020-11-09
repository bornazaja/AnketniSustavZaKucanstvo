var dataCacheName = 'anketaData-v1';
var cacheName = 'anketaPWA-final-1';

const filesToCache = [
    '/',
    './Home/Index',
    './Scripts/myScripts/app.js',
    './Scripts/myScripts/obrazac.js',
    './Scripts/myScripts/ankete.js',
    './Content/MojCss.css',
    './Content/Site.css',
    './Scripts/modernizr-2.6.2.js',
    './Scripts/bootstrap.min.js',
    './Scripts/jquery-3.0.0.min.js',
    './Scripts/jquery.validate.min.js',
    './Scripts/jquery.validate.unobtrusive.min.js',
    './Scripts/umd/popper.min.js',
    './Content/bootstrap.min.css',
    './Scripts/bootbox.min.js',
    './manifest.json'
]

self.addEventListener('install', function (e) {
    console.log('[ServiceWorker] Install');
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            console.log('[ServiceWorker] Caching app shell');
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener('activate', function (e) {
    console.log('[ServiceWorker] Activate');
    e.waitUntil(
        caches.keys().then(function (keyList) {
            return Promise.all(keyList.map(function (key) {
                if (key !== cacheName && key !== dataCacheName) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    return self.clients.claim();
});

self.addEventListener('fetch', function (e) {
    e.respondWith(
        caches.match(e.request).then(function (response) {
            return response || fetch(e.request);
        })
    )
});