<?php
require_once '../DBconfig.php';
//autenticazione dell'utente
session_start();
$responseObj = new stdClass();
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

                //query per ottenere la lista delle segnalazioni
                $sql = 'SELECT * FROM segnalazioni INNER JOIN users ON segnalazioni.UserID = users.UserID WHERE completed = 0';
                if ($result = mysqli_query($link, $sql)) {

                    $jsonArray = array();

                    while ($row = mysqli_fetch_array($result)) {
                        $jsonObj = new stdClass();
                        $jsonObj->id = $row["ID"];
                        $jsonObj->userID = $row["UserID"];
                        $jsonObj->username = $row["Username"];
                        $jsonObj->title = $row["Title"];
                        $jsonObj->description = $row["Description"];
                        $jsonObj->lat = $row["Lat"];
                        $jsonObj->lon = $row["Lon"];
                        $jsonObj->dateTime = $row["Date Time"];
                        $jsonObj->accepted = $row["Accepted"];
                        $jsonObj->dateTimeAccepted = $row["Date Time Accepted"];
                        $jsonObj->completed = $row["Completed"];
                        $jsonObj->dateTimeCompleted = $row["Date Time Completed"];

                        array_push($jsonArray, $jsonObj);
                    }
                    
                    $responseObj->responseCode = 200;
                    $responseObj->description = "ok";
                    $responseObj->results = $jsonArray;

                    echo json_encode($responseObj);
                } else {
                    $responseObj->response_code = "500";
                    $responseObj->description = "internal server error - error executing query";
                }
            } else {
                session_destroy();
                $responseObj->response_code = "403";
                $responseObj->description = "unauthorized user";
            }
        } else {
            $responseObj->response_code = "500";
            $responseObj->description = "internal server error - error executing query";
        }
    } else {
        $responseObj->response_code = "500";
        $responseObj->description = "internal server error - error preparing statement";
    }
    mysqli_stmt_close($stmt);
} else {
    $responseObj->response_code = "403";
    $responseObj->description = "unauthorized user";
}
