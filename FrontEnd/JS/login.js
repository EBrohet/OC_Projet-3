function connexion() {
    const connexion = document.querySelector(".btn-envoyer");
    connexion.addEventListener("submit", function(event) {
        event.preventDefault();
        const identifiantsConnexion = {
            email:document.querySelector("#email").value,
            password: document.querySelector("#password").value
        };
    })
    async function reponse () {
        const res = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(identifiantsConnexion)
        })
        if (res.ok === true) {
            return res.json()
            .then(data => {
                const token = data.token;
                localStorage.setItem("token", token);
                window.location.href = "index.html";
            })
        } else {
            throw new Error ("Erreur dans l'identifiant ou le mot de passe");
        }
    }
}


// const token = localStorage.getItem('token');
// console.log(token);

