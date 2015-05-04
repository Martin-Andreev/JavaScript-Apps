var bookshop = bookshop || {};

bookshop.bookModel = (function () {
    function BookModel(baseUrl) {
        this.baseUrl = baseUrl;
        this.book = new Book(this.baseUrl);
    }

    var Book = (function () {
        function Book(baseUrl) {
            this._serviceUrl = baseUrl + 'classes/Book/';
        }

        Book.prototype.getAllBooks = function () {
            return bookshop.ajaxRequester.getRequest(this._serviceUrl);
        };

        Book.prototype.getBookById = function (id) {
            return bookshop.ajaxRequester.getRequest(this._serviceUrl + id);
        };

        Book.prototype.addBook = function (book) {
            return bookshop.ajaxRequester.postRequest(this._serviceUrl, book);
        };

        Book.prototype.removeBook = function (id) {
            return bookshop.ajaxRequester.deleteRequest(this._serviceUrl + id);
        };

        Book.prototype.editBook = function (id, bookData) {
            return bookshop.ajaxRequester.editRequest(this._serviceUrl + id, bookData);
        };

        return Book;
    })();

    return {
        load: function (baseUrl) {
            return new BookModel(baseUrl);
        }
    }
})();