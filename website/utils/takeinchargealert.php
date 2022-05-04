<?php
session_start();
$responseObj = new stdClass();
if (isset($_SESSION['session_id'])) {
    //controllo se l'utente è un amministratore
    require_once '../DBconfig.php';
    $sql = 'SELECT * FROM users WHERE UserID = ?';
    if ($stmt = mysqli_prepare($link, $sql)) {
        mysqli_stmt_bind_param($stmt, 'i', $_SESSION['session_id']);
        if (mysqli_stmt_execute($stmt)) {
            $result = mysqli_stmt_get_result($stmt);
            if (mysqli_num_rows($result) == 1) {
                //utente autenticato
                $row = mysqli_fetch_array($result);
                if ($row['UserLevel'] == 1) {
                    if (isset($_POST['alert_id'])) {
                        //vado a cambiare lo stato della segnalazione nel database da in attesa a presa in carico
                        require_once '../DBconfig.php';

                        $sql = 'UPDATE segnalazioni SET Accepted = 1 WHERE UserID = ?';
                        if ($stmt = mysqli_prepare($link, $sql)) {
                            mysqli_stmt_bind_param($stmt, 'i', $_SESSION['session_id']);

                            if (mysqli_stmt_execute($stmt)) {
                                $responseObj->responseCode = "200";
                                $responseObj->description = "ok";
                            } else {
                                $responseObj->response_code = "500";
                                $responseObj->description = "internal server error - error executing query";
                            }
                        } else {
                            $responseObj->response_code = "500";
                            $responseObj->description = "internal server error - error preparing statement";
                        }
                    } else {
                        $responseObj->response_code = "400";
                        $responseObj->description = "bad request - missing parameter";
                    }
                } else {
                    $responseObj->response_code = "403";
                    $responseObj->description = "unauthorized user";
                }
            } else {
                $responseObj->response_code = "500";
                $responseObj->description = "internal server error - no rows";
            }
        } else {
            $responseObj->response_code = "500";
            $responseObj->description = "internal server error - error executing query";
        }
    } else {
        $responseObj->response_code = "500";
        $responseObj->description = "internal server error - error preparing statement";
    }
} else {
    $responseObj->response_code = "403";
    $responseObj->description = "unauthorized user";
}


echo (json_encode($responseObj));
