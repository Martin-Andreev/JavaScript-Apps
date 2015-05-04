(function () {
    var books = [
        {"book": "The Grapes of Wrath", "author": "John Steinbeck", "price": "34,24", "language": "French"},
        {"book": "The Great Gatsby", "author": "F. Scott Fitzgerald", "price": "39,26", "language": "English"},
        {"book": "Nineteen Eighty-Four", "author": "George Orwell", "price": "15,39", "language": "English"},
        {"book": "Ulysses", "author": "James Joyce", "price": "23,26", "language": "German"},
        {"book": "Lolita", "author": "Vladimir Nabokov", "price": "14,19", "language": "German"},
        {"book": "Catch-22", "author": "Joseph Heller", "price": "47,89", "language": "German"},
        {"book": "The Catcher in the Rye", "author": "J. D. Salinger", "price": "25,16", "language": "English"},
        {"book": "Beloved", "author": "Toni Morrison", "price": "48,61", "language": "French"},
        {"book": "Of Mice and Men", "author": "John Steinbeck", "price": "29,81", "language": "Bulgarian"},
        {"book": "Animal Farm", "author": "George Orwell", "price": "38,42", "language": "English"},
        {"book": "Finnegans Wake", "author": "James Joyce", "price": "29,59", "language": "English"},
        {"book": "The Grapes of Wrath", "author": "John Steinbeck", "price": "42,94", "language": "English"},
        {"book": "Makq ti", "author": "John Steinbeck", "price": "14,50", "language": "French"},
    ];

    //Group all books by language and sort them by author (if two books have the same author, sort by price)
    var groupedByLanguage = _.sortBy(books, function (book) {
        return [book.author, book.price];
    });

    groupedByLanguage = _.groupBy(books, function (book) {
        return book.language
    });

    //Get the average book price for each author
    var avgBookPerAuthor = _.groupBy(books, function (book) {
        return book.author;
    });

    _.each(avgBookPerAuthor, function (authorBooks) {
        var author;
        var average = _.reduce(authorBooks, function (memo, book) {
                author = book.author;
                return (memo + parseFloat(book.price));
            }, 0) / authorBooks.length;

        console.log('Author: ' + author + '. Average price: ' + average);
    });

    // // Get the average book price for each author with lodash
    // _.map(_.groupBy(students, 'author'), function(author) {
    //     output = output || {}
    //     var authorName = author[0].author;
    //     var booksCount = author.length;
    //     var total = 0;
    //     var avgPrice;
    //     _.map(author, function(book) {
    //         total +=  parseInt(book.price);
    //     });
    //     avgPrice = total / booksCount;
    //     output[authorName] = avgPrice;
    // });

    //Get all books in English or German, with price below 30.00, and group them by author
    var avgBookPrice = _.reject(books, function (book) {
        return parseFloat(book.price) > 30;
    });

    avgBookPrice = _.filter(avgBookPrice, function (book) {
        return book.language === 'English' || book.language === 'German';
    });

    avgBookPrice = _.groupBy(avgBookPrice, function (book) {
        return book.author;
    });

    //console.log(groupedByLanguage);
    //console.log(avgBookPrice);
})();