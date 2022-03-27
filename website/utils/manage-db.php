<?php
function insertIntoDataBase($link, $sql, $types, ...$params)
{
    require_once('../DBconfig.php');
    if (strlen($types) == count($params)) { //Controllo che il numero di parametri sia uguale al numero di valori da inserire nel db
        if ($stmt = mysqli_prepare($link, $sql)) {
            mysqli_stmt_bind_param($stmt, $types, ...$params);
            if (mysqli_stmt_execute($stmt)) {
                exit();
            } else {
                InternalServerError_500();
            }
            mysqli_stmt_close($stmt);
        }
        mysqli_close($link);
    } else {
        InternalServerError_500();
    }
}

function userExists($link, $userID)
{
    require_once('../DBconfig.php');
    $find = false;
    $sql = 'SELECT * FROM  users';
    if ($result = mysqli_query($link, $sql)) {
        if (mysqli_num_rows($result) > 0) {
            while ($row = mysqli_fetch_array($result)) {
                if ($row['UserID'] == $userID) {
                    $find = true;
                    break;
                }
            }
        }
    }
    return $find;
}

function getUserInfo($link, $userID)
{
    require_once('../DBconfig.php');
    $sql = 'SELECT * FROM  users WHERE UserID = ?';
    if ($stmt = mysqli_prepare($link, $sql)) {
        mysqli_stmt_bind_param($stmt, "i", $id);

        $id = trim($userID);

        if (mysqli_stmt_execute($stmt)) {
            $result = mysqli_stmt_get_result($stmt);
            if (mysqli_num_rows($result) == 1) {
                $row = mysqli_fetch_array($result, MYSQLI_ASSOC);

                $myObj = new stdClass();
                $myObj->nome = $row['Nome'];    
                $myObj->cognome = $row['Cognome'];
                $myObj->user_level = $row['UserLevel'];
                sendJSONResponse($myObj);
            } else {
                InternalServerError_500();
                exit();
            }
        } else {
            NotFound_404();
        }
    }
    mysqli_stmt_close($stmt);
}

