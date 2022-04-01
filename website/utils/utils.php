<?php

function sendJSONMessage($obj)
{
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($obj);
}

function buildJSON_AccessToken($token, $userID)
{
    $myObj = new stdClass();
    $myObj->accessToken = $token;
    $myObj->userID = $userID;
    return $myObj;
}

function buildJSON_HTTPstatus($code, $description)
{
    $myObj = new stdClass();
    $myObj->response_code = $code;
    $myObj->description = $description;
    return $myObj;
}
