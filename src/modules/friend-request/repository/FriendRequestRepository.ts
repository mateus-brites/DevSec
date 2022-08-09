import { myDataSource } from "@/app-data-source";
import { FriendRequest } from "@/entity/FriendRequest";
import { Repository } from "typeorm";
import { IFriendRequestRepository } from "./IFriendRequestReopsitory";

export class FriendRequestRepository implements IFriendRequestRepository {

    private repository: Repository<FriendRequest>;
    constructor() {
        this.repository = myDataSource.getRepository(FriendRequest)
    }

    async sendFriendRequest(userReceiverId: string, userId: string): Promise<FriendRequest> {
        const newRequest = this.repository.create()
        newRequest.receiver = userReceiverId;
        newRequest.sender = userId

        await this.repository.save(newRequest)

        return newRequest
    }
    acceptRequest(friendRequestId: any): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async excludeRequest(friendRequestId: any): Promise<void> {
        await this.repository.delete(friendRequestId) 
    }
}