

const openMicButton = document.getElementById('startButton');
const closeMicButton = document.getElementById('stopButton');
let recognition;

document.addEventListener('DOMContentLoaded', () => {


    // Check if the SpeechRecognition API is available in the browser
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

        recognition.continuous = true; // Enable continuous recognition
        recognition.lang = 'en-US'; // Set the language

        recognition.onresult = (event) => {
            const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase();
            // console.log(transcript);
            UserTalkEvent.dispatch(transcript)

            // Check if the transcript is too short
            // if (transcript.split(" ").length <= 2) {
            //     console.log('Input too short, ignoring: ', transcript);
            //     return; // Do not proceed further
            // }

            // if (isSpeaking) {
            // const currentTime = new Date().getTime()
            // Reset score if it's been too long since the last counted keyword
            // if (lastKeywordTime === null || currentTime - lastKeywordTime > scoreResetTime) {

            //     interruptionScore = 0;
            // }

            // Calculate score
            // for (const keyword in interruptionKeywords) {
            //     if (transcript.includes(keyword)) {
            //         interruptionScore += interruptionKeywords[keyword];
            //         lastKeywordTime = currentTime;
            //     }
            // }

            // // Check if the score threshold is exceeded
            // if (interruptionScore >= scoreThreshold) {
            //     window.speechSynthesis.cancel(); // Stop the speech synthesis
            //     isSpeaking = false;
            //     interruptionScore = 0; // Reset the score
            //     lastKeywordTime = null;
            //     speak("Yep, what's wrong?", true); // Play a prompt
            //     recognition.stop(); // Stop listening to allow the user to hear the prompt
            // }
            // }

            // if (!isSpeaking && !isSimilar(transcript, spokenTexts)) {
            //     think(transcript);
            // } else {
            //     console.log('Echo detected, ignoring input: ', transcript);
            // }
        };

        recognition.onend = () => {
            // if (isSpeaking) {
            window.speechSynthesis.resume(); // Resume the speech synthesis
            //x }

            recognition.start()
        };

        recognition.start(); // Start recognition
        // openMicButton.disabled = true;
    } else {
        text = 'Speech recognition is not supported in this browser.';
    }
});

closeMicButton.addEventListener('click', () => {
    console.log(`stoping`)
    recognition?.stop()
})

const UserTalkEvent = {
    eventName: 'talk',

    // Method to dispatch the event with a message
    dispatch: function (message) {
        const event = new CustomEvent('talk', { detail: { action: 'talk', payload: { text: message } } });
        document.body.dispatchEvent(event);
    },

    // Method to add a listener for the event
    listen: function (callback) {
        document.body.addEventListener(this.eventName, callback);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // WebSocket connection URL
    const wsUrl = 'ws://localhost:8181';

    // Creating a new WebSocket connection
    const socket = new WebSocket(wsUrl);


    UserTalkEvent.listen((data) => {
        console.log(data?.detail)
        const d = JSON.stringify(data?.detail)
        console.log(JSON.parse(d))
        socket.send(d);
    })
    // Connection opened
    socket.addEventListener('open', (event) => {
        console.log('Connected to the server');
    });
    

    class AudioPlaybackQueue {
        constructor() {
            this.queue = [];
            this.isPlaying = false;
        }
    
        enqueue(audioBlob) {
            this.queue.push(audioBlob);
            if (!this.isPlaying) {
                this.playNext();
            }
        }
    
        playNext() {
            if (this.queue.length === 0) {
                this.isPlaying = false;
                return;
            }
    
            this.isPlaying = true;
            const audioBlob = this.queue.shift();
            const audio = new Audio(URL.createObjectURL(audioBlob));
            audio.play();
    
            audio.onended = () => {
                this.playNext();
            };
        }
    }
    
    // Function to convert base64 string to Blob
    function base64ToBlob(base64, mimeType) {
        const byteCharacters = atob(base64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        return new Blob([byteArray], { type: mimeType });
    }
    
    // Initialize the audio playback queue
    const audioQueue = new AudioPlaybackQueue();





    // Listen for messages from the server
    socket.addEventListener('message', (event) => {
        console.log('Message from server ', event.data);

        try {
            const message = JSON.parse(event.data);
    
            if (message.action === 'answer' && message.payload.audio) {
                const audioBase64 = message.payload.audio;
                const audioBlob = base64ToBlob(audioBase64, 'audio/wav');
    
                // Enqueue the audio Blob for playback
                audioQueue.enqueue(audioBlob);
            }
        } catch (error) {
            console.error('Error processing message from server:', error);
        }
    });

    function base64ToBlob(base64, mimeType) {
        const byteCharacters = atob(base64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        return new Blob([byteArray], { type: mimeType });
    }

    // Listen for possible errors
    socket.addEventListener('error', (event) => {
        console.error('WebSocket error:', event);
    });

    // Listen for when the connection is closed
    socket.addEventListener('close', (event) => {
        console.log('WebSocket connection closed:', event);
    });
});