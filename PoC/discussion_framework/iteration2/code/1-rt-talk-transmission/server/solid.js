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

    console.log("Client connected: ", uuid)

    ws.on('message', (data) => {
        try {
            console.log(data.toString('utf8'))
            const message = JSON.parse(data.toString('utf8'))
            console.log(message)
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

    // safeSendMessage(ws, { action: 'welcome', payload: 'Welcome to the WebSocket server!' });how could we define 
});


async function handleIncomingMessage(ws, message) {
    switch (message.action) {
        case 'broadcast':
            broadcast(message.payload, ws);
            break;
        case 'private_message':
            sendMessageToClient(message.payload.targetUuid, message.payload.message);
            break;
        case 'talk':
            console.log('Talk action received:', message.payload);
            try {
                // Check if the transcript is similar to the previous ones
                if (!isSimilar(message.payload.text)) {
                    // Process the transcript as it's not similar
                    onNewTranscript(message.payload.text);
                    const audioBuffer = await handleAudioRequest(message.payload.text);
                    const audioBase64 = audioBuffer.toString('base64');
                    ws.send(JSON.stringify({ action: "answer", payload: { audio: audioBase64 } }));
                } else {
                    console.log("Dropped similar transcript:", message.payload.text);
                }
            } catch (error) {
                console.error('Error handling talk action:', error);
            }
            break;
        // Add other cases as needed
        default:
            console.log('Unknown action:', message.action);
    }
}


async function handleAudioRequest(text) {
    try {
        const audioBuffer = await postTextAndGetAudio(text);
        return audioBuffer;
    } catch (error) {
        console.error(error);
        throw error; // Propagate the error
    }
}

async function postTextAndGetAudio(text) {
    const url = 'http://127.0.0.1:5000/tts';
    const data = { text: text };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Get the response as an ArrayBuffer and convert it to a Node.js Buffer
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = Buffer.from(arrayBuffer);
        return audioBuffer;
    } catch (error) {
        console.error('Error during fetch:', error);
        throw error; // Propagate the error
    }
}



let spokenTexts = []; // Array to store spoken texts
const ttl = 60000; // Time-to-live in milliseconds (e.g., 60000ms = 1 minute)

function onNewTranscript(transcript) {
    if (isSimilar(transcript)) {
        console.log("Echo detected.");
        // Handle the echo (e.g., ignore the transcript, notify the user, etc.)
    } else {
        // Add the transcript to spokenTexts with a timestamp
        const item = { text: transcript, timestamp: Date.now() };
        spokenTexts.push(item);

        // Set a timeout to remove the item after TTL
        setTimeout(() => {
            removeItem(item);
        }, ttl);

        // Continue processing the transcript
        // ...
    }
}

function removeItem(itemToRemove) {
    spokenTexts = spokenTexts.filter(item => item !== itemToRemove);
}

function isSimilar(transcript) {
    const uniqueWords = new Set(transcript.trim().toLowerCase().split(/\s+/));
    let matchCount = 0;
    let similarityPercentage = 0;

    // Consider only the last spoken text for echo detection
    if (spokenTexts.length > 0) {
        const lastSpokenText = spokenTexts[spokenTexts.length - 1];
        const lastSpokenWords = new Set(lastSpokenText.text.trim().toLowerCase().split(/\s+/));

        uniqueWords.forEach(word => {
            if (lastSpokenWords.has(word)) {
                matchCount++;
            }
        });

        const totalUniqueWords = uniqueWords.size;
        similarityPercentage = totalUniqueWords > 0 ? (matchCount / totalUniqueWords) * 100 : 0;
    }

    console.log(`Similarity Percentage: ${similarityPercentage}%`);
    return similarityPercentage > 50; // Adjust this threshold as needed
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
