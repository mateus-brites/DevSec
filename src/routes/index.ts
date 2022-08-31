import { postRouter } from '@modules/posts/routes/postRoutes'
import { userRouter } from '@modules/users/routes/userRoutes'
import { Router } from 'express'

const router = Router()

router.use(userRouter)
router.use(postRouter)

export { router }