var bookshop = bookshop || {};

bookshop.addBookView = (function () {
    function AddBookView(selector) {
        $.get('templates/add-book-view.html', function (template) {
            var output = Mustache.render(template);
            $(selector).html(output);
        });
    }

    return {
        load:function(selector) {
            return new AddBookView(selector);
        }
    }
})();