import { OpenAI } from 'openai';
import { IModel } from '../abstraction';
import { Readable } from 'stream';

export class IntegrationOpenAI implements IModel {
  private modelName: string;
  private model: OpenAI

  constructor(_apiKey: string, _model: string='gpt-3.5-turbo') {
    this.modelName = _model;

    this.model = new OpenAI({
      apiKey: _apiKey,
    });
  }
  
  _askStream(input: string, system?: string | undefined): Promise<Readable> {
    throw new Error('Method not implemented.');
  }

  async _ask(input: string, content: string = 'You are a helpful assistant.'): Promise<string | null> {
    try {
      const response = await this.model.chat.completions.create({
        messages: [{ role: 'system', content }, { role: 'user', content: input }],
        model: this.modelName,
      });
      return response.choices[0].message.content
    } catch (error) {
      console.error('Error querying OpenAI:', error);
      return "Sorry, I couldn't get a response at the moment.";
    }
  }
}
