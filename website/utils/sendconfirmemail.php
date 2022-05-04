<?php
$basePath = "https://drivingassistant.altervista.org/";

if (isset($_POST["id"]) && !empty(trim($_POST["id"]))) {

    require_once('../email/sendEmail.php'); //file con le funzioni per inviare le email
    require_once '../DBconfig.php';

    $sql = 'SELECT * FROM users WHERE UserID = ?';
    if ($stmt = mysqli_prepare($link, $sql)) {
        mysqli_stmt_bind_param($stmt, 'i', $_POST["id"]);
        if (mysqli_stmt_execute($stmt)) {
            $result = mysqli_stmt_get_result($stmt);
            if (mysqli_num_rows($result) == 1) {
                $row = mysqli_fetch_array($result);
                $url = $basePath . "waitmailconfirm.php?userid=" . $row['UserID'];
                $emailText = "Conferma l'iscrizione al portale di Driving Assistant cliccando qui:<br>".
                "<br><a href = '".$url."' style = \"font: inherit;
                background-color: #FF7A59;
                border: none;
                padding: 10px;
                text-transform: uppercase;
                letter-spacing: 2px;
                font-weight: 900; 
                color: white;
                border-radius: 5px; 
                box-shadow: 3px 3px #d94c53;
                text-decoration:none;\">Verifica Email</a><br><br><br><br>" .
                "<p style = \"font-size:12px;font-style: italic;\">Se il pulsante non dovesse funzionare clicca su questo link <br>".
                "<a href = '".$url."'>$url</a></p>";
                    

                SendEmail(
                    $row["Email"],
                    "Driving assistant - Conferma registrazione",
                    $emailText
                );
                //  echo '{"responseCode":200}';
                exit();
            } else {
                //  echo '{"responseCode":400}';
            }
        } else {
            //  echo '{"responseCode":500, "message":"errore esecuzione query"}';
        }
    } else {
    //  echo '{"responseCode":500, "message":"errore preparazione query"}';
    }
} else {
    //  echo '{"responseCode":404}';
}
