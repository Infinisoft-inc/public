const {reasoning_logic_deterministic } = require('./reasoning_logic_deterministic')

const prompt = (context) => `
<!-- Instructions for AI:
     - Evaluate the context and natural flow of the conversation.
     - Your role is to understand not only the completeness of a statement but also its intent and conversational norms.
     - Respond to straightforward inquiries like 'how are you' directly, without overanalyzing for completeness.
     - For more complex statements, use the <question> to decide if it's the right moment to respond or if further clarification is needed.
     - Format your reponse within <answer></answer> tag by 'yes' or 'no' exclusivly.
-->

<!-- Example:
     <context>Hello AI, how are you today?</context>
     <perspective>As an AI understanding conversational norms,</perspective>
     <question>Is this a straightforward greeting that warrants an immediate response?</question>
     Expected AI Response: <answer>yes</answer>
-->

<context>
    ${context}
</context>

<perspective>
    As an AI understanding conversational norms and speech completeness
</perspective>

<question>
    Considering the provided context, is it appropriate to respond now?
</question>
`

function processSpeech(rawSpeech) {
    // Process the raw speech data
    let processedSpeech = rawSpeech.trim(); // Example of basic processing
    console.log("Processed Speech:", processedSpeech);

    // Pass processed speech to the next function in the chain
    return processedSpeech;
}

async function evaluateSpeech(processedSpeech) {
    const evaluated = await reasoning_logic_deterministic(processedSpeech)
    console.log(`Evaluated Speech: `, evaluated)
    return evaluated
}

function interpretEvaluation(evaluation) {
    console.log(`interpretEvaluation: `, evaluation)
    return evaluation?.includes('yes')
}
// The entry point function to evaluate the user's intention
async function evaluateSpeechComplete(rawSpeech) {
    console.log("Evaluating intention for speech:", rawSpeech);
    const processed = processSpeech(prompt(rawSpeech));
    const evaluated = await evaluateSpeech(processed)
    const isComplete = interpretEvaluation(evaluated)

    console.log(`Evaluated is complete? `, isComplete)

    return isComplete
}

exports.evaluateSpeechComplete = evaluateSpeechComplete