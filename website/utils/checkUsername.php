<?php
require_once '../DBconfig.php';
$response_obj = new stdClass();
# File php utilizzato per controllare se uno username esiste già
if (isset($_GET['username']) && !empty(trim($_GET['username']))) {
    $sql = 'SELECT * FROM users WHERE Username = ?';
    if ($stmt = mysqli_prepare($link, $sql)) {
        mysqli_stmt_bind_param($stmt, 's', $_GET['username']);
        if (mysqli_stmt_execute($stmt)) {
            $result = mysqli_stmt_get_result($stmt);
            if (mysqli_num_rows($result) == 0) {
                $response_obj->responseCode = 200;
                $response_obj->description = "username not exists";
                $response_obj->exists = false;
            } else {
                $response_obj->responseCode = 200;
                $response_obj->description = "username already exists";
                $response_obj->exists = true;
            }
        } else {
            $response_obj->responseCode = 500;
            $response_obj->description = "internal server error";
        }
    } else {
        $response_obj->responseCode = 500;
        $response_obj->description = "internal server error";
    }
} else {
    $response_obj->responseCode = 400;
    $response_obj->description = "bad request";
}
echo json_encode($response_obj);
