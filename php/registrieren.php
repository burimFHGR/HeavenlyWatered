<?php

require('config.php');

$email = $_POST["email"];
$benutzername = $_POST["benutzername"];
$password = $_POST["password"];
$bild = $_POST["bild"];
$about_me = $_POST["about_me"];

//speichert Passwort in der Datenbank als Hash
$password = password_hash($password, PASSWORD_DEFAULT);

//Spaltennamen Datenbank und Platzhalter
$sql = "INSERT INTO User (name, password, email, bild, about_me) VALUES (:Name, :Password, :Email, :Bild, :About_me)";

//Vorbereitung Datenbank Verbindung & SQL kommt zusammen
$stmt = $pdo->prepare($sql);

//definierte Variablen
$erfolg = $stmt->execute(array('Name' => $benutzername, 'Password' => $password, 'Email' => $email, 'Bild' => $bild, 'About_me' => $about_me));

if ($erfolg) {
    //wenn es geklappt hat wird der Wert 1 zugeteilt
    print_r('Registrierung erfolgreich. Du wirst in kürze zum Login weitergeleitet.');
    $sql = "UPDATE User SET Bild='https://372401-5.web.fhgr.ch/img/tombstone.png' WHERE Bild = ''";
    $stmt = $pdo->prepare($sql);
    $erfolg = $stmt->execute();
    if($erfolg){

    }else{
        print_r('Dein Profil konnte nicht erstellt werden');
    }
 } else {
    //gibt Fehlermeldung aus
    print_r($erfolg);
}