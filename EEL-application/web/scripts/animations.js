var alertsDisplayed = false;

$(document).ready(function () {
    $("#navigateframe").hide();
    $(".alertslist").hide();
    $("#routeRecalculation").hide();
    $(".stopNavigationBtn").hide();

    waitAndDisplay();
    alertsDisplayed = false;

    $(".close").click(function () {
        hideAlerts();
    });

    $(".carinfo").click(function () {
        hideAlerts();
    });

    //Nascondo il riquadro delle impostazioni
    $(".settings-container").hide();

    $(".settings-btn").click(function(){
        $(".settings-container").show('slow');
        //aggiorno le impostazioni visualizzate
        eel.GetSettings()(function(json) {
            var responseObj = JSON.parse(json);
            if(responseObj.valid){
                //carico le impostazioni
                document.getElementById("url-segnalazioni").value = responseObj.server_url;
            }
        });
    });

    $("#close-settings").click(function(){
        $(".settings-container").hide('slow');
        var server_url = document.getElementById("url-segnalazioni").value;
        eel.UpdateSettings(server_url);
    });

    $("#reload-page").click(function(){
        location.reload();
    });

});

async function waitAndDisplay() {
    await new Promise(r => setTimeout(r, 2500));
    $(".loading").hide();
}

function ShowRecalculation() {
    $("#routeRecalculation").show();
}

function HideRecalculation() {
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