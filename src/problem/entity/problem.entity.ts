import { XittooServices } from "src/xittoo_services/entity/xittoo_services.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Problem {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    per_price: string;

    @Column()
    username: string;

    @Column()
    description: string;

    @Column()
    image_url: string;

    @Column()
    image_id: string


    @ManyToOne(() => XittooServices, (service) => service.id, {})
    @JoinColumn({name: "service_id"})
    xitto_service: XittooServices;


    @CreateDateColumn()
    created_at: Date;

    @CreateDateColumn()
    updated_at: Date;


}