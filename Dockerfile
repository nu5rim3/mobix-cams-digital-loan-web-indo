# build environment
FROM node:18-alpine as build-step
WORKDIR /mobix-cams-digital-loan-web-indo
 
COPY package.json .

RUN npm install --force

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "preview" ]
