<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Driving assistant</title>
    <link rel="shortcut icon" href="img/icon.png">
    <link rel="stylesheet" href="styles/reservedarea.css">
    <script src="js/verification-page.js"></script>
</head>

<body>
    <div class="nav">
        <img src="img/icon.png" alt="" id="icon">
        <a href="logout.php" id="logout">Logout</a>
    </div>

    <div class="message">
        <p>Per poter continuare devi verificare la tua email</p>
        <?php
        require_once 'DBconfig.php';
        if (isset($_GET['userid']) && !empty(trim($_GET['userid']))) {
            $sql = 'UPDATE users SET VerifyEmail = 1 WHERE UserID = ?';
            if ($stmt = mysqli_prepare($link, $sql)) {
                mysqli_stmt_bind_param($stmt, 'i', $_GET['userid']);
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
                        if ($row['VerifyEmail'] == 0) {
                            //mail non verificata
                            echo '<p id="send-again-email" onclick="sendAgainEmail('. $_SESSION['session_id'].');">Clicca qui per ricevere nuovamente la email di verifica</p>';
                            // header('location:waitmailconfirm.php');
                            exit();
                        } else {
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
        
    </div>
</body>

</html>