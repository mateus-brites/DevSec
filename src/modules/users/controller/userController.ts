import { User } from "@/entity/User";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { createUserDTO } from "../repository/dto/createUserDTO";
import { UserService } from "../services/userService";

export class UserController {
    async createUser(request: Request, response: Response): Promise<Response> {
        console.log('   JKSHNFKSJNBDSKJGVNBDSKJHB J JRF')
        console.log(request)
        const { email, password, username }: createUserDTO = request.body;

        const userService = container.resolve(UserService)
        const newUser = await userService.createUser({ username, password, email})

        return response.status(200).json(newUser)
    }
}