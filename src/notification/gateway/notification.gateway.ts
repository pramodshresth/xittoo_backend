import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class AppGateway {
  @WebSocketServer() server: Server;

  emitNotification(payload: any): void {

    this.server.emit('notifications', {'man': "k cha dath"});
  }
}
