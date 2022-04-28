FROM node:16.14.2
RUN npm i -g @nestjs/cli
RUN npm i
WORKDIR /usr/src/app