var requester = (function () {
    var HEADERS = {
        'X-Parse-Application-Id' : 'FLtHIOZhuXrljpn901MaFpqUB2jP8n1gGtzQaIES',
        'X-Parse-REST-API-Key' : 'cUeqQpOgNeJIIQUN236XtxoFnNRr52kNLzNUEMvm'
    };

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
        return makeRequest('GET', url, null, success, error)
    }

    function postRequest(url, data, success, error) {
        return makeRequest('POST', url, data, success, error)
    }

    function deleteRequest(url, success, error) {
        return makeRequest('DELETE', url, null, success, error)
    }

    function editRequest(url, data, success, error) {
        return makeRequest('PUT', url, data, success, error)
    }

    return {
        getRequest: getRequest,
        postRequest: postRequest,
        deleteRequest: deleteRequest,
        editRequest: editRequest
    }
})();