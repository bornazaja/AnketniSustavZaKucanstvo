var app = (function () {
    var htmlElement = {
        id: {
            iznosHraneZaProsliMjesec: '#IznosHraneZaProsliMjesec',
            iznosRacunaZaProsliMjesec: '#IznosRacunaZaProsliMjesec',
            iznosZabaveZaProsliMjesec: '#IznosZabaveZaProsliMjesec',
            iznosOstalihIzdatakaZaProsliMjesec: '#IznosOstalihIzdatakaZaProsliMjesec',
            kucanstvoID: '#KucanstvoID',
        },
    };

    var localStorageAnkete = {
        key: 'anketaMemory',
        push: function () {
            var cur = JSON.parse(localStorage.getItem(app.localStorageAnkete.key)) || [];
            cur.push({
                IznosHraneZaProsliMjesec: $(app.htmlElement.id.iznosHraneZaProsliMjesec).val(),
                IznosRacunaZaProsliMjesec: $(app.htmlElement.id.iznosRacunaZaProsliMjesec).val(),
                IznosZabaveZaProsliMjesec: $(app.htmlElement.id.iznosZabaveZaProsliMjesec).val(),
                IznosOstalihIzdatakaZaProsliMjesec: $(app.htmlElement.id.iznosOstalihIzdatakaZaProsliMjesec).val(),
                KucanstvoID: $(app.htmlElement.id.kucanstvoID).val()
            });
            localStorage.setItem(app.localStorageAnkete.key, JSON.stringify(cur));
        },
        get: function () {
            return JSON.parse(localStorage.getItem(app.localStorageAnkete.key));
        },
        remove: function () {
            localStorage.removeItem(app.localStorageAnkete.key);
        }
    };

    function saveAnketeInMemory() {
        var array = app.localStorageAnkete.get();
        if (app.isArrayNotNullOrEmpty(array) && app.checkInternetConnection()) {
            app.sendAnketeByAjax(array);
            app.localStorageAnkete.remove();
        }
    }

    function sendAnketeByAjax(ankete) {
        ankete = JSON.stringify({ 'ankete': ankete });

        $.ajax({
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            type: 'POST',
            url: '/Ajax/SaveAnkete',
            data: ankete,
            statusCode: {
                200: function () {
                    bootbox.alert("Podaci su uspješno spremljeni");
                },
                400: function () {
                    bootbox.alert("Podaci nisu uspješno spremljeni");
                }
            }
        });
    }

    function isArrayNotNullOrEmpty(array) {
        if (array != null && array.length >= 1) {
            return true;
        } else {
            return false;
        }
    }

    function registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            try {
                navigator.serviceWorker.register('sw.js');
                console.log('SW registered');
            } catch (error) {
                console.log('SW failed');
            }
        }
    }

    function checkInternetConnection() {
        if (navigator.onLine) {
            return true;
        } else {
            return false;
        }
    }

    function getJson(url, callback) {
        $.getJSON(url, function (data) {
            callback(data);
        });
    }

    return {
        htmlElement: htmlElement,
        localStorageAnkete: localStorageAnkete,
        saveAnketeInMemory: saveAnketeInMemory,
        sendAnketeByAjax: sendAnketeByAjax,
        isArrayNotNullOrEmpty: isArrayNotNullOrEmpty,
        registerServiceWorker: registerServiceWorker,
        checkInternetConnection: checkInternetConnection,
        getJson: getJson
    }
})();

$(window).on('load', function () {
    app.registerServiceWorker();
    app.saveAnketeInMemory();
});

$(window).on('online', function () {
    bootbox.alert("Aplikacija je online");
    app.saveAnketeInMemory();
});

$(window).on('offline', function () {
    bootbox.alert("Aplikacija je offline");
});