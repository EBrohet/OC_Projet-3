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
                     <div class="photo">
                        <i class="fa-regular fa-image fa-4x"></i>
                        <button>+ Ajouter photo</button>
                        <p>jpg, png : 4mo max</p>
                     </div>
                     <form></form>
                     <hr>
                     <button class="ajout-photo">valider</button>`;

open.addEventListener("click", () => {
    dialog.showModal();
});

close.addEventListener("click", () => {
    dialog.close();
});

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
