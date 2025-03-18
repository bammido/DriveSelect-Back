FROM node:18 AS build
WORKDIR /usr/src/drive-select-back
COPY package.json . 
RUN npm i -g npm
RUN npm i
COPY . .
RUN npm run build

FROM postgres:14-alpine AS db
ENV POSTGRES_PASSWORD=12345
ENV POSTGRES_USER=postgres
ENV POSTGRES_DB=postgres
VOLUME ["/var/lib/postgresql/data"]

FROM node:18
WORKDIR /usr/src/drive-select-back
COPY --from=build /usr/src/drive-select-back .
COPY --from=db /var/lib/postgresql/data /var/lib/postgresql/data
EXPOSE 8080
CMD ["npm", "run", "start:docker"]