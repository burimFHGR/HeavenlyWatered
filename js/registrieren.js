console.log('registrierung gut');

//New function mit Validierung
let form1 = document.querySelector('#form1');

form1.addEventListener('submit', async (e) => {
    
    //empty "nachricht" from contents of previous invalid submits
    document.querySelector('#email').innerHTML ="";

    e.preventDefault();

    //execute front-end validation
    if (frontEndNameValidation()){
        registerWithBackandValidation();
    }
    else{
        console.log("nicht richtig")
        let fehlerText="Es muss eine gültige E-Mail angegeben werden.";
        
        nachrichtLabel=document.querySelector('#email');
        nachricht.innerHTML += fehlerText
    }

});

function frontEndNameValidation(){
    let email = document.querySelector('#email').value;
    
    //https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_regexp_test2
    //https://stackoverflow.com/questions/26821463/regex-exact-match-first-and-last-name-with-one-space-between
    
    let pattern = /@/; 
    
    let result = pattern.test(email);

    return result;
}

function registerWithBackandValidation(){
    let username = document.querySelector('#benutzername').value;
    let password = document.querySelector('#password').value;
    let email = document.querySelector('#email').value;
    let bild = document.querySelector("#bild").value;
    let about_me = document.querySelector("#about_me").value;

    let formData = new FormData();
    formData.append('benutzername', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('bild', bild);
    formData.append('about_me', about_me);

    fetch("https://372401-5.web.fhgr.ch/php/registrieren.php",
    {
        body: formData,
        method: "post",
    })
    .then((res) => {
        return res.text();
    })
    .then((data) => {
        document.querySelector('#nachricht').innerHTML += "<br>"+data;

        //3 Sekunden warten 
        setTimeout(function(){
        window.location.href = "https://372401-5.web.fhgr.ch/login.html";
        }, 3000);
        
    })
}
