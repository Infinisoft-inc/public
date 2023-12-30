class SpeechRecognitionHandler {
    constructor(onSpeechRecognized) {
        this.onSpeechRecognized = onSpeechRecognized;
    }

    start() {
        if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            this.recognition = new SpeechRecognition();
            this.recognition.continuous = true;
            this.recognition.lang = 'en-US';
            this.recognition.onresult = (event) => {
                const transcript = event.results[event.results.length - 1][0].transcript.trim();
                console.log('Recognized:', transcript);
                this.onSpeechRecognized(transcript);
            };
            this.recognition.onend = () => this.recognition.start(); // Restart on end
            this.recognition.start();
        } else {
            console.error('Speech recognition is not supported in this browser.');
        }
    }
}

class WebSocketHandler {
    constructor(url) {
        this.url = url;
        this.websocket = null;
    }

    connect() {
        this.websocket = new WebSocket(this.url);
        this.websocket.onopen = () => console.log("WebSocket connection established");
        this.websocket.onerror = (error) => console.error("WebSocket error:", error);
        this.websocket.onmessage = (message) => console.log("Message from server:", message.data);
    }

    sendMessage(message) {
        if (this.websocket && this.websocket.readyState === WebSocket.OPEN) {
            this.websocket.send(message);
        } else {
            console.error("WebSocket is not connected.");
        }
    }
}

class ApplicationController {
    constructor(websocketUrl) {
        this.websocketHandler = new WebSocketHandler(websocketUrl);
        this.speechHandler = new SpeechRecognitionHandler(this.handleSpeech.bind(this));
    }

    handleSpeech(transcript) {
        this.websocketHandler.sendMessage(transcript);
    }

    start() {
        this.websocketHandler.connect();
        this.speechHandler.start();
    }
}
