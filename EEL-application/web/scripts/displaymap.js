
var map = null;

//visualizzo la mappa
$(document).ready(function () {

    mapboxgl.accessToken = "pk.eyJ1IjoiZGFkZWJpYTAzIiwiYSI6ImNremw5cDNqeDJjaWcydm8waXRuazUxNzgifQ.IBHJKTVTSZy6_vEn1fSc_w";
    map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [9.237446,45.757215],
        zoom: 0.6,
        minZoom: 15,
        pitch: 60, // pitch in degrees
    });
    updatePosition();
});

