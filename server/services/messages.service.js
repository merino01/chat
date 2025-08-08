import { Database } from "../database/Database.js";

export default class MessageService {
	constructor() {
		this.db = Database.getInstance();
	}

	async createMessage(userId, partnerId, content) {
		try {
			await this.db.execute("INSERT INTO messages (userId, partnerId, content) VALUES (?, ?, ?)", [userId, partnerId, content]);
			return { success: true };
		} catch (error) {
			console.error("Error creating message:", error);
			return { success: false, error: error.message };
		}
	}

	async getMessagesByUserId(userId) {
		try {
			return await this.db.select("SELECT * FROM messages WHERE userId = ?", [userId]);
		} catch (error) {
			console.error("Error fetching messages:", error);
			return [];
		}
	}

	async getMessagesForPrivateChat(userId, partnerId) {
		try {
			const sql = `SELECT userId, partnerId, content, timestamp FROM messages WHERE (userId = ? AND partnerId = ?) OR (userId = ? AND partnerId = ?)`;
			return await this.db.select(sql, [userId, partnerId, partnerId, userId]);
		} catch (error) {
			console.error("Error fetching messages:", error);
			return [];
		}
	}
}