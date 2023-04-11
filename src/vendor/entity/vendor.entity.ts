import { User } from "src/user/entity/user.entity";
import { XittooServices } from "src/xittoo_services/entity/xittoo_services.entity";
import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Entity, OneToMany, JoinColumn, OneToOne } from "typeorm";

@Entity()
export class Vendor {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(() => User, { cascade: true, onDelete: 'CASCADE' })
    @JoinColumn({name: "user_id"})
    user: User;
    
    @OneToMany(() => XittooServices, xitto_service => xitto_service.vendors, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: "services" })
    xitto_service: XittooServices[];

    @Column()
    availability: string

    @Column()
    level_of_assistance: string

    @Column()
    daily_bill: string

    @Column()
    experience: string

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}


