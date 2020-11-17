$(window).on('load', function () {
    app.anketaHelper.saveTemporaryAnketeFromLocalStorageToDB();
    app.anketaHelper.fetchAnkete();
    app.anketaHelper.fetchTemporaryAnketeFromLocalStorage();
});