FROM node:16.13.1-alpine as base

WORKDIR /app

COPY package*.json /app
COPY app/ /app/

ENV DATABASE_URL "mysql://root:Tigger123%21%40%23@localhost:3306/planes_db"

RUN npm i
RUN npm i -g nodemon
RUN npx prisma generate