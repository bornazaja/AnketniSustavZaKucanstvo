const CACHE_NAME = 'ASZK-PWA-v1.0.0';

const FILES_TO_CACHE = [
    '/',
    '/Home/Index',
    '/Home/GetAnkete',
    '/Home/GetKucanstva',
    '/Home/GetValute',
    '/Content/custom/app.css',
    '/Content/datatables/datatables.min.css',
    '/Content/datatables/DataTables-1.10.22/images/sort_asc.png',
    '/Content/datatables/DataTables-1.10.22/images/sort_asc_disabled.png',
    '/Content/datatables/DataTables-1.10.22/images/sort_both.png',
    '/Content/datatables/DataTables-1.10.22/images/sort_desc.png',
    '/Content/datatables/DataTables-1.10.22/images/sort_desc_disabled.png',
    '/Content/select2/select2.min.css',
    '/Content/images/icons/app-icon-96x96.png',
    '/Content/images/icons/app-icon-144x144.png',
    '/Content/images/icons/app-icon-256x256.png',
    '/Content/images/icons/app-icon-512x512.png',
    '/Content/images/ASZK.png',
    '/Scripts/custom/app.js',
    '/Scripts/custom/index.js',
    '/Scripts/custom/obrazac.js',
    '/Scripts/modernizr/modernizr-2.6.2.js',
    '/Scripts/jquery/jquery-3.0.0.min.js',
    '/Scripts/jquery/jquery.validate.min.js',
    '/Scripts/jquery/jquery.validate.unobtrusive.min.js',
    '/Scripts/bootstrap/bootstrap.min.js',
    '/Scripts/mdb/mdb.min.js',
    '/Scripts/popper/popper.min.js',
    '/Scripts/bootbox/bootbox.min.js',
    '/Scripts/datatables/datatables.min.js',
    '/Scripts/select2/select2.min.js',
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

function fromNetwork(e) {
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