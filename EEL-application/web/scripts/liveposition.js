var lastKnownPosition = null;
var liveMarker = null;//marker che indica la posizione in tempo reale

function getLocation() {
    eel.GetPosition()(function (json) {
        let position = JSON.parse(json);
        //imposto la nuova posizione visualizzata
        liveMarker.setLngLat([position.longitude, position.latitude])
        //visualizzo velocità con cui si sta muovendo la macchina
        document.getElementById("speedinkmh").innerHTML = parseInt(position.speed * 3.6) + " km/h";

        //salvo la posizione
        lastKnownPosition = new GpsCoordinates(position.latitude, position.longitude);
    });
}

//metodo da richiamare per aggiornare la posizione ogni 100 millisecondi
function updatePosition() {
    //inizializzo il pin

    var div = document.createElement('div');
    div.className = 'livemarker';

    liveMarker = new mapboxgl.Marker(div)
        .setLngLat([0, 0])
        .addTo(map);
    map.zoomTo(20, { duration: 3000 });
    //inizio a richiamare la funzione ogni 100ms
    setInterval(getLocation, 100);
}

function reposition() {
    // map.zoomTo(20, { duration: 3000 });
    map.flyTo({
        center: [lastKnownPosition.longitude, lastKnownPosition.latitude],
        zoom: 18
    });
}