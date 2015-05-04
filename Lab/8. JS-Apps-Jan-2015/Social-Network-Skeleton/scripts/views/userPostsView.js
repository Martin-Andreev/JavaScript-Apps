var app = app || {};

app.userPostsView = (function () {
    function UserPostsView(selector, data) {
        $.get('templates/posts.html', function (template) {
            var output = Mustache.render(template, data);
            $(selector).html(output);
        });
    }

    return {
        load:function(selector, data) {
            return new UserPostsView(selector, data);
        }
    }
}());