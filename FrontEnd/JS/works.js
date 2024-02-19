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



