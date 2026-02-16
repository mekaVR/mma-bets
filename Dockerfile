# On part d'une image Node.js officielle (version LTS = stable et supportée longtemps)
FROM node:20-alpine

# On crée un dossier /app dans le conteneur et on s'y place
WORKDIR /app

# On copie d'abord uniquement les fichiers de dépendances
# Pourquoi pas tout copier d'un coup ? Parce que Docker met en cache chaque étape.
# Si ton code change mais pas tes dépendances, Docker réutilise le cache ici → build plus rapide
COPY package*.json ./

# On installe les dépendances (y compris les devDependencies, nécessaires pour compiler le TypeScript)
RUN npm install

# Maintenant on copie tout le reste du code source
COPY . .

# On compile le TypeScript en JavaScript (le résultat va dans le dossier /app/dist)
RUN npm run build

# On indique que l'API écoute sur le port 3000 (documentation, ne fait rien techniquement)
EXPOSE 3000

# La commande qui se lance quand le conteneur démarre
CMD ["npm", "run", "start:prod"]
