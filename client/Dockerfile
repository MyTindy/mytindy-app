FROM node:alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install ionic @ionic/cli cordova --location=global
RUN npm install
COPY . .
EXPOSE 8100
CMD [ "ionic", "serve" ]
