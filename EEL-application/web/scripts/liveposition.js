var lastKnownPosition = null;
var liveMarker = null;//marker che indica la posizione in tempo reale

function getLocation() {
    // let position = JSON.parse(eel.GetPosition());
    eel.GetPosition()(function(json){
        let position = JSON.parse(json);
        console.log(position.latitude+ ","+position.longitude)
    });
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