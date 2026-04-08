package MonPackage;

public class Projet1 {

    public static void main(String[] args) {
        
        // On déclare les variables
        
        boolean continuer = true; // Ici c'est une variable Booléene, qui servira simplement a controler la boucle tantque
        
        int Dep = -1, Arr = -1;  // On initialise deux variables pour stocker l'index des villes dans le tableau villes. Par ailleur, le -1 signifie simplement que la ville n'a pas encore été trouver
        
        String depart, arrivee, reponse;  // Et la, c'est les variables pour stocker ce que l'utilisateur ecrira plus tard

        // Donc la c'est la liste des villes disponibles, classé par ordre alphabétique, comme sur la feuille, comme demandé
        String[] villes = {"Brest", "Grenoble", "Lille", "Lyon", "Marseille", "Nantes", "Paris", "Rennes", "Strasbourg", "Toulouse"};

        // Ici c'est une matrice des distances entre les villes, avec pour les valeurs après les 0 correctement placé comme sur la feuille, et avant les 0 bah classé par colonne (par ailleur, c'est le même ordre que la liste ville qu'on a fais plutot)
        int[][] distances = {
            {0, 996, 723, 890, 1286, 305, 564, 245, 1026, 884},
            {996, 0, 750, 104, 286, 711, 576, 747, 505, 543},
            {723, 750, 0, 668, 979, 593, 224, 515, 524, 905},
            {890, 104, 668, 0, 316, 607, 472, 645, 434, 467},
            {1286, 286, 979, 316, 0, 890, 769, 938, 750, 400},
            {305, 711, 593, 607, 890, 0, 386, 106, 832, 559},
            {564, 576, 224, 472, 769, 386, 0, 348, 447, 681}, 
            {245, 747, 515, 645, 938, 106, 348, 0, 799, 665},
            {1026, 505, 524, 434, 750, 832, 447, 799, 0, 901},
            {884, 543, 905, 467, 400, 559, 681, 665, 901, 0}
        };

        while (continuer) { //La petite boucle tant que que j'ai parler précedemment
        
        // On reinitialise les indices pour chaque nouvelles entrées
         Dep = -1;
         Arr = -1;
        
            // Tous d'abord, on demande a l'utilisateur d'entrer la ville de départ
            depart = Saisie.lire_String("Salut copain ! c'est le moment d'entrer la ville de départ, je suis gentille je vais te donner la distance entre la ville de départ et celle d'arrivée, je suis tellement gentille ! Allez, entre la ville de départ maintenant : "); 
 

            // Puis ensuite, la ville d'arriver
            arrivee = Saisie.lire_String("Après le départ, faut bien évidemment l'arrivée, on peut pas partir sans arriver n'est-ce pas ? Allez, entre la maintenant : "); 
            
            // On parcourt le tableau des villes pour trouver les indices correspondants aux villes saisies
            for (int i = 0; i < villes.length; i++) {
                
                // ensuite on verifie si la ville actuelle du tableau correspond a la ville de depart que l'utilisateur a tappez
                if (villes[i].equalsIgnoreCase(depart)) {
                    Dep = i; // Si on trouve la ville, on stock son index
                }

                // Même chose, mais pour la ville d'arriver
                if (villes[i].equalsIgnoreCase(arrivee)) {
                    Arr = i;
                }
            }

            if (Dep == -1 || Arr == -1) { // Si l'une des villes n'a pas été trouver
                System.out.println("Alors mon ami, je sais que tu as probablement voulu entrer une ville comme Berlin par exemple ou une ville qui n'est pas dans la liste, mais je suis désolé, ça ne marche pas comme ça."); // Alors on envois sa 
            } else { // Sinon
                System.out.println("Eh bien, la distance entre notre chère ville de " + depart + " et notre chère arrivée de " + arrivee + " est de : " + distances[Dep][Arr] + " kms"); // On affiche la distance entre les deux villes
            }

            // Puis on demande a l'utilisateur si il veut rejouer
            reponse = Saisie.lire_String("Alors mon ami, c'était amusant non ? Veux-tu donc recommencer ?");
             
            continuer = reponse.equalsIgnoreCase("oui");// On continue que si l'utilisateur répond oui
        }

        System.out.println("Hein tu veux arreter ? déja ? bon daccord si ta te chante hein"); // Si on répond non, on a un message de fin
    }
}