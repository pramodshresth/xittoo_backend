import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Entity } from "typeorm";

@Entity('user')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    username: string;

    @Column()
    mobile: string;

    @Column()
    password: string;

    @Column({nullable: true})
    profile_url: string


    @Column()
    gender: string

    @Column()
    locaton: string

    @Column()
    district: string
 
    @CreateDateColumn()
    created_at: Date;

    @Column({
        default: 0
        })
    reward_points: Number

    // @UpdateDateColumn()
    // updated_at: Date;
}