var bookshop = bookshop || {};

bookshop.models = (function () {
    function Models(baseUrl) {
        this.baseUrl = baseUrl;
        this.book = new Book(this.baseUrl);
    }

    var Book = (function () {
        function Book(baseUrl) {
            this.serviceUrl = baseUrl + 'Book/';
        }

        Book.prototype.getAllBooks = function (success, error) {
            return requester.getRequest(this.serviceUrl, success, error);
        };

        Book.prototype.addBook = function (book, success, error) {
            return requester.postRequest(this.serviceUrl, book, success, error);
        };

        Book.prototype.removeBook = function (id, success, error) {
            return requester.deleteRequest(this.serviceUrl + id, success, error);
        };

        Book.prototype.editBook = function (id, bookData, success, error) {
            return requester.editRequest(this.serviceUrl + id, bookData, success, error);
        };

        return Book;
    })();

    return {
        loadModels: function (baseUrl) {
            return new Models(baseUrl);
        }
    }
})();