<?php

require('config.php');

//echo "Autorisieren";

deleteSession();
//user und passwort wird aus dem authorisieren header abgelesen
$userID = $_SERVER["PHP_AUTH_USER"];
$token = $_SERVER["PHP_AUTH_PW"];

$sql = "SELECT * FROM Session WHERE user_ID = '$userID' AND token = '$token'
AND Timestamp > (NOW() - INTERVAL 2 HOUR)";

$stmt = $pdo->prepare($sql);

$erfolg = $stmt->execute();

if ($erfolg) {

    $resultate = $stmt->fetchAll();

    $sitzungsID = $resultate[0]['ID'];

    $anzahlResultate = count($resultate);

    if($anzahlResultate == 1){
        // mache nichts wenn alles gut ist

        updateSession($sitzungsID);

    }   else{

        exit(http_response_code(401));;

    }

    //echo $resultate;

    // $jsonArray = json_encode($array);

    // print_r($jsonArray);
}

function updateSession($sitzungsID){

    require('config.php');

    $sql = "UPDATE Session SET Timestamp = now() WHERE ID=?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$sitzungsID]);
}

function deleteSession(){

    require('config.php');

    $sql = " DELETE  FROM Session  WHERE Timestamp < (NOW() - INTERVAL 2 HOUR);";
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    
    
}