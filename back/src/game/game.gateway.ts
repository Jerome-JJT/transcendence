import { Logger } from "@nestjs/common";
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway({
	cors: {
		origin: ['http://localhost:3000']
	}
})
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {

	@WebSocketServer()
	server: Server;

	//connection
	handleConnection(client: Socket) {
		Logger.log("client Connected:", client.id)
	}

	//deconnexion
	handleDisconnect(client: Socket) {
		Logger.log("client disconnected:", client.id)
	}

	@SubscribeMessage('message')
	handleEvent(@MessageBody() data: string, @ConnectedSocket() client: Socket) {
		//Logger.log("la")
		this.server.emit('message', data, client.id)
	}

	@SubscribeMessage('test')
	testEvent(@MessageBody() @ConnectedSocket() client: Socket) {
		//Logger.log("lo")
		this.server.emit('test', "la")
	}

	@SubscribeMessage('game')
	testpong(@MessageBody() data: string, @ConnectedSocket() client: Socket) {
		Logger.log(data)
		this.server.emit('pong', data)
	}
}