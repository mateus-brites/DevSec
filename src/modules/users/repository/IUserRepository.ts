import { User } from "@/entity/User";
import { createUserDTO } from "./dto/createUserDTO";

export interface IUserRepository {
    createUser({ email, password, username }: createUserDTO): Promise<User>;
}
