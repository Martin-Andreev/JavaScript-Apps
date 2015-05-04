var app = app || {};

app.model = (function () {
    function Model(baseUrl, requester, headers) {
        this.users = new User(baseUrl, requester, headers);
        this.notes = new Note(baseUrl, requester, headers);
    }

    var User = (function () {
        function User(baseUrl, requester, headers) {
            this.baseUrl = baseUrl;
            this.requester = requester;
            this.headers = headers;
        }

        User.prototype.login = function (username, password) {
            var serviceUrl = this.baseUrl + 'login?username=' + username + '&password=' + password;
            return this.requester.get(serviceUrl, this.headers.getHeaders());
        };

        User.prototype.register = function (username, password, fullName) {
            var serviceUrl = this.baseUrl + 'users/';
            var data = {
                username: username,
                password: password,
                fullName: fullName
            };
            return this.requester.post(serviceUrl, this.headers.getHeaders(), data);
        };

        User.prototype.logout = function () {
            var serviceUrl = this.baseUrl + 'logout';
            return this.requester.post(serviceUrl, this.headers.getHeaders(true));
        };

        User.prototype.getUserById = function (id) {
            var url = this.baseUrl + 'users/' + id;
            return this.requester.get(url, this.headers.getHeaders(true));
        };

        return User
    })();

    var Note = (function() {
        var NOTES_PER_PAGE = 10;

        function Note (baseUrl, requester, headers) {
            this.serviceUrl = baseUrl + 'classes/Note';
            this.requester = requester;
            this.headers = headers;
            this._notesCounter = 0;
        }

        Note.prototype.addNote = function(author, title, text, deadline, userId) {
            var data = {
                author: author,
                title: title,
                text: text,
                deadline: {
                    '__type': 'Date',
                    'iso': deadline
                },
                ACL: {}
            };

            data.ACL[userId] = { 'write' : true, 'read' : true};
            data.ACL['*'] = { 'read' : true};

            return this.requester.post(this.serviceUrl, this.headers.getHeaders(), data);
        };

        Note.prototype.getMyNotes = function() {
            return this.requester.get(this.serviceUrl, this.headers.getHeaders(true));
        };

        Note.prototype.getNoteById = function (id) {
            var url = this.serviceUrl + '/' + id;
            return this.requester.get(url, this.headers.getHeaders());
        };

        Note.prototype.editNote = function (id, title, text, deadline) {
            var url = this.serviceUrl + '/' + id;
            var editedNote = {
                title: title,
                text: text,
                deadline: {
                    '__type': 'Date',
                    'iso': deadline
                }
            };

            return this.requester.put(url, this.headers.getHeaders(true), editedNote);
        };

        Note.prototype.deleteNote = function (id) {
            var url = this.serviceUrl + '/' + id;
            return this.requester.remove(url, this.headers.getHeaders(true));
        };

        Note.prototype.getNotesByDate = function () {
            var currentDate = new Date().toJSON().slice(0,10);
            var url = this.serviceUrl + '?where={"deadline":{"__type":"Date","iso":"' + currentDate + 'T01:00:00.000Z"}}';
            return this.requester.get(url, this.headers.getHeaders());
        };

        return Note
    })();

    return {
        load: function (baseUrl, requester, headers) {
            return new Model(baseUrl, requester, headers);
        }
    }
})();