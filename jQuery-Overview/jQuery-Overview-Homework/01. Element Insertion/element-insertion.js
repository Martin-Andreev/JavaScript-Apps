$( document ).ready(function () {
    'use strict';

    var $body = $(document.body),
        $main = $('<main>'),
        $title = $('<h1>'),
        $text = $('<p>'),
        $footer = $('<footer>');

    $title.text('My first jQuery program.');
    $text.text('I hope this will be one interesting course.');
    $footer.text('© Software University. All Rights Reserved.');

    $body.prepend($main);
    $title.prependTo($main);
    $main.append($text);
    $footer.appendTo($main);
});