import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Otp {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    phone_number: string;

    @Column()
    otp: string;

    @CreateDateColumn()
    created_at: Date;
}


