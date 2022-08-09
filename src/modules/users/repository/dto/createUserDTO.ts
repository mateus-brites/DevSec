import { User } from "@/entity/User";

export interface createUserDTO {
    username: string;
    password: string
    email: string
    id?: string;
    follow?: User[]

}