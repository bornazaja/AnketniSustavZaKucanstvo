$(window).on('load', function () {
    loadKucanstva();
    loadFormData();
});

$(window).on('beforeunload', function () {
    rememberFormData();
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

function loadFormData() {
    $(app.htmlElement.id.kucanstvoID).val(sessionStorage.kucanstvoID);
    loadField(sessionStorage.iznosHraneZaProsliMjesec, app.htmlElement.id.iznosHraneZaProsliMjesec);
    loadField(sessionStorage.iznosRacunaZaProsliMjesec, app.htmlElement.id.iznosRacunaZaProsliMjesec);
    loadField(sessionStorage.iznosZabaveZaProsliMjesec, app.htmlElement.id.iznosZabaveZaProsliMjesec);
    loadField(sessionStorage.iznosOstalihIzdatakaZaProsliMjesec, app.htmlElement.id.iznosOstalihIzdatakaZaProsliMjesec);
};

function loadField(key, field) {
    var value = key;
    if (value !== "undefined") {
        $(field).val(value);
    }
};

function rememberFormData() {
    sessionStorage.iznosHraneZaProsliMjesec = $(app.htmlElement.id.iznosHraneZaProsliMjesec).val();
    sessionStorage.iznosRacunaZaProsliMjesec = $(app.htmlElement.id.iznosRacunaZaProsliMjesec).val();
    sessionStorage.iznosZabaveZaProsliMjesec = $(app.htmlElement.id.iznosZabaveZaProsliMjesec).val();
    sessionStorage.iznosOstalihIzdatakaZaProsliMjesec = $(app.htmlElement.id.iznosOstalihIzdatakaZaProsliMjesec).val();
    sessionStorage.kucanstvoID = $(app.htmlElement.id.kucanstvoID).val();
};


function saveAnkete() {
    if (app.checkInternetConnection()) {
        var ankete = [{
            IznosHraneZaProsliMjesec: $(app.htmlElement.id.iznosHraneZaProsliMjesec).val(),
            IznosRacunaZaProsliMjesec: $(app.htmlElement.id.iznosRacunaZaProsliMjesec).val(),
            IznosZabaveZaProsliMjesec: $(app.htmlElement.id.iznosZabaveZaProsliMjesec).val(),
            IznosOstalihIzdatakaZaProsliMjesec: $(app.htmlElement.id.iznosOstalihIzdatakaZaProsliMjesec).val(),
            KucanstvoID: $(app.htmlElement.id.kucanstvoID).val()
        }];
        app.sendAnketeByAjax(ankete);
    } else {
        app.localStorageAnkete.push();
        bootbox.alert("Podaci su spremljeni inetrno u aplikaciju");
    }
    resetForm();
};

function resetForm() {
    $(app.htmlElement.id.iznosHraneZaProsliMjesec).val("");
    $(app.htmlElement.id.iznosRacunaZaProsliMjesec).val("");
    $(app.htmlElement.id.iznosZabaveZaProsliMjesec).val("");
    $(app.htmlElement.id.iznosOstalihIzdatakaZaProsliMjesec).val("");
    $(app.htmlElement.id.kucanstvoID).val("");
}

function loadKucanstva() {
    if (app.checkInternetConnection()) {
        app.getJson('/Json/GetKucanstva', function (data) {  
            fillKucanstvaToDdl(data);
            localStorage.kucanstva = JSON.stringify(data);
        });
    } else {
        fillKucanstvaToDdl(JSON.parse(localStorage.kucanstva));
    }
};

function fillKucanstvaToDdl(result) {
    var ddl = $(app.htmlElement.id.kucanstvoID);
    ddl.append('<option value="">---odaberi kućanstvo---</option>');

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