<?php

require_once('config.php');
require_once('autorisieren.php');

$userID = $_POST["userID"];
$titel = $_POST["titel"];
$friedhof = $_POST["friedhof"];
$beschreibung = $_POST["beschreibung"];
$angebot = $_POST["angebot"];

$GrabID = $_POST["GrabID"];

$sql = "UPDATE Inserat SET titel=?, beschreibung=?, angebot=?, ort_ID=? WHERE user_ID = $userID";
$stmt = $pdo->prepare($sql);

$erfolg = $stmt->execute([$titel, $beschreibung, $angebot, $friedhof]);

// falls erfolg true bzw. 1 ist
if ($erfolg) {

    print_r("Dein Inserat wurde aktualisiert.");

} else {

    print_r($erfolg);

};