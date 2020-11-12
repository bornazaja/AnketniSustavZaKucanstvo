var tableHelper = {
    createTable: function (attributes, rowData, placeholder) {
        var table = '<table class="table table-striped">';

        table += '<tr>'
        attributes.forEach(function (element) {
            table += '<td>' + element + '</td>';
        });
        table += '</tr>';

        rowData.forEach(function (element) {
            table += '<tr>';
            Object.values(element).forEach(value => table += '<td>' + value + '</td>');
            table += '</tr>';
        });

        table += '</table>';
        placeholder.html(table);
    }
};
$(window).on('load', function () {
    loadAnkete();
});

$('#btnOsvjeziSvePodatke').on('click', function () {
    loadAnkete();
    bootbox.alert("Podaci su osvježeni.");
});

function loadAnkete() {
    if (app.checkInternetConnection()) {
        app.getJson('/Json/GetAnkete', function (data) {
            fillAnketeFromDbToTable(data);
            localStorage.ankete = JSON.stringify(data);
        }, 'Desila se greška prilikom dohvaćanja anketa.');
    } else {
        fillAnketeFromDbToTable(JSON.parse(localStorage.ankete));
    }
    fillAnketeFromMemoryToTable();
};

function fillAnketeFromDbToTable(data) {
    var placeholder = $('.placeholderAnketeFromDb');

    if (app.isArrayNotNullOrEmpty(data)) {
        var attributes =
            [
                'ID Anketa',
                'Kućanstvo ID',
                'Šifra kućanstva',
                'Ime',
                'Prezime',
                'Ulica',
                'Kućni broj',
                'Grad',
                'Iznos hrane za prošli mjesec',
                'Iznos računa za prošli mjesec',
                'Iznos zabave za prošli mjesec',
                'Iznos ostalih izdataka za prošli mjesec',
                'Valuta'
            ];

        tableHelper.createTable(attributes, data, placeholder);
    } else {
        var paragraph = '<p class="alert alert-info">Trenutno nema niti jedne ankete u bazi.</p>'
        placeholder.html(paragraph);
    }
};

function fillAnketeFromMemoryToTable() {
    var data = app.localStorageAnkete.get();
    var placeholder = $('.placeholderAnketeFromMemory');

    if (app.isArrayNotNullOrEmpty(data)) {

        var attributes =
            [
                'Kućanstvo ID',
                'Iznos hrane za prošli mjesec',
                'Iznos računa za prošli mjesec',
                'Iznos zabave za prošli mjesec',
                'Iznos ostalih izdataka za prošli mjesec',
                'Valuta ID'
            ];

        tableHelper.createTable(attributes, data, placeholder);
    } else {
        var paragraph = '<p class="alert alert-info">Trenutno nema niti jedne ankete u memoriji.</p>'
        placeholder.html(paragraph);
    }
}