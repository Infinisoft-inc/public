export class TrustProcessor {
  constructor(private level: LevelOfTrust) {}

  getTrustLevel() {
    return this.level.toString();
  }

  async requestApproval(commands: string[], explanations: string) {
    switch (this.level) {
      case LevelOfTrust.NONE:
        return await this.askUserApproval(commands, explanations);
      case LevelOfTrust.FAIR:
        console.log(`Level of trust FAIR, automatic approval\n`);
      case LevelOfTrust.AUTONOMOUS:
        console.log(`Level of trust AUTONOMOUS, automatic approval, no feedback\n`);
        return true;
      default:
        return false;
    }
  }

  private askUserApproval(commands: string[], explanations: string) {
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    return new Promise<boolean>((resolve) => {
      console.log(
        `Explanations:\n${explanations}\n\nCommands to be executed:\n${commands.join(
          '\n'
        )}\n\n`
      );

      rl.question(
        `Do you approve the following commands? (y/N): `,
        (answer: string) => {
          const approved = answer.toLowerCase().trim() === 'y';
          rl.close();
          resolve(approved);
        }
      );
    });
  }
}

export enum LevelOfTrust {
  NONE = 'NONE', // Ask approval for everything
  FAIR = 'FAIR', //
  AUTONOMOUS = 'AUTONOMOUS',
}
