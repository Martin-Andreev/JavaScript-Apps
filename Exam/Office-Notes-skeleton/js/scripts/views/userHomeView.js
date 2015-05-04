var app = app || {};

app.userHomeView = (function () {
    function UserHomeView(selector, data) {
        $.get('templates/home.html', function (template) {
            var output = Mustache.render(template, data);
            $(selector).html(output);
        });
    }

    return {
        load:function(selector, data) {
            return new UserHomeView(selector, data);
        }
    }
}());