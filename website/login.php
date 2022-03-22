<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Driving assistant</title>
    <link rel="stylesheet" href="styles/general.css">
    <link rel="stylesheet" href="styles/login.css">
    <link rel="shortcut icon" href="img/icon.png">
</head>

<body>
    <div class="container">
        <div class="blur">
            <div class="form-container">
                <form action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>" method="POST" class="login-form">
                    <p class="title">Accedi alla mappa delle segnalazioni</p>
                    <p class="input">
                        <label for="username">Username</label>
                        <input type="text" name="username">
                    </p>
                    <p class="input">
                        <label for="password">Password</label>
                        <input type="password" name="password">
                    </p>
                    <input type="submit" value="Login" class="submit-btn">
                    <?php
                    require_once 'DBconfig.php';
                    session_start();
                    if (isset($_SESSION['session_id']) && !empty($_SESSION['session_id'])) {
                        header("location:map.php");
                        exit();
                    }

                    if (
                        isset($_POST['username']) && !empty(trim($_POST['username'])) &&
                        isset($_POST['password']) && !empty(trim($_POST['password']))
                    ) {
                        $sql = "SELECT * FROM users WHERE Username = ?";
                        if ($stmt = mysqli_prepare($link, $sql)) {
                            $username = mysqli_real_escape_string($link,$_POST['username']);
                            mysqli_stmt_bind_param($stmt, 's', $username);
                            if (mysqli_stmt_execute($stmt)) {
                                $result = mysqli_stmt_get_result($stmt);
                                if (mysqli_num_rows($result) == 1) {
                                    $row = mysqli_fetch_array($result);
                                    //controllo la password
                                    if (password_verify($_POST['password'], $row['Password'])) {
                                        $_SESSION['session_id'] = $row['UserID'];
                                        header("location:map.php");
                                        exit();
                                    } else {
                                        echo '<p class = "error">Username o password errati</p>';
                                    }
                                } else {
                                    echo '<p class = "error">Username o password errati</p>';
                                }
                            } else {
                                echo "Errore durante l'esecuzione della query";
                            }
                            mysqli_stmt_close($stmt);
                        } else {
                            echo "Errore nella preparazione dello statement";
                        }
                    }
                    ?>
                    <p><a href="register.php" class="register">Registrati</a></p>
                </form>
            </div>
        </div>
    </div>
</body>

</html>