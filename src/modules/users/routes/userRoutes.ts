import { Router } from 'express'
import { UserController } from '../controller/userController'


const userRouter = Router()
const userController = new UserController()
userRouter.post('/user/create', userController.createUser)
// userRouter.post('/user/create', () => console.log('aqui foi'))

export { userRouter }