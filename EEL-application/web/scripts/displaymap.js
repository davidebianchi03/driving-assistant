
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
        // minZoom: 15,
        pitch: 60, // pitch in degrees
    });

    map.on('load', function () {
        StartToUpdatePosition();
    });

    //creo il pin che visualizza la mia posizione attuale
    var div = document.createElement('div');
    div.className = 'livemarker';
    liveMarker = new mapboxgl.Marker(div)
        .setLngLat([0, 0])
        .addTo(map);
    
});

function SetMarkerAt(position) {
    //inizializzo il pin
    liveMarker.setLngLat([position.longitude, position.latitude])
}

function GoTo(position) {
    // map.zoomTo(20, { duration: 100 });
    map.flyTo({
        center: [position.longitude, position.latitude],
        zoom: 18
    });
}

function SetBearing(bearing) {
    const camera = map.getFreeCameraOptions();
    camera.setPitchBearing(60, bearing);
    map.setFreeCameraOptions(camera);
}
