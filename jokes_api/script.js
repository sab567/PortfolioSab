const button = document.getElementById('jokeButton');
const jokeText = document.getElementById('jokeText');

async function getJokes() {
    let joke = '';

    // Effacer le texte initial
    jokeText.innerText = ''; // Le texte de l'élément sera vide une fois que l'utilisateur clique

    const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Any?lang=fr&blacklistFlags=nsfw,religious,racist,sexist,explicit';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }

        // Afficher la blague dans l'élément jokeText
        jokeText.innerText = joke;

    } catch (error) {
        console.log('Erreur lors de la récupération de la blague :', error);
        jokeText.innerText = "Désolé, une erreur est survenue. Essayez à nouveau.";
    }
}

// Lien de l'événement
button.addEventListener('click', getJokes);
