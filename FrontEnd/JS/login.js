window.localStorage.setItem("email", "sophie.bluel@test.tld");
let email = window.localStorage.getItem("email");
console.log(email);

window.localStorage.setItem("password", "SOphie");
let password = window.localStorage.getItem("password");
console.log(password);


function seConnecter() {
    const connexion = document.querySelector(".btn-envoyer");
    connexion.addEventListener("click", function(event) {
        let userEmail = document.querySelector("#email").value;
        let userPassword = document.querySelector("#password").value;
        event.preventDefault();
        if (userEmail === email && userPassword === password) {
            window.location.href = "index.html";
        } else {
            alert("Erreur dans l'identifiant ou le mot de passe");
        };
        
    });
};

seConnecter();
