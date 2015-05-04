var app = app || {};

app.editNoteView = (function () {
    function EditNoteView(selector, data) {
        $.get('templates/editNote.html', function (template) {
            var output = Mustache.render(template, data);
            $(selector).html(output);
            $('#menu').show();
            var currentDate = (data.deadline.iso).slice(0, 10);
            $('#deadline').val(currentDate);
        });
    }

    return {
        load:function(selector, data) {
            return new EditNoteView(selector, data);
        }
    }
}());