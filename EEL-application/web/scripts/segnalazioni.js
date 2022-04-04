$(document).ready(function () {

    $("#strada-dissestata").click(function () {
        //invia segnalazione strada dissestata
        InviaSegnalazione("Strada dissestata", "");
    });

    $("#materiale-sparso").click(function () {
        //invia segnalazione materiale sparso
        InviaSegnalazione("Materiale sparso", "");
    });

    $("#incidente").click(function () {
        //invia segnalazione materiale incidente
        InviaSegnalazione("Incidente", "");
    });

    $("#altro-pericolo").click(function () {
        //invia segnalazione materiale altro-pericolo
        InviaSegnalazione("Altro pericolo", "");
    });

});

function InviaSegnalazione(title, description) {
    eel.GetCredentials()(function (json) {
        var jsonObj = JSON.parse(json);
        if(jsonObj.valid == true){
            //nascondo il riquadro di login
            eel.GetSettings()(function (json) {
                var responseObj = JSON.parse(json);
                if (responseObj.valid) {
                    $.ajax({
                        type: "POST",
                        url: responseObj.server_url + "/utils/api.php",
                        data: JSON.stringify({
                            action: "insert-segnalazione",
                            user_id: jsonObj.user_id,///---->da cambiare
                            title: title,
                            description: description,
                            lat: lastKnownPosition.latitude,
                            lon: lastKnownPosition.longitude
                        })
                    }).done(function(){
                        hideAlerts();
                    })
                }
            });
            
        }
        else{
            $(".login-container").show();
        }
    });
    

}