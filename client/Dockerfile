FROM node:alpine
WORKDIR /app

RUN  npm uninstall -g ionic
RUN npm install -g @angular/cli @ionic/cli
COPY package*.json ./
RUN npm install
COPY . .

CMD [ "ionic", "serve" ]
