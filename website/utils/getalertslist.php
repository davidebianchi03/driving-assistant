<?php
require_once '../DBconfig.php';
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

                //query per ottenere la lista delle segnalazioni
                $sql = 'SELECT * FROM segnalazioni WHERE completed = 0';
                if ($result = mysqli_query($link, $sql)) {

                    $json_array = "[";

                    while ($row = mysqli_fetch_array($result)) {
                        $json_string = '{';
                        $json_string .= '"id":"' . $row["ID"] . '",';
                        $json_string .= '"user_id":"' . $row["UserID"] . '",';
                        $json_string .= '"title":"' . $row["Title"] . '",';
                        $json_string .= '"description":"' . $row["Description"] . '",';
                        $json_string .= '"latitude":"' . $row["Lat"] . '",';
                        $json_string .= '"longitude":"' . $row["Lon"] . '",';
                        $json_string .= '"date_time":"' . $row["Date Time"] . '",';
                        $json_string .= '"accepted":' . $row["Accepted"] . ',';
                        $json_string .= '"date_time_accepted":"' . $row["Date Time Accepted"] . '",';
                        $json_string .= '"completed":"' . $row["Completed"] . '",';
                        $json_string .= '"date_time_completed":"' . $row["Date Time Completed"].'"';
                        $json_string .= '}';

                        if(strlen($json_array) > 1){
                            $json_array.=','.$json_string;
                        }
                        else{
                            $json_array.=$json_string;
                        }
                        
                    }

                    $json_array.="]";

                    echo '{"response_code":200, "results":'.$json_array.'}';
                } else {
                    echo '{"response_code":500, "description":"error executing query"}';
                }
            } else {
                session_destroy();
                echo '{"response_code":403, "description":"user not logged in"}';
                exit();
            }
        } else {
            echo '{"response_code":500, "description":"error executing query"}';
            exit();
        }
    } else {
        echo '{"response_code":500, "description":"error preparing statement"}';
        exit();
    }
    mysqli_stmt_close($stmt);
} else {
    echo '{"response_code":403, "description":"user not logged in"}';
    exit();
}
