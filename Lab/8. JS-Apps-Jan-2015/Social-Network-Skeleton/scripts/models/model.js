var app = app || {};

app.model = (function () {
    function Model(baseUrl) {
        this.users = new Users(baseUrl);
        this.posts = new Posts(baseUrl);
    }

    var credentials = (function () {
        function getHeaders() {
            var headers = {
                'X-Parse-Application-Id': 'ER9uoSxrNwOhkeq9pvBxRXPZZEmS7Rmg4ityCOMC',
                'X-Parse-REST-API-Key': '96EmLrf62yJR1KWSTp32gUi3Yh1D0qeET5ILpa9p'
            };
            var currentUserSessionToken = getSessionToken();
            if (currentUserSessionToken) {
                headers['X-Parse-Session-Token'] = currentUserSessionToken
            }

            return headers;
        }

        function getSessionToken() {
            return sessionStorage.getItem('sessionToken');
        }

        function setSessionToken(sessionToken) {
            sessionStorage.setItem('sessionToken', sessionToken);
        }

        function getUserId() {
            return sessionStorage.getItem('userId');
        }

        function setUserId(userId) {
            return sessionStorage.setItem('userId', userId);
        }

        function getUsername(sessionToken) {
            return sessionStorage.getItem('username');
        }

        function setUsername(sessionToken) {
            sessionStorage.setItem('username', sessionToken);
        }

        function clearStorage() {
            sessionStorage.clear();
        }

        return {
            getSessionToken: getSessionToken,
            setSessionToken: setSessionToken,
            getUserId: getUserId,
            setUserId: setUserId,
            getUsername: getUsername,
            setUsername: setUsername,
            clearStorage: clearStorage,
            getHeaders: getHeaders
        }
    }());

    var Users = (function () {
        function Users(baseUrl) {
            this._serviceUrl = baseUrl;
            this._headers = credentials.getHeaders();
        }

        Users.prototype.login = function (username, password) {
            var url = this._serviceUrl + 'login?username=' + username + '&password=' + password;
            return app.ajaxRequester.getRequest(url, this._headers)
                .then(function (data) {
                    credentials.setSessionToken(data.sessionToken);
                    credentials.setUsername(data.username);
                    credentials.setUserId(data.objectId);
                    return data;
                }, function (error) {
                    console.log(error.responseText);
                });
        };

        Users.prototype.getUserById = function (id) {
            var url = this._serviceUrl + 'users/' + id;
            return app.ajaxRequester.getRequest(url, credentials.getHeaders());
        };

        Users.prototype.register = function (username, password, name, about, gender, picture) {
            var url = this._serviceUrl + 'users';
            var user = {
                username: username,
                password: password,
                name: name,
                about: about,
                gender: gender,
                picture: picture
            };

            return app.ajaxRequester.postRequest(url, user, this._headers)
                .then(function (data) {
                    credentials.setSessionToken(data.sessionToken);
                }, function (error) {
                    console.log(error.responseText);
                })
        };

        Users.prototype.editProfile = function (id, data) {
            var url = this._serviceUrl + 'users/' + id;
            return app.ajaxRequester.editRequest(url, data, credentials.getHeaders());
        };

        Users.prototype.getCurrentUserData = function () {
            return {
                userId: credentials.getUserId(),
                username: credentials.getUsername(),
                sessionToken: credentials.getSessionToken()
            }
        };

        Users.prototype.logout = function () {
            credentials.clearStorage();
        };

        return Users;
    })();

    var Posts = (function () {
        function Posts(baseUrl) {
            this._serviceUrl = baseUrl + 'classes/Post';
            this._headers = credentials.getHeaders();
        }

        Posts.prototype.getAllPosts = function () {
            var url = this._serviceUrl + '?include=createdBy';
            return app.ajaxRequester.getRequest(url, credentials.getHeaders());
        };

        Posts.prototype.getPostById = function (id) {
            var url = this._serviceUrl + '/' + id;
            return app.ajaxRequester.getRequest(url, this._headers);
        };

        Posts.prototype.addPost = function (data) {
            return app.ajaxRequester.postRequest(this._serviceUrl, data, this._headers);
        };

        return Posts;
    })();

    return {
        load: function (baseUrl) {
            return new Model(baseUrl);
        }
    }
})();