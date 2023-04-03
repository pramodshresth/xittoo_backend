import { Entity, Column, PrimaryGeneratedColumn, AfterInsert } from 'typeorm';
import { AppGateway } from '../gateway/notification.gateway';


@Entity()
export class otification {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  message: string;

  @AfterInsert()
  sendNotification(): void {
    const appGateway = new AppGateway();
    appGateway.emitNotification({ message: this.message });
  }
}