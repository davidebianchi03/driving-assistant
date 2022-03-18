<?php
include('errors.php');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    require_once 'config.php';
    if (isset($data["action"])) {
        switch ($data["action"]) {
            case "insert-segnalazione":
                $userID =  $title =  $description = $lat = $lon = "";
                if (isset($data['user_id']) && isset($data['title']) && isset($data['description']) && isset($data['lat']) && isset($data['lon'])) {
                    $userID = trim($data['user_id']);
                    $title = trim($data['title']);
                    $description = trim($data['description']);
                    $lat = trim($data['lat']);
                    $lon = trim($data['lon']);


                    $sql = "INSERT INTO segnalazioni (UserIdentifier, Titolo, Descrizione, Latitudine, Longitudine) VALUES (?, ?, ?, ?, ?)";

                    if ($stmt = mysqli_prepare($link, $sql)) {
                        mysqli_stmt_bind_param($stmt, "sssss", $param_userID, $param_title, $param_description, $param_lat, $param_lon);

                        $param_userID = $userID;
                        $param_title = $title;
                        $param_description = $description;
                        $param_lat = $lat;
                        $param_lon = $lon;

                        if (mysqli_stmt_execute($stmt)) {
                            exit();
                        } else {
                            InternalServerError_500();
                        }
                        mysqli_stmt_close($stmt);
                    }
                    mysqli_close($link);
                } else {
                    BadRequest_400();
                }
                break;
            case "insert-user":
                $userID =  $nome =  $cognome = $password = "";
                if (isset($data['user_id']) && isset($data['nome']) && isset($data['cognome']) && isset($data['password'])) {
                    $userID = trim($data['user_id']);
                    $nome = trim($data['nome']);
                    $cognome = trim($data['cognome']);
                    $password = trim($data['password']);


                    $sql = "INSERT INTO users (UserIdentifier, Nome, Cognome, Pass) VALUES (?, ?, ?, ?)";

                    if ($stmt = mysqli_prepare($link, $sql)) {
                        mysqli_stmt_bind_param($stmt, "sssss", $param_userID, $param_nome, $param_cognome, $param_password);

                        $param_userID = $userID;
                        $param_nome = $nome;
                        $param_cognome = $cognome;
                        $param_password = $password;

                        if (mysqli_stmt_execute($stmt)) {
                            exit();
                        } else {
                            InternalServerError_500();
                        }
                        mysqli_stmt_close($stmt);
                    }
                    mysqli_close($link);
                } else {
                    BadRequest_400();
                }
                break;
        }
    } else {
        BadRequest_400();
    }
}
