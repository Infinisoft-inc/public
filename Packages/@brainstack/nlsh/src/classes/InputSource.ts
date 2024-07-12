import readline from 'readline';

export class ConsoleInput implements InputSource {
  async getInput(): Promise<string> {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    // Create a Promise to resolve with the user input
    return new Promise<string>((resolve) => {
      rl.question('> ', (input: string) => {
        rl.close();
        resolve(input);
      });
    });
  }
}

export interface InputSource {
  getInput(): Promise<string>;
}
