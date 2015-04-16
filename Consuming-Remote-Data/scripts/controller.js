var bookshop = bookshop || {};

bookshop.viewModel = (function () {
    var HEADER_BOOKSHOP_H1_TEXT = 'Welcome to our Bookshop';

    var $body = $('body');
    var $mainWrapper = $('<main>');

    $mainWrapper.attr('id', 'main-wrapper');
    $mainWrapper.appendTo($body);

    function ViewModel(model) {
        this.model = model;
        this.generateInitialHTML();
        this.attachEventListener(this);
    }

    ViewModel.prototype.showAllBooks = function () {
        var viewModel = this;
        this.model.book.getAllBooks(
            function (booksData) {
                booksData.results.forEach(function (book) {
                    addBookToDom(book.title, book.author, book.isbn, book.objectId, viewModel);
                })
            },
            function (error) {
                console.log(error.responseText);
            }
        )
    };

    ViewModel.prototype.addBook = function (viewModel) {
        var $bookTitle = $('#add-book-title').val();
        var $bookAuthor = $('#add-book-author').val();
        var $bookISBN = $('#add-book-isbn').val();

        this.model.book.addBook(
            {
                title: $bookTitle,
                author: $bookAuthor,
                isbn: $bookISBN
            },
            function (data) {
                addBookToDom($bookTitle, $bookAuthor, $bookISBN, data.objectId, viewModel);
                $('#add-book-title').val('');
                $('#add-book-author').val('');
                $('#add-book-isbn').val('');
            },
            function (error) {
                console.log(error.responseText);
            }
        )
    };
    
    ViewModel.prototype.deleteBook = function (bookId, bookElement) {
        this.model.book.removeBook(
            bookId,
            function () {
                var $elementTableRow = $(bookElement).parent().parent();
                $elementTableRow.remove();
            },
            function (error) {
                console.log(error.responseText);
            }
        )
    };

    ViewModel.prototype.editBook = function (bookId, title, author, isbn) {
        var $bookTitle = $('#add-book-title');
        var $bookAuthor = $('#add-book-author');
        var $bookISBN = $('#add-book-isbn');

        this.model.book.editBook(
            bookId,
            {
                title: $($bookTitle).val(),
                author: $($bookAuthor).val(),
                isbn: $($bookISBN).val()
            },
            function () {
                title.text($('#add-book-title').val());
                author.text($('#add-book-author').val());
                isbn.text($('#add-book-isbn').val());

                $($bookTitle).val('');
                $($bookAuthor).val('');
                $($bookISBN).val('');
            },
            function (error) {
                console.log(error.responseText);
            }
        )
    };

    ViewModel.prototype.attachEventListener = function (viewModel) {
        $('#add-book-button').click(function () {
            $('#edit-box').dialog({
                title: 'New Book',
                width: 400,
                height: 290,
                modal: true,
                resizable: false,
                draggable: true,
                buttons: {
                    Add: function () {
                        viewModel.addBook(viewModel);
                        $(this).dialog("close");
                    },
                    Cancel: function () {
                        $(this).dialog("close");
                    }
                }
            })
        });

        $('.delete-button').unbind('click').click(function (e) {
            var bookId = e.target.getAttribute('data-id');
            var bookElement = e.target;
            viewModel.deleteBook(bookId, bookElement);
        });

        $('.edit-button').unbind('click').click(function (e) {
            var target = $(e.target);
            var titleToChange = target.parent().parent().children().eq(0);
            var authorToChange = target.parent().parent().children().eq(1);
            var isbnToChange = target.parent().parent().children().eq(2);

            $('#add-book-title').val(titleToChange.text());
            $('#add-book-author').val(authorToChange.text());
            $('#add-book-isbn').val(isbnToChange.text());

            $('#edit-box').dialog({
                title: 'Edit Book',
                width: 400,
                height: 290,
                modal: true,
                resizable: false,
                draggable: true,
                buttons: {
                    Edit: function () {
                        var bookId = target.attr('data-id');
                        viewModel.editBook(bookId, titleToChange, authorToChange, isbnToChange);
                        $(this).dialog("close");
                    },
                    Cancel: function () {
                        $(this).dialog("close");
                    }
                }
            })
        })
    };

    function generateMainHeader() {
        var $mainHeader = $('<header>');
        var $headerH1 = $('<h1>');

        $mainHeader.attr('id', 'main-header');
        $mainHeader.appendTo($mainWrapper);

        $headerH1.addClass('header-text');
        $headerH1.text(HEADER_BOOKSHOP_H1_TEXT);
        $headerH1.appendTo($mainHeader);
    }

    function addBookToDom(title, author, isbn, bookId, viewModel) {
        var bookDetails = [title, author, isbn];
        var parentElement = $('#table-body');
        var $trDetails = $('<tr>');
        var $buttonDelete = $('<button>');
        var $buttonEdit = $('<button>');

        $trDetails.appendTo(parentElement);

        bookDetails.forEach(function (detail) {
            var $thDetail = $('<th>');
            $thDetail.text(detail);
            $thDetail.appendTo($trDetails);
        });

        var $thButtons = $('<th>');
        $thButtons.addClass('buttons-cell');
        $thButtons.appendTo($trDetails);

        $buttonDelete.addClass('delete-button');
        $buttonDelete.attr('data-id', bookId);
        $buttonDelete.text('Delete');
        $buttonDelete.appendTo($thButtons);

        $buttonEdit.addClass('edit-button');
        $buttonEdit.attr('data-id', bookId);
        $buttonEdit.text('Edit');
        $buttonEdit.appendTo($thButtons);

        viewModel.attachEventListener(viewModel);
    }

    function generateAddField() {
        var $addBookSection = $('<section>');
        var $bookTitle = $('<input>');
        var $bookAuthor = $('<input>');
        var $bookISBN = $('<input>');

        $addBookSection.attr('id', 'edit-box');
        $addBookSection.appendTo($mainWrapper);

        $bookTitle.attr('type', 'text');
        $bookTitle.addClass('add-form-button');
        $bookTitle.attr('id', 'add-book-title');
        $bookTitle.attr('placeholder', 'Title...');
        $bookTitle.appendTo($addBookSection);

        $bookAuthor.attr('type', 'text');
        $bookAuthor.addClass('add-form-button');
        $bookAuthor.attr('id', 'add-book-author');
        $bookAuthor.attr('placeholder', 'Author...');
        $bookAuthor.appendTo($addBookSection);

        $bookISBN.attr('type', 'text');
        $bookISBN.addClass('add-form-button');
        $bookISBN.attr('id', 'add-book-isbn');
        $bookISBN.attr('placeholder', 'ISBN...');
        $bookISBN.appendTo($addBookSection);
    }

    function generateMainContent() {
        generateMainHeader();
        var $bodySection = $('<section>');
        var $booksTable = $('<table>');
        var $thead = $('<thead>');
        var $tbody = $('<tbody>');
        var $tr = $('<tr>');
        var $addButton = $('<button>');
        var tableHeaderContent = ['Title', 'Author', 'ISBN', 'Options'];

        $bodySection.attr('id', 'body-section');
        $bodySection.appendTo($mainWrapper);

        $booksTable.attr('id', 'book-table');
        $booksTable.appendTo($bodySection);

        $thead.attr('id', 'table-head');
        $thead.appendTo($booksTable);

        $tr.appendTo($thead);

        tableHeaderContent.forEach(function (specification) {
            var $th = $('<th>');
            $th.addClass('header-content');
            $th.text(specification);
            $th.appendTo($tr);
        });

        $tbody.attr('id', 'table-body');
        $tbody.appendTo($booksTable);

        $addButton.attr('id', 'add-book-button');
        $addButton.text('Add Book');
        $addButton.appendTo($bodySection);

        generateAddField();
    }

    ViewModel.prototype.generateInitialHTML = function () {
        generateMainContent($mainWrapper);
    };

    return {
        loadViewModel: function (model) {
            return new ViewModel(model);
        }
    }
})();