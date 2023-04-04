import { Entity, Column, PrimaryGeneratedColumn, AfterInsert } from 'typeorm';
import { NotificationGateway } from '../gateway/notification.gateway';


@Entity()
export class NotificationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  message: string;

  // @AfterInsert()
  // sendNotification(): void {
    // const appGateway = new NotificationGateway();
    // appGateway.onNewMessage({ message: this.message });
  // }
}