const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const app = express();

// Serve static files from a specified directory (e.g., 'public')
app.use(express.static('public'));

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws, req) => {
    const uuid = req.headers['sec-websocket-key']; // A simple way to identify the client
    console.log(`Client connected: ${uuid}`);

    ws.on('message', (data) => {
        console.log(`Received: ${data} from ${uuid}`);
        // Here you can handle incoming messages
    });

    ws.on('close', () => {
        console.log(`Client disconnected: ${uuid}`);
        // Handle client disconnection if needed
    });

    ws.on('error', (error) => {
        console.error(`Error: ${error}`);
        // Handle errors
    });

    // Optionally, you can send a message to the client upon connection
    ws.send('Welcome to the WebSocket server!');
});

server.listen(8181, () => {
    console.log('Server started on http://localhost:8181');
});
