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
        
        drawLine(pathPoints);

    });
}

function drawLine(coordinates){
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
    map.addLayer({
        'id': 'route',
        'type': 'line',
        'source': 'route',
        'layout': {
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
            'line-color': '#00b3ff',
            'line-width': 8
        }
    });
}



