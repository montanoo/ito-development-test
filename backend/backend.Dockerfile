FROM docker.io/bitnami/express:latest AS dev_img

WORKDIR /app

COPY package*.json /

RUN npm install

CMD ["npm", "run", "dev"]

FROM dev_img as prod_img
COPY . .

COPY start.sh /start.sh

RUN chmod +x /start.sh

CMD ["/start.sh"]