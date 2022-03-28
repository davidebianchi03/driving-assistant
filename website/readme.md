# Website
Queste sono le pagine html/script php del nostro sito
## Avvertenze
E' stato rimosso il file emailConfig.php contenuto nella cartella email contenente i dati per l'invio delle email.
Reinserire il file utilizzando il seguente template:

```
<?php
//indirizzo email di chi invia il messaggio
define('SENDER_EMAIL', 'your_email');
//nickname di chi invia il messaggio
define('SENDER_NICKNAME', 'your_nickname');

//parametri per ottenere il token oath2
define('CLIENT_ID', 'your_client_id');
define('CLIENT_SECRET', 'your_client_secret');
define('GRANT_TYPE','refresh_token');
define('REFRESH_TOKEN','your_refresh_token');
?>
```