<?php
require_once 'DBconfig.php';
if (isset($_GET['userid']) && !empty(trim($_GET['userid']))) {
    $sql = 'UPDATE users SET VerifyEmail = 1 WHERE UserID = ?';
    if ($stmt = mysqli_prepare($link, $sql)) {
        mysqli_stmt_prepare($stmt, 'i', $_GET['userid']);
        if (!mysqli_stmt_execute($stmt)) {
            echo "Errore nell'esecuzione della query";
        }
    } else {
        echo 'Errore nella preparazione dello statement';
    }
    mysqli_stmt_close($stmt);
}
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
                if($row['VerifyEmail'] == 0){
                    //mail non verificata
                    // header('location:waitmailconfirm.php');
                    exit();
                }
                else{
                    header('location:map.php');
                    exit();
                }
                
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
    <link rel="shortcut icon" href="img/icon.png">
    <link rel="stylesheet" href="styles/reservedarea.css">
</head>

<body>
    <div class = "nav">
        <a href="logout.php">Logout</a>
    </div>
    vxcvxv
</body>

</html>