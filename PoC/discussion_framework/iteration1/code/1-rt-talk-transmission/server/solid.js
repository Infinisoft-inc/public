const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
app.use(express.static('public'));

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Map to store client data
const clients = new Map();

wss.on('connection', (ws, req) => {
    const uuid = req.headers['sec-websocket-key'];
    clients.set(uuid, { ws: ws, metadata: {} });
    ws.uuid = uuid;

    ws.on('message', (data) => {
        try {
            console.log(data)

            // Ensure that 'data' is a string before parsing
            const message = (typeof data === 'string') ? JSON.parse(data) : JSON.parse(data);
            if (message && message.action && message.payload) {
                handleIncomingMessage(ws, message);
            } else {
                throw new Error('Invalid message format');
            }
        } catch (e) {
            console.error('Error processing message:', e);
        }
    });

    ws.on('close', () => {
        clients.delete(uuid);
    });

    ws.on('error', (error) => {
        console.error(`WebSocket error: ${error}`);
    });

    safeSendMessage(ws, { action: 'welcome', payload: 'Welcome to the WebSocket server!' });
});

function handleIncomingMessage(ws, data) {
    let message;
    try {
        message = data//JSON.parse(data);
    } catch (e) {
        console.error('Invalid JSON:', e);
        return;
    }

    switch (message.action) {
        case 'broadcast':
            broadcast(message.payload, ws);
            break;
        case 'private_message':
            sendMessageToClient(message.payload.targetUuid, message.payload.message);
            break;
        case 'talk':
            // Handle 'talk' action
            console.log('Talk action received:', message.payload);
            break;
        // Add other cases as needed
        default:
            console.log('Unknown action:', message.action);
    }
}


function sendMessageToClient(uuid, message) {
    const clientData = clients.get(uuid);
    if (clientData) {
        safeSendMessage(clientData.ws, { action: 'private_message', payload: message });
    } else {
        console.log(`Client not found: ${uuid}`);
    }
}

function broadcast(message, senderWs) {
    clients.forEach(clientData => {
        if (clientData.ws !== senderWs) {
            safeSendMessage(clientData.ws, { action: 'broadcast', payload: message });
        }
    });
}

// Send a message safely to a WebSocket client
function safeSendMessage(ws, message) {
    if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(message));
    } else {
        console.log('WebSocket is not open. Message not sent.');
    }
}

server.listen(8181, () => {
    console.log('Server started on port 8181');
});






serializeMessage = (message) => {
    console.log.verbose(`Serializing message:`, message);
    return JSON.stringify(message);
}

deserializeMessage = (
    data
) => {
    let jsonData;

    if (typeof data === 'string') {
        if (!isJsonString(data)) {
            console.log.error('Invalid JSON string:', data);
            return null;
        }
        jsonData = data;
    } else if (data instanceof Buffer) {
        jsonData = data.toString('utf-8');
    } else if (
        Array.isArray(data) &&
        data.every((element) => element instanceof Buffer)
    ) {
        const combinedBuffer = Buffer.concat(data);
        jsonData = combinedBuffer.toString('utf-8');
    } else if (data instanceof ArrayBuffer) {
        jsonData = new TextDecoder().decode(data);
    } else {
        console.error('Received message data in an unsupported format:', data);
        return null;
    }

    try {
        console.verbose(`Deserializing message: `, jsonData);
        const message = JSON.parse(jsonData);
        return message;
    } catch (error) {
        console.error('Error parsing message:', error);
        return null;
    }
}

const isJsonString = (data) => {
    try {
        JSON.parse(data);
        return true;
    } catch (err) {
        return false;
    }
};
