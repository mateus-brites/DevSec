import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity('friend_request')
export class FriendRequest {
    readonly className: string = 'Users'
    @PrimaryGeneratedColumn()
    id: string;

    @OneToOne(() => User)
    @JoinColumn()
    sender: string;

    @OneToOne(() => User)
    @JoinColumn()
    receiver: string;
}