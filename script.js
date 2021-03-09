console.log("ok");


let film = document.getElementById("texte");
let btnTrailer = document.getElementById("voir");
let divid = document.querySelector(".video");
let iframe = document.querySelector("#trailer");
let imbdID;
let videoKey;


function action() { //fonction d'initialisation 
    console.log("ok");

    fetch("http://www.omdbapi.com/?apikey=ab24df6a&t=" + film.value) //fetch de OMDBAPI
        .then(res => res.json())
        .then(res => affichage(res))
        .catch(error => console.log("Erreur1 : " + error));
}
function affichage(res) { // kekispasse avec les données de l'API

    if (res.Response == "True") { //quand ca se passe cool 
        console.log("test");
        console.log(res);
        document.getElementById("image").src = res.Poster;
        document.getElementById("text-titre").innerHTML = " <strong>Titre : </strong>" + res.Title;
        document.getElementById("text-genre").innerHTML = "<strong>Genre : </strong>" + res.Genre;
        document.getElementById("text-date").innerHTML = "<strong>Année de parution : </strong>" + res.Year;
        document.getElementById("text-plot").innerHTML = "<strong>Synopsis : </strong><br>" + res.Plot;
        document.getElementById("text-note").innerHTML = "<strong>Metacritique : </strong>" + res.Metascore;
        document.getElementById("text-product").innerHTML = "<strong>Producteur : </strong>" + res.Production;
        document.getElementById("text-oscar").innerHTML = "<strong>Récompense : </strong>" + res.Awards;
        btnTrailer.innerHTML = "Voir trailer";
        document.querySelector(".h2").classList.add("ferme");
        document.querySelector("#description").classList.add("ouvre");
        imbdID = arguments[0].imdbID // je récup mes donnée en dehors de la fonction 


        fetch("http://api.themoviedb.org/3/movie/" + imbdID + "/videos?api_key=771bf8be7f694a149b57c47b66ec1fe5") // fetch de THE MOVIE DB (pour le trailer)
            .then(video => video.json())
            .then(video => affichageVideo(video))
            .catch(error => console.log("Erreur2 : " + error));

        function affichageVideo(video) { // kekispasse avec les données de l'API

            console.log(video);

            if (video.results[0].site == "YouTube") {
                console.log(video.results[0].key);
                videoKey = video.results[0].key //je recup la key de la vidéo youtube
            }
            else {
                iframe.src = "Asset/film.png" // quand le film est trop vieux eh 
            }
        }
    }
    else {
        alert("Ereur, rentrez un titre de film valide") // quand ca se passe pas cool 
    }

}

function afficherVideo() { // on affiche la pop up trailer 
    divid.style.display = "flex"
    iframe.src = "https://www.youtube.com/embed/" + videoKey + "?enablejsapi=1";
}

function masquerVideo() { // on cache la pop up trailer 
    divid.style.display = "none"
    iframe.src = "lol";

}


