import { FriendRequest } from "@/entity/FriendRequest";
import { AppError } from "@/error/AppError";
import { IUserRepository } from "@modules/users/repository/IUserRepository";
import { inject, injectable } from "tsyringe";
import { IFriendRequestRepository } from "../repository/IFriendRequestReopsitory";

@injectable()
export class FriendRequestService {
    constructor(
        @inject("FriendRequestRepository")
        private friendRequestRepository: IFriendRequestRepository,
        @inject("UserRepository")
        private usersRepository: IUserRepository
    ){}

    async sendFriendRequest(receiverId: string, userId: string): Promise<FriendRequest> {
        const user = await this.usersRepository.findById(userId)
        
        if(!user) {
            throw new AppError('User not found')
        }

        const receiver = await this.usersRepository.findById(receiverId);

        if(!receiver) {
            throw new AppError('User not found')
        }

        const friendRequest = await this.friendRequestRepository.sendFriendRequest(receiverId, userId)

        return friendRequest
    }

    async rejectRequest(FriendRequestId): Promise<void> {
        await this.friendRequestRepository.excludeRequest(FriendRequestId)
    }
}