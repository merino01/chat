import MessageService from "../../services/messages.service.js";
import { addUserSocket } from "../connected-users.js";

export default class LoginHandler {
	async handle(server, socket, data) {
		const { userId, partnerId } = data;

		const messageService = new MessageService();
		const messages = await messageService.getMessagesForPrivateChat(userId, partnerId);

		socket.send(JSON.stringify({
			type: "user_joined",
			userId,
			partnerId,
			messages: JSON.stringify(messages)
		}));

		addUserSocket(userId, socket);
	}
}
