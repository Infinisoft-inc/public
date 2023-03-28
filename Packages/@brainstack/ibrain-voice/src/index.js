import voices from "./voices.js";
import responsiveVoice from "responsivevoice";
export { voices };

export class iBrainVoice extends EventTarget {
  constructor({
    options = {},
    knowledge = "",
    voice = "OK English Male",
    lang = "en-US",
    decision: decisionAction = (a) => a,
    key,
  }) {
    super();
    this.isRecording = false;
    this.chunks = [];
    this.conversationHistory = [];
    this.lang = lang;
    this.options = options;
    this.voice = voice;
    this.knowledge = knowledge;
    this.decsionAction = decisionAction;
    this.key = key;

    this.initializeAudioRecording();
    this.initializeVoice(this.key);
  }

  initializeAudioRecording() {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const audioContext = new AudioContext();
      const source = audioContext.createMediaStreamSource(stream);
      const processor = audioContext.createScriptProcessor(1024, 1, 1);
      source.connect(processor);
      processor.connect(audioContext.destination);
      processor.onaudioprocess = (e) => {
        if (
          e.inputBuffer.getChannelData(0).reduce((a, s) => a + Math.abs(s), 0) /
            1024 <
          0.05
        ) {
          if (this.isRecording && Date.now() - this.silenceStartTime >= 2000) {
            this.isRecording = false;
            this.recorder.stop();
          }
        } else {
          if (!this.isRecording) {
            this.isRecording = true;
            this.chunks = [];
            this.recorder = new MediaRecorder(stream);
            this.recorder.ondataavailable = (e) => this.chunks.push(e.data);
            this.recorder.onstop = () => {
              const blob = new Blob(this.chunks, { type: "audio/webm" });
              this.analyze(
                new File([blob], "recording.webm", { type: "audio/webm" })
              );
            };
            this.recorder.start();
          }
          this.silenceStartTime = Date.now();
        }
      };
    });
  }

  initializeVoice(key) {
    this.isResponsiveVoiceLoaded = false;

    // Callback function to be called when the ResponsiveVoice script is loaded
    const onScriptLoad = () => {
      this.isResponsiveVoiceLoaded = true;
    };

    // Check if the script has already been added
    const existingScript = document.getElementById("responsivevoice-script");
    if (!existingScript) {
      // Create a new script element
      const script = document.createElement("script");
      script.src = `https://code.responsivevoice.org/responsivevoice.js?key=${key}`;
      script.id = "responsivevoice-script";
      script.async = true;
      script.onload = onScriptLoad;
      // Append the script element to the document head
      document.head.appendChild(script);
    } else {
      // If the script is already added, set the state to true
      this.isResponsiveVoiceLoaded = true;
    }
  }

  // The speak function to synthesize speech from text
  speak(text) {
    if (this.isResponsiveVoiceLoaded && window.responsiveVoice) {
      // Use the speak function from the ResponsiveVoice API
      window.responsiveVoice.speak(text);
    }
  }

  analyze(file) {
    const formData = new FormData();
    formData.append("file", file);
    fetch(this.knowledge, {
      ...this.options,
      mode: "cors",
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((thought) => {
        this.decsionAction(thought);
      })
      .catch((err) => {
        console.log(`decsionAction Failed `, err);
      })
      .finally(() => {
        this.start();
      });
  }

  setSpeechLanguage(lang) {
    if (lang) {
      this.lang = lang;
      this.voice = voices?.[lang]?.male || this.voice;
    }
  }

  speak(message, lang) {
    if (!responsiveVoice.isPlaying()) {
      responsiveVoice.speak(message, this.voices?.[lang]?.male || this.voice);
    }
  }

  start() {
    this.dispatchEvent(new CustomEvent("listen.start"));
  }

  stop() {
    this.dispatchEvent(new CustomEvent("listen.stop"));
  }
}
