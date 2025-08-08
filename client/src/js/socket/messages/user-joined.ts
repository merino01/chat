import type { UserJoinedResponse } from "../../../types/message";
import { $messageList, createChatMessage, scrollToBottom } from "../../dom";

export const userJoinedHandler = (message: UserJoinedResponse) => {
	$messageList.innerHTML = "";

	for (const _message of message.messages) {
		const newMessage = createChatMessage(_message);
		$messageList.appendChild(newMessage);
	}

	scrollToBottom($messageList);
}