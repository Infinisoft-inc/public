import * as readline from 'readline';
import { TConfigCli } from './abstraction';
import { ConfigManagerIntegration, createConfigManager, nodeConfigManager } from '@brainstack/config';

const myIntegration: ConfigManagerIntegration<any> = {
    get(key: string): any | undefined {
      // Your implementation to retrieve the value for the key
    },
    set(key: string, value: any): void {
      // Your implementation to set the value for the key
    },
    remove(key: string): void {
      // Your implementation to remove the value for the key
    },
  };


class ConfigCLI {
  private rl: readline                         .Interface;
  private configManager: TConfigCli;

  constructor(configManager: TConfigCli) {
    this.configManager = configManager;
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  private ask(question: string): Promise<string> {
    return new Promise((resolve) => {
      this.rl.question(question, (answer) => resolve(answer));
    });
  }

  public async run(): Promise<void> {
    console.log('Brainstack Configuration Tool');
    const key = await this.ask('Enter the configuration key to update: ');
    const value = await this.ask('Enter the new value: ');

    this.configManager.set(key, value);
    console.log(`Configuration for ${key} updated to ${value}.`);

    this.rl.close();
  }
}




export default ConfigCLI;
const cli = new ConfigCLI(createConfigManager(nodeConfigManager))