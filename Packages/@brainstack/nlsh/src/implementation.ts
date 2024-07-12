import { createLogger, LogLevel } from '@brainstack/log';
import { config } from 'dotenv';
import { Nlsh } from './classes/Nlsh';
import { ConsoleInput } from './classes/InputSource';
import { ConsoleOutput } from './classes/Output';
import { LevelOfTrust } from './classes/TrustProcessor';
import fs from 'fs';
config();

export const run = async () => {
  const log = createLogger(LogLevel.VERBOSE);
  let apiKey = process.env['OPENAI_API_KEY'];

  if (!apiKey) {
    log.error(`Add OPENAI_API_KEY to the .env file!`);

    const q = new ConsoleInput();

    // Prompt user for the API key synchronously
    apiKey = await q.getInput();

    // Write the API key to the .env file
    fs.appendFileSync('.env', `OPENAI_API_KEY=${apiKey}\n`);

    // Log success message
    console.log('API key has been saved to the .env file.');
  }

  const nlsh: Nlsh = new Nlsh(
    new ConsoleInput(),
    new ConsoleOutput(),
    apiKey,
    LevelOfTrust.NONE
  );
  nlsh.start();
};

