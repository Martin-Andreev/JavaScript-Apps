var app = app || {};

app.hoverView = (function () {
    function HoverView (selector, data) {
        $.get('templates/hover-box.html', function (template) {
            var output = Mustache.render(template, data);
            $('#hover-box').html(output);
        });
    }

    return {
        load: function(selector, data) {
            return new HoverView (selector, data);
        }
    }
}());