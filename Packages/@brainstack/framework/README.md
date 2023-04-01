# Brainstack Framework
The Brainstack Framework is a JavaScript library for building problem-solving solutions through a hierarchical approach that combines actions, tasks, skills, and assistants. It provides a flexible, event-driven architecture and allows for granular control over the execution of tasks.

## Overview
The framework is based on the Brainstack Foundation Principle and consists of the following components:

- Action: The smallest unit of work, representing a single process.
- Task: A combination of multiple actions organized to achieve a specific goal.
- Skill: A collection of tasks required to achieve a specific result.
- Assistant: A system capable of learning and applying a broad range of skills.

## Installation

You can install the Brainstack Framework using npm:

```
npm install brainstack-framework
```

## Usage

First, import the required classes:

```javascript
const { Action, Task, Skill, Assistant, Logger } = require('@brainstack/framework');
```

Create actions, tasks, skills, and an assistant:

```javascript
const action1 = new Action(input1, process1);
const action2 = new Action(input2, process2);

const task1 = new Task([action1, action2]);
const task2 = new Task([action3]);

const skill1 = new Skill([task1]);
const skill2 = new Skill([task2]);

const assistant = new Assistant([skill1, skill2]);

const logger = new Logger(5); // Log level set to 5 (debug)
```

Apply the assistant's skills:

```javascript
(async () => {
  try {
    const results = await assistant.applySkills(input, logger);
    console.log('Results:', results);
  } catch (error) {
    console.error('Error:', error);
  }
})();
```

Handle events:

```javascript
assistant.on('start', () => console.log('Assistant started'));
assistant.on('complete', (results) => console.log('Assistant completed', results));
assistant.on('skillStart', (skill) => console.log('Skill started', skill));
assistant.on('skillComplete', (skill, result) => console.log('Skill completed', skill, result));
assistant.on('taskStart', (task) => console.log('Task started', task));
assistant.on('taskComplete', (task, result) => console.log('Task completed', task, result));
assistant.on('actionStart', (action) => console.log('Action started', action));
assistant.on('actionComplete', (action, result) => console.log('Action completed', action, result));
assistant.on('actionError', (action, error) => console.log('Action error', action, error));
```

## Documentation
For more detailed documentation and examples, refer to the [GitHub repository](https://github.com/Infinisoft-inc/public.git).


## import voices from "./voices.js";
export { voices };

class iBrainVoice extends EventTarget {
  constructor({
    options = {},
    knowledgeApi = "",
    voice = "UK English Female",
    lang = "en-US",
    key,
  }) {
    super();
    this.isRecording = false;
    this.chunks = [];
    this.conversationHistory = [];
    this.lang = lang;
    this.options = options;
    this.voice = voice;
    this.knowledgeApi = knowledgeApi;
    this.key = key;
    // New state variable to indicate loading status
    this.isLoading = false;

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
        
        let silenceTimeoutId = null; // to store the silence timeout ID
        let isSilenceTimeoutSet = false; // to track whether silence timeout is set
        let chunks = []; // to store the recorded audio data
        let recorder = null; // to store the MediaRecorder object
        let isRecording = false; // to track whether recording is in progress
        const silenceDuration = 1500; // the duration of silence required to stop recording
        const minimumDuration = 250; // the minimum duration of recording required
        
        processor.onaudioprocess = (e) => {
            const inputData = e.inputBuffer.getChannelData(0);
            const inputLength = inputData.length;
            let total = 0;
            for (let i = 0; i < inputLength; i++) {
                total += Math.abs(inputData[i]);
            }
            const average = total / inputLength;
            
            if (average < 0.1) {
                if (isRecording) {
                    // set a timeout to stop recording if not already set
                    if (!isSilenceTimeoutSet) {
                        silenceTimeoutId = setTimeout(() => {
                            isRecording = false;
                            recorder.stop();
                        }, silenceDuration - minimumDuration);
                        isSilenceTimeoutSet = true;
                    }
                }
            } else {
                // clear the silence timeout if set
                if (isSilenceTimeoutSet) {
                    clearTimeout(silenceTimeoutId);
                    isSilenceTimeoutSet = false;
                }
                
                if (!isRecording) {
                    isRecording = true;
                    chunks = [];
                    recorder = new MediaRecorder(stream);
                    recorder.ondataavailable = (e) => chunks.push(e.data);
                    recorder.onstop = () => {
                        const blob = new Blob(chunks, { type: "audio/webm" });
                        this.askKnowledgeApi(
                            new File([blob], "recording.webm", { type: "audio/webm" })
                        );
                    };
                    recorder.start();
                }
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
  speak(text, lang) {
    if (
      this.isResponsiveVoiceLoaded &&
      window.responsiveVoice &&
      !window.responsiveVoice.isPlaying()
    ) {
      // Use the speak function from the ResponsiveVoice API
      const langCode = lang
        ? lang.substr(0, 2).toLowerCase() + "-" + lang.substr(-2).toUpperCase()
        : this.lang;
      window.responsiveVoice.speak(
        text,
        voices?.[langCode]?.male || voices?.[langCode]?.female || this.voice,
        {
          onstart: () => {
            if (this?.recorder?.state==="recording"){
              this.recorder.pause();

            }
          },
          onend: () => {
            if (this?.recorder?.state==="paused"){
              this.recorder.resume();

            }
          },
        }
      );
    }
  }

  askKnowledgeApiByText(text) {
    this.isLoading = true;
    this.emit("loading.start");

    fetch(this.knowledgeApi + "/text", {
      ...this.options,
      mode: "cors",
      method: "POST",
      body: text,
    })
      .then((response) => response.text())
      .then((thought) => {
        this.emit("new.thoughts", thought);
      })
      .catch((err) => {
        console.log(`askKnowledgeApiByText Failed `, err);
      })
      .finally(() => {
        this.isLoading = false;
        this.emit("loading.stop");
        this.start();
      });
  }

  askKnowledgeApi(file) {
    this.isLoading = true;
    this.emit("loading.start");

    const formData = new FormData();
    formData.append("file", file);
    fetch(this.knowledgeApi, {
      ...this.options,
      mode: "cors",
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((thought) => {
        this.emit("new.thoughts", thought);
      })
      .catch((err) => {
        console.log(`askKnowledgeApi Failed `, err);
      })
      .finally(() => {
        this.isLoading = false;
        this.emit("loading.stop");
        this.start();
      });
  }

  setSpeechLanguage(lang) {
    if (lang) {
      this.lang = lang;
      this.voice = voices?.[lang]?.male || this.voice;
    }
  }

  // Method to emit an event
  emit(eventType, eventData) {
    const event = new CustomEvent(eventType, { detail: eventData });
    this.dispatchEvent(event);
  }

  // Method to handle an event
  handle(eventType, callback) {
    this.addEventListener(eventType, callback);
  }

  start() {
    this.dispatchEvent(new CustomEvent("listen.start"));
  }

  stop() {
    this.dispatchEvent(new CustomEvent("listen.stop"));
  }
}

export default iBrainVoice;
```


## License

MIT

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Brainstack Lifecycles</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <style>
        .flowchart-container {
            padding: 2rem;
        }
        .flowchart {
            display: flex;
            flex-direction: column;
            gap: 2rem;
            margin-bottom: 2rem;
            position: relative;
        }
        .flowchart::before {
            content: '';
            position: absolute;
            left: calc(50% - 1px);
            top: 25px;
            width: 2px;
            height: calc(100% - 50px);
            background: #3B82F6;
            z-index: -1;
        }
        .flowchart-step {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 150px;
            height: 50px;
            opacity: 0;
            animation: fadeIn 1s forwards, oscillate 2s infinite;
        }
        .flowchart-step:hover .bubble {
            opacity: 1;
        }
        .bubble {
            position: absolute;
            top: -30px;
            left: 50%;
            transform: translateX(-50%);
            width: 200px;
            padding: 10px;
            color: black;
            background: white;
            border: 1px solid #3B82F6;
            border-radius: 5px;
            font-size: 12px;
            text-align: center;
            opacity: 0;
            transition: opacity 0.3s;
        }
        @keyframes fadeIn {
            to { opacity: 1; }
        }
        @keyframes oscillate {
            0% { transform: translateY(0); }
            50% { transform: translateY(5px); }
            100% { transform: translateY(0); }
        }
    </style>
</head>
<body>
    <div class="flowchart-container">
        <h1>Action Lifecycle</h1>
        <div id="actionLifecycle" class="flowchart"></div>
        <h1>Task Lifecycle</h1>
        <div id="taskLifecycle" class="flowchart"></div>
        <h1>Skill Lifecycle</h1>
        <div id="skillLifecycle" class="flowchart"></div>
        <h1>Assistant Lifecycle</h1>
        <div id="assistantLifecycle" class="flowchart"></div>
    </div>
    <script>
        const stepDetails = {
            start: 'The beginning of the lifecycle',
            process: 'The processing phase of the action',
            complete: 'The completion of the action or task',
            error: 'An error occurred during the action',
            actionStart: 'The start of an action within a task',
            actionComplete: 'The completion of an action within a task',
            actionError: 'An error occurred within an action of a task',
            taskStart: 'The start of a task within a skill',
            taskComplete: 'The completion of a task within a skill',
            skillStart: 'The start of a skill within an assistant',
            skillComplete: 'The completion of a skill within an assistant'
        };
        function drawFlowchart(containerId, flowchart) {
            const container = document.getElementById(containerId);
            flowchart.forEach((step, index) => {
                const stepElement = document.createElement('div');
                stepElement.classList.add(
                    'flowchart-step',
                    'bg-blue-500',
                    'text-white',
                    'font-bold',
                    'rounded-lg',
                    'shadow-md',
                    'transform',
                    'transition-transform',
                    'duration-500',
                    'hover:-translate-y-1'
                );
                stepElement.textContent = step;
                const bubbleElement = document.createElement('div');
                bubbleElement.classList.add('bubble');
                bubbleElement.textContent = stepDetails[step] || 'Details not available';
                stepElement.appendChild(bubbleElement);
                container.appendChild(stepElement);
            });
        }
        const actionFlowchart = ['start', 'process', 'complete', 'error'];
        const taskFlowchart = ['start', 'actionStart', 'actionComplete', 'actionError', 'complete'];
        const skillFlowchart = ['start', 'taskStart', 'taskComplete', 'complete'];
        const assistantFlowchart = ['start', 'skillStart', 'skillComplete', 'complete'];
        drawFlowchart('actionLifecycle', actionFlowchart);
        drawFlowchart('taskLifecycle', taskFlowchart);
        drawFlowchart('skillLifecycle', skillFlowchart);
        drawFlowchart('assistantLifecycle', assistantFlowchart);
    </script>
</body>
</html>



## Testing

To test the Brainstack framework, including its components such as Actions, Tasks, Skills, and the Assistant, a comprehensive test plan should be created. The test plan should include unit tests, integration tests, and end-to-end tests to ensure the functionality and reliability of the framework.

### 1. Unit Tests

Unit tests focus on testing individual units of code in isolation. For the Brainstack framework, unit tests should be written for each class (Action, Task, Skill, Assistant) and their respective methods. Mock objects or stubs can be used to simulate dependencies and control the behavior of the code being tested.

Example: Testing the `Action` class and its `execute` method.
\```javascript
const { Action } = require('brainstack-framework');

describe('Action', () => {
  test('should execute process with given input and return result', () => {
    const input = 5;
    const process = (x) => x * 2;
    const action = new Action(input, process);
    const result = action.execute();
    expect(result).toBe(10);
  });
});
\```

### 2. Integration Tests

Integration tests focus on the interactions and integrations between different components of the framework. These tests verify that the components work together correctly to achieve the desired result.

Example: Testing the integration of actions within a task.
\```javascript
const { Action, Task } = require('brainstack-framework');

describe('Task Integration', () => {
  test('should execute actions in order and return aggregated result', () => {
    const action1 = new Action(2, (x) => x + 1); // 3
    const action2 = new Action(3, (x) => x * 2); // 6
    const task = new Task([action1, action2]);
    const result = task.execute();
    expect(result).toEqual([3, 6]);
  });
});
\```

### 3. End-to-End Tests

End-to-end tests simulate real-world scenarios and cover the entire workflow of the framework from start to finish. These tests ensure that the framework functions as expected when deployed and used by end-users.

Example: Testing the application of skills using an assistant.
\```javascript
const { Action, Task, Skill, Assistant } = require('brainstack-framework');

describe('End-to-End', () => {
  test('should apply skills and return results', async () => {
    const action = new Action(5, (x) => x * 3);
    const task = new Task([action]);
    const skill = new Skill([task]);
    const assistant = new Assistant([skill]);

    const results = await assistant.applySkills();
    expect(results).toEqual([15]);
  });
});
\```

### 4. Performance and Stress Tests

Performance tests measure the response times, throughput, and resource utilization of the framework under different workloads. Stress tests evaluate the framework's behavior under extreme conditions, such as high load or limited resources.

Example: Measuring the response time for processing a large number of actions.

### 5. Error and Exception Handling Tests

These tests verify that the framework can handle errors and exceptions gracefully. They ensure that the framework can recover from unexpected situations without crashing.

Example: Testing the framework's behavior when an action's process function throws an error.

### 6. Documentation and Examples

Clear and accurate documentation is crucial for the successful adoption of the framework. The documentation should include comprehensive examples to demonstrate the use of the framework and its features.

Example: Providing examples of how to create custom actions, tasks, skills, and assistants
