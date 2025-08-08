import { fileURLToPath } from 'node:url';
import { createServer } from 'node:http';
import path from 'node:path';
import express from "express";
import setupWebSocket from "./ws/socket.js";

const __dirname = path.dirname(
	fileURLToPath(import.meta.url)
);

const port = process.env.PORT ?? 3000;

const app = express();
const server = createServer(app);

const frontendPath = path.join(__dirname, '..', 'client', 'dist');
app.use(express.static(frontendPath));
app.get("{*splat}", async (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

setupWebSocket(server);

server.listen(port);
