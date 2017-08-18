FROM node:8-alpine
WORKDIR /usr/app
ADD package.json .
RUN npm install
