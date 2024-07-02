# Gtemplator

## Getting Started

Dans un premier temps cloner le projet

```bash
git clone git@github.com:alexdissi/gtemplator.git
```

une fois cloner rendez vous a la racine du projet puis executer la commande suivante

```bash
pnpm install
```

Pour lancer le projet

```bash
pnpm dev
```

## Structure du projet

Pour le package manager nous allons utiliser pnpm qui est un package manager plus rapide que npm et yarn.

Si vous souhaiter installer un package precis d'abord poster votre package dans le discord voir ce que les autre membre du groupe en pense puis une fois accepté isntaller votre package dans le projet avec

```bash
    pnpm add nom_du_package
```

### Backend

Avec nextJS pour creer une route API il faudras dans le dossier src/app/api creer un dossier qui seras le nom de votre endpoint puis creer un fichier route.ts qui est tres important sinon votre endpoint ne fonctionneras pas

https://nextjs.org/docs/app/building-your-application/routing

### Frontend

Pour le frontend tout se passeras dans le dossier src/app/nomdudossier, chaque dossier est la route de votre application. Dans ce dossier veuillez ajouter un fichier page.tsx sans cela votre route seras innacessible. Exemple : src/app/home est la route de la page d'accueil www.localhost:3000/home

### Components

Pour les components vous pouvez les creer dans le dossier src/app/components et les importer dans vos pages.

### Base de données

Pour la bdd nous allons utilisé  prisma qui est un ORM de base de données .

Pour creer un model il faudras creer votre model dans le fichier prisma/schema.prisma ( voir model deja present ) puis lancer la commande suivante

```bash
pnpx prisma migrate dev --name init
```

A la suite de cette commande prisma va creer un fichier de migration dans le dossier prisma/migrations et vous allez voir votre bdd se creer dans pgAdmin avec les tables que vous avez creer.


