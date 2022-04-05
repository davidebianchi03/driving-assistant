var lastKnownPosition = null;
var liveMarker = null; //marker che indica la posizione in tempo reale

function getLocation() {
    eel.GetPosition()(function(json) {
        let position = JSON.parse(json);
        if (position.gps_connected == true) {
            //imposto la nuova posizione visualizzata
            liveMarker.setLngLat([position.longitude, position.latitude])
                //visualizzo velocità con cui si sta muovendo la macchina
            document.getElementById("speedinkmh").innerHTML = parseInt(position.speed * 3.6) + " km/h";

            //salvo la posizione
            lastKnownPosition = new GpsCoordinates(position.latitude, position.longitude);
            $("#gpsNotConnected").hide();
        } else {
            //se il gps non è collegato visualizzo il messaggio di errore
            $("#gpsNotConnected").show();
        }
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
    map.zoomTo(20, { duration: 1000 });
    map.flyTo({
        center: [0, 0],
        zoom: 18
    });
    //inizio a richiamare la funzione ogni 250ms
    setInterval(getLocation, 250);
}

async function reposition() {
    const { lng, lat } = map.getCenter();

    if (getDistanceFromLatLon(lastKnownPosition, new GpsCoordinates(lat, lng)) > 1000) {
        await map.flyTo({
            center: [lastKnownPosition.longitude, lastKnownPosition.latitude],
            zoom: 18
        });
    } else {
        StartFollowMe();
    }

}