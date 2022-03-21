<?php
require_once '../DBconfig.php';
# File php utilizzato per controllare se uno username esiste già
if (isset($_GET['username']) && !empty(trim($_GET['username']))) {
    $sql = 'SELECT * FROM users WHERE Username = ?';
    if ($stmt = mysqli_prepare($link, $sql)) {
        mysqli_stmt_bind_param($stmt, 's', $_GET['username']);
        if (mysqli_stmt_execute($stmt)) {
            $result = mysqli_stmt_get_result($stmt);
            if (mysqli_num_rows($result) == 0) {
                echo '{"responseCode":200, "description": "username not exists", "exists":false}';
            } else {
                echo '{"responseCode":200, "description": "username already exists", "exists":true}';
            }
            exit();
        } else {
            echo '{"responseCode":500, "description":"internal server error"}';
            exit();
        }
    } else {
        echo '{"responseCode":500, "description":"internal server error"}';
        exit();
    }
} else {
    echo '{"responseCode":400, "description":"bad request"}';
    exit();
}
?>
