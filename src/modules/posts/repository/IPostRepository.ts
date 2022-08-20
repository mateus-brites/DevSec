import { Post } from "@/entity/Post";
import { User } from "@/entity/User";

export interface IPostRepository {
    postVideo(video: string, user: User, description?: string): Promise<Post>;
    postThought(description: string, user: User): Promise<Post>;
    updateDescription(description: string, post: Post): Promise<Post>
    deletePost(id: string): Promise<void>
    getById(id: string): Promise<Post>
    getAllByUserId(userId: string): Promise<Post[]>
}