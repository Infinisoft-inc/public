import voices from "./voices.js";

export class iBrainVoice extends EventTarget {
  constructor(apiKey, _token, _iBrain) {
    super();
    this.apiKey = apiKey;
    this.isRecording = false;
    this.chunks = [];
    this.conversationHistory = [];
    this.voice = "UK English Male";
    this.lang = "en";
    this.token = _token;
    this.iBrain= _iBrain;

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
              this.sendToAPI(
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

  sendToAPI(file) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("model", "whisper-1");
    fetch(this.iBrain, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then(answer => {
 
        this.speak(answer);
 
        // this.conversationHistory.push({ role: "user", content: result.text });
        // fetch(this.conversationAPI, {
        //   method: "POST",
        //   body: JSON.stringify({ data: this.conversationHistory }),
        //   headers: { "Content-Type": "application/json" },
        // })
        //   .then((response) => response.json())
        //   .then((data) => {
        //     this.speak(data.reply);
        //     this.conversationHistory.push({
        //       role: "assistant",
        //       content: data.reply,
        //     });
        //   });




        this.start();
      });
  }

  setSpeechLanguage(lang) {
    if (lang) {
      this.lang = lang;
      this.voice = voices[lang]?.male || this.voice;
    }
  }

  speak(message, lang) {
    if (!responsiveVoice.isPlaying()) {
      responsiveVoice.speak(message, voices[lang]?.male || this.voice);
    }
  }

  start() {
    this.dispatchEvent(new CustomEvent("listen.start"));
  }

  stop() {
    this.dispatchEvent(new CustomEvent("listen.stop"));
  }
}
