"use strict";

const submit = document.getElementById('submit');
const name = document.getElementById('name');
const type = document.querySelector('.type');
const image = document.getElementById('screen');
const version = document.querySelector('.version');
const localisation = document.querySelector('.localisation');
const number = document.querySelector('.number');
const background = document.querySelector('.background');
// const containerWhiteSquarre = document.querySelector('.containerWhiteSquarre');
let variable_language = 'fr';
submit.addEventListener('click', async function(){

    type.innerHTML = "";
    version.innerHTML = "";
    image.innerHTML = "";
    number.innerHTML= "";
    localisation.innerHTML= "";


    const fr = await fetch("https://pokeapi.co/api/v2/language/5/");
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/"+name.value);
    const movies = await response.json();

    let type1 = document.createElement('p');

//affichage de l'image du pokemon

    // let cache = document.createElement('div');
    // containerWhiteSquarre.appendChild(cache);
    

    let image1 = document.createElement('IMG');
    image1.src = movies['sprites']['front_default'];    
    image.appendChild(image1); 

    image.style.background="white";

// Fin de l'affichage du pokemon

// Afficher le type du pokemon
    let pluriel = "";
    if(movies['types'].length >= 2){
        pluriel = "s";
    }
    type.innerHTML =  'Type'+pluriel+' : ';
    type1.innerHTML = movies['types'][0]['type']['name'] + '/';

    console.log(movies['types'].length);
    type.appendChild(type1);

    if(movies['types'].length == 2){
        let type2 = document.createElement('p');
        type2.innerHTML = movies['types'][1]['type']['name'] + '/';
        type.appendChild(type2);
    }else if(movies['types'].length == 3){
        let type3 = document.createElement('p');
        type3.innerHTML = movies['types'][1]['type']['name'];
        type.appendChild(type3); 
    }
// Fin de l'affichage du type du pokemon

// la version du pokemon ou l'on peut trouver le pokemon

    let version1 = document.createElement('p');
    version1.innerHTML = 'Version : ' + movies['game_indices'][0]['version']['name'];
    version.appendChild(version1);

// Fin pour la version du pokemon

    let localisation1 = document.createElement('p');
    let location = movies['location_area_encounters'];//location contient une url, j'ai pas réussie à récupérer les élément de l'autre page( dans un tableau)
    
    const responseLocation = await fetch(location);
    const moviesLocation = await responseLocation.json();

    if(moviesLocation.length != 0){
        localisation1.innerHTML = moviesLocation[0]['location_area']['name'];
        localisation.appendChild(localisation1);
    }else{
        localisation1.innerHTML = "Ce pokemon n'est pas trouvable dans la nature";
        localisation.appendChild(localisation1);
    }

// Localisation du pokemon

// numéro dans le pokedex

    let number1 = document.createElement('p');
    number1.innerHTML = movies['id'];
    number.appendChild(number1);

// Pokemon localisé
    console.log(movies);
});