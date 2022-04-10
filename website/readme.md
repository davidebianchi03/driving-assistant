# Website
Queste sono le pagine html/script php del nostro sito
## Avvertenze
E' stato rimosso il file email_config.php contenuto nella cartella Email contenente i dati per l'invio delle email.
Reinserire il file utilizzando il seguente template:

```
<?php
//parametri per l'invio dell'email
define('EMAIL_TOKEN', 'token');
?>
```