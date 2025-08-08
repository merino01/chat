import type { IncomingMessage } from "../../types/message";
import { MESSAGE_TYPE } from "./message-types";
import { chatMessageHandler } from "./messages/chat";
import { userJoinedHandler } from "./messages/user-joined";

const messageTypes = {
	[MESSAGE_TYPE.CHAT]: chatMessageHandler,
	[MESSAGE_TYPE.USER_JOINED]: userJoinedHandler
} as const;

export const messageHandler = (message: IncomingMessage) => {
	if (!message || !message.type) {
		console.error("Mensaje inválido:", message);
		return;
	}

	if (!(message.type in messageTypes)) {
		console.error(`Tipo de mensaje desconocido: ${message.type}`);
		return;
	}

	if ("messages" in message && typeof message.messages === "string") {
		message.messages = JSON.parse(message.messages);
	}

	const handler = messageTypes[message.type];
	if (handler) {
		handler(message as any);
	}
}
