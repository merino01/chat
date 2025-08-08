import { $ } from "../dom";
import { MESSAGE_TYPE } from "../socket/message-types";
import { sendMessage } from "../socket/socket";

const $messageInput = $("#messageInput") as HTMLInputElement;

export const onSendMessage = (event: SubmitEvent) => {
	event.preventDefault();

	const message = {
		type: MESSAGE_TYPE.CHAT,
		content: $messageInput.value.trim()
	};

	sendMessage(message);

	$messageInput.value = "";
	$messageInput.focus();
}
