import { User } from "@/entity/User";
import { Request, Response } from "express";
import { decode } from "jsonwebtoken";
import { report } from "process";
import { container } from "tsyringe";
import { createUserDTO } from "../repository/dto/createUserDTO";
import { UserService } from "../services/userService";

export class UserController {
    async createUser(request: Request, response: Response): Promise<Response> {
        const { email, password, username }: createUserDTO = request.body;

        const userService = container.resolve(UserService)

        try {
            const newUser = await userService.createUser({ username, password, email})
    
            return response.status(200).json(newUser)

        } catch(err) {
            return response.status(err.statuscode).json({"message": err.message})
        }
    }

    async findById(request: Request, response: Response): Promise<Response> {
        const { userId } = request.body;

        const userService = container.resolve(UserService)

        try {
            const user = await userService.findById(userId)
            console.log(user)
    
            return response.status(200).json(user)

        } catch(err) {
            return response.status(err.statuscode).json({"message": err.message})
        }
    }

    async findByEmail(request: Request, response: Response): Promise<Response> {
        const { email } = request.body;

        const authToken = request.headers.authorization;
        const [, token] = authToken.split(" ");

        const a = decode(token)
        console.log('a --->', a)

        const userService = container.resolve(UserService)

        try {
            const user = await userService.findByEmail(email)
    
            return response.status(200).json(user)

        } catch(err) {
            return response.status(err.statuscode).json({"message": err.message})
        }
    }

    async logIn(request: Request, response: Response): Promise<Response>{
        const { email, password } = request.body;

        const userService = container.resolve(UserService);

        try {
            const token = await userService.logIn(email, password);
    
            return response.status(201).json(token);

        } catch(err) {
            return response.status(err.statuscode).json({"message": err.message})
        }

    }

    async follow(request: Request, response: Response): Promise<Response> {
        const { id } = request.params

        const authToken = request.headers.authorization;
        const [, token] = authToken.split(" ");

        const jwt = decode(token)
        const userId = jwt.sub as string

        const userService = container.resolve(UserService);

        try {
            await userService.follow(userId, id)
    
            return response.status(201).json()

        } catch(err) {
            return response.status(err.statuscode).json({"message": err.message})
        }
    }

    async addAvatar(request: Request, response: Response): Promise<Response> {
        const authToken = request.headers.authorization;
        const [, token] = authToken.split(" ");

        const jwt = decode(token)
        const userId = jwt.sub as string

        const avatar = request.file.filename

        const userService = container.resolve(UserService);

        try {
            const user = await userService.addAvatar(userId, avatar)
    
            return response.status(204).json(user)

        } catch(err) {
            return response.status(err.statuscode).json({"message": err.message})
        }

    }
}