FROM node:alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --location=global ionic
RUN npm install
COPY . .
EXPOSE 8100
CMD [ "npm","run" "build-prod" ]

FROM nginx
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/www/ /usr/share/nginx/html/
