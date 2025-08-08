import { SOCKET_URL } from "../../consts";
import { getUsers, setUsers } from "./get-users";
import { messageHandler } from "./message-handler";
import { MESSAGE_TYPE } from "./message-types";

let socket: WebSocket | null = null;
let reconnectTimeout: number | null = null;
let reconnectAttempts = 5;

export function setupWebSocket(_userId?: string, _partnerId?: string) {
	socket = new WebSocket(SOCKET_URL);

	let { userId, partnerId } = getUsers();
	userId ||= _userId || "";
	partnerId ||= _partnerId || "";

	if (!userId || !partnerId) {
		console.log({userId, partnerId})
		throw new Error("Both userId and partnerId must be set");
	}

	setUsers(userId, partnerId);

	socket.onopen = () => {
		console.log("Socket connected!");

		if (reconnectTimeout) {
			clearTimeout(reconnectTimeout);
			reconnectTimeout = null;
		}

		sendMessage({
			type: MESSAGE_TYPE.USER_JOINED,
			userId: userId!,
			partnerId: partnerId!
		});

		reconnectAttempts = 5;
	}

	socket.onmessage = (event) => {
		let data;
		try {
			data = JSON.parse(event.data);
		} catch (e) {
			console.error("No se pudo parsear el mensaje:", event.data);
			return;
		}

		messageHandler(data);
	}

	socket.onclose = () => {
		console.log("Disconnected from the server");
		_reconnect();
	}

	socket.onerror = (error) => {
		console.error("WebSocket error:", error);
	}
}

export const sendMessage = (message: any) => {
	if (!socket) {
		throw new Error("Socket is not connected");
	}

	if (!message) {
		throw new Error("Message cannot be empty");
	}

	if (!("type" in message)) {
		throw new Error("Message must have a type");
	}

	if (!Object.values(MESSAGE_TYPE).includes(message.type)) {
		throw new Error(`Invalid message type: ${message.type}`);
	}

	const { userId, partnerId } = getUsers()
	if (!userId || !partnerId) {
		throw new Error("User ID and Partner ID must be set");
	}

	message.userId = userId;
	message.partnerId = partnerId;

	socket.send(JSON.stringify(message));
}

function _reconnect () {
	console.log(`Reconnecting to ws (${reconnectAttempts})...`);

	if (reconnectAttempts <= 0) {
		console.error("Max reconnect attempts reached");
		return;
	}

	reconnectTimeout = setTimeout(() => {
		setupWebSocket();
		reconnectTimeout = null;
		reconnectAttempts--;
	}, 1000 * 2);
}
