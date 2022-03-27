$(document).ready(function(){
    $(".container").height($(window).height() - 23);

    $(window).resize(function(){
        $(".container").height($(window).height() - 23);
    });

});