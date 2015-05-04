var app = app || {};

(function () {
    app.router = Sammy(function () {
        var selector = '#wrapper';

        this.get('#/Sam', function () {
            $(selector).html('Hello, Sam');
        });

        this.get('#/Bob', function () {
            $(selector).html('Hello, Bob');
        });

        this.get('#/Dot', function () {
            $(selector).html('Hello, Dot');
        });
    });

    app.router.run('#/Sam');
})();