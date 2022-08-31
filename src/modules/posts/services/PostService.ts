import { Post } from "@/entity/Post";
import { AppError } from "@/error/AppError";
import { IUserRepository } from "@modules/users/repository/IUserRepository";
import { Console } from "console";
import { inject, injectable } from "tsyringe";
import { IPostRepository } from "../repository/IPostRepository";

@injectable()
export class PostService {
    constructor(
        @inject("PostRepository")
        private postRepository: IPostRepository,
        @inject("UserRepository")
        private usersRepository: IUserRepository
    ){}
    async uploadVideo(video: string, userId: string, description?: string): Promise<Post> {
        const user = await this.usersRepository.findById(userId)

        if(!user) {
            throw new AppError('User not found')
        }

        const post = await this.postRepository.postVideo(video, user, description);

        return post;
    }

    async postThought(userId: string, description: string): Promise<Post> {
        const user = await this.usersRepository.findById(userId)

        if(!user) {
            throw new AppError('User not found', 400)
        }

        const post = await this.postRepository.postThought(description, user)

        return post;
    }

    async editPost(postId: string, description: string): Promise<Post> {
        console.log('entrei')
        const post = await this.postRepository.getById(postId);
        console.log('after get by id')

        if(!post) {
            console.log('NOT FIND')
            throw new AppError('Can not found post')
        }

        const updatedPost = await this.postRepository.updateDescription(description, post);

        return updatedPost
    }

    async deletePost(postId) {
        await this.postRepository.deletePost(postId)
    }
}