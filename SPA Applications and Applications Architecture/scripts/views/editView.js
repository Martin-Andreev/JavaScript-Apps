var bookshop = bookshop || {};

bookshop.editView = (function () {
    function EdtView(selector, data) {
        $.get('templates/edit-book-view.html', function (template) {
            var output = Mustache.render(template, data);
            $(selector).html(output);
        });
    }

    return {
        load:function(selector, data) {
            return new EdtView(selector, data);
        }
    }
})();