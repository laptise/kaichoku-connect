FROM node:16.14.2
RUN npm i -g yarn
RUN yarn
WORKDIR /usr/src/app