const axios = require('axios');


async function reasoning_logic_deterministic(structured_though) {
    const prompt = structured_though;
    const result = await axios.post('https://api.together.xyz/inference', {
        "model": "togethercomputer/llama-2-70b-chat",
        "max_tokens": 250,
        "prompt": "",
        "prompt": `[INST] {${prompt}} [/INST]`,
        "temperature": 0,
        "top_p": 0.7,
        "top_k": 50,
        "repetition_penalty": 1,
        "stream_tokens": false,
        "stop": [
            "[/INST]",
            "</s>"
        ],
        "negative_prompt": "",
        "sessionKey": "703a5956-a596-4f5e-a754-c5f857a11683",
        "type": "chat"
    }, {
        headers: {
            Authorization: 'Bearer b2e41bb3d206fac6ec61e76e96f53574235a41be47452f70f6b5b11117f52ffc'
        }
    });

    console.log(result?.data?.output?.choices?.[0]?.text);

    const reasoned_though = result?.data?.output?.choices?.[0]?.text;

    return reasoned_though;
}

exports.reasoning_logic_deterministic = reasoning_logic_deterministic