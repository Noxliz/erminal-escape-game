# Code Runner: The Terminal Escape - Documentation

## Comment jouer

### Commandes disponibles

```
ls [dossier]      - Lister les fichiers d'un dossier
cat [fichier]     - Afficher le contenu d'un fichier
cd [dossier]      - Changer de répertoire
clear             - Effacer l'écran du terminal
run [programme]   - Exécuter un programme
help              - Afficher l'aide
```

### Objectif du jeu

Vous êtes piégé dans une simulation de terminal. Votre but est de trouver comment vous échapper en explorant le système de fichiers et en exécutant les bonnes commandes.

### Indices importants

1. Examinez tous les fichiers avec `cat`
2. Cherchez les fichiers cachés avec `ls`
3. Le programme `/bin/unlock` semble intéressant...
4. Utilisez `run unlock` pour tenter de vous échapper

### Structure du système

```
/home/user
  |- log.txt      (fichier journal)
  |- .hidden      (fichier caché)
/etc
  |- passwd       (fichier des utilisateurs)
/bin
  |- unlock       (programme spécial)
```

## Configuration requise

- Navigateur web moderne (Chrome, Firefox, Edge)
- Résolution 1280x720 minimum recommandée

## Démarrage

1. Ouvrez `index.html` dans votre navigateur
2. Commencez à taper des commandes dans le terminal
3. Trouvez le moyen de vous échapper!

## Astuces

- Les noms de fichiers en rouge sont des indices importants
- Le fichier journal contient des messages cryptiques
- Le fichier caché pourrait révéler un secret...
