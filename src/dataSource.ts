import { DataSource } from "typeorm"
import dotenv from 'dotenv'

dotenv.config()

console.log(process.env.TYPEORM_PORT)

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.TYPEORM_HOST || 'localhost',
    port: Number(process.env.TYPEORM_PORT || 5428),
    username: process.env.TYPEORM_USER || "postgres",
    password: process.env.TYPEORM_PASSWORD || "12345",
    database: "postgres",
    synchronize: false,
    logging: false,
    entities: ['./src/database/entity/*.entity.*'],
    migrations: ['./src/database/migrations/*.migrations.*'],
    subscribers: [],
})

AppDataSource.initialize()
    .then(() => {
       console.log("database initialized!")
    })
    .catch((error) => console.log("database connection error", error))