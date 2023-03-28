import { Injectable } from "@nestjs/common";
import { Exclude } from "class-transformer";
import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Entity } from "typeorm";

@Entity()
export class XittooServices {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    icon_url: string;

    @Column()
    icon_id: string

    @CreateDateColumn()
    created_at: Date;

    @CreateDateColumn()
    updated_at: Date;
    // @UpdateDateColumn()
    // updated_at: Date;
}


