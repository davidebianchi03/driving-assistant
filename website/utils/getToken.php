<?php
require_once '../DBconfig.php';
require_once 'utils.php';
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);
    if (isset($data['username']) && isset($data['password'])) {
        
        if (!empty($data['username']) && !empty($data['password'])) {
            $username = mysqli_real_escape_string($link, $data['username']);
            $password = mysqli_real_escape_string($link, $data['password']);
            
            $sql = 'SELECT UserID, Username, Password FROM users WHERE username = ?';
            if ($stmt = mysqli_prepare($link, $sql)) {
                mysqli_stmt_bind_param($stmt, "s", $username);
                
                if (mysqli_stmt_execute($stmt)) {
                    
                    $result = mysqli_stmt_get_result($stmt);
                    if (mysqli_num_rows($result) == 1) {
                        $row = mysqli_fetch_array($result);
                        if (password_verify($password, $row['Password'])) {
                            $userID = $row['UserID'];
                            $datetime = date('y/m/d-H:i:s');
                            $token = md5($username . $datetime);

                            //inserisco token nel database
                            $sql = 'UPDATE users SET AccessToken = ? WHERE UserID = ?';
                            if ($stmt = mysqli_prepare($link, $sql)) {
                                mysqli_stmt_bind_param($stmt, 'si', $token, $userID);
                                if (mysqli_stmt_execute($stmt)) {
                                    //sendJSONMessage(buildJSON_HTTPstatus(200, 'Ok'));
                                    //restituisco token 
                                    
                                    sendJSONMessage(buildJSON_AccessToken($token, $userID));
                                } else {
                                    sendJSONMessage(buildJSON_HTTPstatus(500, 'Internal server error - Error while executing query'));
                                }
                            } else {
                                sendJSONMessage(buildJSON_HTTPstatus(500, 'Internal server error - Error while preparing statement'));
                            }
                        } else {
                            //Risposta con errore -> Credenziali sbagliate
                            sendJSONMessage(buildJSON_HTTPstatus(403, 'Unauthorized user'));
                        }
                    }
                }
            }
        } else {
            //Risposta con errore -> I campi non devono essere vuoti
            sendJSONMessage(buildJSON_HTTPstatus(400, 'Bad request - Missing parameters'));
        }
    } else {
        sendJSONMessage(buildJSON_HTTPstatus(400, 'Bad request - Missing parameters'));
    }
}
