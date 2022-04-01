<?php
session_start();
$responseObj = new stdClass();
if (isset($_SESSION['session_id'])) {
    if (isset($_POST['alert_id'])) {
        //vado a cambiare lo stato della segnalazione nel database da in attesa a presa in carico
        require_once '../DBconfig.php';

        $sql = 'UPDATE segnalazioni SET Completed = 1 WHERE UserID = ?';
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

echo (json_encode($responseObj));

