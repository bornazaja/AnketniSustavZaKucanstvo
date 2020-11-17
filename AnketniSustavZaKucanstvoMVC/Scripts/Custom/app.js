var app = (function () {
    var anketaHelper = {
        obrazacHolder: {
            kucanstvoID: '#KucanstvoID',
            iznosHraneZaProsliMjesec: '#IznosHraneZaProsliMjesec',
            iznosRacunaZaProsliMjesec: '#IznosRacunaZaProsliMjesec',
            iznosZabaveZaProsliMjesec: '#IznosZabaveZaProsliMjesec',
            iznosOstalihIzdatakaZaProsliMjesec: '#IznosOstalihIzdatakaZaProsliMjesec',
            valutaID: '#ValutaID'
        },
        temporaryAnketeByLocalStorage: {
            key: 'temporaryAnkete',
            push: function () {
                var ankete = JSON.parse(localStorage.getItem(app.anketaHelper.temporaryAnketeByLocalStorage.key)) || [];
                ankete.push(app.anketaHelper.anketaToObj());
                localStorage.setItem(app.anketaHelper.temporaryAnketeByLocalStorage.key, JSON.stringify(ankete));
            },
            get: function () {
                return JSON.parse(localStorage.getItem(app.anketaHelper.temporaryAnketeByLocalStorage.key));
            },
            remove: function () {
                localStorage.removeItem(app.anketaHelper.temporaryAnketeByLocalStorage.key);
            }
        },
        anketaToObj: function () {
            return {
                KucanstvoID: $(app.anketaHelper.obrazacHolder.kucanstvoID).val(),
                IznosHraneZaProsliMjesec: $(app.anketaHelper.obrazacHolder.iznosHraneZaProsliMjesec).val(),
                IznosRacunaZaProsliMjesec: $(app.anketaHelper.obrazacHolder.iznosRacunaZaProsliMjesec).val(),
                IznosZabaveZaProsliMjesec: $(app.anketaHelper.obrazacHolder.iznosZabaveZaProsliMjesec).val(),
                IznosOstalihIzdatakaZaProsliMjesec: $(app.anketaHelper.obrazacHolder.iznosOstalihIzdatakaZaProsliMjesec).val(),
                ValutaID: $(app.anketaHelper.obrazacHolder.valutaID).val()
            };
        },
        saveTemporaryAnketeFromLocalStorageToDB: function () {
            var ankete = app.anketaHelper.temporaryAnketeByLocalStorage.get();

            app.testInternetAndServerConnection(hasConnection => {
                if (hasConnection) {
                    if (app.isArrayNotNullOrEmpty(ankete)) {
                        app.sendDataByAjax('/Home/AddAnkete', JSON.stringify({ 'ankete': ankete }))
                            .done(() => {
                                app.anketaHelper.temporaryAnketeByLocalStorage.remove();
                                app.anketaHelper.fetchTemporaryAnketeFromLocalStorage();
                                bootbox.alert('Ankete iz lokalne pohrane su uspješno spremljene u bazu.');
                            })
                            .fail((jqXHR, textStatus, errorThrown) => {
                                app.logRequestFail(textStatus, errorThrown);
                                bootbox.alert('Ankete nisu uspješno spremljene iz lokalne pohrane u bazu.');
                            });
                    }
                }
            });
        },
        fetchAnkete: function () {
            var properties = [
                'IDAnketa',
                'KucanstvoID',
                'Sifra',
                'Ime',
                'Prezime',
                'Ulica',
                'KucniBroj',
                'Grad',
                'IznosHraneZaProsliMjesec',
                'IznosRacunaZaProsliMjesec',
                'IznosZabaveZaProsliMjesec',
                'IznosOstalihIzdatakaZaProsliMjesec',
                'Valuta'
            ];

            app.testInternetAndServerConnection(hasConnection => {
                if (hasConnection) {
                    app.anketaHelper.fetchAnketeFromDB(properties);
                } else {
                    app.anketaHelper.fetchAnketeFromLocalStorage(properties);
                }
            });
        },
        fetchAnketeFromDB: function (properties) {
            app.getJson('/Home/GetAnkete', function (data) {
                localStorage.ankete = JSON.stringify(data);
                app.bindDataTable('#anketeFromDB', data, properties);
            }, 'Desila se greška prilikom dohvaćanja anketa.');
        },
        fetchAnketeFromLocalStorage: function (properties) {
            app.bindDataTable('#anketeFromDB', JSON.parse(localStorage.ankete), properties);
        },
        fetchTemporaryAnketeFromLocalStorage: function () {
            var properties = [
                'KucanstvoID',
                'IznosHraneZaProsliMjesec',
                'IznosRacunaZaProsliMjesec',
                'IznosZabaveZaProsliMjesec',
                'IznosOstalihIzdatakaZaProsliMjesec',
                'ValutaID'
            ];

            var ankete = app.anketaHelper.temporaryAnketeByLocalStorage.get() === null ? [] : app.anketaHelper.temporaryAnketeByLocalStorage.get();

            app.bindDataTable('#temporaryAnketeFromLocalStorage', ankete, properties);
        }
    };

    function sendDataByAjax(url, data) {
        return $.ajax({
            contentType: 'application/json; charset=utf-8',
            dataType: 'text',
            type: 'POST',
            url: url,
            data: data
        });
    }

    function isArrayNotNullOrEmpty(array) {
        if (array != null && array.length >= 1) {
            return true;
        } else {
            return false;
        }
    }

    function getJson(url, callback, errorMeesage) {
        $.getJSON(url).done(data => callback(data)).fail(() => bootbox.alert(errorMeesage));
    }

    function bindDataTable(tableId, data, properties) {
        var tableColumns = [];

        properties.forEach(property => tableColumns.push({ 'mDataProp': property }));

        $(tableId).DataTable({
            'aaData': data,
            'aoColumns': tableColumns,
            destroy: true,
            'sScrollX': '100%'
        });
    }

    function bindSelect2(ddlId, data) {
        data = $.map(data, function (item) {
            return { id: item.Key, text: item.Value };
        });

        $(ddlId).append('<option></option>');

        $(ddlId).select2({
            placeholder: '--- odaberite ---',
            data: data,
            allowClear: true,
            theme: "bootstrap4"
        });
    }

    function logRequestFail(textStatus, errorThrown) {
        console.log('Request Failed: ' + textStatus + ', ' + errorThrown);
    }

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js', { scope: '/' })
            .then(reg => {
                console.log('[Service Worker] Registered')
                reg.addEventListener('updatefound', () => {
                    if (reg.installing) {
                        reg.installing.addEventListener('statechange', () => {
                            if (reg.waiting) {
                                if (navigator.serviceWorker.controller) {
                                    bootbox.alert('Aplikacija je ažuriranja na zadnju verziju.');
                                }
                            }
                        });
                    }
                });
            })
            .catch(error => console.log('[Service Worker] Error while registering: ' + error));
    }

    function testInternetAndServerConnection(callback) {
        if (navigator.onLine) {
            $.get({ url: '/Test/Test', method: 'POST' }).done(() => callback(true)).fail(() => callback(false));
        } else {
            callback(false);
        }
    }

    return {
        anketaHelper: anketaHelper,
        sendDataByAjax: sendDataByAjax,
        isArrayNotNullOrEmpty: isArrayNotNullOrEmpty,
        getJson: getJson,
        bindDataTable: bindDataTable,
        bindSelect2: bindSelect2,
        logRequestFail: logRequestFail,
        testInternetAndServerConnection: testInternetAndServerConnection
    }
})();