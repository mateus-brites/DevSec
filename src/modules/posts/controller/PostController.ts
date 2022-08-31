import { Request, Response } from "express";
import { decode } from "jsonwebtoken";
import { container } from "tsyringe";
import { PostService } from "../services/PostService";


export class PostController {
    async createThought(request: Request, response: Response): Promise<Response> {
        const { description } = request.body;
        console.log('oi')

        const authToken = request.headers.authorization;
        const [, token] = authToken.split(" ");

        const jwt = decode(token)
        console.log(token)
        const userId = jwt.sub as string

        const postService = container.resolve(PostService);
        
        try {
            const post = await postService.postThought(userId, description)
    
            return response.status(201).json(post);

        } catch(err) {
            return response.status(err.statuscode).json({"message": err.message})
        }
    }

    async editPost(request: Request, response: Response): Promise<Response> {
        const { postId } = request.params
        const { description } = request.body;

        const postService = container.resolve(PostService);

        try {
            const updatedPost = await postService.editPost(postId, description)
    
            return response.status(201).json(updatedPost)

        } catch(err) {
            return response.status(err.statuscode).json({"message": err.message})
        }
    }

    async deletePost(request: Request, response: Response): Promise<Response> {
        const { postId } = request.params

        const postService = container.resolve(PostService);

        try {
            await postService.deletePost(postId)
    
            return response.status(201).send()

        } catch(err) {
            return response.status(err.statuscode).json({"message": err.message})
        }
    }

    async uploadVideo(request: Request, response: Response): Promise<Response> {
        const authToken = request.headers.authorization;
        const [, token] = authToken.split(" ");

        const jwt = decode(token)
        const userId = jwt.sub as string

        const video = request.file.filename

        const postService = container.resolve(PostService);

        try {
            const post = postService.uploadVideo(video, userId)
    
            return response.status(204).json(post)

        } catch(err) {
            return response.status(err.statuscode).json({"message": err.message})
        }
    }
}