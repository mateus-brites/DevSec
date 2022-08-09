import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid_v4 } from 'uuid'

@Entity('users')
export class User {
    readonly className: string = 'Users'
    @PrimaryColumn()
    id: string;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    email: string

    @ManyToMany(type => User)
    @JoinTable({
    name: "follows", // table name for the junction table of this relation
    joinColumn: {
        name: "follower",
        referencedColumnName: "id"
    },
    inverseJoinColumn: {
        name: "following",
        referencedColumnName: "id"
    }
})
    follow: User[]

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    constructor() {
        if(!this.id) {
            this.id = uuid_v4()
        }
    }
}