FROM node:16.15.0-alpine As development
WORKDIR /usr/src/app
COPY package*.json ./
COPY tsconfig.* ./
RUN yarn install
COPY ./ ./

RUN yarn run build
CMD yarn run start:prod
