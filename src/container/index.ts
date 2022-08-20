import { IPostRepository } from "@modules/posts/repository/IPostRepository";
import { PostRepository } from "@modules/posts/repository/PostRepository";
import { IUserRepository } from "@modules/users/repository/IUserRepository";
import { UserRepository } from "@modules/users/repository/userRepository";
import { container } from "tsyringe";

container.registerSingleton<IUserRepository>("UserRepository", UserRepository);
container.registerSingleton<IPostRepository>("PostRepository", PostRepository);