var app = app || {};

app.officeNotesView = (function () {
    function OfficeNotesView(selector, data) {
        $.get('templates/officeNoteTemplate.html', function (template) {
            var output = Mustache.render(template, data);
            $(selector).html(output);
        });
    }

    return {
        load:function(selector, data) {
            return new OfficeNotesView(selector, data);
        }
    }
}());