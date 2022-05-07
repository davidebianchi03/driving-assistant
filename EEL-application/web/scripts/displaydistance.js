var lastCameraUpdate = Date.now();

//distanze soglie rilevate da sensori ad ultrasuoni
const maxDistance = 150;
const minDistance = 10;
var s1f = 25;
var s2f = 50;
var s3f = 100;
var s1b = 25;
var s2b = 50;
var s3b = 100;

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

    let now = new Date();
    lastCameraUpdate = now.getMilliseconds();
    setInterval(UpdateDistance, 350);

    document.getElementById("sogliaAnteriore1").value = s1f;
    document.getElementById("sogliaAnteriore2").value = s2f;
    document.getElementById("sogliaAnteriore3").value = s3f;

    document.getElementById("sogliaPosteriore1").value = s1b;
    document.getElementById("sogliaPosteriore2").value = s2b;
    document.getElementById("sogliaPosteriore3").value = s3b;

    $(".settings-btn").click(Load());
});

function Load() {
    //aggiorno le impostazioni visualizzate
    eel.GetSettings()(function (json) {
        var responseObj = JSON.parse(json);
        if (responseObj.valid) {
            //carico le impostazioni
            document.getElementById("url-segnalazioni").value = responseObj.server_url;
            s1f = responseObj.distances.s1f;
            s2f = responseObj.distances.s2f;
            s3f = responseObj.distances.s3f;
            s1b = responseObj.distances.s1b;
            s2b = responseObj.distances.s2b;
            s3b = responseObj.distances.s3b;
            //aggiorno le soglie visualizzate
            document.getElementById("sogliaAnteriore1").value = s1f;
            document.getElementById("sogliaAnteriore2").value = s2f;
            document.getElementById("sogliaAnteriore3").value = s3f;

            document.getElementById("sogliaPosteriore1").value = s1b;
            document.getElementById("sogliaPosteriore2").value = s2b;
            document.getElementById("sogliaPosteriore3").value = s3b;

            //aggiorno le impostazioni sull'utilizzo delle fotocamere
            useCameras = responseObj.useCamera;
            document.getElementById("useCameras").checked = useCameras;

            //aggiorno le impostazioni sull'utilizzo dei segnali acustici
            useSound = responseObj.beep;
            document.getElementById("useSound").checked = useSound;
        }
    });
}

function UpdateSettings() {
    var server_url = document.getElementById("url-segnalazioni").value;
    var distancesObj = {
        s1f: s1f,
        s2f: s2f,
        s3f: s3f,
        s1b: s1b,
        s2b: s2b,
        s3b: s3b,
    }
    eel.UpdateSettings(server_url, JSON.stringify(distancesObj), useCameras, useSound);
}

function SetFrontFirstDistance() {
    let value = document.getElementById("sogliaAnteriore1").value;
    if (value < s2f && value >= minDistance) {
        //valore valido
        s1f = value;
    }
    else {
        //errore
        if (value > s2f) {
            alert("Il valore inserito è maggiore di quello della seconda soglia per cui non è valido, inserire un valore inferiore");
            document.getElementById("sogliaAnteriore1").value = s1f;
        }
        else {
            alert("Il valore inserito è inferiore al valore minimo, inserire un valore maggiore");
            document.getElementById("sogliaAnteriore1").value = s1f;
        }
    }
    UpdateSettings();
}

function SetFrontSecondDistance() {
    let value = document.getElementById("sogliaAnteriore2").value;
    if (value < s3f && value > s1f) {
        //valore valido
        s2f = value;
    }
    else {
        //errore
        if (value > s3f) {
            alert("Il valore inserito è maggiore di quello della terza soglia per cui non è valido, inserire un valore inferiore");
            document.getElementById("sogliaAnteriore2").value = s2f;
        }
        else {
            alert("Il valore inserito è inferiore alla soglia inferiore, inserire un valore maggiore");
            document.getElementById("sogliaAnteriore2").value = s2f;
        }
    }
    UpdateSettings();
}

function SetFrontThirdDistance() {
    let value = document.getElementById("sogliaAnteriore3").value;
    if (value <= maxDistance && value > s2f) {
        //valore valido
        s3f = value;
    }
    else {
        //errore
        if (value > maxDistance) {
            alert("Il valore inserito è maggiore di quello massimo per cui non è valido, inserire un valore inferiore");
            document.getElementById("sogliaAnteriore3").value = s3f;
        }
        else {
            alert("Il valore inserito è inferiore alla soglia inferiore, inserire un valore maggiore");
            document.getElementById("sogliaAnteriore3").value = s3f;
        }
    }
    UpdateSettings();
}

function SetBackFirstDistance() {
    let value = document.getElementById("sogliaPosteriore1").value;
    if (value < s2b && value >= minDistance) {
        //valore valido
        s1b = value;
    }
    else {
        //errore
        if (value > s2b) {
            alert("Il valore inserito è maggiore di quello della seconda soglia per cui non è valido, inserire un valore inferiore");
            document.getElementById("sogliaPosteriore1").value = s1b;
        }
        else {
            alert("Il valore inserito è inferiore al valore minimo, inserire un valore maggiore");
            document.getElementById("sogliaPosteriore1").value = s1b;
        }
    }
    UpdateSettings();
}

function SetBackSecondDistance() {
    let value = document.getElementById("sogliaPosteriore2").value;
    if (value < s3b && value > s1b) {
        //valore valido
        s2b = value;
    }
    else {
        //errore
        if (value > s3b) {
            alert("Il valore inserito è maggiore di quello della terza soglia per cui non è valido, inserire un valore inferiore");
            document.getElementById("sogliaPosteriore2").value = s2b;
        }
        else {
            alert("Il valore inserito è inferiore alla soglia inferiore, inserire un valore maggiore");
            document.getElementById("sogliaPosteriore2").value = s2b;
        }
    }
    UpdateSettings();
}

function SetBackThirdDistance() {
    let value = document.getElementById("sogliaPosteriore3").value;
    if (value <= maxDistance && value > s2b) {
        //valore valido
        s3b = value;
    }
    else {
        //errore
        if (value > maxDistance) {
            alert("Il valore inserito è maggiore di quello massimo per cui non è valido, inserire un valore inferiore");
            document.getElementById("sogliaPosteriore3").value = s3b;
        }
        else {
            alert("Il valore inserito è inferiore alla soglia inferiore, inserire un valore maggiore");
            document.getElementById("sogliaPosteriore3").value = s3b;
        }
    }
    UpdateSettings();
}

var lastBeep = Date.now();

//aggiornamenti delle distanze visualizzate
function UpdateDistance() {
    var beepCount = 0;

    eel.GetDistances()(function (json) {
        //console.log(json);
        var obj = JSON.parse(json);
        var fr = true;
        var fm = true;
        var fl = true;
        var br = true;
        var bm = true;
        var bl = true;

        if (obj.connected == true) {
            $("#arduinoNotConnected").hide();

            //{"fl":13.06808,"fm":163.2825,"fr":165.7692,"bl":27.90259,"bm":68.30732,"br":35.82576}

            //sensori anteriori
            if (obj.fl < s3f && obj.fl > s2f) {
                SetFrontLeftLevel(1);
                if (beepCount <= 1) {
                    beepCount = 1;
                }
            } else if (obj.fl < s2f && obj.fl > s1f) {
                SetFrontLeftLevel(2);
                if (beepCount <= 2) {
                    beepCount = 2;
                }
            } else if (obj.fl < s1f) {
                SetFrontLeftLevel(3);
                if (beepCount <= 3) {
                    beepCount = 3;
                }
            } else if (obj.fl > s3f) {
                SetFrontLeftLevel(0);
                fl = false;
            }

            if (obj.fm < s3f && obj.fm > s2f) {
                SetFrontCenterLevel(1);
                if (beepCount <= 1) {
                    beepCount = 1;
                }
            } else if (obj.fm < s2f && obj.fm > s1f) {
                SetFrontCenterLevel(2);
                if (beepCount <= 2) {
                    beepCount = 2;
                }
            } else if (obj.fm < s1f) {
                SetFrontCenterLevel(3);
                if (beepCount <= 3) {
                    beepCount = 3;
                }
            } else if (obj.fm > s3f) {
                SetFrontCenterLevel(0);
                fm = false;
            }

            if (obj.fr < s3f && obj.fr > s2f) {
                SetFrontRightLevel(1);
                if (beepCount <= 1) {
                    beepCount = 1;
                }
            } else if (obj.fr < s2f && obj.fr > s1f) {
                SetFrontRightLevel(2);
                if (beepCount <= 2) {
                    beepCount = 2;
                }
            } else if (obj.fr < s1f) {
                SetFrontRightLevel(3);
                if (beepCount <= 3) {
                    beepCount = 3;
                }
            } else if (obj.fr > s3f) {
                SetFrontRightLevel(0);
                fr = false;
            }

            //sensori posteriori
            if (obj.bl < s3b && obj.bl > s2b) {
                SetBackLeftLevel(1);
                if (beepCount <= 1) {
                    beepCount = 1;
                }
            } else if (obj.bl < s2b && obj.bl > s1b) {
                SetBackLeftLevel(2);
                if (beepCount <= 2) {
                    beepCount = 2;
                }
            } else if (obj.bl < s1b) {
                SetBackLeftLevel(3);
                if (beepCount <= 3) {
                    beepCount = 3;
                }
            } else if (obj.bl > s3b) {
                SetBackLeftLevel(0);
                bl = false;
            }

            if (obj.bm < s3b && obj.bm > s2b) {
                SetBackCenterLevel(1);
                if (beepCount <= 1) {
                    beepCount = 1;
                }
            } else if (obj.bm < s2b && obj.bm > s1b) {
                SetBackCenterLevel(2);
                if (beepCount <= 2) {
                    beepCount = 2;
                }
            } else if (obj.bm < s1b) {
                SetBackCenterLevel(3);
                if (beepCount <= 3) {
                    beepCount = 3;
                }
            } else if (obj.bm > s3b) {
                SetBackCenterLevel(0);
                bm = false;
            }

            if (obj.br < s3b && obj.br > s2b) {
                SetBackRightLevel(1);
                if (beepCount <= 1) {
                    beepCount = 1;
                }
            } else if (obj.br < s2b && obj.br > s1b) {
                SetBackRightLevel(2);
                if (beepCount <= 2) {
                    beepCount = 2;
                }
            } else if (obj.br < s1b) {
                SetBackRightLevel(3);
                if (beepCount <= 3) {
                    beepCount = 3;
                }
            } else if (obj.br > s3b) {
                SetBackRightLevel(0);
                br = false;
            }

            let now = Date.now();
            var beep = false;

            if (now - lastBeep > 1050) {
                beep = true;
                lastBeep = now;
                if (beepCount != 0 && useSound)
                    eel.Beep(beepCount);
            }

            //controllo per la ricerca di eventuali ostacoli riconosciuti tramite webcam effettuo un nuovo aggiornamento ogni 2 secondi
            if ((now - lastCameraUpdate) > 2000 && useCameras) {
                lastCameraUpdate = now.getMilliseconds();
                eel.GetObstacles()(function (json) {
                    console.log(json);
                });
            }
        }
        else {
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

var useCameras = false;
function ChangeUseCameraState() {
    useCameras = !useCameras;
    document.getElementById("useCameras").checked = useCameras;
    //salvo le impostazioni nel file dei settings
    UpdateSettings();
}

var useSound = false;
function ChangeUseSoundState() {
    useSound = !useSound;
    document.getElementById("useSound").checked = useSound;
    //salvo le impostazioni nel file dei settings
    UpdateSettings();
}