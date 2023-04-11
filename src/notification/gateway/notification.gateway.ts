import { OnModuleInit } from '@nestjs/common';
import { MessageBody, OnGatewayConnection, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';


@WebSocketGateway()
export class NotificationGateway implements OnModuleInit, OnGatewayConnection , OnGatewayInit {

  clients = [];
  afterInit(server: any) {
    this.clients =server.clients;
  }

  handleConnection(client: Socket, ...args: any[]) {
    const userId = client.handshake.query.id;
    console.log(userId);
    this.userIdToSocketMap.set(`${userId}`, client);
    client.data['userId'] =userId;
    // client.data.userId =  userId;

 
    
  }


  @WebSocketServer() server: Server
  userIdToSocketMap = new Map<string, Socket>();

  

  onModuleInit() {
    this.server.on('connection', (socket)=>{
      console.log(socket.id);
      console.log('Connected');
      
      
    })
  }

  @SubscribeMessage('newMessage')
  onNewMessage(@MessageBody() body: any){
    console.log(this.server.socketsJoin.name);
    const targetClient = this.server['userId'];

    const client = this.userIdToSocketMap.get("manila");
    // this.server.emit('onMessage', {
    //   msg: "New Message",
    //   a: body
    // })
    console.log(targetClient);
    
    if(client){
      client.emit('onMessage', {
        msg: "New Message",
        a: body
      });  
    }
  }

}
