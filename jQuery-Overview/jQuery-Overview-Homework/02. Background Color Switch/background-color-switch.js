$(document).ready(function () {
    'use strict';

    var NUMBER_OF_ELEMENTS = 5;
    var $body = $(document.body),
        $main = $('<main>'),
        $form = $('<form>'),
        $classSection = $('<section>'),
        $classLabel = $('<label>'),
        $classInput = $('<input>'),
        $colorSection = $('<section>'),
        $colorLabel = $('<label>'),
        $colorInput = $('<input>'),
        $buttonPaint = $('<button>'),
        $ul = $('<ul>'),
        $info = $('<div>'),
        birdsList = ['Hummingbird', 'Nightingale', 'Lizard', 'Eagle', 'Sparrow'];

    $body.prepend($main);
    $ul.appendTo($main);

    $info.attr('class', 'info');
    $info.text('There is no element with such class name!');
    $info.hide();
    $info.appendTo($main);

    $form.addClass('option-form');
    $form.submit(false);
    $form.prependTo($main);

    $classSection.addClass('block-section');
    $classSection.prependTo($form);

    $classLabel.text('Class:');
    $classLabel.prependTo($classSection);
    $classInput.attr('type', 'text');
    $classInput.appendTo($classSection);

    $colorSection.addClass('block-section');
    $colorSection.appendTo($form);

    $colorLabel.text('Color:');
    $colorLabel.prependTo($colorSection);
    $colorInput.attr('type', 'color');
    $colorInput.val('#FBF47D');
    $colorInput.appendTo($colorSection);

    $buttonPaint.text('Paint');
    $buttonPaint.appendTo($form);
    $buttonPaint.on('click', function () {
        var className = '.' + $classInput.val().toLowerCase();
        var $classNameResult = $ul.find(className);
        if ($classNameResult.length) {
            $classNameResult.css({"background-color": $colorInput.val()});
        } else {
            $info.show();
            $info.fadeOut(5000);
        }

        $classInput.val('');
    });

    for (var i = 0; i < NUMBER_OF_ELEMENTS; i++) {
        var $li = $('<li>');
        $li.text(birdsList[i]);
        $li.appendTo($ul);
        if (i !== 2) {
            $li.addClass('bird');
        }
    }
});