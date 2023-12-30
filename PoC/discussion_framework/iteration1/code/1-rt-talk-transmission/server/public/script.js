

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
        socket.send({ action: 'talk', payload: 'Hi my name is steve!' });

    })
    // Connection opened
    socket.addEventListener('open', (event) => {
        console.log('Connected to the server');
        socket.send(JSON.stringify({ action: 'talk', payload: 'Hi my name is steve!' }))
        // You can send messages to server once the connection is open
    });
``
    // Listen for messages from the server
    socket.addEventListener('message', (event) => {
        console.log('Message from server ', event.data);
    });

    // Listen for possible errors
    socket.addEventListener('error', (event) => {
        console.error('WebSocket error:', event);
    });

    // Listen for when the connection is closed
    socket.addEventListener('close', (event) => {
        console.log('WebSocket connection closed:', event);
    });
});