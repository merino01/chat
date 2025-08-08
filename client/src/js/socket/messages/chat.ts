import type { ChatMessage } from "../../../types/message";
import { $messageList, createChatMessage, insertUnreadSeparator, isScrolledToBottom, scrollToBottom } from "../../dom";
import { getUsers } from "../get-users";

export const chatMessageHandler = (message: ChatMessage) => {
	const newMessage = createChatMessage(message);

	if (!_isSelf(message)) {
		if (isScrolledToBottom($messageList)) {
			scrollToBottom($messageList);
		} else {
			insertUnreadSeparator();
		}
	} else {
		scrollToBottom($messageList);
	}

	$messageList.appendChild(newMessage);
}

function _isSelf (message: ChatMessage) {
	return message.userId === getUsers().userId;
}