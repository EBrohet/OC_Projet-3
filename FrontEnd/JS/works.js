document.querySelector(".gallery").innerHTML = '';

const reponse = await fetch("http://localhost:5678/api/works");
const works = await reponse.json();


// Affichage des projets dans le HTML
function afficherProjets(works) {
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
const boutonTous = document.querySelector(".btn-tous");
boutonTous.addEventListener("click", function() {
    const projetsFiltres = works.filter(function(work) {
        return work;  
    });
    document.querySelector(".gallery").innerHTML = '';
    afficherProjets(projetsFiltres);
});

const boutonObjets = document.querySelector(".btn-objets");
boutonObjets.addEventListener("click", function() {
    const projetsFiltres = works.filter(function(work) {
        if (work.category.id === 1) {
            return work;
        };  
    });
    document.querySelector(".gallery").innerHTML = '';
    afficherProjets(projetsFiltres);
});

const boutonApparts = document.querySelector(".btn-apparts");
boutonApparts.addEventListener("click", function() {
    const projetsFiltres = works.filter(function(work) {
        if (work.category.id === 2) {
            return work;
        };  
    });
    document.querySelector(".gallery").innerHTML = '';
    afficherProjets(projetsFiltres);
});

const boutonHotels = document.querySelector(".btn-hotels");
boutonHotels.addEventListener("click", function() {
    const projetsFiltres = works.filter(function(work) {
        if (work.category.id === 3) {
            return work;
        };  
    });
    document.querySelector(".gallery").innerHTML = '';
    afficherProjets(projetsFiltres);
});



// Ajout des éléments du mode édition

function admin() {
    const bandeauEdition = document.querySelector(".edition");
    bandeauEdition.innerHTML = '<p><i class="fa-regular fa-pen-to-square"></i>Mode édition</p>';
    const boutonModifier = document.querySelector(".btn-modifier");
    boutonModifier.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>modifier';
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
                            <i class="fa-regular fa-image fa-4x"></i>
                            <label for="photo">+ Ajouter photo</label>
                            <input type="file" id="photo" name="photo" accept=".png, .jpg" required>
                            <p>jpg, png : 4mo max</p>
                        </div>
                        <label for="titre">Titre</label>
                        <input type="text" id="titre" name="titre" required>
                        <label for="categorie">Catégorie</label>
                        <div class="select-wrapper">
                            <select id="categorie" required>
                                <option class="none" selected></option>
                            </select>
                        </div>
                     </form>
                     <hr>
                     <button class="btn-valider">valider</button>`;

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


for (let i=0; i < works.length; i++) {
    const imageElement = document.createElement("img");
    imageElement.src = works[i].imageUrl;
    const figure = document.createElement("figure");

    const miniatures = document.querySelector(".mini-photos");
    miniatures.appendChild(figure);
    figure.appendChild(imageElement);

    const poubelle = document.createElement("div");
    poubelle.classList.add("btn-effacer");
    const icone = document.createElement("i");
    icone.classList.add("fa-solid", "fa-trash-can", "fa-border");
    figure.appendChild(poubelle);
    poubelle.appendChild(icone);
}

for (let i=0; i < works.length; i++) {
    const id = works[i].id;
    console.log(id);

    function supprimerElement(id) {
        return fetch('http://localhost:5678/api/works/' + id, {
          method: 'DELETE',
        })
        .then(res => res.json())
        .then(res => console.log(res))
    }
    // supprimerElement(id);
}


// modale 2

const reponseCat = await fetch("http://localhost:5678/api/categories");
const categories = await reponseCat.json();

function afficherCategorie(categories) {
    for (let i=0; i < categories.length; i++) {
        const nomElement = document.createElement("option");
        nomElement.innerText = categories[i].name;
        nomElement.value = categories[i].id;

        const select = document.querySelector("#categorie");
        select.appendChild(nomElement);;
    }
}

afficherCategorie(categories);


function preview() {
    const inputFile = document.querySelector("#photo");
    inputFile.addEventListener("change", () => {
        const divPhoto = document.querySelector(".photo");
        divPhoto.innerHTML = "";
        const imagePreview = document.createElement("img");
        divPhoto.appendChild(imagePreview);

        const url = "./assets/images/mitch-QhjgAniliuY-unsplash.jpg";
        imagePreview.setAttribute("src", url);
        divPhoto.setAttribute("style", "width: 100%; height: 169px; padding: 0;");
        imagePreview.setAttribute("style", "height: 100%; width: auto;")
    })
}
preview();


function validerAjoutPhoto() {
    const form = document.querySelector("dialog form");
    const btnValider = document.querySelector(".btn-valider");
    const inputText = document.querySelector("#titre");
    const select = document.querySelector("#categorie");

    if (inputText.value === "") {
        btnValider.style.backgroundColor = "#A7A7A7";
    }

    inputText.addEventListener("change", () => {
        btnValider.style.backgroundColor = "#1D6154";
    })

    const image = document.querySelector(".photo img");
    const option = select.options[select.selectedIndex];
    console.log(option);
    form.addEventListener("submit", async function(event) {
        event.preventDefault;
        const elForm = {
            image: image.src,
            title: inputText.value,
            category: option.value
        };
        const res = await fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(elForm)
        })
        if (res.ok === true) {
            console.log("Le projet a été ajouté")
        }
    })
}

// validerAjoutPhoto();


// test
const select = document.querySelector("#categorie");
select.addEventListener("change", () => {
    const option = select.options[select.selectedIndex];
    console.log(option);
    console.log(option.value);
})


