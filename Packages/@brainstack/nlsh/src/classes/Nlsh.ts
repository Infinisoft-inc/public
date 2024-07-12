import { OpenAIAssistant } from '@brainstack/openai-assistantapi';
import { PromptBuilder } from './PromptBuilder';
import { CommandParser } from './CommandParser';
import { ExplanationParser } from './ExplanationParser';
import { FeedbackProcessor } from './FeedbackProcessor';
import { TrustProcessor, LevelOfTrust } from './TrustProcessor';
import { ScriptExecutor } from './ScriptExecutor';
import { Output } from './Output';
import { InputSource } from './InputSource';

export class Nlsh {
  private _prompt: PromptBuilder = new PromptBuilder();
  private _commands: CommandParser = new CommandParser();
  private _explain: ExplanationParser = new ExplanationParser();
  private _trust: TrustProcessor = new TrustProcessor(LevelOfTrust.NONE);
  private _script: ScriptExecutor = new ScriptExecutor();
  private _feedback: FeedbackProcessor = new FeedbackProcessor();
  private iBrain: OpenAIAssistant;

  constructor(
    private inputSource: InputSource,
    private output: Output,
    apiKey: string,
    level: LevelOfTrust = LevelOfTrust.NONE
  ) {
    this.iBrain = new OpenAIAssistant({ apiKey }, '');
    this._trust = new TrustProcessor(level);
  }

  private async ask(input: string) {
    const answer = await this.iBrain.openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: input }],
    });

    const content = answer.choices[0].message.content;

    if (!content) {
      throw new Error('No Answer from AI!');
    }
    return content;
  }

  private welcome() {
    const MESSAGE = `Welcome to the AI Natural Language Shell (AINLSH)
Level of trust: ${this._trust.getTrustLevel()}
`;
    this.output.displayMessage(MESSAGE);
  }

  private async run() {
    let intentions = await this.prompt();
    while (intentions.toLowerCase().trim() !== 'exit') {
      const prompt = this._prompt.build(intentions);
      const answer = await this.ask(prompt);
      const commands = this._commands.parse(answer);
      const explanations = this._explain.parse(answer);
      const isApproved = await this._trust.requestApproval(
        commands,
        explanations
      );

      if (isApproved) {
        this._script.run(commands);
      } else {
        console.log(`Action refused!`);
      }

      if (this._trust.getTrustLevel() !== LevelOfTrust.AUTONOMOUS) {
        const feedback = await this._feedback.request(
          intentions,
          explanations,
          commands
        );
      }

      intentions = await this.prompt();
    }
  }

  private bye() {
    this.output.displayMessage(`Good bye!`);
  }

  private async prompt() {
    const MESSAGE = `What do you want to do?`;
    this.output.displayMessage(MESSAGE);
    const intentions = await this.inputSource.getInput();

    return intentions;
  }

  async start(): Promise<void> {
    this.welcome();
    await this.run();
    this.bye();
  }
}
