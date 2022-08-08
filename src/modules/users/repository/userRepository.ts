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
            friendRequest
        })

        // const newUser = this.repository.create()

        // newUser.username = username;
        // newUser.email = email;
        // newUser.password = password;
        // newUser.friendRequest = newUser.friendRequest !== undefined ? [...newUser.friendRequest, ...friendRequest] : [...friendRequest]

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

    async friendRequest(sender: User, receiver: User): Promise<void> {
        // console.log('SENDER', sender)
        // console.log('RECEIVER', receiver)
        const user = this.repository.create(sender);
        await this.repository.save(user);

        console.log('AQUI1', user)
        return;
    }
}