# build environment
FROM fra.ocir.io/lolctech/fxapiuser/node:14.17-alpine as build-step
WORKDIR /usr/src/app
 
ENV NODE_ENV production
ENV PATH /app/node_modules/.bin:$PATH
 
COPY ./package.json ./
COPY vite.config.ts .
RUN npm cache clean --force
RUN npm i
#RUN npm install --no-package-lock --production
#RUN npm install 
 
 
COPY . .
RUN npm run build

EXPOSE 80
 
CMD ["npm", "run", "daemon off;"]
