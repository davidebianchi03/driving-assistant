<?php
include('errors.php');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    require_once('../DBconfig.php');
    include('manage-db.php');
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

                    $sql = "INSERT INTO segnalazioni (UserID, Title, `Description`, Lat, Lon) VALUES (?, ?, ?, ?, ?)";
                    insertIntoDataBase($link, $sql, 'sssss', $userID, $title, $description, $lat, $lon);
                } else {
                    BadRequest_400();
                }
                break;
            case "register-user":
                $firstName =  $lastName = $password = $username = "";
                if (isset($data['first_name']) && isset($data['last_name']) && isset($data['password']) && isset($data['username'])) {
                    $firstName = trim($data['first_name']);
                    $lastName = trim($data['last_name']);
                    $password = trim($data['password']);
                    $hashPassword = password_hash($password, PASSWORD_BCRYPT);
                    $username = trim($data['username']);

                    $sql = "INSERT INTO users (FirstName, LastName, `Password`, Username) VALUES (?, ?, ?, ?)";
                    print_r($data);
                    echo '<br>' . $sql;
                    //insertIntoDataBase($link, $sql, "ssss", $firstName, $lastName, $hashPassword, $username);
                } else {
                    BadRequest_400();
                }
                break;
            case "insert-purchase":
                $userID = "";
                if (isset($data['user_id'])) {
                    $user_id = trim($data['user_id']);

                    $sql = "INSERT INTO acquisti (UserID) VALUES (?)";
                    insertIntoDataBase($sql, 's', $user_id);
                } else {
                    BadRequest_400();
                }
                break;
            case "insert-vehicle":
                $userID = $marca = $modello = $targa = "";
                if (isset($data['user_id']) && isset($data['marca']) && isset($data['modello']) && isset($data['targa'])) {
                    $user_id = trim($data['user_id']);
                    $marca = trim($data['marca']);
                    $modello = trim($data['modello']);
                    $targa = trim($data['targa']);

                    $sql = "INSERT INTO veicoli (UserID, Marca, Modello, Targa) VALUES (?, ?, ?, ?)";
                    insertIntoDataBase($sql, 'ssss', $user_id, $marca, $modello, $targa);
                } else {
                    BadRequest_400();
                }
                break;
            case "search-user":
                if (userExists($link, 1)) {
                    getUserInfo($link, 1);
                } else {
                    NotFound_404();
                }
                break;
        }
    } else {
        BadRequest_400();
    }
}
