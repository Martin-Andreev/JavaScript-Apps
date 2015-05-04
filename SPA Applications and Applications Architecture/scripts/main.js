var bookshop = bookshop || {};

(function () {
    var rootUrl = 'https://api.parse.com/1/';
    var selector = '#main-wrapper';
    var model = bookshop.bookModel.load(rootUrl);
    var controller = bookshop.bookController.load(model);
    controller.attachEventHandlers(selector);

    bookshop.router = Sammy(function () {
        this.get('#/', function () {
            controller.getHomePage(selector);
        });

        this.get('#/Edit-book', function () {
            controller.getEditBookPage(selector);
        });

        this.get('#/Add-book', function () {
            controller.getAddBookPage(selector);
        });
    });

    bookshop.router.run('#/');
})();