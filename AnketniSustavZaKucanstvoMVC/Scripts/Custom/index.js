$(window).on('load', function () {
    app.registerServiceWorker();
    Object.freeze(app.anketaHelper.obrazacHolder);
    app.anketaHelper.saveTemporaryAnketeFromLocalStorageToDB();
    app.anketaHelper.fetchAnketeFromDB();
    app.anketaHelper.fetchTemporaryAnketeFromLocalStorage();
});

$(window).bind('beforeunload', function () {
    return '';
});

$(window).on('online', function () {
    bootbox.alert('Aplikacija je online.');
    app.anketaHelper.saveTemporaryAnketeFromLocalStorageToDB();
});

$(window).on('offline', function () {
    bootbox.alert('Aplikacija je offline.');
});