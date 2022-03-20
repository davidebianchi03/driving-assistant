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
                    <p class = "title">Accedi alla mappa delle segnalazioni</p>
                    <p class="input">
                        <label for="username">Username</label>
                        <input type="text" name="username">
                    </p>
                    <p class="input">
                        <label for="password">Password</label>
                        <input type="password" name="password">
                    </p>
                    <input type="submit" value="Login" class="submit-btn">
                    <p><a href="" class = "register">Registrati</a></p>
                </form>
            </div>
        </div>
    </div>
</body>

</html>