import ChatMessageHandler from "./messages/chat-messages.js";
import LoginHandler from "./messages/login.handler.js";

const handlers = {
	chat: new ChatMessageHandler(),
	user_joined: new LoginHandler()
};

export const onMessage = (server, socket, message) => {
	let data;
	try {
		data = JSON.parse(message);
	} catch (error) {
		console.error('Invalid message: ', error);
		return;
	}

	const handler = handlers[data.type];
	if (handler) {
		handler.handle(server, socket, data);
	}
};

export const onClose = () => {
	console.log('Client disconnected');
}