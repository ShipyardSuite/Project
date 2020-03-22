FROM node:10-alpine

ENV CHOKIDAR_USEPOLLING true 

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN npm install express-gateway@latest && \
    ./node_modules/.bin/eg gateway create -n gateway -d . -t basic && \
    npm cache clean --force

COPY . .

EXPOSE 8080
EXPOSE 8443
EXPOSE 9876

CMD [ "npm", "start" ]