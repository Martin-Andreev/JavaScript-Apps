var app = app || {};

app.editProfileView = (function () {
    function EditProfileView(selector, data) {
        $.get('templates/edit-profile.html', function (template) {
            var output = Mustache.render(template, data);
            $(selector).html(output);
            $('input:radio[name=gender-radio][value=' + data.gender + ']').attr('checked', true);
        });
    }

    return {
        load: function(selector, data) {
            return new EditProfileView(selector, data);
        }
    }
}());