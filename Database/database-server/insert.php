<?php
    require_once 'config.php';
    $userID =  $titolo =  $descrizione = $lat = $lon = "";
    $userID_err = $titolo_err = $descrizione_err = $lat_err = $lon_err = "";

    if($_SERVER["REQUEST_METHOD"] == "POST"){
        $input_userID = trim($_POST["user_id"]);
        if (empty($input_userID)) {
            $userID_err = "Please enter user_id";
        }else{
            $userID = $input_userID;
        }
        $input_titolo= trim($_POST["titolo"]);
        if (empty($input_titolo)) {
            $titolo_err = "Please enter a titleof your problem";
        }else{
            $titolo = $input_titolo;
        }
        $input_descrizione = trim($_POST["descrizione"]);
        if (empty($input_descrizione)) {
            $descrizione_err = "Please enter a description of your problem";
        }else{
            $descrizione = $input_descrizione;
        }
        $input_lat = trim($_POST["lat"]);
        if (empty($input_lat)) {
            $lat_err = "Please enter a valid latutidine";
        }else{
            $lat = $input_lat;
        }
        $input_lon = trim($_POST["lon"]);
        if (empty($input_lon)) {
            $lon_err = "Please enter a valid longitudine";
        }else{
            $lon = $input_lon;
        }
        if(empty($userID_err) && empty($titolo_err) && empty($descrizione_err) && empty($lat_err) && empty($lon_err)){
            $sql = "INSERT INTO problema (titolo,descrizione,latitudine,longitdine) VALUES (?,?,?,?)";
        }
        /*
        if(empty($id_err) && empty($desc_err) && empty($lat_err) && empty($long_err) && empty($titolo_err)){
            $sql = "INSERT INTO problema (titolo,descrizione,latitudine,longitdine) VALUES (?,?,?,?)";
            if($stmt = mysqli_prepare($link,$sql)){
                mysqli_stmt_bind_param($stmt, "sss", $param_nome, $param_cognome, $param_id, $param_anno, $param_voto);//serve per inserire i valori in $sql

                $param_nome=$nome;
                $param_cognome=$cognome;
                $param_id=$id;
                $param_anno=$anno;
                $param_voto=$voto;

                if(mysqli_stmt_execute($stmt)){//inserisce i dati
                    header("location: index.php");
                    exit();
                }
            }else{
                echo "something went wrong";
            }
        }
        mysqli_stmt_close($stmt);
        */
    }
    //mysqli_close($link);
?>