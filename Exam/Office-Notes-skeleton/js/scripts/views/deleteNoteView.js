var app = app || {};

app.deleteNoteView = (function () {
    function DeleteNoteView(selector, data) {
        $.get('templates/deleteNote.html', function (template) {
            var output = Mustache.render(template, data);
            $(selector).html(output);
            $('#menu').show();
            var currentDate = (data.deadline.iso).slice(0, 10);
            $('#deadline').val(currentDate);
        });
    }

    return {
        load:function(selector, data) {
            return new DeleteNoteView(selector, data);
        }
    }
}());