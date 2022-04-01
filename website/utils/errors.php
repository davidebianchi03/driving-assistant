<?php

function BadRequest_400()
{
    $myObj = new stdClass();
    $myObj->code = 400;
    $myObj->message = "Invalid json message received";
    sendJSONResponse($myObj);
}

function Unauthorized_401()
{
    $myObj = new stdClass();
    $myObj->code = 401;
    $myObj->message = "Authentication is required";
    sendJSONResponse($myObj);
}

function Forbidden_403()
{
    $myObj = new stdClass();
    $myObj->code = 403;
    $myObj->message = "Access forbidden. You are not allowed to view this page.";
    sendJSONResponse($myObj);
}

function NotFound_404()
{
    $myObj = new stdClass();
    $myObj->code = 404;
    $myObj->message = "Can not find the requested resource";
    sendJSONResponse($myObj);
}

function InternalServerError_500()
{
    $myObj = new stdClass();
    $myObj->code = 500;
    $myObj->message = "Unexpected error";
    sendJSONResponse($myObj);
}

function sendJSONResponse($obj)
{
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($obj);
}
