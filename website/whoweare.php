<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Driving assistant</title>
    <link rel="stylesheet" href="styles/general.css">
    <link rel="stylesheet" href="styles/whoweare.css">
    <link rel="shortcut icon" href="img/icon.png">
    <script src="js/env-settings.js"></script>
    <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.js" integrity="sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk=" crossorigin="anonymous"></script>
    <script src="js/animations.js"></script>
    <script src="js/whoweareanimation.js"></script>
</head>

<body>
    <div class="navbar">
        <span class="company-name">
            <img src="img/icon.png" alt="company logo">
            <span>Driving assistant</span>
        </span>

        <ion-icon name="menu-outline" class="hamburger"></ion-icon>

        <div class="dropdown-content">
            <ul class="page-list-dropdown">
                <li><a href="index.php" class="list-item">Home</a></li>
                <li><a href="whoweare.php" class="current-page">Chi siamo</a></li>
                <li><a href="servizi.php" class="list-item">Servizi</a></li>
                <li><a href="team.php" class="list-item">Team</a></li>
                <li><a href="login.php" class="link-button">Visualizza la mappa</a></li>
            </ul>
        </div>

        <ul class="page-list">
            <li><a href="index.php" class="list-item">Home</a></li>
            <li><a href="whoweare.php" class="current-page">Chi siamo</a></li>
            <li><a href="servizi.php" class="list-item">Servizi</a></li>
            <li><a href="team.php" class="list-item">Team</a></li>
            <li><a href="login.php" class="link-button">Visualizza la mappa</a></li>
        </ul>
    </div>

    <div class="container">
        <p class="title">Chi siamo</p>
        <div class="mission">
            <div class="text">

                <p class="subtitle-mission">La nostra mission</p>
                <p class="mission-description">Vogliamo migliorare la sicurezza sulle strade di tutto il mondo</p>
            </div>
            <img src="img/drive-safe.jpg" alt="drive safe">
        </div>

        <div class="whatwedo">
            <div class="text padbottext">
                <p class="subtitle-whatwedo">Cosa facciamo</p>
                <p class="whatwedo-description">
                    Realizziamo degli assistenti alla guida che aiutano i nostri clienti a restare più concentrati sulla
                    strada e
                    a migliorare la percezione dei pericoli durante la guida su strada. Inoltre, tramite i nostri
                    prodotti, vogliamo
                    cercare di ridurre i rischi dovuti alle condizioni delle infrastrutture stradali, per esempio rendendo
                    possibile inviare
                    segnalazioni circa lo stato delle strade le quali poi potranno essere visualizzate dagli altri
                    utenti e
                    dai gestori
                    delle infrastrutture.
                </p>
            </div>
            <img src="img/screenshot.JPG" alt="screenshot" id="imgwhatwedo" class="padbotimg">

        </div>
    </div>

    <div class="bottom">
        <p class="contacts">Contatti</p>
        <ul>
            <li>Email: <a href="mailto:drivingassistant2022@gmail.com">drivingassistant2022@gmail.com</a></li>
        </ul>
        <br>
        <form action="utils/sendcontactemail.php" method="POST" class="contact-form">
            <input type="hidden" value="<?php echo htmlspecialchars($_SERVER['PHP_SELF']) ?>" name="location">
            <p class="input">
                <label for="sender_email">La tua email</label>
                <input type="email" name="sender_email" required>
            </p>

            <p class="input">
                <label for="message">Il tuo messaggio</label>
                <textarea name="message" required minlength="1"></textarea>
            </p>

            <input type="submit" value="Invia" class="submit-btn">
        </form>

        <p class="copy">&copy; Driving Assistant 2022</p>

    </div>
</body>

</html>