FROM node:16-alpine
WORKDIR /opt/backend-nodejs
COPY ./package.json ./
RUN npm install
RUN mkdir public
COPY ./public/ ./public/
COPY ./private_key.pem ./
COPY ./public_key.pem ./
EXPOSE $API_PORT
EXPOSE $DEBUG_PORT
CMD npm run server:up:prod