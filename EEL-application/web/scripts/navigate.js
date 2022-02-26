$(document).ready(function () {
    $(".instruction").hide();
});

function setdestination() {
    var origin = lastKnownPosition;
    if (selectedPlace != null) {
        navigate(origin, selectedPlace);
        console.log(selectedPlace);
    }
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
        navigation(commands, pathPoints);
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

async function navigation(commands, coordinates) {
    for (let i = 0; i < commands.length; i++) {
        const command = commands[i];
        const instruction = commands[i+1].instruction;
        const commandStartCoordIndex = command.way_points[0];//indice punto inizio della manovra all'interno della lista delle coordinate
        const commandFinishCoordIndex = command.way_points[1];//indice punto fine della manovra all'interno della lista delle coordinate
        document.getElementById("text").innerHTML = instruction;
        //indicazioni riguardanti il prossimo ostacolo

        //variabili utilizzate per tenere traccia delle indicazioni già date
        let afterLast = false;//indicazione subito dopo la successiva
        let after50Km = false;//indicazione ai 50km
        let after20Km = false;//indicazione ai 20km
        let after10Km = false;//indicazione ai 10km
        let after5Km = false;//indicazione ai 5km
        let after2Km = false;//indicazione ai 2km
        let after1Km = false;//indicazione ai 1km
        let after500m = false;//indicazione ai 500m
        let after150m = false;//indicazione ai 150
        let now = false;//ora


        var currentWayPoint = commandStartCoordIndex + 1;
        while (currentWayPoint < commandFinishCoordIndex) {
            /* calcola la distanza dalla svolta utilizzando i waypoints */
            //  calcolo la distanza tra il waypoint e la mia posizione attuale
            let waypoint_coordinates = new GpsCoordinates(coordinates[currentWayPoint][1], coordinates[currentWayPoint][0]);
            let distance = getDistanceFromLatLon(lastKnownPosition, waypoint_coordinates);
            //console.log("Way point = " +waypoint_coordinates.latitude + ", " + waypoint_coordinates.longitude + " Distance = " + distance);

            //se la distanza è inferiore a 10 metri considero il waypoint superato
            if (distance < 10) {
                currentWayPoint++;
            }

            var turningDistance = distance;
            //calcolo la distanza dalla svolta
            for (let i = currentWayPoint; i < commandFinishCoordIndex - 1; i++) {
                turningDistance += getDistanceFromLatLon(new GpsCoordinates(coordinates[i][1], coordinates[i][0]), new GpsCoordinates(coordinates[i + 1][1], coordinates[i + 1][0]));
            }

            //console.log("Turning distance = " + turningDistance);

            var distanceStr = "";//stringa usata per indicare la distanza
            if (turningDistance > 1000) {
                document.getElementById("distance").innerHTML = (turningDistance / 1000).toFixed(2) + " Km";
                distanceStr = "In " + turningDistance.toFixed(2) + " kilometers, ";
            }
            else {
                document.getElementById("distance").innerHTML = parseInt(turningDistance) + " m";
                distanceStr = "In " + parseInt(turningDistance) + " meters, ";
            }

            //pronuncio le indicazioni sulla distanza
            //indicazione subito dopo l'ultima svolta
            if (!afterLast) {
                if (!afterLast) {
                    //pronuncio la frase subito dopo l'ultima svolta
                    await eel.Speak(distanceStr + instruction);
                }
                //cerco di evitare ripetizioni di frasi
                if (turningDistance > 45000 && turningDistance < 55000) {
                    after50Km = true;
                }

                if (turningDistance > 15000 && turningDistance < 25000) {
                    after50Km = true;
                    after20Km = true;
                }

                if (turningDistance > 8000 && turningDistance < 12500) {
                    after50Km = true;
                    after20Km = true;
                    after10Km = true;
                }

                if (turningDistance > 4500 && turningDistance < 6500) {
                    after50Km = true;
                    after20Km = true;
                    after10Km = true;
                    after5Km = true;
                }

                if (turningDistance > 1500 && turningDistance < 3000) {
                    after50Km = true;
                    after20Km = true;
                    after10Km = true;
                    after5Km = true;
                    after2Km = true;
                }

                if (turningDistance > 750 && turningDistance < 1500) {
                    after50Km = true;
                    after20Km = true;
                    after10Km = true;
                    after5Km = true;
                    after2Km = true;
                    after1Km = true;
                }

                if (turningDistance > 350 && turningDistance < 600) {
                    after50Km = true;
                    after20Km = true;
                    after10Km = true;
                    after5Km = true;
                    after2Km = true;
                    after1Km = true;
                    after500m = true;
                }

                if (turningDistance > 100 && turningDistance < 250) {
                    afterLast = true;//-->per rendere più veloce la navigazione
                    after50Km = true;
                    after20Km = true;
                    after10Km = true;
                    after5Km = true;
                    after2Km = true;
                    after1Km = true;
                    after500m = true;
                    after150m = true;
                }
                afterLast = true;
            }
            //distanza 50 km
            if (turningDistance < 50000 && turningDistance > 20000 && !after50Km) {
                await eel.Speak("In fifty kilometers, " + instruction);
                after50Km=true;
            }
            //distanza 20km
            if (turningDistance < 20000 && turningDistance > 10000 && !after20Km) {
                await eel.Speak("In twenty kilometers, " + instruction);
                after20Km = true;
            }
            //distanza 10km
            if (turningDistance < 10000 && turningDistance > 5000 && !after10Km) {
                await eel.Speak("In ten kilometers, " + instruction);
                after10Km = true;
            }
            //distanza 5km
            if (turningDistance < 5000 && turningDistance > 2000 && !after5Km) {
                await eel.Speak("In five kilometers, " + instruction);
                after5Km = true;
            }
            //distanza 2km
            if (turningDistance < 2000 && turningDistance > 1000 && !after2Km) {
                await eel.Speak("In two kilometers, " + instruction);
                after2Km = true;
            }
            //distanza 1km
            if (turningDistance < 1000 && turningDistance > 500 && !after1Km) {
                await eel.Speak("In one kilometers, " + instruction);
                after1Km = true;
            }
            //distanza 500m
            if (turningDistance < 500 && turningDistance > 150 && !after500m) {
                await eel.Speak("In five hundred meters, " + instruction);
                after500m = true;
            }
            //distanza 150m
            if (turningDistance < 150 && turningDistance > 20 && !after150m) {
                await eel.Speak("In one hundred and fifty meters, " + instruction);
                after150m = true;
            }
            //ora
            if (turningDistance < 20) {
                await eel.Speak(instruction);
                bcurrentWayPoint = commandFinishCoordIndex;
            }

            await new Promise(r => setTimeout(r, 250));
        }
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
    return d * 1000;
}

//converione gradi in radianti
function deg2rad(deg) {
    return deg * (Math.PI / 180)
}