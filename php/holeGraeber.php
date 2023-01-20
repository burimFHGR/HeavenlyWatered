<?php

require("config.php");
require("autorisieren.php");


// Test
// $userID =20;

$sql = "SELECT Inserat.ID, Inserat.titel, Inserat.beschreibung, FH.friedhof, U.name, U.email, U.bild, U.about_me, Inserat.angebot, Inserat.timestamp
FROM Inserat Inserat
INNER JOIN User U
ON Inserat.user_ID = U.ID
INNER JOIN Ort FH
ON Inserat.ort_ID = FH.ID
ORDER BY Inserat.timestamp DESC";

$stmt = $pdo->prepare($sql);

$erfolg = $stmt->execute();

if ($erfolg) {

    $array = $stmt->fetchAll();

    $jsonArray = json_encode($array);

    print_r($jsonArray);
}

