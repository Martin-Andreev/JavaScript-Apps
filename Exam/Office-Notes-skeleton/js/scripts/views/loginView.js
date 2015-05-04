var app = app || {};

app.loginView = (function () {
    function LoginView (selector) {
        $.get('templates/login.html', function (template) {
            var output = Mustache.render(template);
            $(selector).html(output);
            $('#menu').hide();
        });
    }

    return {
        load:function(selector) {
            return new LoginView(selector);
        }
    }
}());