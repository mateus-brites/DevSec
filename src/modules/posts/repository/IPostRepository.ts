import { Post } from "@/entity/Post";
import { User } from "@/entity/User";

export interface IPostRepository {
    postVideo(video: string, user: User): Promise<Post>;
    postThought(description: string, user: User): Promise<Post>;
    updateDescription(description: string, postId: string): Promise<Post>
    deletePost(id: string): Promise<void>
}