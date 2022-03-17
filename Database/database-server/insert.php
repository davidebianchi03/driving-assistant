<?php
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    //echo '{"error":"bad request method"}';
    echo '<h1>Bad Request</h1>  ';
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    require_once 'config.php';
    $userID =  $titolo =  $descrizione = $lat = $lon = "";
    $userID_err = $titolo_err = $descrizione_err = $lat_err = $lon_err = "";
    //USER ID
    $input_userID = trim($_POST["user_id"]);
    if (empty($input_userID)) {
        $userID_err = "Please enter user id <br>";
    } else {
        $userID = $input_userID;
    }

    //TITOLO
    $input_titolo = trim($_POST["titolo"]);
    if (empty($input_titolo)) {
        $titolo_err = "Please enter a title of your problem <br>";
    } else {
        $titolo = $input_titolo;
    }

    //DESCRIZIONE
    $input_descrizione = trim($_POST["descrizione"]);
    if (empty($input_descrizione)) {
        $descrizione_err = "Please enter a description of your problem <br>";
    } else {
        $descrizione = $input_descrizione;
    }

    //LATITUDINE
    $input_lat = trim($_POST["lat"]);
    if (empty($input_lat)) {
        $lat_err = "Please enter a valid latutidine <br>";
    } else {
        $lat = $input_lat;
    }

    //LONGITUDINE
    $input_lon = trim($_POST["lon"]);
    if (empty($input_lon)) {
        $lon_err = "Please enter a valid longitudine <br>";
    } else {
        $lon = $input_lon;
    }

    if (empty($userID_err) && empty($titolo_err) && empty($descrizione_err) && empty($lat_err) && empty($lon_err)) {

        $sql = "INSERT INTO segnalazioni (UserIdentifier, Titolo, Descrizione, Latitudine, Longitudine) VALUES (?, ?, ?, ?, ?)";

        if ($stmt = mysqli_prepare($link, $sql)) {
            echo "prova";
            mysqli_stmt_bind_param($stmt, "sssss", $param_userID, $param_titolo, $param_descrizione, $param_lat, $param_lon);

            $param_userID = $userID;
            $param_titolo = $titolo;
            $param_descrizione = $descrizione;
            $param_lat = $lat;
            $param_lon = $lon;

            echo $param_userID;
            if (mysqli_stmt_execute($stmt)) {
                header("location: index.php");
                exit();
            } else {
                echo "Something went wrong";
            }
            mysqli_stmt_close($stmt);
        }

        mysqli_close($link);
    } else {
        echo $userID_err;
        echo $titolo_err;
        echo $descrizione_err;
        echo $lat_err;
        echo $lon_err;
    }
}
