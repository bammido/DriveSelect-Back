FROM node:18
WORKDIR /usr/src/aquaGas-Insight
COPY package.json .
RUN npm i -g npm
RUN npm i
COPY . .
RUN npm run build
EXPOSE 3333
CMD ["npm", "start"]