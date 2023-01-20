<?php

require_once('config.php');
require_once('autorisieren.php');

$userID = $_POST["userID"];
$GrabID = $_POST["GrabID"];

$sql = "DELETE FROM Inserat WHERE user_ID = ? AND ID = ?";
$stmt = $pdo->prepare($sql);

$erfolg = $stmt->execute([$userID, $GrabID]);

// falls erfolg true bzw. 1 ist
// lösche ebenfalls die Hashtags zur WG
if ($erfolg) {

    echo "Grab wurde gelöscht!";

} else {

    print_r($erfolg);
};