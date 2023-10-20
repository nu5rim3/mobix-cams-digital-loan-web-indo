# build environment
FROM fra.ocir.io/lolctech/fxapiuser/node:14.17-alpine as build-step
WORKDIR /usr/src/app
 
ENV NODE_ENV production
ENV PATH /app/node_modules/.bin:$PATH

COPY . /app


EXPOSE 3000

COPY package.json package-lock.json ./

RUN npm install --silent

COPY . ./

CMD ["npm", "run", "serve"]
