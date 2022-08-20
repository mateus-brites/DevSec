import { myDataSource } from "@/app-data-source";
import { Post } from "@/entity/Post";
import { User } from "@/entity/User";
import { Repository } from "typeorm";
import { IPostRepository } from "./IPostRepository";


export class PostRepository implements IPostRepository {
    private repository: Repository<Post>

    constructor() {
        this.repository = myDataSource.getRepository(Post)
    }
    async postVideo(video: string, user: User, description: string): Promise<Post> {
        const newPost = this.repository.create({ video, description, user })

        await this.repository.save(newPost);

        return newPost
    }
    async postThought(description: string, user: User): Promise<Post> {
        const newPost = this.repository.create({ description, user })

        await this.repository.save(newPost);

        return newPost
    }
    async updateDescription(description: string, post: Post): Promise<Post> {
        post.description = description;

        await this.repository.save(post)

        return post
    }
    async deletePost(id: string): Promise<void> {
        await this.repository.delete(id);
    }
    async getById(id: string): Promise<Post> {
        const post = await this.repository.createQueryBuilder()
            .select()
            .where(`post.id = ${id}`)
            .getOne()

        return post
    }
    async getAllByUserId(userId: string): Promise<Post[]> {
        const posts = await this.repository.createQueryBuilder()
            .select()
            .where(`post.userId = ${userId}`)
            .getMany()

        return posts
    }
}