export class FeedbackProcessor {
  constructor() { }
  async request(intentions: string, explanations: string, commands: string[]) {
    const isAccurate = await this.askUserFeedback();
    return {
      intentions,
      explanations,
      commands,
      isAccurate,
    };
  }

  private askUserFeedback() {
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    return new Promise<boolean>((resolve) => {
      rl.question(
        `Feedback: Did it do what you expected? (y/N): `,
        (answer: string) => {
          const approved = answer.toLowerCase().trim() === 'y';
          rl.close();
          resolve(approved);
        }
      );
    });
  }
}
