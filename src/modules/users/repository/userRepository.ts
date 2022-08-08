import { myDataSource } from "@/app-data-source";
import { User } from "@/entity/User";
import { Repository } from "typeorm";
import { createUserDTO } from "./dto/createUserDTO";
import { IUserRepository } from "./IUserRepository";


export class UserRepository implements IUserRepository {
    private repository: Repository<User>;
    constructor() {
        this.repository = myDataSource.getRepository(User)
    }

    async createUser({ email, password, username, friendRequest, id }: createUserDTO): Promise<User> {
        const newUser = this.repository.create({
            username,
            email,
            password,
            id,
        })
        await this.repository.save(newUser)

        return newUser
    }

    async findByEmail(email: string) {
        const user = await this.repository.createQueryBuilder('user')
            .select()
            .where(`user.email = '${email}'`)
            .getOne()

        return user
    }

    async findById(userId: string) {
        const user = await this.repository.createQueryBuilder('user')
            .select()
            .where(`user.id = '${userId}'`)
            .getOne()

        return user
    }
}