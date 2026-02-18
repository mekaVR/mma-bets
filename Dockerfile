
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


FROM node:20-alpine

WORKDIR /app

COPY package*.json ./


RUN npm pkg delete scripts.prepare && npm install --omit=dev


COPY --from=build /app/dist ./dist

# Port documenté
EXPOSE 3000

CMD ["node", "dist/main.js"]
