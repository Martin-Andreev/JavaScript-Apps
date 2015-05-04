var app = app || {};

(function() {
    var APPLICATION_ID= 'rigumvWZYBaZCNskYuDc6IZW4KWIcqEDElzq5I2d';
    var REST_API = 'fDdQjB4Pd48inmxIVyZCV7XR6DuFPlXv0Wf5KEII';
    var BASE_URL = 'https://api.parse.com/1/';

    var headers = app.headers.load(APPLICATION_ID, REST_API);
    var requester = app.requester.load();
    var model = app.model.load(BASE_URL, requester, headers);
    var controller = app.controller.load(model);
    controller.attachEventHandlers();

    app.router = Sammy(function () {
        this.get('#/home/', function () {
            controller.getHomePage();
        });

        this.get('#/register/', function () {
            controller.getRegistrationPage();
        });

        this.get('#/login/', function () {
            controller.getLoginPage();
        });

        this.get('#/logout/', function () {
            controller.logout();
        });

        this.get('#/addNote/', function () {
            controller.getAddNotePage();
        });

        this.get('#/myNotes/', function () {
            controller.getMyNotesPage();
        });

        this.get('#/editNote/:objectId', function () {
            controller.getEditNotePage(this.params.objectId);
        });

        this.get('#/deleteNote/:objectId', function () {
            controller.getDeleteNotePage(this.params.objectId);
        });

        this.get('#/office/', function () {
            controller.getOfficePage();
        });
    });

    app.router.run('#/home/');
}());