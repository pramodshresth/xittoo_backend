import { Injectable } from "@nestjs/common";
import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Entity } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    username: string;

    @Column()
    phone: string;

    @Column()
    password: string;

    @Column({nullable: true})
    profile_url: string

    @Column()
    gender: string

    @Column()
    address: string

    @Column()
    district: string
 
    @CreateDateColumn()
    created_at: Date;

    @CreateDateColumn()
    updated_at: Date;

    @Column({default: 0})
    reward_points: number

    @Column({default: 'user'})
    role: string

    @Column()
    invite_code: string

    // @UpdateDateColumn()
    // updated_at: Date;
}


