import { ensureAuthenticate } from '@/middleware/ensureAuthenticate'
import { Router } from 'express'
import { PostController } from '../controller/PostController'
import multer from 'multer'
import uploadConfig from '../../../config/upload'


const postRouter = Router()

const postController = new PostController()

const uploadVideo = multer(uploadConfig.upload("./tmp/video"));

postRouter.post('/post', ensureAuthenticate, postController.createThought)
postRouter.post('/post/film',ensureAuthenticate, uploadVideo.single("video"), postController.uploadVideo)
postRouter.put('/post/update/:postId', ensureAuthenticate, postController.editPost)
postRouter.delete('/post/thought/:postId', ensureAuthenticate, postController.deletePost)

export { postRouter }