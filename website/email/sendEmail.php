<?php
//Metodo per inviare le email attraverso le API di Gmail
function SendEmail($sender, $sender_nickname, $to, $to_nickname, $subject, $messageText, $oath2_token)
{
    $date = date(DateTime::RFC2822);
    $message_id = round(microtime(true) * 1000) . $sender;
    $email = "From: $sender_nickname <$sender>\nTo: $to_nickname <$to>\nSubject: $subject\nDate: $date\nMessage-ID: $message_id\n\n$messageText";

    $encodedMessage = base64_encode($email);

    $request_body = "{\n \"raw\":\"" . $encodedMessage . "\",\n}";

    //faccio la richiesta al server di google
    $server_url = "https://gmail.googleapis.com/gmail/v1/users/$sender/messages/send";

    //faccio la richiesta per inviare la email
    $authorization = "Authorization: Bearer " . $oath2_token;
    $curl = curl_init($server_url);
    curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type: application/json', $authorization)); // Inject the token into the header
    curl_setopt($curl, CURLOPT_POST, true);
    curl_setopt($curl, CURLOPT_POSTFIELDS, $request_body);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($curl);
    curl_close($curl);
    echo $response.'<br>';
}

//metodo per ottenere o aggiornare il token OATH2 per utilizzare le api di gmail
function GetOath2Token($client_id, $client_secret, $grant_type, $refresh_token)
{
    $server_url = 'https://oauth2.googleapis.com/token';
    $data = array('client_id' => $client_id, 'client_secret' => $client_secret,'grant_type' => $grant_type,'refresh_token' => $refresh_token);

    $options = array(
        'http' => array(
            'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
            'method'  => 'POST',
            'content' => http_build_query($data)
        )
    );
    $context  = stream_context_create($options);
    $result = file_get_contents($server_url, false, $context);
    $jsonObj = json_decode($result);
    return $jsonObj->access_token;
}


?>


<?php
// require 'emailConfig.php';
// SendEmail(
//     SENDER_EMAIL,
//     SENDER_NICKNAME,
//     "dadebianchi2003@gmail.com",
//     "Davide Bianchi",
//     "Driving assistant - Conferma registrazione",
//     "Confermi...",
//     GetOath2Token(CLIENT_ID, CLIENT_SECRET, GRANT_TYPE, REFRESH_TOKEN)
// );
