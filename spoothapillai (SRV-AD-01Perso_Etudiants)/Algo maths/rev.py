a=int(input('Saisir un entier'))
for k in range (1,5):
    if a%2==0:
        b=a+2
        a=a/2
    else :
        b=a+1
        a=3*a+1
print(b)

