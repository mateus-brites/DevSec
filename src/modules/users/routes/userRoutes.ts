import { Router } from 'express'
import { UserController } from '../controller/userController'


const userRouter = Router()
const userController = new UserController()

userRouter.post('/user/create', userController.createUser)
userRouter.get('/user/find/email', userController.findByEmail)
userRouter.get('/user/find/userId', userController.findById)


export { userRouter }