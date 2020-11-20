$(window).on('load', function () {
    app.anketaHelper.saveTemporaryAnketeFromLocalStorageToDB();
    app.anketaHelper.fetchAnkete();
    app.anketaHelper.fetchTemporaryAnketeFromLocalStorage();
    fetchKucanstva();
    fetchValute();
});

$('[type=submit]').click(function (evt) {
    evt.preventDefault();
    var form = $('form');
    app.dialogHelper.confirm('Želite li spremiti ovu anketu?', odgovor => {
        if (odgovor && form.valid()) {
            saveAnkete();
            $('#myModal').modal('hide');
        }
    });
});

function saveAnkete() {
    app.testInternetAndServerConnection(hasConnection => {
        if (hasConnection) {
            saveAnketeInDB();
        } else {
            saveAnketeInLocalStorage();
        }
    });
}

function saveAnketeInDB() {
    var ankete = JSON.stringify({ 'ankete': [app.anketaHelper.anketaToObj()] });

    app.sendDataByAjax('/Home/AddAnkete', ankete)
        .done(() => app.dialogHelper.alert('Anketa je uspješno spremljena u bazu.', () => {
            app.anketaHelper.fetchAnkete();
            resetForm();
        }))
        .fail((jqXHR, textStatus, errorThrown) => {
            app.logRequestFail(textStatus, errorThrown);
            app.dialogHelper.alert('Desila se greška prilikom spremanja ankete u bazu.');
            saveAnketeInLocalStorage();
        });
}

function saveAnketeInLocalStorage() {
    app.anketaHelper.temporaryAnketeByLocalStorage.push();
    app.anketaHelper.fetchTemporaryAnketeFromLocalStorage();
    app.dialogHelper.alert('Anketa je uspješno spremljena lokalno.', () => resetForm());
}

function resetForm() {
    $(app.anketaHelper.obrazacHolder.kucanstvoID).val('').trigger('change');
    $(app.anketaHelper.obrazacHolder.iznosHraneZaProsliMjesec).val('');
    $(app.anketaHelper.obrazacHolder.iznosRacunaZaProsliMjesec).val('');
    $(app.anketaHelper.obrazacHolder.iznosZabaveZaProsliMjesec).val('');
    $(app.anketaHelper.obrazacHolder.iznosOstalihIzdatakaZaProsliMjesec).val('');
    $(app.anketaHelper.obrazacHolder.valutaID).val('').trigger('change');
}

function fetchKucanstva() {
    app.testInternetAndServerConnection(hasConnection => {
        if (hasConnection) {
            fetchKucanstvaFromDB();
        } else {
            fetchKucanstvaFromLocalStorage();
        }
    });
}

function fetchKucanstvaFromDB() {
    app.getJson('/Home/GetKucanstva', (data) => {
        localStorage.kucanstva = JSON.stringify(data);
        app.bindSelect2(app.anketaHelper.obrazacHolder.kucanstvoID, data);
    }, 'Desila se greška prilikom dohvaćanja kućanstava.');
}

function fetchKucanstvaFromLocalStorage() {
    app.bindSelect2(app.anketaHelper.obrazacHolder.kucanstvoID, JSON.parse(localStorage.kucanstva));
}

function fetchValute() {
    app.testInternetAndServerConnection(hasConnection => {
        if (hasConnection) {
            fetchValuteFromDB();
        } else {
            fetchValuteFromLocalStorage();
        }
    });
}

function fetchValuteFromDB() {
    app.getJson('/Home/GetValute', (data) => {
        localStorage.valute = JSON.stringify(data);
        app.bindSelect2(app.anketaHelper.obrazacHolder.valutaID, data);
    }, 'Desila se greška prilikom dohvaćanja valuta.');
}

function fetchValuteFromLocalStorage() {
    app.bindSelect2(app.anketaHelper.obrazacHolder.valutaID, JSON.parse(localStorage.valute));
}