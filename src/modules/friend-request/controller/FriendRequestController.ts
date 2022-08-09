import { Request, Response } from "express";
import { decode } from "jsonwebtoken";
import { container } from "tsyringe";
import { FriendRequestService } from "../services/friendRequestService";

export class FriendRequestController {
    async sendFriendRequest(request: Request, response: Response): Promise<Response> {
        const { receiverId } = request.body;

        console.log('entrei')

        const friendRequestService = container.resolve(FriendRequestService)

        const authToken = request.headers.authorization;
        const [, token] = authToken.split(" ");

        const jwt = decode(token)

        const userId = jwt.sub as string

        const friendRequest = await friendRequestService.sendFriendRequest(receiverId, userId)

        return response.status(201).json(friendRequest)
    }
}