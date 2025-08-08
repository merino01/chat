import { Database } from "../database/Database.js";

const database = new Database();
const db = database.db;
createTables();

function createTables() {
	db.exec(`--sql
		CREATE TABLE IF NOT EXISTS messages (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			userId TEXT NOT NULL,
			partnerId TEXT NOT NULL,
			content TEXT NOT NULL,
			timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
		)
	`);
}
