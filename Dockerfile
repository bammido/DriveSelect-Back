FROM node:18
WORKDIR /usr/src/drive-select-back
COPY package.json .
RUN npm i -g npm
RUN npm i
COPY . .
RUN npm run build
EXPOSE 8080
CMD ["npm","run", "start:docker"]