import voices from "./voices.js";

export {voices}

export class iBrainVoice extends EventTarget {
  constructor({
    options = {},
    knowledge = "",
    voice = "OK English Male",
    lang = "en-US",
    decision: decisionAction = (a) => a,
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

    this.initializeAudioRecording();
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
