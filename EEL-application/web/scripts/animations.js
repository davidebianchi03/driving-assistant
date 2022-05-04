var alertsDisplayed = false;

$(document).ready(function () {
    document.getElementById("useCameras").checked = useCameras;
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

    $(".settings-btn").click(function () {
        $(".settings-container").show('slow');
        eel.GetCamerasImages()(function (json) {
            var responseObj = JSON.parse(json);
            document.getElementById("frontImage").innerHTML = "<p>Telecamera anteriore</p><img src = 'data:image/jpg;base64, " + responseObj.frontCamera + "'>";
            document.getElementById("backImage").innerHTML = "<p>Telecamera posteriore</p><img src = 'data:image/jpg;base64, " + responseObj.backCamera + "'>";
        });
    });

    $("#close-settings").click(function () {
        $(".settings-container").hide('slow');
    });

    $("#reload-page").click(function () {
        if (confirm("Sei sicuro di voler riavviare il dispositivo?") == true) {
            eel.Restart();
        }
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

