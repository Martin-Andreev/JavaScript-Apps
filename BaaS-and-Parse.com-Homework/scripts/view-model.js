var app = app || {};

app.viewModel = (function () {
    var HEADER_COUNTRY_H1_TEXT = 'Countries';
    var HEADER_TOWN_H1_TEXT = 'Towns';
    var ADD_BUTTON_TEXT = 'Add';
    var EDIT_BUTTON_TEXT = 'Edit';
    var DELETE_BUTTON_TEXT = 'Delete';
    var NUMBER_OF_OPTIONAL_LI_ELEMENTS = 1;

    _selectedCountryElement = [];
    _selectedTownElement = [];

    function ViewModel(model) {
        this.model = model;
        this.generateInitialHtml();
        this.attachEventListener(this);
    }

    ViewModel.prototype.generateInitialHtml = function () {
        var $body = $('body');
        var $mainWrapper = $('<main>');

        $mainWrapper.attr('id', 'main-wrapper');
        $mainWrapper.appendTo($body);

        generateMainContent($mainWrapper);
        generateAsideTownsContent($mainWrapper);
    };

    ViewModel.prototype.showAllTownsInCountry = function (selectedCountry) {
        var countryId = $(selectedCountry).attr('data-id');
        var viewModelObject = this;
        var query = '?where={"country":{"__type":"Pointer", "className":"Country", "objectId": "' + countryId + '"}}';
        this.model.town.getAllTownsInCountry(
            query,
            function (townsData) {
                townsData.results.forEach(function (town) {
                    addTownToDom(town.name, town.objectId, viewModelObject);
                });
            },
            function (error) {
                console.log(error.responseText);
            }
        )
    };

    ViewModel.prototype.addTown = function (viewModel) {
        var $townName = $('#add-town-input').val();
        var $selectedElementId = $('.selected-country').attr('data-id');

        viewModel.model.town.addTown(
            {
                name: $townName,
                country: {
                    __type: 'Pointer',
                    className: 'Country',
                    objectId: $selectedElementId
                }
            },
            function (data) {
                addTownToDom($townName, data.objectId, viewModel)
            },
            function (error) {
                console.log(error.responseText);
            }
        )
    };

    ViewModel.prototype.removeTown = function (townId) {
        this.model.town.removeTown(
            townId,
            function (data) {
                $('#towns-list')
                    .find('[data-id=' + townId + ']')
                    .remove();
            },
            function (error) {
                console.log(error.responseText);
            }
        );
    };

    ViewModel.prototype.editTown = function (townId, newTownName) {
        this.model.town.editTown(
            townId,
            {name: newTownName},
            function (data) {
                $('#towns-list').find('[data-id="' + townId + '"]').text(newTownName);

            },
            function (error) {
                console.log(error.responseText);
            }
        )
    };

    ViewModel.prototype.showAllCountries = function () {
        var viewModelObject = this;
        this.model.country.getAllCountries(
            function (countriesData) {
                countriesData.results.forEach(function (country) {
                    addCountryToDom(country.name, country.objectId, viewModelObject);
                });
                viewModelObject.attachEventListener(viewModelObject);
            },
            function (err) {
                console.log(err.responseText);
            }
        );
    };

    ViewModel.prototype.addCountry = function (viewModel) {
        var $countryName = $('#add-country-input').val();

        viewModel.model.country.addCountry(
            {name: $countryName},
            function (data) {
                addCountryToDom($countryName, data.objectId, viewModel)
            },
            function (error) {
                console.log(error.responseText);
            }
        )
    };

    ViewModel.prototype.removeCountry = function (countryId) {
        this.model.country.removeCountry(
            countryId,
            function (data) {
                $('#country-list')
                    .find('[data-id=' + countryId + ']')
                    .remove();
                $('#aside-towns').css('visibility', 'hidden');
            },
            function (error) {
                console.log(error.responseText);
            }
        );
    };

    ViewModel.prototype.editCountry = function (countryId, newCountryName) {
        this.model.country.editCountry(
            countryId,
            {name: newCountryName},
            function (data) {
                $('#country-list').find('[data-id="' + countryId + '"]').text(newCountryName);

            },
            function (error) {
                console.log(error.responseText);
            }
        )
    };

    ViewModel.prototype.attachEventListener = function (viewModel) {
        var addCountryInput = $('#add-country-input');
        var addTownInput = $('#add-town-input');

        $('.country').unbind('click').click(function (e) {
            if (_selectedCountryElement.length) {
                _selectedCountryElement.splice(0, 1);
            }

            if (_selectedTownElement.length) {
                _selectedTownElement.splice(0, 1)
            }

            var targetCountry = e.target;
            var $selectedCountry = $(targetCountry);
            $('.selected-country').removeClass('selected-country');
            $selectedCountry.addClass('selected-country');
            _selectedCountryElement.push($selectedCountry);

            $('#aside-towns').css('visibility', 'visible');
            $('#towns-list li').each(function (liNumber) {
                if (liNumber > NUMBER_OF_OPTIONAL_LI_ELEMENTS) {
                    (this).remove();
                }
            });

            viewModel.showAllTownsInCountry(targetCountry);
        });

        $('.town').unbind('click').click(function (e) {
            if (_selectedTownElement.length) {
                _selectedTownElement.splice(0, 1);
            }

            var targetTown = e.target;
            var $selectedTown = $(targetTown);
            $('.selected-town').removeClass('selected-town');
            $selectedTown.addClass('selected-town');
            _selectedTownElement.push($selectedTown);
        });

        $('#add-country').unbind('click').click(function () {
            viewModel.addCountry(viewModel);
            addCountryInput.val('');
        });

        $('#add-town').unbind('click').click(function (e) {
            viewModel.addTown(viewModel);
            addTownInput.val('');
        });

        $('#edit-country').unbind('click').click(function () {
            if (_selectedCountryElement.length) {
                $('#edit-country-text-input').val(_selectedCountryElement[0].text());
                $('#edit-box').dialog({
                    title: 'Edit Country',
                    width: 400,
                    height: 200,
                    modal: true,
                    resizable: false,
                    draggable: true,
                    buttons: {
                        OK: function () {
                            var countryId = _selectedCountryElement[0].attr('data-id');
                            var editedName = $('#edit-country-text-input').val();
                            viewModel.editCountry(countryId, editedName);
                            $(this).dialog("close");
                        },
                        Cancel: function () {
                            $(this).dialog("close");
                        }
                    }
                })
            }
        });

        $('#edit-town').unbind('click').click(function () {
            if (_selectedTownElement.length) {
                $('#edit-town-text-input').val(_selectedTownElement[0].text());
                $('#edit-town-box').dialog({
                    title: 'Edit Town',
                    width: 400,
                    height: 200,
                    modal: true,
                    resizable: false,
                    draggable: true,
                    buttons: {
                        OK: function () {
                            var townId = _selectedTownElement[0].attr('data-id');
                            var editedName = $('#edit-town-text-input').val();
                            viewModel.editTown(townId, editedName);
                            $(this).dialog("close");
                        },
                        Cancel: function () {
                            $(this).dialog("close");
                        }
                    }
                })
            }
        });

        $('#delete-country').unbind('click').click(function () {
            if (_selectedCountryElement.length) {
                var countryId = _selectedCountryElement[0].attr('data-id');
                _selectedCountryElement.splice(0, 1);
                viewModel.removeCountry(countryId);
            }
        });

        $('#delete-town').unbind('click').click(function () {
            if (_selectedTownElement.length) {
                var townId = _selectedTownElement[0].attr('data-id');
                _selectedTownElement.splice(0, 1);
                viewModel.removeTown(townId);
            }
        });

        $(document).unbind('keypress').keypress(function (e) {
            var ENTER_BUTTON_NUMBER = 13;

            if (e.which == ENTER_BUTTON_NUMBER && addCountryInput.is(':focus')) {
                viewModel.addCountry(viewModel);
                addCountryInput.val('');
            }
        });

        addCountryInput.click(function () {
            $('.selected-country').removeClass('selected-country');
            $('#aside-towns').css('visibility', 'hidden');

            if (_selectedCountryElement.length) {
                _selectedCountryElement.splice(0, 1);
            }
        });

        addTownInput.click(function () {
            $('.selected-town').removeClass('selected-town');

            if (_selectedCountryElement.length) {
                _selectedCountryElement.splice(0, 1);
            }

            if (_selectedTownElement.length) {
                _selectedTownElement.splice(0, 1)
            }
        });
    };

    function addCountryToDom(name, countryId, viewModel) {
        var parentUl = $('#country-list');
        var element = $('<li>');

        element.addClass('country');
        element.attr('data-id', countryId);
        element.text(name);
        element.appendTo(parentUl);

        viewModel.attachEventListener(viewModel);
    }

    function addTownToDom(name, townId, viewModel) {
        var parentTownUI = $('#towns-list');
        var town = $('<li>');

        town.addClass('town');
        town.attr('data-id', townId);
        town.text(name);
        town.appendTo(parentTownUI);

        viewModel.attachEventListener(viewModel);
    }

    function generateCountryHeader($mainWrapper) {
        var $countryHeader = $('<header>');
        var $headerH1 = $('<h1>');

        $countryHeader.attr('id', 'main-header');
        $countryHeader.appendTo($mainWrapper);

        $headerH1.addClass('header-text');
        $headerH1.text(HEADER_COUNTRY_H1_TEXT);
        $headerH1.appendTo($countryHeader);
    }

    function generateTownHeader($asideTownsContent) {
        var $townHeader = $('<header>');
        var $headerH1 = $('<h1>');

        $townHeader.attr('id', 'town-header');
        $townHeader.appendTo($asideTownsContent);

        $headerH1.addClass('header-text');
        $headerH1.text(HEADER_TOWN_H1_TEXT);
        $headerH1.appendTo($townHeader);
    }

    function generateMainContent($mainWrapper) {
        generateCountryHeader($mainWrapper);

        var $bodySection = $('<section>');
        var $ul = $('<ul>');
        var $liOptions = $('<li>');
        var $liAddCountry = $('<li>');
        var $addCountryInput = $('<input>');
        var $buttonAdd = $('<button>');
        var $buttonEdit = $('<button>');
        var $buttonDelete = $('<button>');
        var $editSection = $('<section>');
        var $editTextInput = $('<input>');

        $bodySection.attr('id', 'main-section');
        $bodySection.appendTo($mainWrapper);

        $ul.attr('id', 'country-list');
        $ul.appendTo($bodySection);

        $liOptions.attr('id', 'countries-options');
        $liOptions.appendTo($ul);

        $buttonAdd.attr('id', 'add-country');
        $buttonAdd.addClass('option-button');
        $buttonAdd.text(ADD_BUTTON_TEXT);
        $buttonAdd.appendTo($liOptions);

        $buttonEdit.attr('id', 'edit-country');
        $buttonEdit.addClass('option-button');
        $buttonEdit.text(EDIT_BUTTON_TEXT);
        $buttonEdit.appendTo($liOptions);

        $buttonDelete.attr('id', 'delete-country');
        $buttonDelete.addClass('option-button');
        $buttonDelete.text(DELETE_BUTTON_TEXT);
        $buttonDelete.appendTo($liOptions);

        $liAddCountry.appendTo($ul);
        $addCountryInput.attr('id', 'add-country-input');
        $addCountryInput.attr('placeholder', 'Add Country....');
        $addCountryInput.appendTo($liAddCountry);

        $editSection.attr('id', 'edit-box');
        $editSection.appendTo($mainWrapper);

        $editTextInput.attr('type', 'text');
        $editTextInput.attr('id', 'edit-country-text-input');
        $editTextInput.prependTo($editSection);
    }

    function generateAsideTownsContent($mainWrapper) {
        var $asideTownsContent = $('<aside>');
        var $ulTown = $('<ul>');
        var $liOptionsTown = $('<li>');
        var $liAddTown = $('<li>');
        var $addTownInput = $('<input>');
        var $buttonAddTown = $('<button>');
        var $buttonEditTown = $('<button>');
        var $buttonDeleteTown = $('<button>');
        var $editSectionTown = $('<section>');
        var $editTextInputTown = $('<input>');

        generateTownHeader($asideTownsContent);

        $asideTownsContent.attr('id', 'aside-towns');
        $asideTownsContent.appendTo($mainWrapper);

        $ulTown.attr('id', 'towns-list');
        $ulTown.appendTo($asideTownsContent);

        $liOptionsTown.attr('id', 'towns-options');
        $liOptionsTown.appendTo($ulTown);

        $buttonAddTown.attr('id', 'add-town');
        $buttonAddTown.addClass('option-button');
        $buttonAddTown.text(ADD_BUTTON_TEXT);
        $buttonAddTown.appendTo($liOptionsTown);

        $buttonEditTown.attr('id', 'edit-town');
        $buttonEditTown.addClass('option-button');
        $buttonEditTown.text(EDIT_BUTTON_TEXT);
        $buttonEditTown.appendTo($liOptionsTown);

        $buttonDeleteTown.attr('id', 'delete-town');
        $buttonDeleteTown.addClass('option-button');
        $buttonDeleteTown.text(DELETE_BUTTON_TEXT);
        $buttonDeleteTown.appendTo($liOptionsTown);

        $liAddTown.attr('id', 'towns-add');
        $liAddTown.appendTo($ulTown);

        $addTownInput.attr('id', 'add-town-input');
        $addTownInput.attr('placeholder', 'Add Town....');
        $addTownInput.appendTo($liAddTown);

        $editSectionTown.attr('id', 'edit-town-box');
        $editSectionTown.appendTo($mainWrapper);

        $editTextInputTown.attr('type', 'text');
        $editTextInputTown.attr('id', 'edit-town-text-input');
        $editTextInputTown.prependTo($editSectionTown);

    }

    return {
        loadViewModel: function (model) {
            return new ViewModel(model);
        }
    }
})();