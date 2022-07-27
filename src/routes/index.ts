import { userRouter } from '@modules/users/routes/userRoutes'
import { Router } from 'express'

const router = Router()

router.use(userRouter)

export { router }