var UserID;

holeUserProfil();

//select
function holeUserProfil() {

    // get authentication variables from localstorage
    let userID = localStorage.getItem('userID');
    let token = localStorage.getItem('token');

    let formData = new FormData();
    formData.append('userID', userID);

    fetch("https://372401-5.web.fhgr.ch/php/holeUserProfil.php",
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

                console.log(res);
                return res.json();
             

            } else {

                alert('Deine Sitzung ist abgelaufen. Du wirst auf die Login-Seite weitergeleitet.');
                window.location = "/login.html"

            }

        })
        .then((data) => {


            console.log(data);
            // falls es noch keinen User gibt
            // falls es noch keinen User gibt
            // falls es noch keinen User gibt
            if (data.length == 0) {

                // zeige Infotext an
                alert('Du bist nicht angemeldet. Du wirst auf die Login-Seite weitergeleitet.');
                window.location = "/login.html"

                // falls es einen User gibt
                // falls es einen User gibt               
                // falls es einen User gibt
            } else {

                // speichere die Grab ID in der globalen variable
                // diese brauchen wir später zum aktualisieren und löschen des Profiles
                UserID = data[0].ID;

                // zeige Infotext an
                document.querySelector('#infoText').innerHTML = "Hier kannst du dein Profil bearbeiten:";

                // zeige den korrekten Button an
                document.querySelector('#button-aktualisieren').classList.remove("hidden");
                document.querySelector('#button-loeschen').classList.remove("hidden");

                // fülle das Formular mit den Werten aus der DB aus
                document.querySelector('#name').value = data[0].name;
                document.querySelector('#email').value = data[0].email;
                document.querySelector('#bild').value = data[0].bild;
                document.querySelector('#bildvorschau').src = data[0].bild;
                document.querySelector('#about_me').value = data[0].about_me;

            }
        })
}


//Insert
//Insert
//Insert
function aktualisiereProfil() {

    // get authentication variables from localstorage
    let userID = localStorage.getItem('userID');
    let token = localStorage.getItem('token');

    // Formulardaten in Body übertragen


    let name = document.querySelector("#name").value;
    let email = document.querySelector("#email").value;
    let bild = document.querySelector("#bild").value;
    let about_me = document.querySelector("#about_me").value;


    let formData = new FormData();
    formData.append('userID', userID);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('bild', bild);
    formData.append('about_me', about_me);

    fetch("https://372401-5.web.fhgr.ch/php/aktualisiereProfil.php",
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
//delete
//delete
function loescheProfil() {

    // get authentication variables from localstorage
    let userID = localStorage.getItem('userID');
    let token = localStorage.getItem('token');

    let formData = new FormData();
    formData.append('userID', userID);

    fetch("https://372401-5.web.fhgr.ch/php/loescheProfil.php",
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


            if (window.prompt("Möchtest du wirklich dein Profil löschen? Schreibe VERWELKTEBLUME, um es zu bestätigen?") === "VERWELKTEBLUME") {
                // Code ausführen, um das Profil zu löschen
              
                console.log(data);
                document.querySelector('#nachricht').innerHTML = data;
              
                // button aktualisieren
                document.querySelector('#button-aktualisieren').classList.add("hidden");
                document.querySelector('#button-loeschen').classList.add("hidden");
              
                // Formularfelder leeren
              
                document.querySelector('#name').value = "";
                document.querySelector('#email').value = "";
                document.querySelector('#bild').value = "";
                document.querySelector('#about_me').value = "";
              
               // Localstorage löschen
                localStorage.clear();
                setTimeout(function(){
                    window.location = "/login.html";
                    }, 7000);

              }
              

    
        })
        }



//logout
//logout
//logout

function logout(){
    localStorage.clear();
    window.location = "/login.html";
}






