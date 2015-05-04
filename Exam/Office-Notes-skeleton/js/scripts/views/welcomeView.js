var app = app || {};

app.welcomeView = (function () {
    function WelcomeView(selector) {
        $.get('templates/welcome.html', function (template) {
            var output = Mustache.render(template);
            $(selector).html(output);
            $('#menu').hide();
        });
    }

    return {
        load:function(selector) {
            return new WelcomeView(selector);
        }
    }
}());