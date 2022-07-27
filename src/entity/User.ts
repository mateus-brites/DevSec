import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
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