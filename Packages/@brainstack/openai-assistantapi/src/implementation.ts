import { OpenAI, ClientOptions } from 'openai';
import { Logger, createLogger } from '@brainstack/log';
import { createEventHub, EventHub } from '@brainstack/hub';
import { OpenAIAssistantInterface } from './abstraction';

export class OpenAIAssistant implements OpenAIAssistantInterface {
  private openai: OpenAI;
  private thread: any;
  private logger: Logger;
  private status: string;
  private assistantId: string;
  private functions: Record<string, Function>;
  private hub: EventHub;

  constructor(options: ClientOptions, assistantId: string) {
    this.openai = new OpenAI(options);
    this.thread = null;
    this.logger = createLogger();
    this.status = 'idle';
    this.assistantId = assistantId;
    this.functions = {}; 
    this.hub = createEventHub();
  }

  public on(_eventName: string | RegExp, _callback: Function) {
    this.hub.on(_eventName, _callback);
  }

  public getStatus(): string {
    return this.status;
  }

  public addTool(name: string, func: Function): void {
    this.functions[name] = func;
  }

  public removeTool(name: string): void {
    if (this.functions[name]) {
      delete this.functions[name];
    }
  }

  async initThread(): Promise<void> {
    this.thread = await this.openai.beta.threads.create();
  }

  async pollAnswers(threadId: string, runId: string): Promise<void> {
    let completed = false;
    while (!completed) {
      try {
        const response = await this.openai.beta.threads.runs.retrieve(
          threadId,
          runId
        );
        this.updateStatus(response.status);

        if (this.isRunCompleted(response.status)) {
          this.logger.info('Run completed!');
          await this.handleCompletedRun(threadId);
          this.hub.emit('complete', { threadId });
          completed = true;
        } else if (
          response.status === 'requires_action' &&
          response['required_action']
        ) {
          this.logger.info('Run Action Required!');
          this.hub.emit('required_action', {
            threadId,
            runId,
            required_action: response['required_action'],
          });
          await this.handleActionRequired(
            threadId,
            runId,
            response['required_action']
          );
        } else if (this.isRunFailedOrCancelled(response.status)) {
          this.logger.info(`Completed ${response.status}`);
          this.hub.emit('failed_canceled', {
            response,
          });
          completed = true;
        } else if (this.isRunInProgress(response.status)) {
          this.logger.info(`Run ${response.status}`);
          this.hub.emit('in_progress');
          await this.delay(2000); // Poll every 2 seconds
        }
      } catch (error) {
        this.logger.error('Error in polling (retrying):', error);
      }
    }
  }

  private updateStatus(newStatus: string): void {
    this.status = newStatus;
    this.hub.emit('status_changed', {
       status:newStatus,
      });
  }

  private isRunCompleted(status: string): boolean {
    return status === 'completed' || status === 'expired';
  }

  private isRunFailedOrCancelled(status: string): boolean {
    return ['failed', 'cancelled', 'expired', 'cancelling'].includes(status);
  }

  private isRunInProgress(status: string): boolean {
    return status === 'in_progress' || status === 'queued';
  }

  private async handleActionRequired(
    threadId: string,
    runId: string,
    requiredAction: any
  ): Promise<void> {
    const tool_outputs = await this.processRequiredActions(requiredAction);
    await this.openai.beta.threads.runs.submitToolOutputs(threadId, runId, {
      tool_outputs,
    });
  }

  private async processRequiredActions(requiredAction: any): Promise<any[]> {
    return Promise.all(
      requiredAction['submit_tool_outputs']['tool_calls'].map(
        async (ra: any) => {
          if (ra.type === 'function' && ra.function.name in this.functions) {
            this.logger.info(
              `Running ${ra.function.name} with arguments ${ra.function.arguments}`
            );
            const ret = await Promise.resolve(
              this.functions[ra.function.name](ra.function.arguments)
            );
            this.logger.info('Returned ', ret);
            return {
              tool_call_id: ra.id,
              output: JSON.stringify(ret),
            };
          }
          return {
            tool_call_id: ra.id,
            output: 'There is a problem, function not found!',
          };
        }
      )
    );
  }

  private async handleCompletedRun(threadId: string): Promise<void> {
    const respmsg: any = await this.openai.beta.threads.messages.list(threadId);
    this.hub.emit('run_completed', {
        threadId,
        respmsg
       });
    if (respmsg.data[0].content[0]?.hasOwnProperty('text')) {
      this.logger.info(respmsg.data[0].content[0]?.text?.value);
    }
  }

  async addMessage(message: string): Promise<void> {
    const msg = await this.openai.beta.threads.messages.create(this.thread.id, {
      role: 'user',
      content: message,
    });
  }

  async cancel(runId: string): Promise<void> {
    await this.openai.beta.threads.runs.cancel(this.thread.id, runId);
  }

  async run(): Promise<void> {
    this.logger.info('RUN STEP: ' + this.assistantId);
    const response = await this.openai.beta.threads.runs.create(
      this.thread.id,
      {
        assistant_id: this.assistantId,
      }
    );
    await this.pollAnswers(this.thread.id, response.id);
  }

  private async delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

