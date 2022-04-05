function Login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    //carico l'url del server dalle impostazioni
    eel.GetSettings()(function (json) {
        var responseObj = JSON.parse(json);
        if (responseObj.valid) {
            fetch(responseObj.server_url + "/utils/getToken.php", {
                method: 'post',
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            }).then(response => {
                return response.json();
            }).then(json => {
                if (json.response_code == 200) {
                    //username e password corretti
                    eel.UpdateCredentials(json.userID, username, json.accessToken);
                    document.getElementById("username").value = "";
                    document.getElementById("password").value = "";
                    $(".login-container").hide();
                }
                else if (json.response_code == 403) {
                    alert("Username o password errati");
                }
            });
        }
        else {
            alert("Non è stato impostato l'indirizzo del server nelle impostazioni");
        }
    });


}

$(document).ready(function () {
    //controllo se l'utente è già stato autenticato e qual'è stata la data dell'ultima autenticazione
    eel.GetCredentials()(function (json) {
        var jsonObj = JSON.parse(json);
        if(jsonObj.valid == true){
            //nascondo il riquadro di login
            $(".login-container").hide();
        }
    });
});

function Logout() {
    $(".login-container").show();
    $(".settings-container").hide();
    eel.Logout();
}