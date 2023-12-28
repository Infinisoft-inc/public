// reverseServer.ts
import WebSocket, { Server } from 'ws';

const server: Server = new WebSocket.Server({ port: 8888 });

server.on('connection', (socket: WebSocket) => {
    console.log('Client connected.');

    socket.on('message', (data: WebSocket.Data) => {
        console.log('Received message:', data.toString());
        // Send a response back to the client
        socket.send(`Received your message: ${data.toString()}`);
    });

    socket.on('close', () => console.log('Client disconnected.'));
});

console.log('Reverse server running on ws://localhost:8888');
