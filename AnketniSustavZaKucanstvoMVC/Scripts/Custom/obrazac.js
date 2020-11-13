$(window).on('load', function () {
    fetchKucanstva();
    fetchValute();
});

$('[type=submit]').click(function (evt) {
    evt.preventDefault();
    var form = $('form');
    bootbox.confirm('Želite li spremiti ovu anketu?', function (odgovor) {
        if (odgovor && form.valid()) {
            saveAnkete();
            $('#myModal').modal('hide');
            resetForm();
        }
    });
});

function saveAnkete() {
    if (app.checkInternetConnection()) {
        var ankete = JSON.stringify({ 'ankete': [app.anketaHelper.anketaToObj()] });

        app.sendDataByAjax('/Home/SaveAnkete', ankete)
            .done(function () {
                app.anketaHelper.fetchAnketeFromDB();
                bootbox.alert('Anketa je uspješno spremljena u bazu.');
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
                bootbox.alert('Desila se greška prilikom spremanja ankete u bazu.');
            });
    } else {
        app.anketaHelper.temporaryAnketeByLocalStorage.push();
        app.anketaHelper.fetchTemporaryAnketeFromLocalStorage();
        bootbox.alert('Anketa je uspješno spremljena lokalno.');
    }
};

function resetForm() {
    $(app.anketaHelper.obrazacHolder.kucanstvoID).val('').trigger('change');
    $(app.anketaHelper.obrazacHolder.iznosHraneZaProsliMjesec).val('');
    $(app.anketaHelper.obrazacHolder.iznosRacunaZaProsliMjesec).val('');
    $(app.anketaHelper.obrazacHolder.iznosZabaveZaProsliMjesec).val('');
    $(app.anketaHelper.obrazacHolder.iznosOstalihIzdatakaZaProsliMjesec).val('');
    $(app.anketaHelper.obrazacHolder.valutaID).val('').trigger('change');
}

function fetchKucanstva() {
    if (app.checkInternetConnection()) {
        app.getJson('/Home/GetKucanstva', function (data) {
            localStorage.kucanstva = JSON.stringify(data);
            app.bindSelect2(app.anketaHelper.obrazacHolder.kucanstvoID, data);
        }, 'Desila se greška prilikom dohvaćanja kućanstava.');
    } else {
        app.bindSelect2(app.anketaHelper.obrazacHolder.kucanstvoID, JSON.parse(localStorage.kucanstva));
    }
};

function fetchValute() {
    if (app.checkInternetConnection()) {
        app.getJson('/Home/GetValute', function (data) {
            localStorage.valute = JSON.stringify(data);
            app.bindSelect2(app.anketaHelper.obrazacHolder.valutaID, data);
        }, 'Desila se greška prilikom dohvaćanja valuta.');
    } else {
        app.bindSelect2(app.anketaHelper.obrazacHolder.valutaID, JSON.parse(localStorage.valute));
    }
}