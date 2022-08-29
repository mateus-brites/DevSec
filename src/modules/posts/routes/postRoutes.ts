import { ensureAuthenticate } from '@/middleware/ensureAuthenticate'
import { Router } from 'express'
import multer from 'multer'
import uploadConfig from '../../../config/upload'
import { PostController } from '../controller/PostController'


const postRouter = Router()

const postController = new PostController()

const uploadVideo = multer(uploadConfig.upload("./tmp/video"));

postRouter.post('/post/video',ensureAuthenticate,uploadVideo.single("video"), postController.uploadVideo)
postRouter.post('/post/thought', ensureAuthenticate, postController.createThought)
postRouter.put('/post/thought/:postId', ensureAuthenticate, postController.editPost)
postRouter.delete('/post/thought/:postId', ensureAuthenticate, postController.deletePost)