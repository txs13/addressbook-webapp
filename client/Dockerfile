FROM node:16-slim

WORKDIR //addressbook-webapp

COPY /package.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm","start"]