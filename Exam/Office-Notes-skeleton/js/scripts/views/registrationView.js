var app = app || {};

app.registrationView = (function () {
    function RegistrationView(selector) {
        $.get('templates/register.html', function (template) {
            var output = Mustache.render(template);
            $(selector).html(output);
            $('#menu').hide();
        });
    }

    return {
        load:function(selector) {
            return new RegistrationView(selector);
        }
    }
}());