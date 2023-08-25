# @brainstack/agent

Brainstack Model Agent Library

## Introduction

The `@brainstack/agent` library is an abstraction layer to interact with various language model services. It simplifies the integration of OpenAI's GPT and Azure AI services into your applications, making it effortless to query these services and receive text-based responses.

## Installation

To use the `@brainstack/agent` library, you need to install it using npm:

```bash
npm install @brainstack/agent
```

## Usage

### ModelService

The `ModelService` class acts as a central interface for querying language model services. It abstracts the integration details and allows you to focus on asking questions. Here's an example of how to use it with OpenAI's:

```typescript
import { ModelService, IntegrationOpenAI } from '@brainstack/agent';

const openaiLLMIntegration = new IntegrationOpenAI('your_openai_api_key');
const llmService = new ModelService(openaiLLMIntegration);

const userQuestion = 'What is the weather today?';
const llmResponse = await llmService.ask(userQuestion);

console.log('User Question:', userQuestion);
console.log('LLM Response:', llmResponse);
```

Similarly, you can use the `ModelService` with the Azure AI integration:

```typescript
import { ModelService, IntegrationAzure } from '@brainstack/agent';

const azureLLMIntegration = new IntegrationAzure('your_azure_api_key', 'your_azure_api_endpoint');
const llmService = new ModelService(azureLLMIntegration);

const userQuestion = 'Tell me about the solar system.';
const llmResponse = await llmService.ask(userQuestion);

console.log('User Question:', userQuestion);
console.log('LLM Response:', llmResponse);
```

## Configuration

Before using the library, make sure you have the required API keys or endpoints for the selected integration.

## License

This project is licensed under the MIT License. You can find more details in the [LICENSE](LICENSE) file.

