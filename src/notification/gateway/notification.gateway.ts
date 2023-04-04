import { OnModuleInit } from '@nestjs/common';
import { MessageBody, OnGatewayConnection, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class NotificationGateway implements OnModuleInit, OnGatewayConnection   {

  handleConnection(client: Socket, ...args: any[]) {
    const userId = client.handshake.query.userId;
    console.log(userId);

    client.data.userId =  userId;

    const matchingSockets = Array.from(this.server.sockets.sockets.values())
        .filter(s => s.data.user && s.data.userId === userId);

      matchingSockets.forEach(s => {
        s.emit('event', { message: 'Hello, world!' });
      });
    
  }


  @WebSocketServer()
  server: Server

  onModuleInit() {
    this.server.on('connection', (socket)=>{
      console.log(socket.id);
      console.log('Connected');
      
      
    })
  }

  @SubscribeMessage('newMessage')
  onNewMessage(@MessageBody() body: any){
    console.log(body);
    this.server.emit('onMessage', {
      msg: "New Message",
      a: body.msg
    });  
  }

}
