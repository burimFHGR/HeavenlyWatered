<?php

require('config.php');
require('autorisieren.php');

// userid muss auch noch übermittelt werden!
$user_ID = $_POST["userID"];
// $ort_ID = 5;



$titel = $_POST["titel"];
$beschreibung = $_POST["beschreibung"];
$angebot = $_POST["angebot"];

$friedhof = $_POST["friedhof"];


// 1) Entpacke die Hashtags von String wieder PHP
// $hashtags = json_decode($_POST['hashtags']);

//Spaltennamen
$sql = "INSERT INTO Inserat (titel, beschreibung, angebot, user_ID, ort_ID) VALUES (:Titel, :Beschreibung, :Angebot, :User_ID, :Ort_ID);";
// $sql = "INSERT INTO Ort (friedhof) VALUES (:Friedhof)";

$stmt = $pdo->prepare($sql);

$erfolg = $stmt->execute(array('Titel' => $titel, 'Beschreibung' => $beschreibung,  'Angebot' => $angebot,  'User_ID' => $user_ID, 'Ort_ID' => $friedhof));




if ($erfolg) {

    print_r('Grab erfolgreich erstellt.');

    // 2) finde die letzte ID aus der DB
    $letzteID = $pdo->lastInsertId();


} else {

    print_r($erfolg);
};

