FROM node:14.16.1-alpine3.12

WORKDIR /app

COPY . /app

RUN npm install

CMD [ "npm", "run", "start" ]