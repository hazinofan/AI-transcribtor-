# Semaine 1 - Suivi d'avancement

## Travaux réalisés

-  Initialisation du projet frontend avec **Next.js** et **TypeScript**.
-  Installation et configuration de **Pure CSS** pour le design.
-  Mise en place du **design de la page d'accueil** (formulaire de lien YouTube, sélection de langue, boutons d'action).
-  Intégration du **Layout** global avec **Sidebar** et contenu principal.
-  Création de la structure de projet (`/src`, `/components`, `/pages`, `/styles`, `/tracking`).

## 📂 Structure du projet mise en place

/src /components → Composants réutilisables (Layout, Formulaires, etc.) /lib → Configuration Firebase /pages → Pages principales /styles → Fichier CSS global /tracking → Suivi hebdomadaire du projet /public → Dossier d'assets publics

## 🔗 Fonctionnalités développées

-  Validation du lien YouTube collé par l'utilisateur : Pas encore Publié dans le Repo 
-  Redirection automatique vers `/transcription/[videoId]` après validation.
-  Première version du design général respectant l'esprit dashboard AI moderne.

## Points d'amélioration identifiés

- Ajouter un **loader** pendant la redirection/transcription.
- Gérer les erreurs si l'utilisateur entre un mauvais lien YouTube.
- Préparer l'appel au backend Firebase pour la transcription.

## Prochaines étapes

- Connecter l'application frontend avec la fonction Firebase (`transcriptAudio`) pour récupérer la transcription réelle.
- Développer la page `/transcription/[videoId]` avec affichage dynamique de :
  -  Vidéo YouTube embarquée
  -  Transcription originale
  -  Traduction synchronisée
- Ajouter un système de **tracking des clics** sur les timestamps (optionnel).

----

Github de l'auteur :

https://github.com/hazinofan

