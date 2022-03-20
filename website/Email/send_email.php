<?php
use PHPMailer\PHPMailer\PHPMailer;

function SendEmail($sender, $text = '')
{
    require('email_config.php'); //file con le credenziali per l'invio della email
    require('PHPMailer.php');
    require('SMTP.php');

    $mail = new PHPMailer();
    $mail->IsSMTP();
    $mail->Mailer = "smtp";
    $mail->SMTPDebug  = 1;
    $mail->SMTPAuth   = TRUE;
    $mail->SMTPSecure = "tls";
    $mail->Port       = SMTP_PORT;
    $mail->Host       = SMTP_SERVER;
    $mail->Username   = EMAIL;
    $mail->Password   = PASSWORD;
    $mail->IsHTML(true);
    $mail->AddAddress(EMAIL, "recipient-name");
    $mail->SetFrom(EMAIL, "from-name");
    $mail->Subject = $sender;
    $content = $text;
    $mail->MsgHTML($content);
    if (!$mail->Send()) {
        var_dump($mail);
        return false;
    } else {
        return true;
    }
}
?>

<?php
if (isset($_POST["sender_email"]) && !empty(trim($_POST["sender_email"])) && isset($_POST["message"]) && !empty(trim($_POST["message"]))) {
    SendEmail(trim($_POST["sender_email"]), trim($_POST["message"]));
}

if(isset($_POST["location"])){
    header('location:'.$_POST["location"]);
    exit();
}
else{
    header('location:/');
    exit();
}
?>


