$(window).on('load', function () {
    loadKucanstva();
    loadValute();
});

$(window).bind('beforeunload', function () {
    return '';
});

$('[type=submit]').click(function (evt) {
    evt.preventDefault();
    var form = $('form');
    bootbox.confirm("Želite li spremiti ovu anketu?", function (odgovor) {
        if (odgovor && form.valid()) {
            saveAnkete();
            $('#myModal').modal('hide');
            resetForm();
        }
    });
});

function saveAnkete() {
    if (app.checkInternetConnection()) {
        var ankete = [{
            KucanstvoID: $(app.obrazacHolder.kucanstvoID).val(),
            IznosHraneZaProsliMjesec: $(app.obrazacHolder.iznosHraneZaProsliMjesec).val(),
            IznosRacunaZaProsliMjesec: $(app.obrazacHolder.iznosRacunaZaProsliMjesec).val(),
            IznosZabaveZaProsliMjesec: $(app.obrazacHolder.iznosZabaveZaProsliMjesec).val(),
            IznosOstalihIzdatakaZaProsliMjesec: $(app.obrazacHolder.iznosOstalihIzdatakaZaProsliMjesec).val(),
            ValutaID: $(app.obrazacHolder.valutaID).val()
        }];

        app.sendAnketeByAjax(ankete)
            .done(function () {
                bootbox.alert("Anketa je uspješno spremljena u bazu.");
            })
            .fail(function () {
                bootbox.alert("Desila se greška prilikom spremanja ankete u bazu.");
            });
    } else {
        app.localStorageAnkete.push();
        bootbox.alert("Anketa su uspješno spremljena u lokalnu memoriju.");
    }
};

function resetForm() {
    $(app.obrazacHolder.kucanstvoID).val("");
    $(app.obrazacHolder.iznosHraneZaProsliMjesec).val("");
    $(app.obrazacHolder.iznosRacunaZaProsliMjesec).val("");
    $(app.obrazacHolder.iznosZabaveZaProsliMjesec).val("");
    $(app.obrazacHolder.iznosOstalihIzdatakaZaProsliMjesec).val("");
    $(app.obrazacHolder.valutaID).val("");
}

function loadKucanstva() {
    if (app.checkInternetConnection()) {
        app.getJson('/Json/GetKucanstva', function (data) {
            fillKucanstvaToDdl(data);
            localStorage.kucanstva = JSON.stringify(data);
        }, 'Desila se greška prilikom dohvaćanja kućanstava.');
    } else {
        fillKucanstvaToDdl(JSON.parse(localStorage.kucanstva));
    }
};

function fillKucanstvaToDdl(result) {
    var ddl = $(app.obrazacHolder.kucanstvoID);
    ddl.append('<option value="">---odaberite kućanstvo---</option>');

    result.forEach(function (k) {
        ddl.append($('<option/>', {
            value: k.IDKucanstvo,
            text: k.Sifra + " " +
                k.Ime + " " +
                k.Prezime + " " +
                k.Ulica + " " +
                k.KucniBroj + " " +
                k.Grad
        }));
    });
};

function loadValute() {
    if (app.checkInternetConnection()) {
        app.getJson('/Json/GetValute', function (data) {
            fillValuteToDdl(data);
            localStorage.valute = JSON.stringify(data);
        }, 'Desila se greška prilikom dohvaćanja valuta.');
    } else {
        fillValuteToDdl(JSON.parse(localStorage.valute));
    }
}

function fillValuteToDdl(result) {
    var ddl = $(app.obrazacHolder.valutaID);
    ddl.append('<option value="">---odaberite valutu---</option>');

    result.forEach(function (v) {
        ddl.append($('<option/>', { value: v.IDValuta, text: v.Naziv }));
    });
}