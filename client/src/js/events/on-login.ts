import { $chatContainer, $loginContainer, $partnerIdInput, $userIdInput } from "../dom";
import { setupWebSocket } from "../socket/socket";

export const onLogin = (event: SubmitEvent) => {
	event.preventDefault();

	const userId = $userIdInput.value.trim();
	const partnerId = $partnerIdInput.value.trim();

	setupWebSocket(userId, partnerId);

	$loginContainer.style.display = "none";
	$chatContainer.style.display = "flex";
}
