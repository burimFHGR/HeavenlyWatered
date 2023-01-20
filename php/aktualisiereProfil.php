<?php

require_once('config.php');
require_once('autorisieren.php');

$userID = $_POST["userID"];
$name = $_POST["name"];
$email = $_POST["email"];
$bild = $_POST["bild"];
$about_me = $_POST["about_me"];


$sql = "UPDATE User SET name=?, email=?, bild=?, about_me=? WHERE ID = $userID";
$stmt = $pdo->prepare($sql);

$erfolg = $stmt->execute([$name, $email, $bild, $about_me]);

// falls erfolg true bzw. 1 ist
if ($erfolg) {

    print_r("Dein Profil wurde aktualisiert.");

} else {

    print_r($erfolg);

};