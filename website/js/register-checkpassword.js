function CheckPassword() {
    var pass = document.getElementById("password").value;
    var passConfirm = document.getElementById("checkpassword").value;

    if (pass == passConfirm) {
        $('.pass-err').css('display', 'none');
    }
    else {
        $('.pass-err').css('display', 'block');
    }

}

function Sumbit() {
    var email = document.getElementById("email").value;
    var username = document.getElementById("username").value;
    var pass = document.getElementById("password").value;
    var passConfirm = document.getElementById("checkpassword").value;

    if (pass == passConfirm && pass && username != "" && pass != "" && passConfirm != "" && validateEmail(email)) {
        document.getElementById("register-form").submit();
    }
    else {
        alert('Il form non è stato riempito correttamente');
    }
}

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}