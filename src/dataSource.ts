import { DataSource } from "typeorm"
import dotenv from 'dotenv'

dotenv.config()

console.log(process.env.TYPEORM_PORT)

type SQLTypes = "mysql" | "mariadb" | "postgres" |"sqlite"

let sqlType: SQLTypes = "postgres"

switch (process.env.TYPEORM_TYPE) {
    case "mysql":
        sqlType = "mysql"
        break;
    default:
        break;
}

export const AppDataSource = new DataSource({
    type: sqlType,
    host: process.env.TYPEORM_HOST || 'localhost',
    port: Number(process.env.TYPEORM_PORT || 5428),
    username: process.env.TYPEORM_USER || "postgres",
    password: process.env.TYPEORM_PASSWORD || "12345",
    database: process.env.TYPEORM_DB || "postgres",
    synchronize: false,
    logging: false,
    entities: [`./${process.env.ENVIRONMENT === 'prod'? 'dist' : 'src'}/database/entity/*.entity.*`],
    migrations: [`./${process.env.ENVIRONMENT === 'prod'? 'dist' : 'src'}/database/migrations/*.migrations.*`],
    subscribers: [],
})

AppDataSource.initialize()
    .then(() => {
       console.log("database initialized!")
    })
    .catch((error) => console.log("database connection error", error))