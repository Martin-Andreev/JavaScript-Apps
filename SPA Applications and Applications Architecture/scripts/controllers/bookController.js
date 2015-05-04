var bookshop = bookshop || {};

bookshop.bookController = (function () {
    var _bookId;

    function BookController(model) {
        this._model = model;
    }

    BookController.prototype.getHomePage = function (selector) {
        this._model.book.getAllBooks()
            .then(function (data) {
                bookshop.homeView.load(selector, data);
            }, function (error) {
                console.log(error.responseText);
            })

    };

    BookController.prototype.getEditBookPage = function (selector) {
        this._model.book.getBookById(_bookId)
            .then(function (data) {
                bookshop.editView.load(selector, data);
            }, function (error) {
                console.log(error.responseText);
            })
    };

    BookController.prototype.getAddBookPage = function (selector) {
        bookshop.addBookView.load(selector)
    };

    BookController.prototype.attachEventHandlers = function (selector) {
        attachEventHandlerEditBook.call(this, selector);
        confirmEditBook.call(this, selector);
        confirmAddBook.call(this, selector);
        deleteBook.call(this, selector);
    };

    var confirmAddBook = function confirmAddBook(selector) {
        var _this = this;
        $(selector).on('click', '#confirm-add-book', function(ev) {
            var $bookTitle = $('#add-book-title').val();
            var $bookAuthor = $('#add-book-author').val();
            var $bookISBN = $('#add-book-isbn').val();
            ev.preventDefault();

            _this._model.book.addBook(
                {
                    title: $bookTitle,
                    author: $bookAuthor,
                    isbn: $bookISBN
                })
                .then(function () {
                    location.href = '#/';
                }, function (error) {
                    console.log(error.responseText);
                }
            )
        })
    };

    var confirmEditBook = function confirmEditBook(selector) {
        var _this = this;

        $(selector).on('click', '#confirm-edit-book', function(ev) {
            var $bookTitle = $('#edit-book-title').val();
            var $bookAuthor = $('#edit-book-author').val();
            var $bookISBN = $('#edit-book-isbn').val();
            ev.preventDefault();

            _this._model.book.editBook(
                _bookId,
                {
                    title: $bookTitle,
                    author: $bookAuthor,
                    isbn: $bookISBN
                })
                .then(function () {
                    location.href = '#/';
                }, function (error) {
                    console.log(error.responseText);
                }
            )
        })
    };

    var attachEventHandlerEditBook = function attachEventHandlerEditBook(selector) {
        $(selector).on('click', '.edit-button', function(ev) {
            _bookId = $(this).data('id');
        })
    };

    var deleteBook = function deleteBook(selector) {
        var _this = this;
        $(selector).on('click', '.delete-button', function(ev) {
            _bookId = $(this).data('id');
            _this._model.book.removeBook(_bookId)
                .then(function () {
                    $(ev.target).parent().parent().remove();
                }, function (error) {
                    console.log(error.responseText);
                });
        })
    };

    return {
        load: function (model) {
            return new BookController(model)
        }
    }
})();