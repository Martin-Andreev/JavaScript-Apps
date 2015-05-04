var app = app || {};

app.addNoteView = (function () {
    function AddNoteView(selector, data) {
        $.get('templates/addNote.html', function (template) {
            var output = Mustache.render(template, data);
            $(selector).html(output);
        });
    }

    return {
        load:function(selector, data) {
            return new AddNoteView(selector, data);
        }
    }
}());