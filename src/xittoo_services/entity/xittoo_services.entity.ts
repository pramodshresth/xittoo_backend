import { Injectable } from "@nestjs/common";
import { Exclude } from "class-transformer";
import { Vendor } from "src/vendor/entity/vendor.entity";
import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Entity, ManyToOne, JoinColumn } from "typeorm";

@Entity('services')
export class XittooServices {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    icon_url: string;

    @Column()
    icon_id: string

    // @ManyToOne(() => Vendor, vendor => vendor.xitto_service)
    // @JoinColumn({ name: 'vendor_id' })
    // vendors: Vendor;

    @CreateDateColumn()
    created_at: Date;
    

    @CreateDateColumn()
    updated_at: Date;
    // @UpdateDateColumn()
    // updated_at: Date;
}


