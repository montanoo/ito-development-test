FROM docker.io/bitnami/express:latest

WORKDIR /app

COPY package*.json /

RUN npm install

CMD ["npm", "run", "dev"]