var app = (function () {
    var obrazacHolder = {
        kucanstvoID: '#KucanstvoID',
        iznosHraneZaProsliMjesec: '#IznosHraneZaProsliMjesec',
        iznosRacunaZaProsliMjesec: '#IznosRacunaZaProsliMjesec',
        iznosZabaveZaProsliMjesec: '#IznosZabaveZaProsliMjesec',
        iznosOstalihIzdatakaZaProsliMjesec: '#IznosOstalihIzdatakaZaProsliMjesec',
        valutaID: '#ValutaID'
    };

    var localStorageAnkete = {
        key: 'anketaMemory',
        push: function () {
            var anketa = JSON.parse(localStorage.getItem(app.localStorageAnkete.key)) || [];
            anketa.push({
                KucanstvoID: $(app.obrazacHolder.kucanstvoID).val(),
                IznosHraneZaProsliMjesec: $(app.obrazacHolder.iznosHraneZaProsliMjesec).val(),
                IznosRacunaZaProsliMjesec: $(app.obrazacHolder.iznosRacunaZaProsliMjesec).val(),
                IznosZabaveZaProsliMjesec: $(app.obrazacHolder.iznosZabaveZaProsliMjesec).val(),
                IznosOstalihIzdatakaZaProsliMjesec: $(app.obrazacHolder.iznosOstalihIzdatakaZaProsliMjesec).val(),
                ValutaID: $(app.obrazacHolder.valutaID).val()
            });
            localStorage.setItem(app.localStorageAnkete.key, JSON.stringify(anketa));
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
            app.sendAnketeByAjax(array)
                .done(function () {
                    app.localStorageAnkete.remove();
                    bootbox.alert("Ankete iz lokalne memorije su uspješno spremljene u bazu.");
                })
                .fail(function (jqXHR, textStatus, errorThrown) {
                    bootbox.alert("Ankete nisu uspješno spremljene iz lokalne memorije u bazu.");
                });
        }
    }

    function sendAnketeByAjax(ankete) {
        ankete = JSON.stringify({ 'ankete': ankete });

        return $.ajax({
            contentType: 'application/json; charset=utf-8',
            dataType: 'text',
            type: 'POST',
            url: '/Ajax/SaveAnkete',
            data: ankete
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

    function getJson(url, callback, errorMeesage) {
        $.getJSON(url, function (data) {
            callback(data);
        }).fail(function () {
            bootbox.alert(errorMeesage);
        });
    }

    return {
        obrazacHolder: obrazacHolder,
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
    Object.freeze(app.obrazacHolder);
    app.saveAnketeInMemory();
});

$(window).on('online', function () {
    bootbox.alert("Aplikacija je online.");
    app.saveAnketeInMemory();
});

$(window).on('offline', function () {
    bootbox.alert("Aplikacija je offline.");
});