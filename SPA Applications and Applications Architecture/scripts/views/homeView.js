var bookshop = bookshop || {};

bookshop.homeView = (function () {
    function HomeView(selector, data) {
        $.get('templates/home-view.html', function (template) {
            var output = Mustache.render(template, data);
            $(selector).html(output);
        });
    }

    return {
        load:function(selector, data) {
            return new HomeView(selector, data);
        }
    }
})();