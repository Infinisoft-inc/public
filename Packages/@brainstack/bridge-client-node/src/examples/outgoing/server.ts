// server.ts
import WebSocket, { Server } from 'ws';

const wss: Server = new WebSocket.Server({ port: 8888 });

wss.on('connection', (ws: WebSocket) => {
  ws.on('message', (message: string) => {
    console.log('Received:', message);
    ws.send(`Echo: ${message}`);
  });

  console.log('A new client connected');
});
