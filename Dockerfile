# build environment
FROM fra.ocir.io/lolctech/fxapiuser/node:14.17-alpine as build-step
WORKDIR /app

COPY . /app

ENV NODE_ENV=production

RUN npm install serve -g

RUN npm install

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "serve"]