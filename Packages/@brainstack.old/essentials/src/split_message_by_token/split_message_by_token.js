export function splitMessageByTokens(message, maxTokensPerMessage, filename) {
    const sentences = message.split('. ');
    let currentTokens = 0;
    let currentPart = 1;
    const messages = [];
  
    let currentMessage = `${filename} Part ${currentPart} of ${sentences.length}\n\n`;
  
    for (let i = 0; i < sentences.length; i++) {
      const sentence = sentences[i].trim();
      const sentenceTokens = countTokens(sentence);
  
      if (currentTokens + sentenceTokens <= maxTokensPerMessage) {
        currentMessage += `${sentence} `;
        currentTokens += sentenceTokens;
      } else {
        messages.push(currentMessage.trim());
        currentPart++;
        currentTokens = sentenceTokens;
        currentMessage = `${filename} Part ${currentPart} of ${sentences.length}\n\n${sentence}`;
      }
    }
  
    messages.push(currentMessage.trim());
  
    return messages;
  }
  
  function countTokens(text) {
    return text.split('\n').length + text.split(' ').length;
  }
  