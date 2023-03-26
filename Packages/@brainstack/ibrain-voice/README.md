## iBrainVoice

This module provides an `iBrainVoice` class that enables continuous voice-based streaming interaction with users. It uses Resonsive Voice API and OpenAI API to perform speech-to-text and text-to-speech functionality.

## Usage

```javascript
import iBrainVoice from './iBrainVoice.js';

// Initialize the iBrainVoice instance
const apiKey = 'YOUR_API_KEY';
const ibrain = new iBrainVoice(apiKey);

// Define the onStart and onStop event handlers
const onStart = (event) => {
  console.log('Listening started:', event.type);
};

const onStop = (event) => {
  console.log('Listening stopped:', event.type);
};

// Attach the event handlers to the 'listen.start' and 'listen.stop' events
ibrain.addEventListener('listen.start', onStart);
ibrain.addEventListener('listen.stop', onStop);

// Expose the recorder instance to the global window object
window.ibrain = ibrain
```

## Class Definition

```
import voices from './voices.js';

class iBrainVoice extends EventTarget {
  constructor(apiKey) {
    // ...
  }

  initializeAudioRecording() {
    // ...
  }

  sendToAPI(file) {
    // ...
  }

  setSpeechLanguage(lang) {
    // ...
  }

  speak(message, lang) {
    // ...
  }

  start() {
    // ...
  }

  stop() {
    // ...
  }
}

export default iBrainVoice;
```