import { User } from "@/entity/User";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { createUserDTO } from "../repository/dto/createUserDTO";
import { UserService } from "../services/userService";

export class UserController {
    async createUser(request: Request, response: Response): Promise<Response> {
        const { email, password, username }: createUserDTO = request.body;

        const userService = container.resolve(UserService)
        const newUser = await userService.createUser({ username, password, email})

        return response.status(200).json(newUser)
    }

    async findById(request: Request, response: Response): Promise<Response> {
        const { userId } = request.body;

        const userService = container.resolve(UserService)
        const user = await userService.findById(userId)

        return response.status(200).json(user)
    }

    async findByEmail(request: Request, response: Response): Promise<Response> {
        const { email } = request.body;

        const userService = container.resolve(UserService)
        const user = await userService.findByEmail(email)

        return response.status(200).json(user)
    }

    async logIn(request: Request, response: Response): Promise<Response>{
        const { email, password } = request.body;

        const userService = container.resolve(UserService);

        const token = await userService.logIn(email, password);

        return response.status(201).json(token);
    }
}