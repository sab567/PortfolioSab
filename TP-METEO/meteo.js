document.getElementById("villeInput").addEventListener("input", function () { // Ajoute un écouteur d'événement sur l'input pour détecter les modifications
    let input = this.value; // Récupère la valeur entrée par l'utilisateur
    if (input.length >= 3) { // Vérifie si au moins 3 caractères ont été saisis
        fetch(`https://api-adresse.data.gouv.fr/search/?q=${input}&type=municipality`) // Effectue une requête API pour obtenir les villes correspondantes
            .then(response => response.json()) // Convertit la réponse en JSON
            .then(data => { // Traite les données récupérées
                let liste = document.getElementById("villeListe"); // Récupère l'élément liste déroulante
                liste.innerHTML = ""; // Vide les options précédentes
                if (data.features.length === 0) {
                    document.getElementById("resultat").innerHTML = "<p style='color:red;'>Erreur : la ville que tu as tapée soit n'existe pas, soit ne vient pas de France.</p>";
                    return;
                }
                
                data.features.forEach(ville => {
                    let option = document.createElement("option");
                    option.value = ville.properties.city;
                    option.setAttribute("data-lat", ville.geometry.coordinates[1]);
                    option.setAttribute("data-lon", ville.geometry.coordinates[0]);
                    option.textContent = ville.properties.city;
                    liste.appendChild(option);
                });
            })
            .catch(error => console.error("Erreur API Adresse :", error)); // Affiche une erreur en cas de problème avec l'API
    }
});

function obtenirMeteo() { // Fonction pour récupérer la météo
    let selection = document.getElementById("villeListe").selectedOptions[0]; // Récupère la ville sélectionnée
    if (!selection) { // Vérifie si une ville a été choisie
        alert("Me ferais-tu l'honneur de rentrer une ville ?"); // Affiche une alerte si aucune ville n'est sélectionnée
        return; // Stoppe l'exécution de la fonction
    }
    let lat = selection.getAttribute("data-lat"); // Récupère la latitude
    let lon = selection.getAttribute("data-lon"); // Récupère la longitude

    // Appel API pour récupérer les données météo
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,windspeed_10m,cloudcover,relative_humidity_2m,surface_pressure,precipitation_probability`) // Ajout des nouvelles données demandées
        .then(response => response.json()) // Convertit la réponse en JSON
        .then(data => { // Traite les données météo reçues
            let meteo = data.current; // Stocke les informations météo actuelles
            document.getElementById("resultat").innerHTML = ` 
                <h2>Météo à ${selection.value}</h2> 
                <p>Température : ${meteo.temperature_2m}°C</p> 
                <p>Vent : ${meteo.windspeed_10m} km/h</p> 
                <p>Couverture nuageuse : ${meteo.cloudcover}%</p> 
                <p>Humidité : ${meteo.relative_humidity_2m}%</p> 
                <p>Pression atmosphérique : ${meteo.surface_pressure} hPa</p> 
                <p>Probabilité de précipitation : ${meteo.precipitation_probability}%</p>
            `;
        })
        .catch(error => {
            console.error("Erreur API Météo :", error); // Affiche l'erreur dans la console
            document.getElementById("resultat").innerHTML = "Mince alors ! Il y a eu une erreur !"; // Affiche un message d'erreur à l'utilisateur
        });
}