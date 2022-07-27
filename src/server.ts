import "reflect-metadata"
import express, { response } from 'express'
import { myDataSource } from "./app-data-source"
import { router } from "./routes"
import "./container"

myDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })


const app = express();
app.use(express.json())
app.use(router)

app.get('/',(request, response) => {
    return response.json({message: 'Bem vindo'})
})

app.listen(3333, () => console.log('server is runnig in http://localhost:3333/'))