var app = app || {};

app.myNotesView = (function () {
    function MyNotesView(selector, data) {
        $.get('templates/myNoteTemplate.html', function (template) {
            var output = Mustache.render(template, data);
            $(selector).html(output);
        });
    }

    return {
        load:function(selector, data) {
            return new MyNotesView(selector, data);
        }
    }
}());