<?php

require_once('config.php');
require_once('autorisieren.php');

//diese zwei SQL-Befehle hätte man auch in einem INNER-JOIN kombinieren können... I know :)

$userID = $_POST["userID"];

$sqlSession = "DELETE FROM Session WHERE user_ID = ?;";

$stmtSession = $pdo->prepare($sqlSession);

$erfolgSession = $stmtSession->execute([$userID]);


if ($erfolgSession) {

    echo "Deine Sitzung";

} else {

    print_r($erfolgSession);
};




$sqlUser = "DELETE FROM User WHERE ID = ?;";

$stmtUser = $pdo->prepare($sqlUser);

$erfolgUser = $stmtUser->execute([$userID]);

// falls erfolg true bzw. 1 ist
// lösche ebenfalls die Hashtags zur WG
if ($erfolgUser) {

    echo " sowie dein Profil wurden erfolgreich gelöscht!";

} else {

    print_r($erfolgUser);

    echo " wurde gelöscht. Du musst zuerst dein Grabinserat löschen, damit du dein Profil löschen kannst. Bitte logge dich nochmals ein.";
};
