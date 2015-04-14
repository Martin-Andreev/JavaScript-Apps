var app = app || {};

app.models = (function () {
    function Models(baseUrl) {
        this.baseUrl = baseUrl;
        this.country = new Country(this.baseUrl);
        this.town = new Town(this.baseUrl);
    }

    var Requester = (function () {
        function makeRequest(method, url, data, success, error) {
            $.ajax({
                method: method,
                headers: {
                    'X-Parse-Application-Id': 'nkFkBB16NQNZ7JdnetWzXKO99XWgmAQC6Gm6A9DJ',
                    'X-Parse-REST-API-Key': 'EFoVTaZ82GLnqHiXtz8GxUfPJRwLFrJc0gtfQeQX'
                },
                url: url,
                contentType: 'application/json',
                data: JSON.stringify(data),
                success: success,
                error: error
            })
        }

        function getRequest(url, success, error) {
            makeRequest('GET', url, null, success, error);
        }

        function postRequest(url, data, success, error) {
            makeRequest('POST', url, data, success, error);
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

    var Country = (function () {
        function Country(baseUrl){
            this.serviceUrl = baseUrl + 'Country/';
        }

        Country.prototype.getAllCountries = function (success, error) {
            return Requester.getRequest(this.serviceUrl, success, error);
        };

        Country.prototype.addCountry = function (country, success, error) {
            return Requester.postRequest(this.serviceUrl, country, success, error);
        };

        Country.prototype.removeCountry = function (id, success, error) {
            return Requester.deleteRequest(this.serviceUrl + id, success, error);
        };

        Country.prototype.editCountry = function (id, countryName, success, error) {
            return Requester.editRequest(this.serviceUrl + id, countryName, success, error);
        };

        return Country;
    })();

    var Town = (function () {
        function Town(baseUrl){
            this.serviceUrl = baseUrl + 'Town/';
        }

        Town.prototype.getAllTownsInCountry = function (query, success, error) {
            return Requester.getRequest(this.serviceUrl + query, success, error);
        };

        Town.prototype.addTown = function (town, success, error) {
            console.log(town);
            return Requester.postRequest(this.serviceUrl, town, success, error);
        };

        Town.prototype.removeTown = function (id, success, error) {
            return Requester.deleteRequest(this.serviceUrl + id, success, error);
        };

        Town.prototype.editTown = function (id, countryName, success, error) {
            return Requester.editRequest(this.serviceUrl + id, countryName, success, error);
        };

        return Town;
    })();

    return {
        loadModels : function (baseUrl) {
            return new Models(baseUrl);
        }
    }
})();