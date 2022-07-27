import { DataSource } from "typeorm"

const myDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "username",
    password: "password",
    entities: ["./src/entity/*.ts"],
    migrations: ["/src/migrations/"],
    logging: true,
    synchronize: true,
})

export {myDataSource}