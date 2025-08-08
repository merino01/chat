import sqlite3 from "sqlite3";
import { fileURLToPath } from "node:url";
import { join, dirname } from "node:path";
import { promisify } from "node:util";

const __filename = fileURLToPath(import.meta.url);
const DATABASE_FILE = join(dirname(__filename), "database.db");

export class Database {
  static instance;
  db;

  constructor() {
    if (!Database.instance) {
      this.db = new sqlite3.Database(DATABASE_FILE);
      // Promisificar métodos
      this.dbAll = promisify(this.db.all).bind(this.db);
      this.dbGet = promisify(this.db.get).bind(this.db);
      this.dbRun = promisify(this.db.run).bind(this.db);
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

  async select(sql = "", params = []) {
    return await this.dbAll(sql, params);
  }

  async single(sql = "", params = []) {
    return await this.dbGet(sql, params);
  }

  async execute(sql = "", params = []) {
    return await this.dbRun(sql, params);
  }
}