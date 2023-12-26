import * as fs from 'fs';
import * as dotenv from 'dotenv';
import { ConfigManagerIntegration } from '@brainstack/config';
import { createConfigManager } from '../implementation';

const envFilePath = './.env';
let envConfig:{[k:string]:any} = {};

if (fs.existsSync(envFilePath)) {
  // Read the .env file and parse the contents
  envConfig = dotenv.parse(fs.readFileSync(envFilePath));
} else {
  // Create an empty .env file if it doesn't exist
  fs.writeFileSync(envFilePath, '');
}

const nodeIntegration: ConfigManagerIntegration<any> = {
  get(key: string): any | undefined {
    return envConfig[key];
  },
  set(key: string, value: any): void {
    envConfig[key] = value;
    // Synchronize the .env file with the updated configuration state
    const updatedEnvContents = Object.entries(envConfig)
      .map(([k, v]) => `${k}=${v}`)
      .join('\n');
    fs.writeFileSync(envFilePath, updatedEnvContents);
  },
  remove(key: string): void {
    delete envConfig[key];
    // Synchronize the .env file with the updated configuration state
    const updatedEnvContents = Object.entries(envConfig)
      .map(([k, v]) => `${k}=${v}`)
      .join('\n');
    fs.writeFileSync(envFilePath, updatedEnvContents);
  },
};

export const nodeConfigManager = createConfigManager(nodeIntegration);
