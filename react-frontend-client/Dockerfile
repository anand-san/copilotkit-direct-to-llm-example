FROM node:24-alpine

WORKDIR /app

COPY . .

COPY package.json package-lock.json* ./

RUN npm ci

RUN npm run build

EXPOSE 4173

CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0"]