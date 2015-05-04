var app = app || {};

app.ajaxRequester = (function () {
    function makeRequest(method, url, data, headers) {
        var defer = Q.defer();

        $.ajax({
            method: method,
            headers: headers,
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

    function makeGetRequest(url, headers) {
        return makeRequest('GET', url, null, headers)
    }

    function makePostRequest(url, data, headers) {
        return makeRequest('POST', url, data, headers)
    }

    function makePutRequest(url, data, headers) {
        return makeRequest('PUT', url, data, headers)
    }

    function makeDeleteRequest(url, headers) {
        return makeRequest('DELETE', url, null, headers)
    }

    return {
        getRequest: makeGetRequest,
        postRequest: makePostRequest,
        deleteRequest: makeDeleteRequest,
        editRequest: makePutRequest
    }
})();