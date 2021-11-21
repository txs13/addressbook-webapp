FROM node:16-slim

WORKDIR /addressbook-webapp

COPY ./package.json .

RUN npm install

COPY . .

EXPOSE 5000

CMD ["index.js"]