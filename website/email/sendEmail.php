<?php
//Metodo per inviare le email attraverso le API di Gmail
function SendEmail($to, $subject, $messageText)
{
    require_once 'emailConfig.php';
    $request_body = new stdClass();
    $request_body->token=EMAIL_TOKEN;
    $request_body->reciver=$to;
    $request_body->subject=$subject;
    $request_body->body=$messageText;

    //faccio la richiesta al server di google
    $server_url = "https://drivingassistant.pythonanywhere.com/sendemail";


    $curl = curl_init($server_url);
    curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type: application/json')); // Inject the token into the header
    curl_setopt($curl, CURLOPT_POST, true);
    curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($request_body));
    $response = curl_exec($curl);
    curl_close($curl);
    echo $response.'<br>';
}
