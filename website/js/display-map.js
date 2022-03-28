var basePath = "";

$(document).ready(function () {

    mapboxgl.accessToken = "pk.eyJ1IjoiZGFkZWJpYTAzIiwiYSI6ImNsMTk2eGlqMjBraTMzZHBtNjB6dzlscXgifQ.vu-PtXncRAUzN_b1Jypt8A";
    map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [9, 45],
        zoom: 7,
        minZoom: 2
    });

    //carico la lista delle segnalazioni e le visualizzo
    fetch(basePath + "/utils/getalertslist.php", {
        method: 'get',
        credentials: 'include'
    }).then(response => {
        return response.json();
    }).then(json => {
        var marker;
        var popup;

        console.log(json);

        if (json.response_code == 200) {
            for (let i = 0; i < json.results.length; i++) {
                var obj = json.results[i];

                popup = new mapboxgl.Popup()
                    .setText("Segnalazione fatta da " + obj.username + " alla data: " + obj.date_time+ ", tipo segnalazione: " + obj.title)
                    .addTo(map);

                var div = document.createElement('div');

                if (obj.title == "Incidente") {
                    div.className = 'incidente-marker';
                } else if (obj.title == "Materiale sparso") {
                    div.className = 'materialesparso-marker';
                }
                else if (obj.title == "Strada dissestata") {
                    div.className = 'stradadissestata-marker';
                }
                else if (obj.title == "Altro pericolo") {
                    div.className = 'altropericolo-marker';
                }

                marker = new mapboxgl.Marker(div)
                    .setLngLat([obj.longitude, obj.latitude])
                    .addTo(map).setPopup(popup);

                map.fire('closeAllPopups');
                popup.remove(); //Chiudo tutti i popup
            }
        }
        else {
            alert("Errore durante il caricamento delle segnalazioni");
        }
    });
});