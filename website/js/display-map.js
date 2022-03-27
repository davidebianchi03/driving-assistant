var basePath = "/website";

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

        if (json.response_code == 200) {
            for (let i = 0; i < json.results.length; i++) {
                var obj = json.results[i];
                popup = new mapboxgl.Popup()
                    .setText(obj.title)
                    .addTo(map);

                marker = new mapboxgl.Marker()
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