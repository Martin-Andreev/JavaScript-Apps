var app = app || {};

(function () {
    $.get('templates/table.html', function (template) {
        var table = {
            "headers": { "nameColumn": "Name", "jobColumn": "Job Title", "websiteColumn": "Website"},
            "people": [
                {"name": "Garry Finch", "jobTitle": "Front End Technical Lead", "website": "http://website.com"},
                {"name": "Bob McFray", "jobTitle": "Photographer", "website": "http://goo.gle"},
                {"name": "Jenny 0'Sullivan", "jobTitle": "LEGO Geek", "website": "http://stackoverflow.com"}
            ]
        };
        var output = Mustache.render(template, table);
        $('#wrapper').html(output);
    });
})();