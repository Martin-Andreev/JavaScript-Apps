var app = app || {};

app.navMenuView = (function () {
    function NavMenuView(selector, data) {
        $.get('templates/asideMenu.html', function (template) {
            var output = Mustache.render(template, data);
            $(selector).html(output);
            $('#menu').show();
        });
    }

    return {
        load:function(selector, data) {
            return new NavMenuView(selector, data);
        }
    }
}());