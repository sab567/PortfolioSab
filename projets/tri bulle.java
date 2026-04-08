package MonPackage;

public class Projet3 
{
    public static void main(String[] args) 
    {
        // Déclaration des variables
        int N, Sauve;          
        int[] Tab;            
        int I, Fin;     

        // Saisie de la taille du tableau
        N = Saisie.lire_int("Quelle est la taille de votre tableau ?");
        Tab = new int[N];

        // Remplissage du tableau à trier
        for (I = 0; I < N; I++) {
            Tab[I] = Saisie.lire_int("Veuillez saisir le contenu de la case de rang " + (I + 1) + " : ");
        }

        // Sauvegarde de la valeur de N pour la réutiliser après le tri
        Sauve = N;

        // Traitement du tri (algorithme de tri à bulles)
        while (N > 0) {
            I = 1;
            Fin = 0;

            while (I < N) {
                if (Tab[I - 1] > Tab[I]) {
                    int Ech = Tab[I - 1];
                    Tab[I - 1] = Tab[I];
                    Tab[I] = Ech;
                }
                I = I + 1;
            }
            N = N - 1;
        }

        // Affichage du tableau trié
        for (I = 0; I < Sauve; I++) {
            System.out.print (Tab[I]+" ");
        }
    }
}