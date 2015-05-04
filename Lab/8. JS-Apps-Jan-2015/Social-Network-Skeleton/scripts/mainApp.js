var app = app || {};

(function () {
    var mainSelector = '#main';
    var baseUrl = 'https://api.parse.com/1/';
    var model = app.model.load(baseUrl);
    var controller = app.controller.load(model);
    controller.attachEventHandlers(mainSelector);

    app.router = Sammy(function () {
        this.get('#/', function () {
            controller.getHomePage(mainSelector);
        });

        this.get('#/Register', function () {
            controller.getRegistrationPage(mainSelector);
        });

        this.get('#/Login', function () {
            controller.getLoginPage(mainSelector);
        });

        this.get('#/Edit-profile', function () {
            controller.getEditProfilePage(mainSelector);
        });
    });

    app.router.run('#/');
})();