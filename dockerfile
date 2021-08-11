FROM node:14.16.1-alpine3.12

COPY . /app

WORKDIR /app

RUN npm install

RUN npm run build

EXPOSE 3003:3003

CMD [ "npm", "run", "start" ]