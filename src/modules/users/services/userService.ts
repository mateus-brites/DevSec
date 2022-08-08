import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../repository/IUserRepository";
import { hash } from "bcryptjs"
import { compare } from "bcryptjs";
import { createUserDTO } from "../repository/dto/createUserDTO";
import { User } from "@/entity/User";
import { AppError } from "@/error/AppError";
import { sign } from "jsonwebtoken";

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

    async logIn(email: string, password: string): Promise<string> {
        const findUserByEmail = await this.usersRepository.findByEmail(email);

        if (!findUserByEmail) {
            throw new AppError("Email or password incorrect");
        }

        const passwordHashed = findUserByEmail.password

        const passwordMath = await compare(password, passwordHashed);

        if(!passwordMath) {
            throw new AppError("Email or password incorrect");
        }

        const token = sign({userId: findUserByEmail.id}, "6eb51784aeb24e7fed5ce4fe9f27b0bd", {
            subject: findUserByEmail.id,
            expiresIn: "15d",
        })

        return token;
    }

    async friendRequest(senderId: string, receiverId: string) {
        const findSender = await this.usersRepository.findById(senderId);

        if(!findSender) {
            throw new AppError("User not found")
        }

        const findReceiver = await this.usersRepository.findById(receiverId);

        if(!findReceiver) {
            throw new AppError("User not found")
        }
        console.log('NO SERVER: ', findSender)

        findSender.friendRequest = [findReceiver]


        // await this.usersRepository.friendRequest(findSender, findReceiver)

        await this.usersRepository.createUser(findSender)

        return
    }
}