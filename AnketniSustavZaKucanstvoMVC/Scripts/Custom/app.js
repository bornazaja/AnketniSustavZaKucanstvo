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
                var anketa = JSON.parse(localStorage.getItem(app.anketaHelper.temporaryAnketeByLocalStorage.key)) || [];
                anketa.push(app.anketaHelper.anketaToObj());
                localStorage.setItem(app.anketaHelper.temporaryAnketeByLocalStorage.key, JSON.stringify(anketa));
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
            if (app.isArrayNotNullOrEmpty(ankete) && app.checkInternetConnection()) {
                app.sendDataByAjax('/Home/SaveAnkete', JSON.stringify({ 'ankete': ankete }))
                    .done(function () {
                        app.anketaHelper.temporaryAnketeByLocalStorage.remove();
                        app.anketaHelper.fetchAnketeFromDB();
                        app.anketaHelper.fetchTemporaryAnketeFromLocalStorage();
                        bootbox.alert('Ankete iz lokalne memorije su uspješno spremljene u bazu.');
                    })
                    .fail(function (jqXHR, textStatus, errorThrown) {
                        console.log(jqXHR);
                        console.log(textStatus);
                        console.log(errorThrown);
                        bootbox.alert('Ankete nisu uspješno spremljene iz lokalne memorije u bazu.');
                    });
            }
        },
        fetchAnketeFromDB: function () {
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

            if (app.checkInternetConnection()) {
                app.getJson('/Home/GetAnkete', function (data) {
                    app.bindDataTable('#anketeFromDB', data, properties);
                    localStorage.ankete = JSON.stringify(data);
                }, 'Desila se greška prilikom dohvaćanja anketa.');
            } else {
                app.bindDataTable('#anketeFromDB', JSON.parse(localStorage.ankete), properties);
            }
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

    function bindDataTable(tableId, data, properties) {
        var tableColumns = [];

        properties.forEach(function (property) {
            tableColumns.push({ 'mDataProp': property });
        });

        $(tableId).DataTable({
            'aaData': data,
            'aoColumns': tableColumns,
            destroy: true
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
            theme: 'bootstrap4',
            allowClear: true
        });
    }

    return {
        anketaHelper: anketaHelper,
        sendDataByAjax: sendDataByAjax,
        isArrayNotNullOrEmpty: isArrayNotNullOrEmpty,
        registerServiceWorker: registerServiceWorker,
        checkInternetConnection: checkInternetConnection,
        getJson: getJson,
        bindDataTable: bindDataTable,
        bindSelect2: bindSelect2
    }
})();