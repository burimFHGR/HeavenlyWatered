holeUser();

holeGraeber();

function holeUser(){


    let userID = localStorage.getItem('userID');
    let token = localStorage.getItem('token');

    let formData = new FormData();
    formData.append('userID', userID);

    fetch("https://372401-5.web.fhgr.ch/php/holeUser.php",
        {
            body: formData,
            method: "post",
            headers: {

                'Authorization': 'Basic ' + btoa(userID + ':' + token),

            }
        })

        .then((res) => {

            // falls die Sitzung nicht abgelaufen ist, verarbeite die JSON antwort
            if (res.status >= 200 && res.status < 300) {

                return res.json();

            } else {

                alert('Deine Sitzung ist abgelaufen. Du wirst auf die Login-Seite weitergeleitet.');
                window.location = "/login.html"

            }

        })
        .then((data) => {

            // mache etwas

            // console.log(data);

            // console.log(data[0].name);

            //erster Buchstabe soll immer Gross sein
            let firstLetter = data[0].name[0].toUpperCase();
            let restOfString = data[0].name.slice(1);
            let capitalizedString = firstLetter + restOfString;
            
            //Holt den Wert Name aus der Datenbank und speichert es im Span
            document.querySelector("#username").innerHTML = capitalizedString;


    })
}

function holeGraeber(){

    let userID = localStorage.getItem('userID');
    let token = localStorage.getItem('token');

    let formData = new FormData();
    formData.append('userID', userID);

    fetch("https://372401-5.web.fhgr.ch/php/holeGraeber.php",
        {
            body: formData,
            method: "post",
            headers: {

                'Authorization': 'Basic ' + btoa(userID + ':' + token),

            }
        })

        .then((res) => {

            // falls die Sitzung nicht abgelaufen ist, verarbeite die JSON antwort
            if (res.status >= 200 && res.status < 300) {

                return res.json();

            } else {

                // alert('Deine Sitzung ist abgelaufen. Du wirst auf die Login-Seite weitergeleitet.');
                // window.location = "/login.html"

            }

        })
        .then((data) => {

            // mache etwas

            console.log(data);

            GraeberAnzeigen(data);
            // console.log(data[0].name);

        })

}

function GraeberAnzeigen(data) {

    data.forEach(Inserat => {


        let InseratContainer = document.createElement("div");
        InseratContainer.innerHTML =

            '<div class="Inserat">' +
            '<h2>' + Inserat.titel + '</h2>' +
            '<img class="Inserat-image" src="' + Inserat.bild + '">' + 
            '<h5>' + Inserat.beschreibung + '</h5><br>' +
            '<h4>🪦 <a target="_blank" href="https://www.google.com/maps/search/?api=1&query=' + Inserat.friedhof + '">' + Inserat.friedhof + '</a> </h4>' +
            '<h4>💐 <a target="_blank" href="mailto:' + Inserat.email + '">' + Inserat.email + '</a> </h4><br>' +
            '<h6><b>' + Inserat.angebot + '</b></h6>'+
            '<h6>' + Inserat.about_me + '</h6><br><br>' ;
            // '<p> <b> <span id="Inserat-' + Inserat.ID + '">  </span> <b> </p>'
            // + '</div>';

            

        document.getElementById("liste-Inserat").appendChild(InseratContainer);

        // holeFriedhofName(Inserat.ID);

    });

}


//logout
//logout
//logout

function logout(){
    localStorage.clear();
    window.location = "/login.html";
}


let konamiCode = ["g", "r", "a", "b", "1", "2", "3"];
let konamiCodePosition = 0;


//Easteregg
document.onkeydown = function(event) {
    if (event.key === konamiCode[konamiCodePosition]) {
        konamiCodePosition++;
        if (konamiCodePosition === konamiCode.length) {

            window.open("https://www.youtube.com/watch?v=uHgt8giw1LY");
            konamiCodePosition = 0;
        }
    } else {
        konamiCodePosition = 0;
    }
};
