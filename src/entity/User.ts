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

    @ManyToMany(() => User)
    @JoinTable({
        name: "friend_request",
        joinColumn: {
            name: "sender",
            referencedColumnName: "id",
            foreignKeyConstraintName: "fk_user_user_sender"
        },
        inverseJoinColumn: {
            name: "receiver",
            referencedColumnName: "id",
            foreignKeyConstraintName: "fk_user_user_cereiver"
        }
    })
    friendRequest: User[]

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