<?php
function SendContactEmail($sender, $text)
{
    require_once('../email/emailConfig.php'); //file di configurazione per le email
    require_once('../email/sendEmail.php'); //file con le funzioni per inviare le email
    require_once '../DBconfig.php';

    SendEmail(
        "dadebianchi2003@gmail.com",
        "Assistenza - $sender",
        $text,
    );
}
?>

<?php
if (isset($_POST["sender_email"]) && !empty(trim($_POST["sender_email"])) && isset($_POST["message"]) && !empty(trim($_POST["message"]))) {
    SendContactEmail(trim($_POST["sender_email"]), trim($_POST["message"]));
}

if (isset($_POST["location"])) {
    header('location:' . $_POST["location"]);
    exit();
} else {
    header('location:/');
    exit();
}
?>
