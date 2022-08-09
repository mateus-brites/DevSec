import { FriendRequest } from "@/entity/FriendRequest";

export interface IFriendRequestRepository {
    sendFriendRequest(userReceiverId: string, userId: string): Promise<FriendRequest>;
    acceptRequest(friendRequestId): Promise<void>;
    excludeRequest(friendRequestId): Promise<void>
}