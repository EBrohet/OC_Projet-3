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
};

// function seConnecter() {
//     const token = localStorage.getItem('token');
//     console.log(token);
//     if(token) {
//         admin();
//     };
// };

// admin();



// ouverture de la modale

const open = document.querySelector(".btn-modifier");
const dialog = document.querySelector("dialog");
const close = document.querySelector(".fermer");
const modale = document.querySelector(".modale");

modale.innerHTML = `<h3>Galerie photo</h3>
                    <i class="fa-solid fa-trash-can fa-border"></i>
                    <hr>
                    <button class="ajout-photo">Ajouter une photo</button>`;

open.addEventListener("click", () => {
    dialog.showModal();
});

close.addEventListener("click", () => {
    dialog.close();
});

const ajout = document.querySelector(".ajout-photo");
ajout.addEventListener("click", function() {
    modale.innerHTML = ``;
});