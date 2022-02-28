var alertsDisplayed = false;

$(document).ready(function () {
    $("#navigateframe").hide();
    $(".alertslist").hide();
    $("#routeRecalculation").hide();
    
    alertsDisplayed = false;

    $(".close").click(function(){
        hideAlerts();
    });

    $(".carinfo").click(function(){
        hideAlerts();
    });
});

function ShowRecalculation(){
    $("#routeRecalculation").show();
}

function HideRecalculation(){
    $("#routeRecalculation").hide();
}

function hideNavigation() {
    $("#navigateframe").hide(250, "linear");
}

function showNavigation() {
    $("#navigateframe").show(250, "linear");
}

function hideAlerts() {
    if (alertsDisplayed) {
        $(".alertslist").hide(250, "linear");
        alertsDisplayed = false;
    }
}

function showAlerts() {
    if (!alertsDisplayed) {
        $(".alertslist").show(250, "linear");
        alertsDisplayed = true;
    }
}