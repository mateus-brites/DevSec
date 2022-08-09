import { Router } from 'express'
import { FriendRequestController } from '../controller/FriendRequestController'



const friendRequestRouter = Router()
const friendRequestController = new FriendRequestController()

friendRequestRouter.post('/friendRequest/create', friendRequestController.sendFriendRequest)

export { friendRequestRouter }