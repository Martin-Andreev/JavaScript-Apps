var app = app || {};

app.controller = (function () {
    var headerSelector = '#header';

    function BaseController(model) {
        this._model = model;
    }

    BaseController.prototype.getHomePage = function (selector) {
        var _this = this;
        var isUserLogged = this._model.users.getCurrentUserData().username;
        if (isUserLogged) {
            var userId =_this._model.users.getCurrentUserData().userId;
            this._model.users.getUserById(userId)
                .then(function (data) {
                    app.userHomeHeaderView.load(selector, data);
                    _this._model.posts.getAllPosts()
                        .then(function (data) {
                            app.userPostsView.load(selector, data);
                        }, function (error) {
                            console.log(error.responseText);
                        })
                })
        } else {
            $(headerSelector).html("");
            app.homeView.load(selector);
        }
    };

    BaseController.prototype.getRegistrationPage = function (selector) {
        app.registrationView.load(selector);
    };

    BaseController.prototype.getLoginPage = function (selector) {
        app.loginView.load(selector);
    };

    BaseController.prototype.getEditProfilePage = function (selector) {
        var isUserLogged = this._model.users.getCurrentUserData().username;
        if (!isUserLogged) {
            window.location.href = '#/';
            return;
        }

        var userData = this._model.users.getCurrentUserData();
        this._model.users.getUserById(userData.userId)
            .then(function (data) {
                app.userHomeHeaderView.load(selector, data);
                app.editProfileView.load(selector, data);
                Noty.success('Post successfully added.');
            }, function (error) {
                console.log(error.responseText);
            });
    };

    BaseController.prototype.attachEventHandlers = function (selector) {
        attachEventHandlerRegisterNewUser.call(this, selector);
        attachEventSelectProfilePicture.call(this, selector);
        attachEventHandlerLogin.call(this, selector);
        attachEventHandlerLogout.call(this, headerSelector);
        attachEventHandlerEditProfile.call(this, selector);
        attachEventHandleShowPostBox.call(this, headerSelector);
        attachEventHandlePostHover.call(this, selector);
    };

    var attachEventHandlePostHover = function attachEventHandlePostHover(selector) {
        var _this = this;
        var $hoverBox = $('#hover-box');
        $(selector).on('mouseover', '.profile-link', function (ev) {
            $($hoverBox)
                .css({
                    top: ev.top + 5 + 'px',
                    left: ev.left + 5 + 'px'
                })
                .show();

            var $userId = $(ev.target).data('id');
            _this._model.users.getUserById($userId)
                .then(function (data) {
                    app.hoverView.load($hoverBox, data);
                }, function (error) {
                    console.log(error.responseText);
                })
        });

        $(selector).on('mouseleave', '.profile-link', function() {
            $('.hover-box').hide();
        });
    };

    var attachEventHandleShowPostBox = function attachEventHandleShowPostBox(headerSelector) {
        $(headerSelector).on('click', '#post-btn', function (ev) {
            var $postContainer = $('#post-container');
            if ($postContainer.is(':visible')) {
                $postContainer.slideUp();
            } else {
                $postContainer.slideDown();
            }
        })
    };

    var attachEventHandlerEditProfile = function attachEventHandlerEditProfile(selector) {
        var _this = this;

        $(selector).on('click', '#save-edit-btn', function (ev) {
            var userId = _this._model.users.getCurrentUserData().userId;
            var user = {
                password: $('#password').val(),
                about: $('#about').val(),
                gender: $("input[name='gender-radio']:checked").val(),
                name: $('#name').val(),
                picture: $('.picture-preview').attr('src')
            };

            _this._model.users.editProfile(userId, user)
                .then(function (data) {
                    //_this.getHomePage(selector);
                    location.href = '#/';
                }, function (error) {
                    Noty.error("Error saving changes. Please try again.");
                })
        })
    };

    var attachEventHandlerLogout = function attachEventHandlerLogout(selector) {
        var _this = this;

        $(selector).on('click', '#logout-btn', function (ev) {
            _this._model.users.logout();
            _this.getHomePage('#main');
        })
    };

    var attachEventHandlerLogin = function attachEventHandlerLogin(selector) {
        var _this = this;

        $(selector).on('click', '#login-btn', function (ev) {
            var $username = $('#login-username').val();
            var $password = $('#login-password').val();

            _this._model.users.login($username, $password)
                .then(function (data) {
                    location.href = '#/';
                    _this.getUserHomePage(selector, data);
                }, function (error) {
                    console.log(error.responseText);
                })
        });
    };

    var attachEventSelectProfilePicture = function attachEventSelectProfilePicture(selector) {
        $(selector).on('click', '#upload-file-button', function () {
            $('#picture').click();
        });

        $(selector).on('change', '#picture', function () {
            var file = this.files[0],
                reader;

            if (file.type.match(/image\/.*/)) {
                reader = new FileReader();
                reader.onload = function (e) {
                    var $selectedFileInput = $('#picture');
                    var $fileName = ($selectedFileInput.val()).split('/').pop().split('\\').pop();

                    $('.picture-preview').attr('src', e.target.result);
                    $('.picture-name').text($fileName);
                };
                reader.readAsDataURL(file);
            } else {
                //TO DO: INVALID FORMAT
                noty({
                    text: 'Invalid file format! Selected file must be image!',
                    layout: 'center',
                    closeWith: ['click', 'hover'],
                    type: 'success'
                });
            }
        })
    };

    var attachEventHandlerRegisterNewUser = function attachEventHandlerRegisterNewUser(selector) {
        var _this = this;

        $(selector).on('click', '#reg-button', function (ev) {
            var $username = $('#reg-username').val();
            var $password = $('#reg-password').val();
            var $name = $('#reg-name').val();
            var $aboutMe = $('#reg-about').val();
            var $gender = $("input[name='gender-radio']:checked").val();
            var $picture = $('.picture-preview').attr('src');

            _this._model.users.register($username, $password, $name, $aboutMe, $gender, $picture)
                .then(function (data) {
                    location.href = '#/Login';
                    _this.getLoginPage(selector);
                }, function (error) {
                    console.log(error.responseText);
                })
        })


    };

    return {
        load: function (model) {
            return new BaseController(model)
        }
    }
})();