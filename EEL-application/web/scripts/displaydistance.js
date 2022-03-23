$(document).ready(function () {
    //nascondo tutte le indicazioni dei pericoli
    $("#back-left-1").hide();
    $("#back-center-1").hide();
    $("#back-right-1").hide();

    $("#back-left-2").hide();
    $("#back-center-2").hide();
    $("#back-right-2").hide();

    $("#back-left-3").hide();
    $("#back-center-3").hide();
    $("#back-right-3").hide();

    $("#front-left-1").hide();
    $("#front-center-1").hide();
    $("#front-right-1").hide();

    $("#front-left-2").hide();
    $("#front-center-2").hide();
    $("#front-right-2").hide();

    $("#front-left-3").hide();
    $("#front-center-3").hide();
    $("#front-right-3").hide();

    setInterval(UpdateDistance, 250);
});

//aggiornamenti delle distanze visualizzate
function UpdateDistance() {
    eel.GetDistances()(function (json) {
        //console.log(json);
        var obj = JSON.parse(json);

        if (obj.connected == true) {
            $("#arduinoNotConnected").hide();
            //distanze soglie rilevate da sensori ad ultrasuoni
            var s1 = 25;
            var s2 = 50;
            var s3 = 100;

            //{"fl":13.06808,"fm":163.2825,"fr":165.7692,"bl":27.90259,"bm":68.30732,"br":35.82576}

            //sensori anteriori
            if (obj.fl < s3 && obj.fl > s2) {
                SetFrontLeftLevel(1);
            } else if (obj.fl < s2 && obj.fl > s1) {
                SetFrontLeftLevel(2);
            } else if (obj.fl < s1) {
                SetFrontLeftLevel(3);
            } else if (obj.fl > s3) {
                SetFrontLeftLevel(0);
            }

            if (obj.fm < s3 && obj.fm > s2) {
                SetFrontCenterLevel(1);
            } else if (obj.fm < s2 && obj.fm > s1) {
                SetFrontCenterLevel(2);
            } else if (obj.fm < s1) {
                SetFrontCenterLevel(3);
            } else if (obj.fm > s3) {
                SetFrontCenterLevel(0);
            }

            if (obj.fr < s3 && obj.fr > s2) {
                SetFrontRightLevel(1);
            } else if (obj.fr < s2 && obj.fr > s1) {
                SetFrontRightLevel(2);
            } else if (obj.fr < s1) {
                SetFrontRightLevel(3);
            } else if (obj.fr > s3) {
                SetFrontRightLevel(0);
            }

            //sensori posteriori
            if (obj.bl < s3 && obj.bl > s2) {
                SetBackLeftLevel(1);
            } else if (obj.bl < s2 && obj.bl > s1) {
                SetBackLeftLevel(2);
            } else if (obj.bl < s1) {
                SetBackLeftLevel(3);
            } else if (obj.bl > s3) {
                SetBackLeftLevel(0);
            }

            if (obj.bm < s3 && obj.bm > s2) {
                SetBackCenterLevel(1);
            } else if (obj.bm < s2 && obj.bm > s1) {
                SetBackCenterLevel(2);
            } else if (obj.bm < s1) {
                SetBackCenterLevel(3);
            } else if (obj.bm > s3) {
                SetBackCenterLevel(0);
            }

            if (obj.br < s3 && obj.br > s2) {
                SetBackRightLevel(1);
            } else if (obj.br < s2 && obj.br > s1) {
                SetBackRightLevel(2);
            } else if (obj.br < s1) {
                SetBackRightLevel(3);
            } else if (obj.br > s3) {
                SetBackRightLevel(0);
            }
        }
        else{
            $("#arduinoNotConnected").show();
        }

    });
}

function SetFrontLeftLevel(level) { //0 -> niente, 1 -> lontano, 2 -> abbastanza lontano, 3 -> vicino
    if (level == 1) {
        $("#front-left-1").show();
        $("#front-left-2").hide();
        $("#front-left-3").hide();
    } else if (level == 2) {
        $("#front-left-1").show();
        $("#front-left-2").show();
        $("#front-left-3").hide();
    } else if (level == 3) {
        $("#front-left-1").show();
        $("#front-left-2").show();
        $("#front-left-3").show();
    } else {
        $("#front-left-1").hide();
        $("#front-left-2").hide();
        $("#front-left-3").hide();
    }
}

function SetFrontCenterLevel(level) { //0 -> niente, 1 -> lontano, 2 -> abbastanza lontano, 3 -> vicino
    if (level == 1) {
        $("#front-center-1").show();
        $("#front-center-2").hide();
        $("#front-center-3").hide();
    } else if (level == 2) {
        $("#front-center-1").show();
        $("#front-center-2").show();
        $("#front-center-3").hide();
    } else if (level == 3) {
        $("#front-center-1").show();
        $("#front-center-2").show();
        $("#front-center-3").show();
    } else {
        $("#front-center-1").hide();
        $("#front-center-2").hide();
        $("#front-center-3").hide();
    }
}

function SetFrontRightLevel(level) { //0 -> niente, 1 -> lontano, 2 -> abbastanza lontano, 3 -> vicino
    if (level == 1) {
        $("#front-right-1").show();
        $("#front-right-2").hide();
        $("#front-right-3").hide();
    } else if (level == 2) {
        $("#front-right-1").show();
        $("#front-right-2").show();
        $("#front-right-3").hide();
    } else if (level == 3) {
        $("#front-right-1").show();
        $("#front-right-2").show();
        $("#front-right-3").show();
    } else {
        $("#front-right-1").hide();
        $("#front-right-2").hide();
        $("#front-right-3").hide();
    }
}

function SetBackLeftLevel(level) { //0 -> niente, 1 -> lontano, 2 -> abbastanza lontano, 3 -> vicino
    if (level == 1) {
        $("#back-left-1").show();
        $("#back-left-2").hide();
        $("#back-left-3").hide();
    } else if (level == 2) {
        $("#back-left-1").show();
        $("#back-left-2").show();
        $("#back-left-3").hide();
    } else if (level == 3) {
        $("#back-left-1").show();
        $("#back-left-2").show();
        $("#back-left-3").show();
    } else {
        $("#back-left-1").hide();
        $("#back-left-2").hide();
        $("#back-left-3").hide();
    }
}

function SetBackCenterLevel(level) { //0 -> niente, 1 -> lontano, 2 -> abbastanza lontano, 3 -> vicino
    if (level == 1) {
        $("#back-center-1").show();
        $("#back-center-2").hide();
        $("#back-center-3").hide();
    } else if (level == 2) {
        $("#back-center-1").show();
        $("#back-center-2").show();
        $("#back-center-3").hide();
    } else if (level == 3) {
        $("#back-center-1").show();
        $("#back-center-2").show();
        $("#back-center-3").show();
    } else {
        $("#back-center-1").hide();
        $("#back-center-2").hide();
        $("#back-center-3").hide();
    }
}

function SetBackRightLevel(level) { //0 -> niente, 1 -> lontano, 2 -> abbastanza lontano, 3 -> vicino
    if (level == 1) {
        $("#back-right-1").show();
        $("#back-right-2").hide();
        $("#back-right-3").hide();
    } else if (level == 2) {
        $("#back-right-1").show();
        $("#back-right-2").show();
        $("#back-right-3").hide();
    } else if (level == 3) {
        $("#back-right-1").show();
        $("#back-right-2").show();
        $("#back-right-3").show();
    } else {
        $("#back-right-1").hide();
        $("#back-right-2").hide();
        $("#back-right-3").hide();
    }
}