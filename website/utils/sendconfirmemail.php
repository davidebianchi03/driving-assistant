<?php
$basePath = "https://drivingassistant.altervista.org/";
if (isset($_POST["id"]) && !empty(trim($_POST["id"]))) {

    require '../Email/send_confirm_email.php';
    require_once '../DBconfig.php';

    $sql = 'SELECT * FROM users WHERE UserID = ?';
    if ($stmt = mysqli_prepare($link, $sql)) {
        mysqli_stmt_bind_param($stmt, 'i', $_POST["id"]);
        if (mysqli_stmt_execute($stmt)) {
            $result = mysqli_stmt_get_result($stmt);
            if (mysqli_num_rows($result) == 1) {
                $row = mysqli_fetch_array($result);
                $emailText = "Conferma l'iscrizione al portale di Driving Assistant premendo sul seguente link:<br>" .
                    "<a href = '" . $basePath . "waitmailconfirm.php?userid=" . $_POST["id"] . "'>" . $basePath . "waitmailconfirm.php?userid=" . $_POST["id"] . "</a>";

                SendConfirmEmail($row["Email"], $emailText);
                // echo '{"responseCode":200}';
                exit();
            } else {
                // echo '{"responseCode":400}';
            }
        } else {
            // echo '{"responseCode":500, "message":"errore esecuzione query"}';
        }
    } else {
        // echo '{"responseCode":500, "message":"errore preparazione query"}';
    }
} else {
    // echo '{"responseCode":404}';
}
