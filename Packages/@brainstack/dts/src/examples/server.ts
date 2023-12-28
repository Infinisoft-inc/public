// reverseServer.ts
import WebSocket, { Server } from 'ws';

const server = new Server({ port: 8888 });

server.on('connection', (socket) => {
    console.log('Client connected.');

    socket.on('message', data => {
        console.log('Received message:', data);
        
        // Broadcast to all clients except the sender
        server.clients.forEach(client => {
            if (client !== socket && client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(data));
            }
        });
    });

    socket.on('close', () => console.log('Client disconnected.'));
});

console.log('Reverse server running on ws://localhost:8888');
