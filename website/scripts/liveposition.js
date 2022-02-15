var lastKnownPosition = null;
var liveMarker = null;//marker che indica la posizione in tempo reale

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
        return;
    } else {
        alert("Geolocation is not supported by this browser.");
        return null;
    }
}

function showPosition(position){
    lastKnownPosition = new GpsCoordinates(position.coords.latitude, position.coords.longitude);
    //visualizzo il pin con le nuove coordinate
    liveMarker.setLngLat([position.coords.longitude,position.coords.latitude]);

    //aggiorno la velocità visualizzata in km/h
    var speed = position.coords.speed * 3.6;
    document.getElementById("speedinkmh").innerHTML = speed.toString() + " km/h";
    console.log("Update");
}

//metodo da richiamare per aggiornare la posizione ogni 100 millisecondi
function updatePosition(){
    //inizializzo il pin

    var div = document.createElement('div');
    div.className = 'livemarker';

    liveMarker = new mapboxgl.Marker(div)
    .setLngLat([9.237446,45.757215])
    .addTo(map);
    //inizio a richiamare la funzione ogni 100ms
    setInterval(getLocation, 100);
}

function reposition(){
    map.zoomTo(20, { duration: 3000 });
    map.flyTo({
        center: [lastKnownPosition.longitude, lastKnownPosition.latitude]
    });
}