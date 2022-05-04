<?php
require_once 'DBconfig.php';
$userLevel = 0;
//autenticazione dell'utente
session_start();
//controllo il login
if (isset($_SESSION['session_id']) && !empty(trim($_SESSION['session_id']))) {
    //controllo nel database se è stata verificata la email e se lo user id è valido
    $sql = 'SELECT * FROM users WHERE UserID = ?';
    if ($stmt = mysqli_prepare($link, $sql)) {
        mysqli_stmt_bind_param($stmt, 'i', $_SESSION['session_id']);
        if (mysqli_stmt_execute($stmt)) {
            $result = mysqli_stmt_get_result($stmt);
            if (mysqli_num_rows($result) == 1) {
                //utente autenticato
                $row = mysqli_fetch_array($result);
                if ($row['VerifyEmail'] == 0) {
                    //mail non verificata
                    header('location:waitmailconfirm.php');
                    exit();
                }
                $userLevel = $row['UserLevel'];
            } else {
                echo "Utente non autenticato";
                session_destroy();
                header('location:login.php');
                exit();
            }
        } else {
            echo "Errore nell'esecuzione della query";
            session_destroy();
            header('location:login.php');
            exit();
        }
    } else {
        echo "Errore nella preparazione dello statement";
        session_destroy();
        header('location:login.php');
        exit();
    }
    mysqli_stmt_close($stmt);
} else {
    header('location:login.php');
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Driving assistant</title>
    <script src="js/env-settings.js"></script>
    <link rel="shortcut icon" href="img/icon.png">
    <link rel="stylesheet" href="styles/reservedarea.css">
    <link href="https://api.mapbox.com/mapbox-gl-js/v2.7.0/mapbox-gl.css" rel="stylesheet">
    <link href='styles/map.css' rel='stylesheet' />
    <script src="js/verification-page.js"></script>
    <script src="js/lib/jquery.min.js" type="text/javascript"></script>
    <script src="https://api.mapbox.com/mapbox-gl-js/v2.7.0/mapbox-gl.js"></script>
    <script src="js/reserved-area-animations.js"></script>
    <?php
    if ($userLevel == 1) {
        echo '<script src="js/display-map-admin.js"></script>';
    } else {
        echo '<script src="js/display-map-user.js"></script>';
    }
    ?>
</head>

<body>
    <div class="nav">
        <img src="img/icon.png" alt="" id="icon">
        <a href="logout.php" id="logout">Logout</a>
    </div>

    <div class="container">
        <div id="map"></div>
    </div>

</body>

</html>