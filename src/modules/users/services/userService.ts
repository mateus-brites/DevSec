import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../repository/IUserRepository";
import { hash } from "bcryptjs"
import { createUserDTO } from "../repository/dto/createUserDTO";
import { User } from "@/entity/User";

@injectable()
export class UserService {
    constructor(
        @inject("UserRepository")
        private usersRepository: IUserRepository
    ){}

    async createUser({ username, password, email }: createUserDTO): Promise<User>{
        const passwordHashed = await hash(password, 8);
        const user = await this.usersRepository.createUser({ username, password: passwordHashed, email });

        return user;
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.usersRepository.findByEmail(email)

        if(!user) {
            return;
        }

        return(user)
    }

    async findById(email: string): Promise<User> {
        const user = await this.usersRepository.findById(email)

        if(!user) {
            return;
        }

        return(user)
    }
}