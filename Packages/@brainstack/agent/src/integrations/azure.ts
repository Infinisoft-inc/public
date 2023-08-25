import axios from 'axios';
import { IModel } from '../abstraction';

export class IntegrationAzure implements IModel {
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: string, baseUrl: string) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  async _ask(input: string, content: string = 'You are a helpful assistant.'): Promise<string | null> {
    try {
      const url = `${this.baseUrl}`;
      const body = {
        messages: [{ role: 'system', content }, { role: 'user', content: input }],
        max_tokens: 100,
        temperature: 0.7
      };

      const response = await axios.post(url, body, {
        headers: {
          'Content-Type': 'application/json',
          'api-key': this.apiKey
        }
      });

      const message = response.data.choices[0].message;
      return message.content;
    } catch (error) {
      console.error('Error querying Azure AI:', error);
      return "Sorry, I couldn't get a response at the moment.";
    }
  }
}