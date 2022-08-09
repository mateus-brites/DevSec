import { User } from "@/entity/User";
import { createUserDTO } from "./dto/createUserDTO";

export interface IUserRepository {
    createUser({ email, password, username, id, follow }: createUserDTO): Promise<User>;
    findById(userId: string): Promise<User>;
    findByEmail(email: string): Promise<User>;
    follow(follower: User, following: User): Promise<void>
}
