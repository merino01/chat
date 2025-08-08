import { MessageHandler } from "./message-handler.js";
import MessageService from "../../services/messages.service.js";
import { getUserSocket } from "../connected-users.js";

export default class ChatMessageHandler extends MessageHandler {
	handle(server, socket, data) {
		const { id, userId, partnerId, content } = data;

		const messageService = new MessageService();
		const { success, error } = messageService.createMessage(userId, partnerId, content);
		if (!success) {
			console.error('Error creating message:', error);
			return;
		}

		// Enviar el mensaje al socket del usuario con el que está chateando
		const partnerSocket = getUserSocket(partnerId);
		if (partnerSocket && partnerSocket.readyState === partnerSocket.OPEN) {
			partnerSocket.send(JSON.stringify(data));
		}

		// Enviar el mensaje al socket del usuario que lo envió
		if (socket.readyState === socket.OPEN) {
			socket.send(JSON.stringify(data));
		}
	}
}
