import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";


@Entity('post')
export class Post {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: true })
    video: string

    @Column({ nullable: true })
    description: string

    @ManyToOne(() => User)
    user: User

    @ManyToMany(type => User)
    @JoinTable(
        {
            name: "likes", 
            joinColumn: {
                name: "post",
                referencedColumnName: "id"
            },
            inverseJoinColumn: {
                name: "user",
                referencedColumnName: "id"
            }
        }
    )
    likes: User
}