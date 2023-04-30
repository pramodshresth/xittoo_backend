import { XittooServices } from "src/xittoo_services/entity/xittoo_services.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('problems')
export class Problem {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    per_price: string;

    @Column()
    description: string;

    @Column()
    image_url: string;

    @Column()
    image_id: string

    @Column({})
    facilate_charge: number

    @ManyToOne(() => XittooServices)
    @JoinColumn({ name: "service_id" })
    xitto_service: XittooServices;


    @Column({ type: 'text', array: true })
    brand: string[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;


}