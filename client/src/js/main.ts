import { $loginForm, $messageForm } from "./dom";
import { onLogin } from "./events/on-login";
import { onSendMessage } from "./events/on-send-message";

$loginForm.addEventListener("submit", onLogin);
$messageForm.addEventListener("submit", onSendMessage);
