<?php

require("config.php");
require("autorisieren.php");

// Hole aus dem Script.js die Variable
$userID = $_POST["userID"];

// Test
// $userID =20;

$sql = "SELECT * FROM Inserat WHERE user_ID = $userID";

$stmt = $pdo->prepare($sql);

$erfolg = $stmt->execute();

if ($erfolg) {

    $array = $stmt->fetchAll();

    $jsonArray = json_encode($array);

    print_r($jsonArray);
}