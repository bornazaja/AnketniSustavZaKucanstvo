const CACHE_NAME = 'ASZK-PWA-v1.0.0';

const FILES_TO_CACHE = [
    '/',
    '/Home/Index',
    '/Home/GetAnkete',
    '/Home/GetKucanstva',
    '/Home/GetValute',
    '/Content/app.css',
    '/Content/Site.css',
    '/Content/bootstrap.min.css',
    '/Content/datatables.min.css',
    '/Content/select2.min.css',
    '/Content/select2-bootstrap4.min.css',
    '/Content/Images/Icons/app-icon-96x96.png',
    '/Content/Images/Icons/app-icon-144x144.png',
    '/Content/Images/Icons/app-icon-256x256.png',
    '/Content/Images/Icons/app-icon-512x512.png',
    '/Content/Images/ASZK.png',
    '/Scripts/Custom/app.js',
    '/Scripts/Custom/index.js',
    '/Scripts/Custom/obrazac.js',
    '/Scripts/modernizr-2.6.2.js',
    '/Scripts/bootstrap.min.js',
    '/Scripts/jquery-3.0.0.min.js',
    '/Scripts/jquery.validate.min.js',
    '/Scripts/jquery.validate.unobtrusive.min.js',
    '/Scripts/bootbox.min.js',
    '/Scripts/datatables.min.js',
    '/Scripts/select2.min.js',
    '/manifest.json'
];

self.addEventListener('install', function (e) {
    console.log('[ServiceWorker] Install');
    e.waitUntil(precache());
});

function precache() {
    return caches.open(CACHE_NAME).then(function (cache) {
        console.log('[ServiceWorker] Caching app shell');
        return cache.addAll(FILES_TO_CACHE);
    });
}

self.addEventListener('activate', function (e) {
    console.log('[ServiceWorker] Activating');
    e.waitUntil(removeCache());
});

function removeCache() {
    return caches.keys().then(function (keyList) {
        return Promise.all(keyList.map(function (key) {
            if (key !== CACHE_NAME) {
                console.log('[ServiceWorker] Removing old cache');
                caches.delete(key);
            }
        }));
    });
}

self.addEventListener('fetch', function (e) {
    const promise = fetch('/Test/Test', { method: 'GET' }).then(() => fromNetwork(e)).catch(() => fromCache(e));
    e.respondWith(promise);
});

async function fromNetwork(e) {
    console.log('[ServiceWorker] Fetching from network');

    return caches.open(CACHE_NAME).then(function (cache) {
        return fetch(e.request).then(function (response) {
            cache.put(e.request.url, response.clone());
            return response;
        });
    });
}

function fromCache(e) {
    console.log('[ServiceWorker] Fetching from cache');

    var hasQuery = e.request.url.indexOf('?') != -1;

    return caches.match(e.request, { ignoreSearch: hasQuery }).then(function (response) {
        return response || fetch(e.request);
    });
}