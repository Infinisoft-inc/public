#!/bin/bash

# Set project name and directory
PROJECT_NAME="pipe-chat-cli"
PROJECT_DIR=$(pwd)/$PROJECT_NAME

# Create project directory
mkdir -p $PROJECT_DIR

# Navigate to project directory
cd $PROJECT_DIR

# Initialize npm project
npm init -y

# Install necessary packages
npm install typescript ts-node @types/node dotenv commander supabase-js openai readline-sync

# Create tsconfig.json
cat <<EOL > tsconfig.json
{
  "compilerOptions": {
    "target": "ES6",
    "module": "commonjs",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
EOL

# Create .env file
cat <<EOL > .env
SUPABASE_URL=your-supabase-url
SUPABASE_KEY=your-supabase-key
AI_PROVIDER_BASE_URL=https://api.openai.com
AI_PROVIDER_API_KEY=your-openai-api-key
AI_MODEL=gpt-4
EOL

# Create project structure
mkdir -p src/ai src/dataSource src/commands src/parsers src/utils

# Create IAIProvider.ts
cat <<EOL > src/ai/IAIProvider.ts
export interface IAIProvider {
  ask(message: string, context: string): Promise<string>;
}
EOL

# Create OpenAIProvider.ts
cat <<EOL > src/ai/OpenAIProvider.ts
import { IAIProvider } from './IAIProvider';
import { Configuration, OpenAIApi } from 'openai';

export class OpenAIProvider implements IAIProvider {
  private ai: OpenAIApi;
  private model: string;

  constructor(baseUrl: string, apiKey: string, model: string) {
    const configuration = new Configuration({
      apiKey: apiKey,
      basePath: baseUrl
    });
    this.ai = new OpenAIApi(configuration);
    this.model = model;
  }

  async ask(message: string, context: string): Promise<string> {
    const response = await this.ai.createChatCompletion({
      model: this.model,
      messages: [{ role: 'system', content: context }, { role: 'user', content: message }]
    });
    return response.data.choices[0].message.content.trim();
  }
}
EOL

# Create IDataSourceProvider.ts
cat <<EOL > src/dataSource/IDataSourceProvider.ts
export interface IDataSourceProvider {
  init(): Promise<void>;
  getContext(): Promise<string>;
  applyChanges(changes: string): Promise<void>;
}
EOL

# Create SupabaseProvider.ts
cat <<EOL > src/dataSource/SupabaseProvider.ts
import { createClient } from '@supabase/supabase-js';
import { IDataSourceProvider } from './IDataSourceProvider';

export class SupabaseProvider implements IDataSourceProvider {
  private client: any;

  constructor(private url: string, private key: string) {
    this.client = createClient(this.url, this.key);
  }

  async init(): Promise<void> {
    // Any initialization logic
  }

  async getContext(): Promise<string> {
    const { data, error } = await this.client.from('your_table').select('*');
    if (error) throw error;
    return JSON.stringify(data, null, 2);
  }

  async applyChanges(changes: string): Promise<void> {
    const { data, error } = await this.client.rpc('execute_sql', { query: changes });
    if (error) throw error;
  }
}
EOL

# Create init.ts
cat <<EOL > src/commands/init.ts
import { IDataSourceProvider } from '../dataSource/IDataSourceProvider';

export const initDataSource = async (dataSourceProvider: IDataSourceProvider): Promise<void> => {
  await dataSourceProvider.init();
  console.log('Data source initialized.');
};
EOL

# Create getContext.ts
cat <<EOL > src/commands/getContext.ts
import { IDataSourceProvider } from '../dataSource/IDataSourceProvider';

export const getContext = async (dataSourceProvider: IDataSourceProvider): Promise<string> => {
  const context = await dataSourceProvider.getContext();
  return context;
};
EOL

# Create chatWithAI.ts
cat <<EOL > src/commands/chatWithAI.ts
import { IAIProvider } from '../ai/IAIProvider';
import { IDataSourceProvider } from '../dataSource/IDataSourceProvider';
import { AIMessageProcessPipeline } from '../parsers/AIMessageProcessPipeline';
import { SupabaseParser } from '../parsers/SupabaseParser';
import { promptUser } from '../utils/promptUser';

export const chatWithAI = async (aiClient: IAIProvider, context: string, dataSourceProvider: IDataSourceProvider): Promise<void> => {
  console.log('Chatting with AI. Type "exit" to quit.');
  const aiMessageProcessPipeline = new AIMessageProcessPipeline([new SupabaseParser(dataSourceProvider)]);

  let exit = false;

  while (!exit) {
    const userInput = await promptUser('You: ');

    if (userInput.toLowerCase() === 'exit') {
      exit = true;
      console.log('Exiting chat.');
    } else {
      const aiResponse = await aiClient.ask(userInput, context);
      console.log(\`AI: \${aiResponse}\`);
      aiMessageProcessPipeline.process(aiResponse);
    }
  }
};
EOL

# Create IDataProcessPipeline.ts
cat <<EOL > src/parsers/IDataProcessPipeline.ts
export interface IDataProcessPipeline {
  add(parser: IParser): void;
  remove(parser: IParser): void;
  process(message: string): void;
}
EOL

# Create IParser.ts
cat <<EOL > src/parsers/IParser.ts
export interface IParser {
  run(message: string): Promise<void>;
  evaluate(message: string): boolean;
}
EOL

# Create BaseProcessPipeline.ts
cat <<EOL > src/parsers/BaseProcessPipeline.ts
import { IDataProcessPipeline } from './IDataProcessPipeline';
import { IParser } from './IParser';

export abstract class BaseProcessPipeline implements IDataProcessPipeline {
  private parsers: IParser[] = [];

  constructor(parsers?: IParser[]) {
    if (parsers) {
      this.parsers = parsers;
    }
  }

  add(parser: IParser): void {
    this.parsers.push(parser);
  }

  remove(parser: IParser): void {
    const index = this.parsers.indexOf(parser);
    if (index > -1) {
      this.parsers.splice(index, 1);
    }
  }

  process(message: string): void {
    this.parsers.forEach((parser) => {
      if (parser.evaluate(message)) {
        parser.run(message);
      }
    });
  }
}
EOL

# Create AIMessageProcessPipeline.ts
cat <<EOL > src/parsers/AIMessageProcessPipeline.ts
import { BaseProcessPipeline } from './BaseProcessPipeline';

export class AIMessageProcessPipeline extends BaseProcessPipeline {
  constructor(parsers?: IParser[]) {
    super(parsers);
  }
}
EOL

# Create SupabaseParser.ts
cat <<EOL > src/parsers/SupabaseParser.ts
import { IParser } from './IParser';
import { IDataSourceProvider } from '../dataSource/IDataSourceProvider';
import { promptUser } from '../utils/promptUser';

export class SupabaseParser implements IParser {
  private dataSourceProvider: IDataSourceProvider;

  constructor(dataSourceProvider: IDataSourceProvider) {
    this.dataSourceProvider = dataSourceProvider;
  }

  evaluate(message: string): boolean {
    return /<EXECUTE_QUERY>[\s\S]*<\/EXECUTE_QUERY>/.test(message);
  }

  async run(message: string): Promise<void> {
    const instructions = message.match(/<EXECUTE_QUERY>([\s\S]*)<\/EXECUTE_QUERY>/)?.[1];
    if (instructions) {
      await this.action(instructions);
    }
  }

  private async action(content: string): Promise<void> {
    const confirmation = await promptUser(\`Do you want to apply these changes: \${content}? (yes/no): \`);
    if (confirmation.toLowerCase() === 'yes') {
      await this.dataSourceProvider.applyChanges(content);
    }
  }
}
EOL

# Create promptUser.ts
cat <<EOL > src/utils/promptUser.ts
import readline from 'readline-sync';

export const promptUser = (question: string): string => {
  return readline.question(question);
};
EOL

# Create index.ts
cat <<EOL > src/index.ts
import { Command } from 'commander';
import { config } from 'dotenv';
import { SupabaseProvider } from './dataSource/SupabaseProvider';
import { OpenAIProvider } from './ai/OpenAIProvider';
import { initDataSource } from './commands/init';
import { getContext } from './commands/getContext';
import { chatWithAI } from './commands/chatWithAI';

// Load environment variables
config();

const SUPABASE_URL = process.env.SUPABASE_URL || 'your-supabase-url';
const SUPABASE_KEY = process.env.SUPABASE_KEY || 'your-supabase-key';
const AI_PROVIDER_BASE_URL = process.env.AI_PROVIDER_BASE_URL || 'https://api.openai.com';
const AI_PROVIDER_API_KEY = process.env.AI_PROVIDER_API_KEY || 'your-openai-api-key';
const AI_MODEL = process.env.AI_MODEL || 'gpt-4';

const dataSourceProvider = new SupabaseProvider(SUPABASE_URL, SUPABASE_KEY);
const aiProvider = new OpenAIProvider(AI_PROVIDER_BASE_URL, AI_PROVIDER_API_KEY, AI_MODEL);

const program = new Command();
program.version('1.0.0');

program
  .command('init')
  .description('Initialize the data source')
  .action(async () => {
    await initDataSource(dataSourceProvider);
  });

program
  .command('context')
  .description('Get context from the data source')
  .action(async () => {
    const context = await getContext(dataSourceProvider);
    console.log(context);
  });

program
  .command('chat')
  .description('Chat with the AI')
  .action(async () => {
    const context = await getContext(dataSourceProvider);
    await chatWithAI(aiProvider, context, dataSourceProvider);
  });

program.parse(process.argv);
EOL

# Build the project
tsc

echo "Project scaffolded successfully!"
