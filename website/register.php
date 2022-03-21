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
    <script src="https://code.jquery.com/jquery-3.6.0.js" integrity="sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk=" crossorigin="anonymous"></script>
    <script src="js/register-checkpassword.js"></script>
</head>

<body>
    <div class="container">
        <div class="blur">
            <div class="form-container">
                <form id = "register-form" action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>" method="POST" class="register-form">
                    <p class="title">Registrati</p>
                    <p class="input">
                        <label for="username">Username</label>
                        <input type="text" name="username" id = "username">
                    </p>
                    <p class="input">
                        <label for="email">Email</label>
                        <input type="email" name="email" id = "email">
                    </p>
                    <p class="input">
                        <label for="password">Password</label>
                        <input type="password" name="password" id="password" oninput="CheckPassword()">
                    </p>
                    <p class="input">
                        <label for="confirm-password">Conferma password</label>
                        <input type="password" name="confirm-password" id="checkpassword" oninput="CheckPassword()">
                    <p class="pass-err">Le password non corrispondono</p>
                    </p>
                    <input type="button" onclick = "Sumbit()" value="Registrati" class="submit-btn register-btn">
                </form>
            </div>
        </div>
    </div>
</body>

</html>