import "reflect-metadata"
import express, { NextFunction, Request, Response } from 'express'
import { myDataSource } from "./app-data-source"
import { router } from "./routes"
import "./container"
import { AppError } from "./error/AppError"

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

app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {
        if (err instanceof AppError) {
            return response.status(err.statuscode).json({ message: err.message});
        }app

        return response.status(500).json({
            status: "Error",
            message: `Internal server Error ${err}`,
        });
    }
)

app.get('/',(request, response) => {
    return response.json({message: 'Bem vindo'})
})

app.listen(3333, () => console.log('server is runnig in http://localhost:3333/'))