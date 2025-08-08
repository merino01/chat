import { randomUUID } from 'node:crypto'
import { WebSocketServer } from 'ws';
import { onMessage } from './handler.js';

function setupWebSocket(server) {
  const wsServer = new WebSocketServer({ server });

  wsServer.on('connection', (socket) => onConnection(wsServer, socket));
}

function onConnection(server, socket) {
	socket.id = randomUUID();
	console.log('New client connected: ' + socket.id);

	socket.on('message', async (message) => {
		await onMessage(server, socket, message);
	});

	socket.on('close', () => {
		console.log('Client disconnected');
	});
}

export default setupWebSocket;
