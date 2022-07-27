import { IUserRepository } from "@modules/users/repository/IUserRepository";
import { UserRepository } from "@modules/users/repository/userRepository";
import { container } from "tsyringe";

container.registerSingleton<IUserRepository>("UserRepository", UserRepository);