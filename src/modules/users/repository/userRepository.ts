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
    async follow(follower: User, following: User): Promise<void> {
        follower.follow = []
        const follows = await this.repository.query(`SELECT following FROM follows WHERE follows.follower = '${follower.id}'`)
        for (const follow of follows) {
            const user = await this.findById(follow.following)
            follower.follow = [...follower.follow, user]
        }
        follower.follow = [...follower.follow, following]
        console.log(follower.follow)
        await this.repository.save(follower)
        return
    }

    async createUser({ email, password, username, id }: createUserDTO): Promise<User> {
        const newUser = this.repository.create({
            username,
            email,
            password,
            id
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

    async saveUser(user: User): Promise<User> {
        
        const updatedUser = await this.repository.save(user)

        return updatedUser
    }
}