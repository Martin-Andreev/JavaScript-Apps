var app = app || {};

app.requester = (function () {
    function Requester() {
    }

    function makeRequest(method, headers, url, data) {
        var defer = Q.defer();

        $.ajax({
            method: method,
            headers: headers,
            url: url,
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

    Requester.prototype.get = function (url, headers) {
        return makeRequest('GET', headers, url);
    };

    Requester.prototype.post = function (url, headers, data) {
        return makeRequest('POST', headers, url, data);
    };

    Requester.prototype.put = function (url, headers, data) {
        return makeRequest('PUT', headers, url, data);
    };

    Requester.prototype.remove = function (url, headers) {
        return makeRequest('DELETE', headers, url);
    };

    return {
        load: function () {
            return new Requester();
        }
    }
})();