holeUserInserat();

//select
function neuesGrab(){


    let titel = document.querySelector("#titel").value;
    let friedhof = document.querySelector("#friedhof").value;
    let beschreibung = document.querySelector("#beschreibung").value;
    let angebot = document.querySelector("#angebot").value;




    let formData = new FormData();
    formData.append('titel', titel);
    formData.append('beschreibung', beschreibung);
    formData.append('angebot', angebot);

    formData.append('friedhof', friedhof);

    
    //   console.log("neues Grab");
    //   console.log(friedhof);


    let userID = localStorage.getItem('userID');
    let token = localStorage.getItem('token');

    formData.append('userID', userID);


    fetch("https://372401-5.web.fhgr.ch/php/neuesGrab.php",
        {
            body: formData,
            method: "post",
            headers: {

                'Authorization': 'Basic ' + btoa(userID + ':' + token),

            }
        })

        .then((response) => {

            return response.text();

        })
        .then((data) => {
            // was schickt der Server konkret
            // console.log(data);
            document.querySelector('#nachricht').innerHTML = data;
            
            setTimeout(function(){
             window.location.href = "https://372401-5.web.fhgr.ch";
            }, 5000);

        })

}

//select
//select
//select
function holeUserInserat() {

    // get authentication variables from localstorage
    let userID = localStorage.getItem('userID');
    let token = localStorage.getItem('token');

    let formData = new FormData();
    formData.append('userID', userID);

    fetch("https://372401-5.web.fhgr.ch/php/holeUserInserat.php",
        {
            body: formData,
            method: "post",
            headers: {

                'Authorization': 'Basic ' + btoa(userID + ':' + token),

            }
        })

        .then((res) => {

            // error handling if session is expired
            if (res.status >= 200 && res.status < 300) {

                return res.json();

            } else {

                alert('Deine Sitzung ist abgelaufen. Du wirst auf die Login-Seite weitergeleitet.');
                window.location = "/login.html"

            }

        })
        .then((data) => {


            console.log(data);
            // falls es noch keine Grab zu diesem User gibt
            // falls es noch keine Grab zu diesem User gibt
            // falls es noch keine Grab zu diesem User gibt
            if (data.length == 0) {

                // zeige Infotext an
                document.querySelector('#infoText').innerHTML = "Fülle dieses Formular aus, um dein Grab aufzuschalten:"

                // zeige den korrekten Button an
                document.querySelector('#button-neue').classList.remove("hidden");

                // falls es bereits ein Grab zu diesem User gibt
                // falls es bereits ein Grab zu diesem User gibt
                // falls es bereits ein Grab zu diesem User gibt
            } else {

                // speichere die Grab ID in der globalen variable
                // diese brauchen wir später zum aktualisieren und löschen des Grabes
                GrabID = data[0].ID;

                // zeige Infotext an
                document.querySelector('#infoText').innerHTML = "Hier kannst du dein Grab bearbeiten:"

                // zeige den korrekten Button an
                document.querySelector('#button-aktualisieren').classList.remove("hidden");
                document.querySelector('#button-loeschen').classList.remove("hidden");

                // fülle das Formular mit den Werten aus der DB aus
                document.querySelector('#titel').value = data[0].titel;
                document.querySelector('#beschreibung').value = data[0].beschreibung;
                document.querySelector('#angebot').value = data[0].angebot;
                document.querySelector('#friedhof').value = data[0].ort_ID;

                
            }
        })
}

//Update
//Update
//Update
function aktualisiereGrab() {

    // get authentication variables from localstorage
    let userID = localStorage.getItem('userID');
    let token = localStorage.getItem('token');

    // Formulardaten in Body übertragen


    let titel = document.querySelector("#titel").value;
    let friedhof = document.querySelector("#friedhof").value;
    let beschreibung = document.querySelector("#beschreibung").value;
    let angebot = document.querySelector("#angebot").value;


    let formData = new FormData();
    formData.append('userID', userID);
    formData.append('titel', titel);
    formData.append('friedhof', friedhof);
    formData.append('beschreibung', beschreibung);
    formData.append('angebot', angebot);

    formData.append('GrabID', GrabID);

    fetch("https://372401-5.web.fhgr.ch/php/aktualisiereGrab.php",
        {
            body: formData,
            method: "post",
            headers: {

                'Authorization': 'Basic ' + btoa(userID + ':' + token),

            }
        })

        .then((res) => {

            // error handling if session is expired
            if (res.status >= 200 && res.status < 300) {

                return res.text();

            } else {

                alert('Deine Sitzung ist abgelaufen. Du wirst auf die Login-Seite weitergeleitet.');
                window.location = "/login.html"

            }

        })
        .then((data) => {

            // zeige die Nachricht an
            document.querySelector('#nachricht').innerHTML = data;

        })
}

//delete
function loescheGrab() {

    // get authentication variables from localstorage
    let userID = localStorage.getItem('userID');
    let token = localStorage.getItem('token');

    let formData = new FormData();
    formData.append('userID', userID);
    formData.append('GrabID', GrabID);

    fetch("https://372401-5.web.fhgr.ch/php/loescheGrab.php",
        {
            body: formData,
            method: "post",
            headers: {

                'Authorization': 'Basic ' + btoa(userID + ':' + token),

            }
        })

        .then((res) => {

            // error handling if session is expired
            if (res.status >= 200 && res.status < 300) {

                return res.text();

            } else {

                alert('Deine Sitzung ist abgelaufen. Du wirst auf die Login-Seite weitergeleitet.');
                window.location = "/login.html"

            }

        })
        .then((data) => {
            if (window.prompt("Möchtest du wirklich dein Grab löschen? Schreibe VERWELKTEBLUME, um es zu bestätigen?") === "VERWELKTEBLUME") {
            console.log(data);
            document.querySelector('#nachricht').innerHTML = data;

            // button aktualisieren
            document.querySelector('#button-neue').classList.remove("hidden");
            document.querySelector('#button-aktualisieren').classList.add("hidden");
            document.querySelector('#button-loeschen').classList.add("hidden");

            // Formularfelder leeren

            document.querySelector('#titel').value = "";
            document.querySelector('#beschreibung').value = "";
            document.querySelector('#angebot').value = "";
            document.querySelector('#friedhof').value = "";



            // Variablen leeren
            GrabID = "";

        }

        })
};



//logout
//logout
//logout

function logout(){
    localStorage.clear();
    window.location = "/login.html";
}