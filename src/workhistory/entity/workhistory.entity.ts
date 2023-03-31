import { Injectable } from "@nestjs/common";
import { Exclude } from "class-transformer";
import { User } from "src/user/entity/user.entity";
import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Entity, ManyToOne, JoinColumn } from "typeorm";

@Entity()
export class WorkHistory {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: "user_id" })
    user: User;

    @Column({default:"pending"})
    status: string;

    

    @Column()
    icon_id: string

    @CreateDateColumn()
    created_at: Date;
    

    @CreateDateColumn()
    updated_at: Date;
    // @UpdateDateColumn()
    // updated_at: Date;
}


