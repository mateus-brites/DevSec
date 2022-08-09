import { friendRequestRouter } from '@modules/friend-request/routes/friendRequestRoutes'
import { userRouter } from '@modules/users/routes/userRoutes'
import { Router } from 'express'

const router = Router()

router.use(userRouter)
router.use(friendRequestRouter)

export { router }