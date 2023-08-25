import { describe, expect, test } from '@jest/globals';
import { ModelService } from '../implementation';
import { IntegrationOpenAI } from '../integrations/openai';
import dotenv from 'dotenv';
import { IntegrationAzure } from '../integrations/azure';
dotenv.config();

const apiKey = process.env['OPENAI']!;
const azureKey = process.env['AZUREKEY']!;
const azureUrl = process.env['AZUREURL']!;

describe('IntegrationOpenAI', () => {
  beforeAll(() => {
    if (!apiKey || !azureKey || !azureUrl) {
      throw new Error('Secrets misconfigured');
    }
  });
  test('Integration OpenAI', async () => {
    const openaiLLMIntegration = new IntegrationOpenAI(apiKey);

    const question = 'What is the weather today?';
    const responsePromise = await openaiLLMIntegration._ask(question);

    expect(responsePromise).toBeDefined();
  });

  test('Integration Azure OpenAI', async () => {
    const openaiLLMIntegration = new IntegrationAzure(azureKey, azureUrl);

    const question = 'What is the weather today?';
    const responsePromise = await openaiLLMIntegration._ask(question);

    expect(responsePromise).toBeDefined();
  });

  test('Model Service', async () => {
    const openaiLLMIntegration = new IntegrationOpenAI(apiKey);

    const llmService = new ModelService(openaiLLMIntegration);

    const question = 'Tell me about the solar system.';
    const responsePromise = await llmService.ask(question);

    expect(responsePromise).toBeDefined();
  }, 20000);
});
