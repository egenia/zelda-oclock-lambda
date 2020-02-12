
# Fonctions Lambda

Ce repository contient les codes sources de la fonction Lambda à restaurer.
Auteur : Frédérik ISTACE
Date de création : 12/02/2020

## Stack technique
| Composant |Technologie  |
|--|--|
| Code |Node.JS v12  |

## Restauration du code
Etape 1 : préparer l'environnement AWS
1/ Création d'un compte en mode Free Tiers
2/ Attendre que AWS valide le compte (24h)
3/ Déclarer les routes dans l'API Gateway. 2 routes sont nécessaires.  
La documentation de ces routes se trouve ici (format Postman) : [https://documenter.getpostman.com/view/466677/SzKMzMAt?version=latest](https://documenter.getpostman.com/view/466677/SzKMzMAt?version=latest)
4/ Configurer les CORS au niveau de l'API Gateway : bien penser à ajouter au niveau de l'Access-Control-Allow-Headers le paramètre access-control-allow-origin, sans quoi le navigateur n'arriverait pas à effectuer des requêtes vers l'API
5/ Créer la fonction Lambda
6/ Pour des raisons de debug, il peut être intéressant d'activer CloudWatch (ne pas oublier de mettre les droits IAM adéquats)
7/ Créer les routes dans l'API Gateway et les binder à la fonction Lambda
8/ Déclarer un staging (v1)
9/ Déployer l'API Gateway
Etape 2 : tester
Pour tester vous pouvez utiliser la collection Postman fournie. Cela permettra de valider les appels et que la fonction Lambda est bien bindée aux 2 routes déclarées.
Afin de tester il faut bien penser à mettre à jour les valeurs des variables d'environnement de la collection Postman
Etape 3 : tester avec le navigateur.
Si une erreur apparaît dans la console liée au preflight, bien vérifier la configuration des CORS dans l'API Gateway.
