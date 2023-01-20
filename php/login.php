<?php

require('config.php');

$email = $_POST["email"];
$password = $_POST["password"];


$sql = "SELECT * FROM User WHERE email ='$email'";

$stmt = $pdo->prepare($sql);

$erfolg = $stmt->execute();

if ($erfolg) {

    $array = $stmt->fetchAll();
    // wieviele Resultate kommen zurück
    $anzahlResultate = count($array);


   // Passwort anzeigen
//    echo $dbPassword;

    if ($anzahlResultate == 1) {

        $dbPassword = $array[0]['password'];
        $userID=$array[0]['ID'];

        pruefePassword($password, $dbPassword, $userID);

        // echo("Dieser User existiert in der Datenbank.");
        
        //Resultate ausgeben
        // print_r($password);
        
    } else {

        //echo "Diese E-Mail existiert nicht."
        sendeAntwort('Diese E-Mail existiert nicht.', 0, 0);


    }

    // Test dass DB Zeile im Textfeld angezeigt wird
    // $jsonArray = json_encode($array);

    // print_r($jsonArray);
}


function pruefePassword($userPassword, $dbPassword, $userID){

    // Stimmt das Userpassword mit dem Hash des DB-Passwortes überein

    if (password_verify($userPassword, $dbPassword)) {

        erstelleToken($userID);


        //echo 'E-Mail und Passwort korrekt!';

    } else {

        //echo "Ungültiges Passwort"
        sendeAntwort('Ungültiges Passwort!', 0, 0);

    }

}






function erstelleToken($userID){

require('config.php');

// $userID = 17;
$token = generateRandomString(42);

//Spaltennamen
$sql = "INSERT INTO Session (user_ID, token) VALUES (:user_ID, :token);";

$stmt = $pdo->prepare($sql);

$erfolg = $stmt->execute(array('user_ID' => $userID, 'token' => $token));

if ($erfolg) {

    // print_r('Session erfolgreich erstellt.');
    sendeAntwort('Session erfolgreich erstellt.', $userID, $token);


} else {

    print_r($erfolg);

    sendeAntwort('Datenbankfehler: ' . $erfolg, 0, 0);
    
};
}

function generateRandomString($length) 
{
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}


//localStorage
function sendeAntwort ($nachricht, $userID, $token){

    $antwort =[$nachricht, $userID, $token];

    $antwort = json_encode($antwort);

    print ($antwort);
}