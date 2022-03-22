<?php
$basePath = "https://drivingassistant.altervista.org/";
session_start();
if (
    isset($_POST["username"]) && !empty($_POST["username"]) &&
    isset($_POST["email"]) && !empty($_POST["email"]) &&
    isset($_POST["password"]) && !empty($_POST["password"]) &&
    isset($_POST["confirm-password"]) && !empty($_POST["confirm-password"]) &&
    isset($_POST["name"]) && !empty($_POST["name"]) &&
    isset($_POST["surname"]) && !empty($_POST["surname"])
) {
    require_once 'DBconfig.php';
    $sql = 'INSERT INTO users(FirstName, LastName, Password, Username, Email) VALUES (?,?,?,?,?)';
    if ($stmt = mysqli_prepare($link, $sql)) {
        $password = password_hash($_POST["password"], PASSWORD_BCRYPT);

        $name = mysqli_real_escape_string($link, $_POST["name"]);
        $surname = mysqli_real_escape_string($link, $_POST["surname"]);
        $username = mysqli_real_escape_string($link, $_POST["username"]);
        $email = mysqli_real_escape_string($link, $_POST["email"]);

        mysqli_stmt_bind_param($stmt, 'sssss', $name, $surname, $password, $username, $email);
        if (mysqli_stmt_execute($stmt)) {
            //autentico la sessione
            $sql = 'SELECT * FROM users WHERE Username = ?';
            mysqli_stmt_close($stmt);
            if ($stmt = mysqli_prepare($link, $sql)) {
                mysqli_stmt_bind_param($stmt, 's', $_POST["username"]);
                if (mysqli_stmt_execute($stmt)) {
                    $result = mysqli_stmt_get_result($stmt);
                    // echo mysqli_num_rows($result);
                    if (mysqli_num_rows($result) == 1) {
                        $row = mysqli_fetch_array($result);
                        $_SESSION['session_id'] = $row['UserID'];
                        //invio la email
                        require './Email/send_confirm_email.php';

                        $emailText = "Conferma l'iscrizione al portale di Driving Assistant premendo sul seguente link:<br>" .
                            "<a href = '" . $basePath . "waitmailconfirm.php?userid=" . $row['UserID'] . "'>" . $basePath . "waitmailconfirm.php?userid=" . $row['UserID'] . "</a>";

                        SendConfirmEmail($_POST["email"], $emailText);

                        //reindirizzo l'utente
                        header('location:waitmailconfirm.php');
                        exit();
                    }
                }
            }
        } else {
            echo "<script>alert('Errore nell'esecuzione della query, probabilmente il tuo username già esiste')</script>";
        }
    } else {
        echo "<script>alert('Errore nella preparazione dello statement')</script>";
    }
    mysqli_stmt_close($stmt);
} else if ($_SERVER["REQUEST_METHOD"] == "POST") {
    echo "<script>alert('Non tutti i campi sono stati compilati correttamente')</script>";
}
?>


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Driving assistant</title>
    <link rel="stylesheet" href="styles/general.css">
    <link rel="stylesheet" href="styles/login.css">
    <link rel="shortcut icon" href="img/icon.png">
    <script src="https://code.jquery.com/jquery-3.6.0.js" integrity="sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk=" crossorigin="anonymous"></script>
    <script src="js/register-checkpassword.js"></script>
</head>

<body>
    <div class="container">
        <div class="blur">
            <div class="form-container">
                <form id="register-form" action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>" method="POST" class="register-form">
                    <p class="title">Registrati</p>
                    <p class="input">
                        <label for="name">Nome</label>
                        <input type="text" name="name" id="name">
                    </p>
                    <p class="input">
                        <label for="username">Cognome</label>
                        <input type="text" name="surname" id="surname">
                    </p>
                    <p class="input">
                        <label for="username">Username</label>
                        <input type="text" name="username" id="username">
                    </p>
                    <p class="input">
                        <label for="email">Email</label>
                        <input type="email" name="email" id="email">
                    </p>
                    <p class="input">
                        <label for="password">Password</label>
                        <input type="password" name="password" id="password" oninput="CheckPassword()">
                    </p>
                    <p class="input">
                        <label for="confirm-password">Conferma password</label>
                        <input type="password" name="confirm-password" id="checkpassword" oninput="CheckPassword()">
                    <p class="pass-err">Le password non corrispondono</p>
                    </p>
                    <input type="button" onclick="Sumbit()" value="Registrati" class="submit-btn register-btn">
                </form>
            </div>
        </div>
    </div>
</body>

</html>