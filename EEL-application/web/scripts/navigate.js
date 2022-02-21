$(document).ready(function () {
    $(".instruction").hide();
});

function setdestination() {
    var origin = lastKnownPosition;
    var destination = new GpsCoordinates(45.758443, 9.237668);
    navigate(origin, destination);
}

function navigate(startPoint, destinationPoint) {
    let path = "http://api.openrouteservice.org/v2/directions/driving-car?api_key=" + "5b3ce3597851110001cf6248c7034c7108e14cb5aa803407bc7023d4" + "&start=" +
        startPoint.longitude +
        "," + startPoint.latitude +
        "&end=" + destinationPoint.longitude +
        "," + destinationPoint.latitude;

    $.getJSON(path, function (data) {
        var pathPoints = data.features[0].geometry.coordinates;

        var pathCoordinates = [];

        for (let i = 0; i < pathPoints.length; i++) {
            const point = pathPoints[i];
            let coordinate = new GpsCoordinates(point[1], point[0])
            pathCoordinates.push(coordinate);
        }

        var commands = data.features[0].properties.segments[0].steps;
        navigation(commands);
        drawLine(pathPoints);
        $("#navigateframe").hide(250, "linear");
        $(".instruction").show(1000);
    });
}

var layer = null;

function drawLine(coordinates) {
    map.addSource('route', {
        'type': 'geojson',
        'data': {
            'type': 'Feature',
            'properties': {},
            'geometry': {
                'type': 'LineString',
                'coordinates': coordinates
            }
        }
    });

    layer = {
        'id': 'route',
        'type': 'line',
        'source': 'route',
        'layout': {
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
            'line-color': '#00b3ff',
            'line-width': 25,
            'line-blur': 0.4
        }
    };
    map.addLayer(layer);
}

async function navigation(commands){
    for(let i = 0; i< commands.length;i++){
        const command = commands[i];
        const commandStartCoordIndex = command.way_points[0];//indice punto inizio della manovra all'interno della lista delle coordinate
        const commandFinishCoordIndex = command.way_points[1];//indice punto fine della manovra all'interno della lista delle coordinate
        await eel.Speak(command.instruction);
        document.getElementById("text").innerHTML = command.instruction;
        await new Promise(r => setTimeout(r, 5000));
    }
}


//funzione per calcolare la distanza tra 2 punti in metri
function getDistanceFromLatLon(firstPoint, lastPoint) {
    var R = 6371; //Raggio della terra in KM
    var dLat = deg2rad(lastPoint.latitude - firstPoint.latitude);  // deg2rad below
    var dLon = deg2rad(lastPoint.longitude - firstPoint.longitude);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(firstPoint.latitude)) * Math.cos(deg2rad(lastPoint.latitude)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distanza in km
    return d / 1000;
}

//converione gradi in radianti
function deg2rad(deg) {
    return deg * (Math.PI / 180)
}