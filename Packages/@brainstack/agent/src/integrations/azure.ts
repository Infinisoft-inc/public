import axios from 'axios';
import { IModel } from '../abstraction';
import { Readable } from 'stream';

export type TIntegrationAzureOptions = {
  max_tokens?: number,
  temperature?: number
}

const defaultIntegrationAzureOptions: TIntegrationAzureOptions = {
  max_tokens: 4096,
  temperature: 0.8
}

export class IntegrationAzure implements IModel {
  private apiKey: string;
  private baseUrl: string;
  private options: TIntegrationAzureOptions;

  constructor(apiKey: string, baseUrl: string, options=defaultIntegrationAzureOptions) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
    this.options = options;
  }
  
  async _askStream(input: string, system: string | undefined=""): Promise<Readable> {
      const url = `${this.baseUrl}`;
      const body = {
        messages: [{ role: 'system', content:system }, { role: 'user', content: input }],
        ...this.options,
      };
  
      const response = await axios.post(url, body, {
        headers: {
          'Content-Type': 'application/json',
          'api-key': this.apiKey,
        },
        responseType: 'stream', // Specify response type as a stream
      });
  
      // Create a Readable stream from the response data
      const responseStream = new Readable({
        read() {
          // Push chunks of data to the stream
          this.push(response.data.choices[0].message.content);
          this.push(null); // Signal the end of the stream
        },
      });
  
      return responseStream;
  }

  async _ask(input: string, content: string = 'You are a helpful assistant.'): Promise<string | null> {
    try {
      const url = `${this.baseUrl}`;
      const body = {
        messages: [{ role: 'system', content }, { role: 'user', content: input }],
        ...this.options
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