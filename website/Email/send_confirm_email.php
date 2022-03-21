<?php

use PHPMailer\PHPMailer\PHPMailer;

function SendConfirmEmail($recipient, $text = '')
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
    $mail->AddAddress($recipient, "recipient-name");
    $mail->SetFrom(EMAIL, "from-name");
    $mail->Subject = "Conferma registrazione Driving Assistant";
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

