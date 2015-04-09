(function () {
    var name;
    if (!localStorage.name) {
        name = prompt("Please, enter your name: ");
        localStorage.setItem('name', name);
        localStorage.setItem('counter', 0);
        sessionStorage.setItem('counter', 0);
    } else {
        var textElement = document.getElementById('text');
        var personName = localStorage.getItem('name');
        textElement.innerHTML = 'Hello, ' + personName;
    }

    function checkAllVisits() {
        var localCounter = localStorage.getItem('counter');
        localCounter++;
        localStorage.setItem('counter', localCounter);

        var allVisitsCounterElement = document.getElementById('all-visits');
        allVisitsCounterElement.innerHTML = localCounter;
    }

    function checkSessionVisits() {
        var sessionCounter = sessionStorage.getItem('counter');
        sessionCounter++;
        sessionStorage.setItem('counter', sessionCounter);

        var sessionVisitsCounterElement = document.getElementById('session-visits');
        sessionVisitsCounterElement.innerHTML = sessionCounter;
    }

    checkAllVisits();
    checkSessionVisits();
})();