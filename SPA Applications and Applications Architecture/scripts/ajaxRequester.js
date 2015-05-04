var bookshop = bookshop || {};

bookshop.ajaxRequester = (function () {
    var HEADERS = {
        'X-Parse-Application-Id' : 'FLtHIOZhuXrljpn901MaFpqUB2jP8n1gGtzQaIES',
        'X-Parse-REST-API-Key' : 'cUeqQpOgNeJIIQUN236XtxoFnNRr52kNLzNUEMvm'
    };

    function makeRequest(method, url, data) {
        var defer = Q.defer();

        $.ajax({
            method: method,
            headers: HEADERS,
            url: url,
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function (data) {
                defer.resolve(data);
            },
            error: function (error) {
                defer.reject(error);
            }
        });

        return defer.promise;
    }

    function getRequest(url) {
        return makeRequest('GET', url, null)
    }

    function postRequest(url, data) {
        return makeRequest('POST', url, data)
    }

    function deleteRequest(url) {
        return makeRequest('DELETE', url, null)
    }

    function editRequest(url, data) {
        return makeRequest('PUT', url, data)
    }

    return {
        getRequest: getRequest,
        postRequest: postRequest,
        deleteRequest: deleteRequest,
        editRequest: editRequest
    }
})();