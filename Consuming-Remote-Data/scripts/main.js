var bookshop = bookshop || {};

(function () {
    var model = bookshop.models.loadModels('https://api.parse.com/1/classes/');
    var viewModel = new bookshop.viewModel.loadViewModel(model);
    viewModel.showAllBooks();
})();