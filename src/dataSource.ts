import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5430,
    username: "postgres",
    password: "12345",
    database: "postgres",
    synchronize: true,
    logging: false,
    entities: [],
    migrations: [],
    subscribers: [],
})

AppDataSource.initialize()
    .then(() => {
       console.log("database initialized!")
    })
    .catch((error) => console.log("database connection error", error))