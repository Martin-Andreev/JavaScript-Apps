var app = app || {};

app.userHomeHeaderView = (function () {
    function UserHomeHeaderView(selector, data) {
        $.get('templates/user-header.html', function (template) {
            var output = Mustache.render(template, data);
            $('#header').html(output);
        });
    }

    return {
        load:function(selector, data) {
            return new UserHomeHeaderView(selector, data);
        }
    }
}());