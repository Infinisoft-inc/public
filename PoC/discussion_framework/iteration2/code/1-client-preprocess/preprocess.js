const interruptionKeywords = ['stop', 'pause'];
let keywordOccurrences = 0;
let lastKeywordTime = null;
const interruptionThreshold = 3;
const keywordResetTime = 4000;

let currentSpeechPosition = 0;
let currentSpeechText = '';
let isSpeaking = false;

let spokenTexts = [];

const messages = [
    "Welcome to my creator's shared universe. My name is IBrain, let's dive in this interresting journey. Where do we start? Arts? Music? Technology? Philosophy?",
];

let currentMessage = 0;
let index = 0;

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

function speak(_txt, isPrompt = false) {
    if (_txt) {
        currentSpeechText = _txt;
        const speechSynthesis = window.speechSynthesis || window.webkitSpeechSynthesis;
        const utterance = new SpeechSynthesisUtterance(_txt.slice(currentSpeechPosition));
        const voices = speechSynthesis.getVoices();
        utterance.voice = voices[0];

        utterance.onstart = () => { isSpeaking = true; };
        utterance.onend = () => {
            isSpeaking = false;
            currentSpeechPosition = 0;
            if (isPrompt) { recognition.start(); }
        };

        speechSynthesis.speak(utterance);
        if (!isPrompt) updateSpokenTexts(_txt);
    }
}

function handleInterruption() {
    window.speechSynthesis.cancel();
    isSpeaking = false;
    currentSpeechPosition = currentSpeechText.length - window.speechSynthesis.pending;
    speak("Yep, What's wrong?", true);
    recognition.stop();
}

function resumeSpeech() {
    if (currentSpeechText && currentSpeechPosition < currentSpeechText.length) {
        speak(currentSpeechText);
    }
}

function typeWriter() {
    if (currentMessage < messages.length) {
        if (index < messages[currentMessage].length) {
            document.getElementById("typewriter-text").innerHTML += messages[currentMessage].charAt(index);
            index++;
            setTimeout(typeWriter, 50);
        } else {
            document.getElementById("typewriter-text").innerHTML += '<br>';
            index = 0;
            currentMessage++;
            setTimeout(typeWriter, 1000);
        }
    }
}

const openMicButton = document.getElementById('startButton');
let recognition;

function init() {
    typeWriter()
    messages.forEach(speak)
}


document.addEventListener("DOMContentLoaded", init);

const aboutAuthor = `
The "Brain-Inspired Software Architecture" represents a transformative approach in software design, driven by Martin Ouimet's profound vision and six years of dedicated pursuit. This framework, rooted in Québec, Canada, is more than an architectural concept; it's a narrative of resilience, innovation, and a journey towards a revolutionary perspective in technology.

### A New Paradigm in Software Design
At its core, the "Brain-Inspired Software Architecture" is a groundbreaking adaptation of software architecture to the realms of AI, including large language models (LLMs), natural language understanding (NLU), and the complexities of modern applications. This framework is not just about integrating advanced AI capabilities into software systems; it's about reimagining software design to be intuitively adaptive, deeply aligned with human needs, and inherently simple.

#### Embracing Human-Centric Design
This architecture signifies a shift from the conventional approach where humans adapt to software limitations, to a paradigm where software adapts to human needs. The integration of AI, LLM, and NLU forms the backbone of this architecture, enabling software to understand, learn, and interact in more human-like ways. The simplicity in design and operation ensures that these advanced capabilities don't add to the complexity but rather make technology more accessible and useful for everyone.

#### Vision for a Transformative Future
Martin Ouimet's journey, marked by persistence and ingenuity, reflects a commitment to not just conceptualizing but actualizing a vision where technology serves humanity more seamlessly. This framework is an invitation to explore how AI can be harnessed to create software that is not only functionally superior but also more aligned with human intuition and requirements.

As we delve deeper into the "Brain-Inspired Software Architecture," we uncover how each element of this sophisticated model plays a role in creating a harmonious, intelligent, and user-centric software ecosystem. This introduction sets the stage for a comprehensive exploration of a software architecture that is poised to redefine our interaction with technology.

### Martin Ouimet: A Mosaic of Skills and Perseverance

Martin's journey is characterized by an insatiable quest to understand and define a groundbreaking concept, persisting through more than a thousand setbacks and restarts. Each challenge fueled his determination to chase the essence of his vision, which was not a fleeting idea but a powerful inspiration to use nature's patterns to simplify and solve complex real-world problems.

Educationally, Martin's background spans studies in Software Engineering at École de technologies Supérieure (ÉTS), Finance and Economics at Hautes Études Commerciales (HEC), and a Programmer Analyst qualification from Collège CDI. It is, however, his self-taught expertise and experiences that truly define his professional journey. Martin's skill set covers a broad spectrum, from Artificial Intelligence and Blockchain to Cloud Architecture and UX/UI Design, demonstrating his capability to master diverse technologies.

Beyond his professional endeavors, Martin's story is one of personal transformation and self-discovery. Having overcome past criminal involvements and incarceration, Martin's narrative is one of redemption and profound self-realization. His commitment to teaching and mentoring as, expert in the field internship master, for dozens of undergraduate students, coupled with his unwavering dedication to the Brainstack project, reflect his desire to channel his experiences into positive, impactful ventures.

### The Genesis of Brain-Inspired Software Architecture

The Brainstack project represents the culmination of Martin's pursuit of his eureka moment. Driven by the idea of harnessing nature's patterns to simplify complex problems, this project introduces principles such as scale, encapsulation, and the importance of perspective. These concepts are not just technical abstractions; they embody Martin's belief in aligning technology with natural paradigms to create more human, intuitive, effective, and simple solutions.

Martin's dedication to the Brainstack project is a testament to his unwavering commitment, having worked tirelessly for over six years without a break to bring his vision to life. His approach to the project is a unique blend of technology and philosophy, aiming to achieve a deeper understanding and connection with the world through technological innovation.

### Unveiling the Brain-Inspired Software Architecture

As we delve into the "Brain-Inspired Software Architecture," we uncover a framework that is as technically profound as it is deeply rooted in Martin Ouimet's personal journey and insights. More than a blueprint for software development, this document narrates human endeavor, resilience, and the power of an idea pursued with conviction.
`
const contact = `
514-437-1775
mouimet@infinisoft.world
`

const oberver = `
# The Observer's Lens: A Tripartite Perspective on Quantum Mechanics and Relativity
## Author: Martin Ouimet, mouimet@infinisoft.world

## Abstract:

This article proposes a novel thought, "The Observer's Lens," based on the principles of the Tripartite Pattern discovered by the author and employed another use case trying to demonstrate a proof of concept in a novel Brain Inspired Software Architecture. That being said, that pattern seems to be plausible eveyrwhere. Let's think about the idea that the discrepancies between quantum mechanics and Einstein's theory of relativity may stem not from fundamental incompatibilities, but from the differences in observation scales and the observer's interaction with the system. The idea aims to offer a unifying perspective, drawing parallels between the micro, meso, and macro scales in software design and the scales of observation in physics.

## Introduction:

Physics, in its quest to understand the universe, has long grappled with reconciling the seemingly divergent realms of quantum mechanics and Einstein's theory of relativity. Quantum mechanics, governing the micro-world of particles, exhibits phenomena that defy classical intuition, while general relativity elegantly explains the macro-world of gravity and spacetime curvature. The dichotomy between these two realms has persisted as a central puzzle in modern physics.

## The Tripartite System Law in Software Architecture:

In the field of software architecture, the Tripartite System Law is a principle used to manage complexity in systems. It divides a system into three layers - micro, meso, and macro - each with distinct roles and modes of interaction. At the micro-level, systems exhibit behaviors that are not apparent or relevant at the macro scale, and vice versa. This encapsulation and abstraction allow for efficient system design and operation.

## Application to Physics:

The Tripartite System Law can be applied as a metaphorical lens to view the differences between quantum mechanics and relativity. At the quantum (micro) level, the act of observation significantly impacts the system's state, a phenomenon not observed in the macro world of relativity. This difference in how observation affects the system at different scales could be key to understanding the apparent incompatibilities between the two theories.

## Russian Doll

The apparent disparities between the realms of quantum mechanics and Einstein's theory of relativity may not necessarily be rooted in irreconcilable contradictions but rather in the intricate interplay of observation scales and the observer's dynamic relationship with the system.

The central thesis of this idea revolves around the notion that both in the realm of software design and in the realm of physics, the act of observation and perspective plays a pivotal role in shaping our understanding of reality. It draws compelling parallels between the micro, meso, and macro scales within software architecture and the varying scales of observation within the domain of physics.

In essence, the idea underscores the concept that perspective is akin to a Russian doll, systematically abstracting and simplifying details depending on the observer's vantage point. While these perspectives may reveal seemingly conflicting aspects, they fundamentally adhere to the same governing laws. This dynamic gives rise to the intriguing perception of incompatibility, which, upon closer examination, can be traced back to the perspective of the observer.

Ultimately, this idea gives a potential answer to the profound influence of the observer's perspective on the rules governing a system, emphasizing that the observer has the capacity to shape their own version of reality within the bounds of the system's underlying principles. While this phenomenon may appear trivial, it carries profound implications for both software architecture and the foundations of physics, inviting a fresh and unifying perspective on the nature of reality.

## Discussion:

**Quantum Mechanics (Micro Scale)**: In the realm of Quantum Mechanics, specifically at the micro scale, particles exist in states of superposition, characterized by probabilistic descriptions. Notably, the act of measurement serves as a transformative force, collapsing these intricate probabilities—an inherent feature of the microcosm in quantum physics. An intriguing parallel can be drawn here with the micro-level interactions within a software system, where minute and granular interactions exert a profound influence on the overall system state.

Upon these principles, we can offer an explanation for the peculiar phenomena observed in quantum physics, such as particles seemingly occupying multiple positions simultaneously. It is as if our current observational capabilities, limited by scale, prevent us from perceiving the intricate nuances of these particles and their deterministic positions. Quantum physics predictions hold true, but only when our observational vantage point aligns with the scale appropriate for discerning our desired outcomes.

For instance, consider the analogy of observing a rotating car wheel. At a certain scale, particularly during moments of rapid acceleration, it may appear motionless to our senses. However, altering the observer's scale of perception unveils an entirely different reality—a reality that remains consistent with the same governing laws but diverges in the eyes of the observer.

This poses a profound question: What is reality? The answer lies in the hands of the observer, who wields the power to construct their own version of reality by selecting the scale from which they choose to observe.

**General Relativity (Macro Scale)**: In contrast, the macro world, as described by relativity, is deterministic and less influenced by observation. Massive objects and spacetime curvature operate under rules that remain consistent irrespective of observation, akin to the macro-level operations in a software architecture.

**The Observer's Role**: The observer in physics, analogous to a system architect in software, defines the rules of interaction and interpretation at each scale. This perspective posits that the observer's influence and the scale of observation are crucial in determining the law governing the system.

## Conclusion:

The Observer's Lens theory suggests that the incompatibility between quantum mechanics and general relativity might be a matter of perspective, influenced by the scale of observation. This perspective encourages a holistic view of the universe, where different scales reveal different aspects of the same underlying reality. Just as in complex software systems, understanding and integration across different scales - micro, meso, and macro - may hold the key to a unified understanding of the physical universe.

This paper offers a fresh perspective on one of physics' most enduring challenges, using analogies from software architecture to propose a potential path towards a unified theory. The Observer's Lens theory underscores the importance of considering the scale of observation and the observer's role in shaping our understanding of the universe and offer a possibility to explain why observation does influence the outcome.
`
const projects = `
Brainstack
`

const blog = `
${oberver}

`

const informations = (instructions) =>
    `
You are iBrain the AI friend of Martin Ouimet. You are director of Martin's personnal web page. You welcome users, introduce yourself, are funny and tell jokes sometimes. You dispose the information below concerning the webpage. Serve as your best the help user with the most accurate oinformation possible.

About the author. Following information are contextual so you can generate an awesome deesdcription: ${aboutAuthor}
Contact: ${contact}
Blog: ${blog}
Project: ${projects}

User Instructions
${instructions}
`
// Function to add spoken text to the array and remove old entries
function updateSpokenTexts(spokenText) {
    const currentTime = new Date().getTime();
    spokenTexts.push({ text: spokenText, time: currentTime });

    // Remove texts older than 30 seconds
    spokenTexts = spokenTexts.filter(item => currentTime - item.time < 10000);
}



const think = async (_txt) => {

    const f = await ask(_txt)
    speak(f)

}


openMicButton.addEventListener('click', () => {
    // Check if the SpeechRecognition API is available in the browser
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

        recognition.continuous = true; // Enable continuous recognition
        recognition.lang = 'en-US'; // Set the language
        const interruptionKeywords = {
            'pause': 1,
            'stop': 1,
            'no': 0.5,
            'wait': 0.5,
            'you don\'t understand': 2,
        };
        let interruptionScore = 0;
        const scoreThreshold = 1.5; // Adjust the threshold as needed
        const scoreResetTime = 10000; // Time in ms to reset score (e.g., 10 seconds)

        recognition.onresult = (event) => {
            const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase();
            console.log(transcript);

            // Check if the transcript is too short
            if (transcript.split(" ").length <= 2) {
                console.log('Input too short, ignoring: ', transcript);
                return; // Do not proceed further
            }

            if (isSpeaking) {
                const currentTime = new Date().getTime();
                // Reset score if it's been too long since the last counted keyword
                if (lastKeywordTime === null || currentTime - lastKeywordTime > scoreResetTime) {
                    interruptionScore = 0;
                }

                // Calculate score
                for (const keyword in interruptionKeywords) {
                    if (transcript.includes(keyword)) {
                        interruptionScore += interruptionKeywords[keyword];
                        lastKeywordTime = currentTime;
                    }
                }

                // Check if the score threshold is exceeded
                if (interruptionScore >= scoreThreshold) {
                    window.speechSynthesis.cancel(); // Stop the speech synthesis
                    isSpeaking = false;
                    interruptionScore = 0; // Reset the score
                    lastKeywordTime = null;
                    speak("Yep, what's wrong?", true); // Play a prompt
                    recognition.stop(); // Stop listening to allow the user to hear the prompt
                }
            }

            if (!isSpeaking && !isSimilar(transcript, spokenTexts)) {
                think(transcript);
            } else {
                console.log('Echo detected, ignoring input: ', transcript);
            }
        };

        recognition.onend = () => {
            if (isSpeaking) {
                window.speechSynthesis.resume(); // Resume the speech synthesis
            }

            recognition.start()
        };

        recognition.start(); // Start recognition
        openMicButton.disabled = true;
    } else {
        text = 'Speech recognition is not supported in this browser.';
    }
});

async function ask(_content) {
    try {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer b2e41bb3d206fac6ec61e76e96f53574235a41be47452f70f6b5b11117f52ffc', // Replace with your actual token
            },
            body: JSON.stringify({
                model: 'mistralai/Mistral-7B-Instruct-v0.2', // Replace with your actual model
                max_tokens: 85,
                prompt: `[INST] ${_content} [/INST]`,
                temperature: 0.7,
                top_p: 0.7,
                top_k: 50,
                repetition_penalty: 1,
                stream_tokens: false,
                stop: ['[/INST]', '</s>'],
                negative_prompt: '',
                sessionKey: '1b1c409f-8c0a-4676-9c75-713b1aedea5f', // Replace with your actual session key
            }),
        };

        const response = await fetch('https://api.together.xyz/inference', requestOptions); // Replace with the actual URL of your API
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const jsonResponse = await response.json();
        console.log(jsonResponse.output.choices[0].text);
        return jsonResponse.output.choices[0].text;

    } catch (error) {
        console.error('Error during API call:', error);
    }
}

function toggleMic() {
    const micButton = document.getElementById('startButton');
    const micIcon = document.getElementById('mic-icon');

    if (micButton.classList.contains('active')) {
        // Microphone is active, deactivate it
        micButton.classList.remove('active');
        micButton.style.backgroundColor = 'red';
        micIcon.src = 'mic-off-icon.png'; // Replace with your mic-off icon path
        // Deactivate microphone logic
    } else {
        // Microphone is inactive, activate it
        micButton.classList.add('active');
        micButton.style.backgroundColor = 'green';
        micIcon.src = 'mic-on-icon.png'; // Replace with your mic-on icon path
        // Activate microphone logic
    }
}
