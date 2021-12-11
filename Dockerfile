FROM node:lts as base
WORKDIR /usr/src/app
COPY package*.json ./
COPY .env ./
COPY . .
RUN npm i
RUN npm i -g nodemon

CMD [ "npm", "start" ]