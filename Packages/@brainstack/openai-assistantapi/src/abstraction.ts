/**
 * Represents an interface for interacting with the OpenAI Assistant.
 * This interface defines methods to communicate with the assistant,
 * add custom tools, and manage its operations.
 */
export interface OpenAIAssistantInterface {
    /**
     * Register a callback function to handle specific events.
     * @param eventName The name of the event to listen for.
     * @param callback The function to be called when the event occurs.
     * @example
     * ```typescript
     * assistant.on('messageReceived', handleMessage);
     * ```
     */
    on(eventName: string | RegExp, callback: Function): void;

    /**
     * Get the current status of the assistant.
     * @returns A string representing the current status of the assistant.
     * @example
     * ```typescript
     * const status = assistant.getStatus();
     * console.log(status);
     * ```
     */
    getStatus(): string;

    /**
     * Add a custom tool that can be used by the assistant.
     * @param name The name of the tool.
     * @param tool The tool function to be added.
     * @example
     * ```typescript
     * assistant.addTool('calculator', calculateFunction);
     * ```
     */
    addTool(name: string, tool: Function): void;

    /**
     * Remove a previously added custom tool.
     * @param name The name of the tool to be removed.
     * @example
     * ```typescript
     * assistant.removeTool('calculator');
     * ```
     */
    removeTool(name: string): void;

    /**
     * Initialize a new thread for the assistant.
     * @returns A Promise that resolves when the thread is initialized.
     * @example
     * ```typescript
     * assistant.initThread().then(() => {
     *     console.log('Thread initialized');
     * });
     * ```
     */
    initThread(): Promise<void>;

    /**
     * Poll for answers in a specific thread and run ID.
     * @param threadId The ID of the thread to poll answers from.
     * @param runId The ID of the run to poll answers from.
     * @returns A Promise that resolves when answers are polled.
     * @example
     * ```typescript
     * assistant.pollAnswers('thread123', 'run456');
     * ```
     */
    pollAnswers(threadId: string, runId: string): Promise<void>;

    /**
     * Add a message to the assistant for processing.
     * @param message The message to be processed by the assistant.
     * @returns A Promise that resolves when the message is added.
     * @example
     * ```typescript
     * assistant.addMessage('What is the weather today?');
     * ```
     */
    addMessage(message: string): Promise<void>;

    /**
     * Cancel a specific run identified by its run ID.
     * @param runId The ID of the run to be cancelled.
     * @returns A Promise that resolves when the run is cancelled.
     * @example
     * ```typescript
     * assistant.cancel('run789');
     * ```
     */
    cancel(runId: string): Promise<void>;

    /**
     * Start the assistant, initiating its operations.
     * @returns A Promise that resolves when the assistant starts running.
     * @example
     * ```typescript
     * assistant.run().then(() => {
     *     console.log('Assistant started');
     * });
     * ```
     */
    run(): Promise<void>;
}
