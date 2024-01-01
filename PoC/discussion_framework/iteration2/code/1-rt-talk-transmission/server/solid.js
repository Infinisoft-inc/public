const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const axios = require('axios')
const { evaluateSpeechComplete } = require('./evaluateSpeechComplete')
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


/**
 * Focus vs Attention
 * Both has TTL
 * 
 * Focus is the ongoing intention building. AI is waiting for a complete intention before starting to process.
 * Responsability: Decide if we proceed with AI to start think and answer. It's preventing Ai from answering
 * everything it receives something and go nuts. Its also the timing to rengage if user do not talk, AI will
 * rengage to ask if everything is alright.
 * 
 * Attention is everything spoken recently.
 * Keeping  everything spoken prevent echo and unlock continuous monitoring without start stop button or magic word.
 */

/**
 * Manages the focus of ongoing speech input and engages in conversation
 * based on the accumulated text. When the TTL (Time-to-Live) of the focus
 * expires, it triggers a reengagement action to handle partial speech input.
 *
 * @module FocusManager
 */

let focus = ""; // Accumulates the ongoing speech input
let focusTTLTimeout = null; // Timeout ID for focus's TTL

/**
 * Updates the focus with new speech input and resets its TTL.
 * 
 * @param {string} newText - New speech input to add to the focus.
 */
function updateFocus(newText) {
    focus += newText;
    resetFocusTTL();
}

/**
 * Resets the TTL for the focus, calculated based on the current length
 * of the focus string. When TTL expires, it triggers a reengagement action.
 */
function resetFocusTTL() {
    if (focusTTLTimeout) {
        clearTimeout(focusTTLTimeout);
    }

    const ttl = calculateTTL(focus.length) + 3000;
    focusTTLTimeout = setTimeout(triggerReengagement, ttl);
}

/**
 * After intentions are complete and sent. we must clear timeout anm rngegament mecanism until a new intention.
 */
function stopFocus() {
    if (focusTTLTimeout) {
        clearTimeout(focusTTLTimeout);
        focus = ""
    }
}

/**
 * Calculates the TTL based on the length of the text.
 * 
 * @param {number} textLength - Length of the text.
 * @returns {number} TTL in milliseconds.
 */
function calculateTTL(textLength) {
    const minutes = textLength / AVERAGE_CPM;
    return (minutes * 60 * 1000) + 10000
}

/**
 * Triggers a reengagement action when the TTL expires and clears the focus.
 * The outcome of this action should be managed by the AI or relevant logic.
 */
function triggerReengagement() {
    if (focus.length > 0) {
        sendReengageAction(focus);
        // Optional: Decide how to manage focus after reengagement
        // For example, clear focus or keep it for further processing
        focus = ""; // Clear focus if required
    }
    focusTTLTimeout = null;
}

/**
 * Sends a reengagement action with the current partial focus.
 * 
 * @param {string} partialIntention - Partial speech input accumulated in focus.
 */
function sendReengageAction(partialIntention) {
    // Logic to send the reengage action to AI or relevant system
    console.log(`Reengaging with partial intention: ${partialIntention}`);
    // Example: WebSocket broadcast to AI service
    // broadcastReengageAction(partialIntention);
}

// Additional utility functions like broadcastReengageAction would be defined here.



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

                // Process the transcript as it's not similar
                const rawSpeech = sanitizeStringForTextToSpeech(message.payload.text)
                broadcastUpdatedData()
                // Evakuate spoech coimpelkte or not..
                // if spech incomplete lets wait. but we nned to store this one.
                if (!validation(rawSpeech)) {
                    console.log(`Validation failed!`)
                    break
                }

                updateFocus(rawSpeech)
                addAttention(rawSpeech);
                const structured_though = preLogic(focus)
                const reasoned_though = await reasoning(structured_though)
                const decent_answer = postLogic(reasoned_though)
                addAttention(decent_answer)

                // Process the 'talk' action
                // processTalkAction(message.payload);
                // After processing, broadcast the updated data

                // TTS
                const audioBuffer = await handleAudioRequest(decent_answer);
                const audioBase64 = audioBuffer.toString('base64');
                ws.send(JSON.stringify({ action: "answer", payload: { audio: audioBase64 } }));
                stopFocus()
                broadcastUpdatedData();

            } catch (error) {
                console.error('Error handling talk action:', error);
            }
            break;
        // Add other cases as needed
        default:
            console.log('Unknown action:', message.action);
    }
}

function sanitizeStringForTextToSpeech(str) {
    // Regular expression to match inline code (single backtick) and code blocks (triple backticks)
    const codeRegex = /`{1,3}[\s\S]*?`{1,3}/g;

    // Replace code blocks and inline code with "the following code"
    return str.replace(codeRegex, ' the following code ')
        .replace(/\n/g, ' '); // Replace new lines with spaces
}

function preLogic(transcript) {
    const structured_though = sanitizeStringForTextToSpeech(transcript)
    return structured_though
}

async function reasoning(structured_though) {
    const prompt = structured_though
    const result = await axios.post('https://api.together.xyz/inference', {
        "model": "togethercomputer/llama-2-70b-chat",
        "max_tokens": 250,
        "prompt": "",
        "prompt": `[INST] {${prompt}} [/INST]`,
        "temperature": 0.7,
        "top_p": 0.7,
        "top_k": 50,
        "repetition_penalty": 1,
        "stream_tokens": false,
        "stop": [
            "[/INST]",
            "</s>"
        ],
        "negative_prompt": "",
        "sessionKey": "703a5956-a596-4f5e-a754-c5f857a11683",
        "type": "chat"
    }, {
        headers: {
            Authorization: 'Bearer b2e41bb3d206fac6ec61e76e96f53574235a41be47452f70f6b5b11117f52ffc'
        }
    })

    console.log(result?.data?.output?.choices?.[0]?.text)

    const reasoned_though = result?.data?.output?.choices?.[0]?.text

    return reasoned_though
}

function postLogic(reasoned_though) {
    const decent_answer = sanitizeStringForTextToSpeech(reasoned_though)

    return decent_answer
}


function broadcastUpdatedData() {
    const data = {
        action: 'update',
        payload: {
            focus: focus,
            spokenTexts: spokenTexts.map(item => item.text) // Sending only the text part
        }
    };

    clients.forEach(clientData => {
        safeSendMessage(clientData.ws, data);
    });
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




/**
 * Manages the attention span of spoken texts in a conversation.
 * 
 * The purpose of this algorithm is to keep track of recent spoken texts
 * and maintain them for a duration that is proportional to their length.
 * This duration is calculated based on the average speaking speed of a human.
 * 
 * Longer texts are assumed to take more time to speak and thus are kept in focus
 * for a longer period. The algorithm uses a dynamic TTL (Time-to-Live) for each
 * item based on its length. The TTL is calculated in milliseconds.
 * 
 * The spoken texts are stored in an array with their timestamp, and each item
 * is automatically removed from the array after its TTL expires.
 * 
 * @module SpokenTextAttentionManager
 */

/**
 * Average characters per minute (cpm) based on typical human speech.
 * @constant {number}
 */
const AVERAGE_CPM = 700; // Adjust this based on your target audience

/**
 * Calculates the Time-to-Live (TTL) for a given text based on its length.
 * The TTL is the time for which the text should remain in focus, calculated
 * in milliseconds. The calculation is based on the average speaking speed
 * (characters per minute).
 * 
 * @param {number} textLength - The length of the text in characters.
 * @returns {number} The calculated TTL in milliseconds.
 */
function calculateTTL(textLength) {
    const minutes = textLength / AVERAGE_CPM;
    return (minutes * 60 * 1000)*2 // Convert minutes to milliseconds
}

/**
 * Array to store spoken texts along with their timestamp.
 * @type {Array.<{text: string, timestamp: number}>}
 */
let spokenTexts = [];

/**
 * Adds a spoken text to the attention manager. Each text is given a TTL
 * based on its length. After the TTL expires, the text is automatically
 * removed from the focus.
 * 
 * @param {string} transcript - The spoken text to be added.
 */
function addAttention(transcript) {
    const item = { text: transcript, timestamp: Date.now() };
    spokenTexts.push(item);

    const ttl = calculateTTL(transcript.length);
    setTimeout(() => {
        removeItem(item);
        broadcastUpdatedData();
    }, ttl);
}

/**
 * Removes a specified item from the spoken texts array.
 * 
 * @param {{text: string, timestamp: number}} itemToRemove - The item to be removed.
 */
function removeItem(itemToRemove) {
    spokenTexts = spokenTexts.filter(item => item !== itemToRemove);
}




function validation(transcript) {
    let isValid = String(transcript).length > 0

    if (isSimilar(transcript)) {
        console.log("Dropped similar transcript:", transcript);
        return false
    }

    if (!evaluateSpeechComplete(focus + " " + transcript)) {
        console.log("Speech incomplete waiting for more. transcript:", transcript);
        return false
    }

    return isValid
}

function removeItem(itemToRemove) {
    spokenTexts = spokenTexts.filter(item => item !== itemToRemove);
}

function isSimilar(transcript) {
    // Normalize transcript: lower case and remove punctuation
    const normalizedTranscript = transcript.toLowerCase().replace(/[^\w\s]/gi, '');
    const uniqueWords = new Set(normalizedTranscript.split(/\s+/));

    if (spokenTexts.length > 0) {
        const lastSpokenText = spokenTexts[spokenTexts.length - 1].text.toLowerCase().replace(/[^\w\s]/gi, '');
        const segmentLength = 100; // Length of each segment to compare, adjust as needed
        let maxSimilarity = 0;

        for (let i = 0; i < normalizedTranscript.length; i += segmentLength) {
            const transcriptSegment = new Set(normalizedTranscript.substring(i, i + segmentLength).split(/\s+/));
            let matchCount = 0;

            transcriptSegment.forEach(word => {
                if (lastSpokenText.includes(word)) {
                    matchCount++;
                }
            });

            const similarityPercentage = transcriptSegment.size > 0 ? (matchCount / transcriptSegment.size) * 100 : 0;
            maxSimilarity = Math.max(maxSimilarity, similarityPercentage);
        }

        console.log(`Maximum Similarity Percentage: ${maxSimilarity}%`);
        return maxSimilarity > getDynamicThreshold(normalizedTranscript); // Dynamic threshold based on length
    }

    return false;
}

function getDynamicThreshold(transcript) {
    // Adjust this function to return a threshold based on the transcript length
    if (transcript.length < 100) return 50; // Example threshold values
    if (transcript.length < 500) return 60;
    return 70; // Higher threshold for longer texts
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
