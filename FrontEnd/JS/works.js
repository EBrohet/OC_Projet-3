const reponse = await fetch("http://localhost:5678/api/works");
const works = await reponse.json();


// Affichage des projets dans le HTML
function afficherProjets(works) {
    document.querySelector(".gallery").innerHTML = '';
    for (let i=0; i < works.length; i++) {
        const imageElement = document.createElement("img");
        imageElement.src = works[i].imageUrl;
        const nomElement = document.createElement("figcaption");
        nomElement.innerText = works[i].title;

        const gallery = document.querySelector(".gallery");
        const projet = document.createElement("figure");
        gallery.appendChild(projet);
        projet.appendChild(imageElement);
        projet.appendChild(nomElement);
    }
}
afficherProjets(works);


// Mise en place des filtres
const reponseCat = await fetch("http://localhost:5678/api/categories");
const categories = await reponseCat.json();

for (let i=0; i < categories.length; i++) {
    const nomElement = document.createElement("li");
    nomElement.innerText = categories[i].name;
    nomElement.id = categories[i].id;
    nomElement.classList.add("btn-filtres");
    const ul = document.querySelector(".filter");
    ul.appendChild(nomElement);
}


const boutonTous = document.querySelector(".btn-tous");
boutonTous.addEventListener("click", function() {
    const projetsFiltres = works.filter(function(work) {
        return work;  
    });
    document.querySelector(".gallery").innerHTML = '';
    afficherProjets(projetsFiltres);
});

function filtrer() {
    const boutonsFiltres = document.querySelectorAll(".btn-filtres");
    boutonsFiltres.forEach((bouton) => {
        bouton.addEventListener("click", () => {
            const boutonsId = bouton.getAttribute("id");
            const projetsFiltres = works.filter(function(work) {
                if (work.category.id == boutonsId) {
                    return work;
                }
            })
            document.querySelector(".gallery").innerHTML = '';
            afficherProjets(projetsFiltres);
        })    
    })
}
filtrer();


// Ajout des éléments du mode édition

function admin() {
    const bandeauEdition = document.querySelector(".edition");
    bandeauEdition.innerHTML = '<p><i class="fa-regular fa-pen-to-square"></i>Mode édition</p>';
    const boutonModifier = document.querySelector(".btn-modifier");
    boutonModifier.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>modifier';
    
    const filtres = document.querySelector(".filter");
    filtres.setAttribute("style", "display: none;");
    const h2 = document.querySelector("#portfolio h2");
    h2.setAttribute("style", "margin-bottom: 92px;");
    
    const logout = document.querySelector(".logout");
    logout.innerHTML = "logout";

    logout.addEventListener("click", function() {
        localStorage.removeItem("token");
        window.location.href = "index.html";
    })
};

if("token" in localStorage) {
    admin();
};



// ouverture de la modale

const open = document.querySelector(".btn-modifier");
const dialog = document.querySelector("dialog");
const close = document.querySelector(".btn-fermer");
const modale = document.querySelector(".modale");
const modale2 = document.querySelector(".modale2");

modale.innerHTML = `<h3>Galerie photo</h3>
                    <div class="mini-photos">
                        
                    </div>
                    <hr>
                    <button class="ajout-photo">Ajouter une photo</button>`;

modale2.innerHTML = `<p class="btn-fleche"><i class="fa-solid fa-arrow-left"></i></p>
                     <h3>Ajout photo</h3>
                     <form>
                        <div class="photo">
                        <div>
                            <i class="fa-regular fa-image fa-5x"></i>
                            <label for="photo">+ Ajouter photo</label>
                            <input type="file" id="photo" name="photo" accept=".png, .jpg" required>
                            <p>jpg, png : 4mo max</p>
                            </div>
                        </div>
                        <label for="titre">Titre</label>
                        <input type="text" id="titre" name="titre" required>
                        <label for="categorie">Catégorie</label>
                        <div class="select-wrapper">
                            <select id="categorie" required>
                                <option class="none" selected></option>
                            </select>
                        </div>
                        <hr>
                        <button class="btn-valider">Valider</button>
                     </form>`;

open.addEventListener("click", () => {
    dialog.showModal();
});

close.addEventListener("click", () => {
    dialog.close();
});

document.addEventListener("click", (event) => {
    if (event.target === dialog) {
        dialog.close();
    }
})


const ajout = document.querySelector(".ajout-photo");
ajout.addEventListener("click", function() {
    modale.setAttribute("style", "display: none;")
    modale2.setAttribute("style", "display: block;")
});

const retour = document.querySelector(".btn-fleche");
retour.addEventListener("click", function () {
    modale2.setAttribute("style", "display: none;")
    modale.setAttribute("style", "display: block;");       
});


// affichage des photos dans la modale

function afficherMiniatures(works) {
    const miniatures = document.querySelector(".mini-photos");
    miniatures.innerHTML = "";
    for (let i=0; i < works.length; i++) {
        const imageElement = document.createElement("img");
        imageElement.src = works[i].imageUrl;
        const figure = document.createElement("figure");
        miniatures.appendChild(figure);
        figure.appendChild(imageElement);

        const poubelle = document.createElement("div");
        poubelle.classList.add("btn-effacer");
        const icone = document.createElement("i");
        icone.classList.add("fa-solid", "fa-trash-can", "fa-border");
        figure.appendChild(poubelle);
        poubelle.appendChild(icone);

        const id = works[i].id;
        poubelle.setAttribute("id", id);
    }
}
afficherMiniatures(works);


function supprimerProjet () {
    const poubelles = document.querySelectorAll(".btn-effacer");
    poubelles.forEach((poubelle) => {
        poubelle.addEventListener("click", async (event) => {
            event.preventDefault();
            const id = poubelle.getAttribute("id");
            
            const token = localStorage.getItem("token");
            const res = await fetch('http://localhost:5678/api/works/' + id, {
                method: "DELETE",
                headers: {
                    "Authorization": "Bearer " + token
                }
            })
            if (res.ok) {
                const reponse = await fetch("http://localhost:5678/api/works");
                const works = await reponse.json();
                afficherMiniatures(works);
                supprimerProjet();
                afficherProjets(works);           
                console.log("Projet effacé");
            }
        })
    })
}
supprimerProjet();



// fonctions de la modale 2

const inputFile = document.querySelector("#photo");
const inputText = document.querySelector("#titre");
const select = document.querySelector("#categorie");
const btnValider = document.querySelector(".btn-valider");


function afficherCategorie(categories) {
    for (let i=0; i < categories.length; i++) {
        const nomElement = document.createElement("option");
        nomElement.innerText = categories[i].name;
        nomElement.value = categories[i].id;
        select.appendChild(nomElement);
    }
}
afficherCategorie(categories);


function preview() {
    const inputFile = document.querySelector("#photo");
    inputFile.addEventListener("change", (event) => {
        const divPhoto = document.querySelector(".photo");
        const div = document.querySelector(".photo div");
        div.setAttribute("style", "visibility: hidden;");
        const imagePreview = document.createElement("img");
        divPhoto.appendChild(imagePreview);

        const url = URL.createObjectURL(event.target.files[0]);
        imagePreview.setAttribute("src", url);
        divPhoto.setAttribute("style", "width: 100%; height: 169px; padding: 0;");
    })
}
preview();


function desactiverBouton() {
    if ((inputFile.files[0] === undefined) || (inputText.value === "") || (select.selectedIndex === 0)) {
        btnValider.disabled = true;
	} else {
		btnValider.disabled = false;
		console.log("bouton activé");
    }
}
desactiverBouton();

inputFile.addEventListener("change", () => {
    desactiverBouton();
})

inputText.addEventListener("blur", () => {
	desactiverBouton();
});

select.addEventListener("change", () => {
	desactiverBouton();
});


function validerAjoutPhoto() {
    const form = document.querySelector("dialog form");
    form.addEventListener("submit", async function(event) {
        event.preventDefault();

        const token = localStorage.getItem("token");
        const formData = new FormData();
        formData.append("image", inputFile.files[0]);
        formData.append("title", inputText.value);
        formData.append("category", select.options[select.selectedIndex].value);

        const res = await fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {"Authorization": "Bearer " + token},
            body: formData
        })

        if (res.ok === true) {
            console.log("Le projet a été ajouté");
            const reponse = await fetch("http://localhost:5678/api/works");
            const works = await reponse.json();
            afficherMiniatures(works);
            supprimerProjet();
            afficherProjets(works);

            form.reset();
            const div = document.querySelector(".photo div");
            div.setAttribute("style", "visibility: visible;");
            const preview = document.querySelector(".photo img");
            preview.remove();
            desactiverBouton();
        }
    })
}
validerAjoutPhoto();