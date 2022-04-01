var usernameValid = false;

function CheckPassword() {
    var pass = document.getElementById("password").value;
    var passConfirm = document.getElementById("checkpassword").value;

    if (pass == passConfirm) {
        $('.pass-err').css('display', 'none');
        return true;
    }
    else {
        $('.pass-err').css('display', 'block');
        return false;
    }

}

function Sumbit() {
    var email = document.getElementById("email").value;
    var pass = document.getElementById("password").value;
    var passConfirm = document.getElementById("checkpassword").value;
    var name = document.getElementById("name").value;
    var surname = document.getElementById("surname").value;

    if (pass == passConfirm && pass != "" && passConfirm != "" && validateEmail(email) && CheckPassword() && pass.length >= 8 && pass.length <= 255 && name != "" && surname != "") {
        //controllo se lo username è valido
        var username = document.getElementById("username").value;
        if (username != "" && username.length >= 6 && username.length <= 255) {
            fetch(basePath + "/utils/checkUsername.php?username=" + username, {
                method: 'post',
                credentials: 'include'
            }).then(response => {
                return response.json();
            }).then(json => {
                if (json.responseCode = 200) {
                    //invio il form al server se lo username non esiste già
                    if (json.exists == false) {
                        document.getElementById("register-form").submit();
                    }
                    else {
                        alert("Lo username esiste già");
                    }

                }
                else if (json.responseCode = 400) {
                    alert("400 - Resource server error");
                }
                else {
                    alert("500 - Internal server error");
                }
            });
        }

        else {
            usernameValid = false;
            alert("Lo username non rispetta la lunghezza minima di 6 caratteri o la massima di 255");
        }
    }
    else if (pass.length < 8 || pass.length > 255) {
        alert("La password non rispetta la lunghezza minima di 8 caratteri o la massima di 255");
    }
    else {
        alert('Il form non è stato riempito correttamente');
    }
}

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

