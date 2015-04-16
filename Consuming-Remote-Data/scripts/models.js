var bookshop = bookshop || {};

bookshop.models = (function () {
    var HEADERS = {
        'X-Parse-Application-Id' : 'FLtHIOZhuXrljpn901MaFpqUB2jP8n1gGtzQaIES',
        'X-Parse-REST-API-Key' : 'cUeqQpOgNeJIIQUN236XtxoFnNRr52kNLzNUEMvm'
    };

    function Models(baseUrl) {
        this.baseUrl = baseUrl;
        this.book = new Book(this.baseUrl);
    }

    var Requester = (function () {
        function makeRequest(method, url, data, success, error) {
            $.ajax({
                method: method,
                headers: HEADERS,
                url: url,
                contentType: 'application/json',
                data: JSON.stringify(data),
                success: success,
                error: error
            })
        }

        function getRequest(url, success, error) {
            makeRequest('GET', url, null, success, error)
        }

        function postRequest(url, data, success, error) {
            makeRequest('POST', url, data, success, error)
        }

        function deleteRequest(url, success, error) {
            makeRequest('DELETE', url, null, success, error)
        }

        function editRequest(url, data, success, error) {
            makeRequest('PUT', url, data, success, error)
        }

        return {
            getRequest: getRequest,
            postRequest: postRequest,
            deleteRequest: deleteRequest,
            editRequest: editRequest
        }
    })();

    var Book = (function () {
        function Book(baseUrl) {
            this.serviceUrl = baseUrl + 'Book/';
        }

        Book.prototype.getAllBooks = function (success, error) {
            return Requester.getRequest(this.serviceUrl, success, error);
        };

        Book.prototype.addBook = function (book, success, error) {
            return Requester.postRequest(this.serviceUrl, book, success, error);
        };

        Book.prototype.removeBook = function (id, success, error) {
            return Requester.deleteRequest(this.serviceUrl + id, success, error);
        };

        Book.prototype.editBook = function (id, bookData, success, error) {
            return Requester.editRequest(this.serviceUrl + id, bookData, success, error);
        };

        return Book;
    })();

    return {
        loadModels: function (baseUrl) {
            return new Models(baseUrl);
        }
    }
})();