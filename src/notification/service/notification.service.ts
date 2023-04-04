// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// // import { otification } from '../entity/notification.entity';
// // import { Notification } from './notification.entity';

// @Injectable()
// export class NotificationService {
//   constructor(@InjectRepository(otification) private notificationRepository: Repository<otification>) {}

//   async createNotification(message: string) {
//     const notificatio = this.notificationRepository.create({message});
//     return this.notificationRepository.save(notificatio);
//   }
// }
