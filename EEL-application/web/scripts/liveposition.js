var lastKnownPosition = null;
var liveMarker = null; //marker che indica la posizione in tempo reale
var lastKnownBearing = null;
var firstPosition = true;

function StartToUpdatePosition() {
    setInterval(getLocation, 150);
    FollowMe();
    // se l'utente cerca di spostare la mappa disabilito il follow me
    $( "#map" ).mousedown(function(){
        followMeActive = false;
    });
};

function getLocation() {
    eel.GetPosition()(function (json) {
        let position = JSON.parse(json);
        if (position.gps_connected == true) {
            //imposto la nuova posizione visualizzata
            SetMarkerAt(new GpsCoordinates(position.latitude, position.longitude));
            //visualizzo velocità con cui si sta muovendo la macchina
            document.getElementById("speedinkmh").innerHTML = parseInt(position.speed * 3.6) + " km/h";
            //salvo l'ultimo bearing disponibile
            lastKnownBearing = position.bearing;
            //salvo la posizione
            lastKnownPosition = new GpsCoordinates(position.latitude, position.longitude);
            $("#gpsNotConnected").hide();

            if (firstPosition) {
                firstPosition = false;
                GoTo(lastKnownPosition);
            }

        } else {
            //se il gps non è collegato visualizzo il messaggio di errore
            $("#gpsNotConnected").show();
        }
    });
}

function EnableFollowMe(){
    followMeActive = true;
    FollowMe();
}

function GoToMyPosition() {
    SetBearing(lastKnownBearing);
    GoTo(lastKnownPosition);
    console.log(lastKnownBearing);
}

var followMeActive = true;

function FollowMe() {
    if (lastKnownBearing != null && lastKnownPosition != null) {
        GoToMyPosition();
    }
    if (followMeActive) {
        setTimeout(FollowMe, 300);
    }
}

