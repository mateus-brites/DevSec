import { FriendRequestRepository } from "@modules/friend-request/repository/FriendRequestRepository";
import { IFriendRequestRepository } from "@modules/friend-request/repository/IFriendRequestReopsitory";
import { IUserRepository } from "@modules/users/repository/IUserRepository";
import { UserRepository } from "@modules/users/repository/userRepository";
import { container } from "tsyringe";

container.registerSingleton<IUserRepository>("UserRepository", UserRepository);
container.registerSingleton<IFriendRequestRepository>("FriendRequestRepository", FriendRequestRepository);