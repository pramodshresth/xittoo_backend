import { Injectable } from "@nestjs/common";
import { Exclude } from "class-transformer";
import { User } from "src/user/entity/user.entity";
import { Vendor } from "src/vendor/entity/vendor.entity";
import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Entity, ManyToOne, JoinColumn, OneToOne } from "typeorm";

@Entity()
export class WorkHistory {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: "req_by" })
    user: User;

    @ManyToOne(() => Vendor,{nullable:true})
    @JoinColumn({ name: "assign_to" })
    vendor: Vendor;

    @Column({default:"pending"})
    status: string;

    @CreateDateColumn()
    created_at: Date;
    
    @UpdateDateColumn()
    updated_at: Date;
    // @UpdateDateColumn()
    // updated_at: Date;
}


