FROM node:14
WORKDIR /code
COPY package*.json ./
RUN npm ci
COPY . .
RUN cp .env.docker .env
EXPOSE ${PORT}
CMD [ "node", "index.js" ]
