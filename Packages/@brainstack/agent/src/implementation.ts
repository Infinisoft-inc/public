import { Readable } from 'stream';
import { IModel } from './abstraction';

export class ModelService {
  private modelIntegration: IModel;

  constructor(_modelIntegration: IModel) {
    this.modelIntegration = _modelIntegration;
  }

  async ask(
    question: string,
    system: string = 'You are a helpful assistant.'
  ): Promise<string | null> {
    try {
      const response = await this.modelIntegration._ask(question, system);
      return response;
    } catch (error) {
      console.error('Error querying LLM:', error);
      return "Sorry, I couldn't get a response at the moment.";
    }
  }

  async askStream(
    question: string,
    system: string = 'You are a helpful assistant.'
  ): Promise<Readable> {
    try {
      const response = await this.modelIntegration._askStream(question, system);
      return response;
    } catch (error) {
      console.error('Error querying LLM:', error);
      throw new DOMException("Sorry, I couldn't get a response at the moment.")
    }
  }
}
