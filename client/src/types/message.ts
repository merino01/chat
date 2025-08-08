import type { MESSAGE_TYPE } from "../js/socket/message-types";

export type IncomingMessage =
	| ChatMessage
	| UserJoinedResponse;

export interface BasicMessage {
	type: MESSAGE_TYPE;
	userId: string;
	partnerId: string;
	timestamp: number;
}

export interface ChatMessage extends BasicMessage {
	type: MESSAGE_TYPE.CHAT;
	content: string;
}

export interface UserJoinedResponse extends BasicMessage {
	type: MESSAGE_TYPE.USER_JOINED;
	userMessage: string;
	messages: ChatMessage[];
}

export interface UserJoinRequest {
  type: MESSAGE_TYPE.USER_JOINED;
  userId: string;
}
