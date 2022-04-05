
var map = null;
var moving = false;//variabile che indica se ci si sta già muovendo sulla mappa

//visualizzo la mappa
$(document).ready(function () {

    mapboxgl.accessToken = "pk.eyJ1IjoiZGFkZWJpYTAzIiwiYSI6ImNremw5cDNqeDJjaWcydm8waXRuazUxNzgifQ.IBHJKTVTSZy6_vEn1fSc_w";
    map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [0, 0],
        zoom: 0.6,
        minZoom: 15,
        pitch: 60, // pitch in degrees
    });
    updatePosition();//inizio ad aggiornare la posizione in tempo reale dell'utente sulla mappa
    new Promise(r => setTimeout(r, 2500));
});

var followMe = false;//variabile che indica se il follow me è attivo
var justFollowMe = false;
//Funzione utilizzata per seguire l'utente sulla mappa
function StartFollowMe() {
    followMe = true;
    if (!justFollowMe) {
        setInterval(FollowMe, 100);//richiamo la funzione ogni 100 millisecondi
    }
}

function FollowMe() {
    const { lng, lat } = map.getCenter();

    if (followMe && getDistanceFromLatLon(lastKnownPosition, new GpsCoordinates(lat, lng)) < 100) {
        //centro la mappa sull'ultima posizione visualizzata
        map.flyTo({
            center: [lastKnownPosition.longitude, lastKnownPosition.latitude]
        });
    }
    else if(getDistanceFromLatLon(lastKnownPosition, new GpsCoordinates(lat, lng)) > 100){
        followMe = false;
    }
}

