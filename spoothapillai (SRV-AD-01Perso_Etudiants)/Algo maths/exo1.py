n = int(input("Saisir le nombre"))
from math import *
for k in range (2 , int(sqrt(n))+1):
    r = n%k
    if r == 0:
        print (n, " n'est pas premier ")
        print (k, " est un diviseur")
        # quand il est premier il affiche rien seulement quand il est pas premier,
        