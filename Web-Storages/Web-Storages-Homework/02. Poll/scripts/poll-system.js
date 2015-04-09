(function () {
    var bodyElement = document.body;
    var pollDuration = localStorage.pollDuration || 300;
    localStorage.setItem('pollDuration', pollDuration);
    var timerRunning = true;
    var ulId = 1;

    var questions = [
        {
            title: "Which was the last leap year?",
            id: '1',
            options: ["2011", "2014", "2012", "2010"],
            correctAnswerNumber: 3
        },
        {
            title: "Which is the largest city in Europe?",
            id: '2',
            options: ["Istanbul", "Moscow", "London", "Berlin"],
            correctAnswerNumber: 1
        },
        {
            title: "Which one is a prime number?",
            id: '3',
            options: ["4", "2", "10", "48"],
            correctAnswerNumber: 2
        },
        {
            title: "What is the total area of Bulgaria in km2?",
            id: '4',
            options: ["110,994", "105,120", "205,321", "92,550"],
            correctAnswerNumber: 1
        },
        {
            title: "How many toes do I have on my right foot?",
            id: '5',
            options: ["1", "90", "5", "12"],
            correctAnswerNumber: 3
        }
    ];

    function generateMainHeader($mainWrapper) {
        var $mainHeader = $('<header>');
        var $mainHeaderH1 = $('<h1>');
        var mainHeaderText = 'Simple Poll System';

        $mainHeader.attr('id', 'main-header');
        $mainHeader.appendTo($mainWrapper);

        $mainHeaderH1.text(mainHeaderText);
        $mainHeaderH1.appendTo($mainHeader);
    }

    function generateMainSection($mainWrapper) {
        var $mainSection = $('<section>');

        $mainSection.attr('id', 'main-content');
        $mainSection.appendTo($mainWrapper);
    }

    function generateQuestion(question) {
        var questionId = question.id;
        var questionTitle = question.title;
        var questionAnswers = question.options;
        var answerId = 1;

        var $questionArticleParent = $('#main-content');
        var $questionArticle = $('<article>');
        var $questionHeader = $('<header>');
        var $questionHeaderH2 = $('<h2>');
        var $questionBody = $('<ul>');

        $questionArticle.attr('class', 'question');
        $questionArticle.appendTo($questionArticleParent);

        $questionHeader.attr('class', 'question-header');
        $questionHeader.appendTo($questionArticle);

        $questionHeaderH2.text(questionTitle);
        $questionHeaderH2.appendTo($questionHeader);

        $questionBody.attr('id', 'question-body' + ulId);
        $questionBody.appendTo($questionArticle);
        ulId++;

        questionAnswers.forEach(function (answer) {
            var $answerItem = $('<li>');
            var $answerInput = $('<input>');
            var $answerLabel = $('<label>');
            var questionNumber = 'question' + questionId;
            var questionName = questionNumber + '-answer' + answerId;
            var questionObject = {
                question: questionId,
                answer: answerId,
                id: questionName
            };

            $answerItem.attr('class', 'possible-answer');
            $answerItem.appendTo($questionBody);

            $answerInput.attr({type: "radio"});
            $answerInput.attr('name', 'answer_' + questionId);
            $answerInput.attr('id', questionName);
            $answerInput.on('click', function () {
                localStorage[questionNumber] = JSON.stringify(questionObject);
            });
            $answerInput.appendTo($answerItem);

            $answerLabel.attr('for', questionName);
            $answerLabel.text(answer);
            $answerLabel.appendTo($answerItem);

            answerId++;
        })
    }

    function generateResult() {
        for (var i = 1; i <= questions.length; i++) {
            if (localStorage.getItem('question' + i)) {
                var currentItem = JSON.parse(localStorage.getItem('question' + i));
                var currentItemId = currentItem.id;
                var answerText = document.getElementById(currentItemId).nextSibling;
                answerText.className = 'answeredColor';
            }
        }

        questions.forEach(function (question) {
            var questionNumber = question.id;
            var correctAnswer = question.correctAnswerNumber;
            var $ulElement = $('#question-body' + questionNumber);

            var $liElement = $ulElement.find(':nth-child(' + correctAnswer + ')').children().last();
            $liElement.css('background-color', 'green');
        });

        $('#submit-button').hide();
    }

    function generateMainFooter($mainWrapper) {
        var $mainFooter = $('<footer>');
        var $submitButton = $('<button>');
        var submitButtonText = 'Submit';

        $mainFooter.attr('id', 'main-footer');
        $mainFooter.appendTo($mainWrapper);

        $submitButton.attr('id', 'submit-button');
        $submitButton.text(submitButtonText);
        $submitButton.click(function () {
            generateResult();
            timerRunning = false;
        });

        $submitButton.appendTo($mainFooter);
    }

    (function generateMainContent() {
        var $mainWrapper = $('<main>');

        $mainWrapper.attr('id', 'wrapper');
        $mainWrapper.prependTo(bodyElement);

        generateMainHeader($mainWrapper);
        generateMainSection($mainWrapper);

        questions.forEach(function (question) {
            generateQuestion(question);
        });

        generateMainFooter($mainWrapper);
    })();

    (function getLocalStorageItems() {
        for (var item in localStorage) {
            if (item !== 'pollDuration') {
                var currentItem = JSON.parse(localStorage.getItem(item));
                $('#' + currentItem.id).prop('checked', true);
            }
        }
    })();

    (function generateAsideTimer() {
        var $asideElement = $('<aside>');
        var $timeElement = $('<time>');
        var $spanTimeElement = $('<span>');
        var $spanTimeLeftElement = $('<span>');
        var spanTimeLeftText = 'minutes left';

        $asideElement.attr('id', 'time-aside');
        $asideElement.prependTo(bodyElement);

        $timeElement.appendTo($asideElement);

        $spanTimeElement.attr('id', 'remaining-time');
        $spanTimeElement.appendTo($timeElement);

        $spanTimeLeftElement.attr('id', 'time-span');
        $spanTimeLeftElement.text(spanTimeLeftText);
        $spanTimeLeftElement.appendTo($timeElement);
    })();

    (function changeRemainingTime() {
        var minutes = parseInt(pollDuration / 60);
        var seconds = parseInt(pollDuration % 60);
        var timeLeft;

        var interval = function () {
            var $timerElement = $('#remaining-time');
            seconds--;
            if (seconds < 0) {
                seconds = 59;
                minutes--;
            }

            localStorage.pollDuration = minutes * 60 + seconds;
            if (minutes < 0) {
                clearInterval(changeRemainingTime);
                localStorage.clear();
                $('#submit-button').hide();
                $('#time-span').text("Time's up!");
                return;
            }

            if (!timerRunning) {
                localStorage.clear();
                return;
            }

            timeLeft = minutes + ':' + (seconds > 9 ? seconds : '0' + seconds);
            $timerElement.text(timeLeft);
        };

        setInterval(interval, 1000);
    })();
})();