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

        if (json.responseCode == 200) {
            for (let i = 0; i < json.results.length; i++) {
                var obj = json.results[i];

                var container_div = document.createElement('div');
                //visualizzo il testo all'interno del popup
                var popup_text = document.createElement('div');
                popup_text.className = "popup-text";
                popup_text.innerHTML = "<b>Utente:</b> " + obj.username + "<br><b>Data:</b> " + obj.dateTime + "<br><b>Tipo segnalazione:</b> " + obj.title;
                container_div.appendChild(popup_text);

                //visualizzo il pulsante per prendere in carico la segnalazione (solo admin)
                var popup_btn = document.createElement('div');
                popup_btn.className = "popup-btn-container";
                if (obj.accepted == 0) {
                    popup_btn.innerHTML = "<input type = 'button' onclick = 'AlertTakingCharge(" + obj.id + ")' class = 'alert-btn-taking-charge' value = 'Prendi in carico'>";
                }
                else {
                    popup_btn.innerHTML = "<input type = 'button' onclick = 'AlertCompleted(" + obj.id + ")' class = 'alert-btn-completed' value = 'Chiudi segnalazione'>";
                }
                container_div.appendChild(popup_btn);


                popup = new mapboxgl.Popup()
                    .setDOMContent(container_div)
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
                    .setLngLat([obj.lon, obj.lat])
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

//funzione per inviare la richiesta al server per prendere in carico una segnalazione
function AlertTakingCharge(alert_id) {
    fetch(basePath + "/utils/takeinchargealert.php", {
        method: 'post',
        credentials: 'include',
        headers: new Headers({
            'Content-Type': 'application/x-www-form-urlencoded',
        }),
        body: "alert_id=" + alert_id
    }).then(response => {
        return response.json();
    }).then(json => {
        if (json.responseCode == "200") {
            location.reload();
        }
        else {
            alert("Errore durante la presa in carico della richiesta");
        }
    });
}

//funzione per inviare la richiesta al server per chiudere una segnalazione
function AlertCompleted(alert_id) {
    fetch(basePath + "/utils/closealert.php", {
        method: 'post',
        credentials: 'include',
        headers: new Headers({
            'Content-Type': 'application/x-www-form-urlencoded',
        }),
        body: "alert_id=" + alert_id
    }).then(response => {
        return response.json();
    }).then(json => {
        if (json.responseCode == "200") {
            location.reload();
        }
        else {
            alert("Errore durante la chiusura della richiesta");
            console.log(json);
        }
    });
}