const form = document.querySelector("#form");
form.addEventListener("submit", async function(event) {
    event.preventDefault();
    const identifiantsConnexion = {
        email: document.querySelector("#email").value,
        password: document.querySelector("#password").value
    };   
    const res = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(identifiantsConnexion)
    })
    if (res.ok === true) {
        const data = await res.json();
        localStorage.setItem("token", data.token);
        window.location.href = "index.html";
    } else {
        const button = document.querySelector(".btn-envoyer");
        const erreur = document.createElement("p");
        erreur.setAttribute ("style", "text-align: center; margin-bottom: 15px; text-decoration: none;");
        erreur.innerText = "Erreur dans l'identifiant ou le mot de passe";
        form.insertBefore(erreur, button);
        console.log("Erreur dans l'identifiant ou le mot de passe");
    }
})