import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../repository/IUserRepository";
import { hash } from "bcryptjs"
import { compare } from "bcryptjs";
import { createUserDTO } from "../repository/dto/createUserDTO";
import { User } from "@/entity/User";
import { AppError } from "@/error/AppError";
import { sign } from "jsonwebtoken";
import { deleteFile } from "@/utils/file";

@injectable()
export class UserService {
    constructor(
        @inject("UserRepository")
        private usersRepository: IUserRepository
    ){}

    async createUser({ username, password, email }: createUserDTO): Promise<User>{
        const passwordHashed = await hash(password, 8);
        const userAlreadyExist = await  this.usersRepository.findByEmail(email);

        if (userAlreadyExist) {
            console.log('DEU ERRO AQUI')
                throw new AppError('Email is in use')
        }
        const user = await this.usersRepository.createUser({ username, password: passwordHashed, email });

        return user;
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.usersRepository.findByEmail(email)

        if(!user) {
            throw new AppError('Email not found', 400)
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
            throw new AppError("Email or password incorrect", 400);
        }

        const passwordHashed = findUserByEmail.password

        const passwordMath = await compare(password, passwordHashed);

        if(!passwordMath) {
            throw new AppError("Email or password incorrect", 400);
        }

        const token = sign({userId: findUserByEmail.id}, "6eb51784aeb24e7fed5ce4fe9f27b0bd", {
            subject: findUserByEmail.id,
            expiresIn: "15d",
        })

        return token;
    }

    async follow(userId: string, followId: string): Promise<void> {
        const user = await this.usersRepository.findById(userId)

        if(!user) {
            throw new AppError('User not found')
        }

        const follow = await this.usersRepository.findById(followId)

        if(!follow) {
            throw new AppError('User not found', 400)
        }

        await this.usersRepository.follow(user, follow)
        
        return
    }

    async addAvatar(id: string, avatar: string): Promise<User> {
        const user = await this.usersRepository.findById(id);

    if (user.avatar) {
      await deleteFile(`./tmp/avatar/${user.avatar}`);
    }

    user.avatar = avatar

    const updatedUser = await this.usersRepository.saveUser(user)

    return updatedUser
  }
}