import type { ChatMessage } from "../types/message";
import { getUsers } from "./socket/get-users";

export const $ = (selector: string) => document.querySelector(selector);
export const $$ = (selector: string) => document.querySelectorAll(selector);

export const $messageForm = $("#messageForm") as HTMLFormElement;
export const $messageInput = $("#messageInput") as HTMLInputElement;
export const $userIdInput = $("#userIdInput") as HTMLInputElement;
export const $partnerIdInput = $("#partnerIdInput") as HTMLInputElement;
export const $loginForm = $("#loginForm") as HTMLFormElement;
export const $loginContainer = $("#loginContainer") as HTMLDivElement;
export const $chatContainer = $(".chat-container") as HTMLDivElement;
export const $messageList = $("#messageList") as HTMLUListElement;

export function scrollToBottom (element: Element): void {
	element.scrollTop = element.scrollHeight;
}

export function insertUnreadSeparator (): void {
  if ($(".unread-separator")) return;

  const separator = document.createElement("li");
  separator.className = "unread-separator";
  separator.textContent = "Mensajes sin leer";
  $messageList.appendChild(separator);
}

export function isScrolledToBottom (element: Element): boolean {
  return element.scrollHeight - element.scrollTop <= element.clientHeight + 2;
}

export function removeUnreadSeparator(): void {
  const separator = $(".unread-separator");
  if (separator) separator.remove();
}

export function createChatMessage (message: ChatMessage): HTMLLIElement {
	const date = new Date(message.timestamp);
  const messageDate = date.toLocaleString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });

	const { userId } = getUsers();
	const isFromUser = userId === message.userId;

	const messageElement = document.createElement("li");
	messageElement.classList.add("message", isFromUser ? "user" : "partner");
	messageElement.innerHTML = `
		<header>
			<span class="message-user">${message.userId}</span>
			<span class="message-date">${messageDate}</span>
		</header>
		<span class="message-content">${message.content}</span>
	`;
	return messageElement;
}