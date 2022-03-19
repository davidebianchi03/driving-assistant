var dropdown_showed = false;

$(document).ready(function () {
    $('.hamburger').click(function () {
        dropdown_showed = !dropdown_showed;
        if (dropdown_showed) {
            $('.dropdown-content').css("display", "block");
        }
        else {
            $('.dropdown-content').css("display", "none");
        }
    });

    $('.middle-image').click(function () {
        if (dropdown_showed == true) {
            $('.dropdown-content').css("display", "none");
            dropdown_showed = false;
        }
    });

    $('.bottom').click(function () {
        if (dropdown_showed == true) {
            $('.dropdown-content').css("display", "none");
            dropdown_showed = false;
        }
    });

    $(window).resize(function () {
        if ($(window).width() > 750 && dropdown_showed == true) {
            $('.dropdown-content').css("display", "none");
            dropdown_showed = false;
        }
    });
});