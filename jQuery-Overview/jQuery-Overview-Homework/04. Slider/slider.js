$(function () {
    $('.slideshowButton').on('click', sliderMain);
    
    setInterval(sliderMain, 4000);
    
    function sliderMain() {
        var $leftArrow = $('.buttonPrevious')[0];
        var $currentSlide = $('.current');
        var $previousSlide = getPreviousSlide($currentSlide);
        var $nextSlide = getNextSlide($currentSlide);
        var switchClassTime = 100;

        if ($(this)[0] === $leftArrow) {
           moveLeft();
        } else{
           moveRight();
        }

        setTimeout(function () {
            $currentSlide.removeClass('previous');
            $currentSlide.removeClass('next');
            $nextSlide.removeClass('previous');
            $nextSlide.removeClass('next');
            $previousSlide.removeClass('previous');
            $previousSlide.removeClass('next');
        }, switchClassTime);

        function moveLeft() {
            $currentSlide.switchClass('current', 'next', switchClassTime, 'easeInOutQuad');
            $previousSlide.addClass('previous');
            $previousSlide.switchClass('previous', 'current', switchClassTime, 'easeInOutQuad');
            clearInterval()
        }

        function moveRight() {
            $currentSlide.switchClass('current', 'previous', switchClassTime, 'easeInOutQuad');
            $nextSlide.addClass('next');
            $nextSlide.switchClass('next', 'current', switchClassTime, 'easeInOutQuad');
        }
    }

    function getPreviousSlide(currentSlide) {
        var $prevSlide = currentSlide.prev();
        if ($prevSlide.length == 0) {
            $prevSlide = $('.slide').last();
        }

        return $prevSlide;
    }

    function getNextSlide(currentSlide) {
        var $nextSlide = currentSlide.next();
        if ($nextSlide.length == 0) {
            $nextSlide = $('.slide').first();
        }

        return $nextSlide;
    }
});