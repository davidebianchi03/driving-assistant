$(document).ready(function () {
    if ($(window).width() > 850) {
        $(".padbottext").css('padding-bottom', $('.bottom').height());
    }
    else {
        $(".padbottext").css('padding-bottom', 10);
    }
    $(".padbotimg").css('padding-bottom', $('.bottom').height() + 100);

    $(window).resize(function () {
        if ($(window).width() > 850) {
            $(".padbottext").css('padding-bottom', $('.bottom').height());
        }
        else {
            $(".padbottext").css('padding-bottom', 10);
        }
        $(".padbotimg").css('padding-bottom', $('.bottom').height() + 100);
    });

});