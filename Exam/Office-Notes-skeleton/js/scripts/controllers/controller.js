var app = app || {};

app.controller = (function () {
    var MAIN_CONTAINER = '#container';
    var NAV_CONTAINER = '#menu';

    function Controller(model) {
        this._model = model;
    }

    Controller.prototype.getHomePage = function () {
        if (isUserLogged()) {
            var userId = sessionStorage['userId'];

            this._model.users.getUserById(userId)
                .then(function (data) {
                    app.navMenuView.load(NAV_CONTAINER, data);
                    app.userHomeView.load(MAIN_CONTAINER, data);
                })
        } else {
            app.welcomeView.load(MAIN_CONTAINER);
        }
    };

    Controller.prototype.getRegistrationPage = function () {
        app.registrationView.load(MAIN_CONTAINER);
    };

    Controller.prototype.getLoginPage = function () {
        app.loginView.load(MAIN_CONTAINER);
    };

    Controller.prototype.logout = function () {
        this._model.users.logout()
            .then(function () {
                clearUserFromStorage();
                location.href = '#/home/';
                Noty.success('Successfully logout');
            }, function () {
                Noty.error('Unable to logout. Please try again.')
            });
    };

    Controller.prototype.getAddNotePage = function () {
        if (isUserLogged()) {
            app.navMenuView.load(NAV_CONTAINER, getCurrentUsername());
            app.addNoteView.load(MAIN_CONTAINER);
        } else {
            location.href = '#/home/'
        }
    };

    Controller.prototype.getMyNotesPage = function () {
        if (isUserLogged()) {
            app.navMenuView.load(NAV_CONTAINER, getCurrentUsername());
            this._model.notes.getMyNotes()
                .then(function (data) {
                    var userId = sessionStorage.userId;
                    var notes = {
                        results: []
                    };
                    data.results.forEach(function (note) {
                        if (note.ACL[userId]) {
                            note.deadline.iso = (note.deadline.iso).slice(0, 10);
                            notes.results.push(note);
                        }
                    });

                    app.myNotesView.load(MAIN_CONTAINER, notes)
                }, function () {
                    Noty.error('Unable to show your notes. Please try again.')
                });
        } else {
            location.href = '#/home/'
        }
    };

    Controller.prototype.getEditNotePage = function (noteId) {
        if (isUserLogged()) {
            app.navMenuView.load(NAV_CONTAINER, getCurrentUsername());
            this._model.notes.getNoteById(noteId)
                .then(function (data) {
                    app.editNoteView.load(MAIN_CONTAINER, data)
                }, function () {
                    Noty.error('Unable to edit this note. Please try again.')
                })
        } else {
            location.href = '#/home/';
        }
    };

    Controller.prototype.getDeleteNotePage = function (noteId) {
        if (isUserLogged()) {
            app.navMenuView.load(NAV_CONTAINER, getCurrentUsername());
            this._model.notes.getNoteById(noteId)
                .then(function (data) {
                    app.deleteNoteView.load(MAIN_CONTAINER, data)
                }, function () {
                    Noty.error('Unable to edit this note. Please try again.')
                })
        } else {
            location.href = '#/home/';
        }
    };

    Controller.prototype.getOfficePage = function () {
        if (isUserLogged()) {
            app.navMenuView.load(NAV_CONTAINER, getCurrentUsername());

            this._model.notes.getNotesByDate()
                .then(function (data) {
                    data.results.forEach(function (note) {
                        note.deadline.iso = (note.deadline.iso).slice(0, 10);
                    });
                    app.officeNotesView.load(MAIN_CONTAINER, data)
                }, function () {
                    Noty.error('Unable to edit this note. Please try again.')
                })
        } else {
            location.href = '#/home/';
        }
    };

    function getCurrentUsername() {
        return username = {
            username: sessionStorage.username
        };
    }

    Controller.prototype.attachEventHandlers = function () {
        attachRegistrationEventHandler.call(this, MAIN_CONTAINER);
        attachLoginEventHandler.call(this, MAIN_CONTAINER);
        attachAddNoteEventHandler.call(this, MAIN_CONTAINER);
        attachEditNoteEventHandler.call(this, MAIN_CONTAINER);
        attachEditNoteButtonEventHandler.call(this, MAIN_CONTAINER);
        attachDeleteNoteEventHandler.call(this, MAIN_CONTAINER);
        attachDeleteNoteButtonEventHandler.call(this, MAIN_CONTAINER);
    };

    var attachDeleteNoteButtonEventHandler = function attachDeleteNoteButtonEventHandler(selector) {
        var _this = this;

        $(selector).on('click', '#deleteNoteButton', function (ev) {
            var $objectId = $('#delete-note').data('id');

            _this._model.notes.deleteNote($objectId)
                .then(function () {
                    location.href = '#/myNotes/';
                    Noty.success('Successfully removed');
                }, function () {
                    Noty.error('Unable to remove. Please try again.')
                })
        })
    };

    var attachDeleteNoteEventHandler = function attachDeleteNoteEventHandler(selector) {
        $(selector).on('click', '#delete-note-btn', function (ev) {
            var noteId = $(ev.target).data('id');
            location.href = '#/deleteNote/' + noteId;
        })
    };

    var attachEditNoteButtonEventHandler = function attachEditNoteButtonEventHandler(selector) {
        var _this = this;

        $(selector).on('click', '#editNoteButton', function (ev) {
            var $title = $('#title').val();
            var $text = $('#text').val();
            var $deadlineString = $("#deadline").val().split("-");
            var deadline = new Date(parseInt($deadlineString[0]), parseInt($deadlineString[1] - 1), parseInt($deadlineString[2]), 4, 0, 0);
            var $objectId = $('#edit-note').data('id');

            _this._model.notes.editNote($objectId, $title, $text, deadline)
                .then(function () {
                    location.href = '#/myNotes/';
                    Noty.success('Successfully edited');
                }, function () {
                    Noty.error('Unable to edit. Please try again.')
                })
        })
    };

    var attachEditNoteEventHandler = function attachEditNoteEventHandler(selector) {
        $(selector).on('click', '#edit-note-btn', function (ev) {
            var noteId = $(ev.target).data('id');
            location.href = '#/editNote/' + noteId;
        })
    };

    var attachAddNoteEventHandler = function attachAddNoteEventHandler(selector) {
        var _this = this;

        $(selector).on('click', '#addNoteButton', function (ev) {
            var $title = $('#title').val();
            var $text = $('#text').val();
            var userId = sessionStorage.userId;
            var author = sessionStorage.fullName;

            var $deadlineString = $("#deadline").val().split("-");

            var deadline = new Date(parseInt($deadlineString[0]), parseInt($deadlineString[1] - 1), parseInt($deadlineString[2]), 4, 0, 0);
            _this._model.notes.addNote(author, $title, $text, deadline, userId)
                .then(function (data) {
                    location.href = '#/myNotes/';
                    Noty.success('Note has been successfully added.')
                }, function () {
                    Notation.error('Error. Try again to add new note.')
                })
        })
    };

    var attachLoginEventHandler = function attachLoginEventHandler(selector) {
        var _this = this;

        $(selector).on('click', '#loginButton', function (ev) {
            var $username = $('#username').val();
            var $password = $('#password').val();

            _this._model.users.login($username, $password)
                .then(function (loginData) {
                    setUserToStorage(loginData);
                    Noty.success('Successfully logged in');
                    location.href = '#/home/';
                }, function () {
                    Noty.error('Unable to login. Please try again!')
                })
        });
    };

    var attachRegistrationEventHandler = function attachRegistrationEventHandler(selector) {
        var _this = this;

        $(selector).on('click', '#registerButton', function (ev) {
            var $username = $('#username').val();
            var $password = $('#password').val();
            var $fullName = $('#fullName').val();

            _this._model.users.register($username, $password, $fullName)
                .then(function (data) {
                    var userData = {
                        username: $username,
                        fullName: $fullName,
                        objectId: data.objectId,
                        sessionToken: data.sessionToken
                    };
                    setUserToStorage(userData);
                    Noty.success('Successfully registered');
                    location.href = '#/home/'
                }, function () {
                    Noty.error('Unable to register.Please try again.');
                    //$('#username').val('');
                    //$('#password').val('');
                    //$('#fullName').val('');
                })
        })
    };

    function setUserToStorage(data) {
        sessionStorage['username'] = data.username;
        sessionStorage['fullName'] = data.fullName;
        sessionStorage['userId'] = data.objectId;
        sessionStorage['sessionToken'] = data.sessionToken;
    }

    function clearUserFromStorage() {
        delete sessionStorage['username'];
        delete sessionStorage['fullName'];
        delete sessionStorage['userId'];
        delete sessionStorage['sessionToken'];
    }

    function isUserLogged() {
        return sessionStorage['username'];
    }

    return {
        load: function (model) {
            return new Controller(model);
        }
    }
})();