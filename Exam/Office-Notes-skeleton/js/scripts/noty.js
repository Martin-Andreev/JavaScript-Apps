var Noty = (function () {
    function display(type, text, time) {
        var n = noty({
            text: text,
            type: type,
            dismissQueue: true,
            layout: 'topCenter',
            theme: 'defaultTheme',
            maxVisible: 10,
            timeout: time,
            closeWith: ['button']
        });
    }

    function success(text) {
        display('success', text, 2000);
    }

    function error(text) {
        display('error', text, 2000);
    }

    return {
        success: success,
        error: error
    }
})();