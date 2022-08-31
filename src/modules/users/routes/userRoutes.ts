import { ensureAuthenticate } from '@/middleware/ensureAuthenticate';
import { Router } from 'express'
import { UserController } from '../controller/userController'
import multer from "multer";
import uploadConfig from '../../../config/upload'


const userRouter = Router()
const userController = new UserController()


const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

userRouter.post('/user/create', userController.createUser)
userRouter.post('/user/login', userController.logIn)
userRouter.get('/user/find/email',ensureAuthenticate, userController.findByEmail)
userRouter.get('/user/find/userId',ensureAuthenticate, userController.findById)
userRouter.post('/user/follow/:id',ensureAuthenticate, userController.follow)
userRouter.patch('/user/avatar',ensureAuthenticate,uploadAvatar.single("avatar"), userController.addAvatar)


export { userRouter }