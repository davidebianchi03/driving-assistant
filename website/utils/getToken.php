<?php
//require_once '../DBconfig.php';
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $username = "";
    if ((isset($_GET['username']) && !empty($_GET['username']))) {
        
        //echo $datetime;
        $username = $_GET['username'];
        $password = $_GET['password']
        $token = md5($username.$datetime);
        echo $token;
        $sql = "SELECT count(*) as cntUser from users where username='" . $username . "'AND password='" . $password . "'";

        $result = mysqli_query($link, $sql);
        $row = mysqli_fetch_array($result);

        $count = $row["cntUser"];

        if ($count == 0) {
            $datetime = date('y-m-d_H:i:s');

            $_SESSION["username"] = $username;
            header("Location: ../main.php");
        } else {
            echo "Invalid username of password";
        }

        */
    } else {
        echo 'Bad Request';
    }
}
