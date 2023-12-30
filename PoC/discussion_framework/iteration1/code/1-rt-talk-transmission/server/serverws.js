const WebSocket = require('ws');

// Create a WebSocket server
const wss = new WebSocket.Server({ host: "127.0.0.1", port: 6667 });

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

console.log('WebSocket server running on ws://127.0.0.1:6667');
