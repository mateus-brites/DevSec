import { Request, Response } from "express";
import { decode } from "jsonwebtoken";
import { container } from "tsyringe";
import { PostService } from "../services/PostService";


export class PostController {
    async createThought(request: Request, response: Response): Promise<Response> {
        const {description} = request.body;

        const authToken = request.headers.authorization;
        const [, token] = authToken.split(" ");

        const jwt = decode(token)
        const userId = jwt.sub as string

        const postService = container.resolve(PostService);

        const post = await postService.postThought(userId, description)

        return response.status(201).json(post);
    }

    async editPost(request: Request, response: Response): Promise<Response> {
        const { postId } = request.params
        const { description } = request.body;

        const postService = container.resolve(PostService);

        const updatedPost = await postService.editPost(postId, description)

        return response.status(201).json(updatedPost)
    }

    async deletePost(request: Request, response: Response): Promise<Response> {
        const { postId } = request.params

        const postService = container.resolve(PostService);

        await postService.deletePost(postId)

        return response.status(201).send()
    }

    async uploadVideo(request: Request, response: Response): Promise<Response> {
        const authToken = request.headers.authorization;
        const [, token] = authToken.split(" ");

        const jwt = decode(token)
        const userId = jwt.sub as string

        const video = request.file.filename

        const postService = container.resolve(PostService);

        const post = postService.uploadVideo(video, userId)

        return response.status(204).json(post)
    }
}