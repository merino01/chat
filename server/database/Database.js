import SQLite from "better-sqlite3";
import { fileURLToPath } from "node:url";
import { join, dirname } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const DATABASE_FILE = join(dirname(__filename), "database.db");

export class Database {
	db;

  constructor() {
    if (!Database.instance) {
      this.db = new SQLite(DATABASE_FILE);
      Database.instance = this;
    }
    return Database.instance;
  }

	static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

	#query(sql, params = [], hasReturn = true) {
		if (!this.db) throw new Error("Database not initialized");
    return hasReturn
			? this.db.prepare(sql).all(params)
			: this.db.prepare(sql).run(params);
  }

  execute(sql = "", params = []) {
    return this.#query(sql, params, false);
  }

	select(sql = "", params = []) {
		return this.#query(sql, params);
	}

  single(sql = "", params = []) {
    if (!this.db) throw new Error("Database not initialized");
    const result = this.#query(sql, params);
    return result > 0 ? result[0] : null;
  }
}
