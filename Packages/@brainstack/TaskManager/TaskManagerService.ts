import { TBrainStackContext } from "@brainstack/react";
import { ChainedTask, FunctionTask, EventTask, TaskId } from "./types";
import { ChainTaskCreation, EventTaskCreation, FunctionTaskCreation, TaskManager } from "./TaskManager";

/**
 * Represents a service for managing and interacting with tasks using TaskManager.
 */
export class TaskManagerService {
  private taskManager: TaskManager;
  private bstack: TBrainStackContext;

  /**
   * Creates an instance of TaskManagerService.
   * @param bstack - An instance of TBrainStackContext from the Brainstack framework.
   * @param chainList - A record representing the chain list.
   */
  constructor(bstack: TBrainStackContext, chainList: Record<any, any>) {
    this.taskManager = new TaskManager(bstack, chainList);
    this.bstack = bstack;
  }

  /**
   * Creates a new task and adds it to the task list.
   * @param task - The task creation parameters.
   * @param delayInSeconds - The delay before the task is executed.
   */
  createTask(
    task: ChainTaskCreation | FunctionTaskCreation | EventTaskCreation,
    delayInSeconds: number
  ): void {
    const newTask = this.taskManager.createTask(task, delayInSeconds);

    // Log the creation of the task using the provided logger in bstack
    this.bstack.log.info(`Task created: ${JSON.stringify(newTask)}`);

    // Optionally, emit an event to notify other parts of the application about the task creation
    this.emitTaskEvent("taskCreated", newTask);
  }

  /**
   * Updates an existing task with the provided properties.
   * @param updatedTask - The updated task properties.
   */
  updateTask(updatedTask: Partial<ChainedTask | FunctionTask | EventTask>): void {
    this.taskManager.updateTask(updatedTask);

    // Log the update of the task using the provided logger in bstack
    this.bstack.log.info(`Task updated: ${JSON.stringify(updatedTask)}`);

    // Optionally, emit an event to notify other parts of the application about the task update
    this.emitTaskEvent("taskUpdated", updatedTask);
  }

  /**
   * Retrieves a task by its ID.
   * @param taskId - The ID of the task to retrieve.
   * @returns The task with the specified ID, or undefined if not found.
   */
  readTask(taskId: TaskId): ChainedTask | FunctionTask | EventTask | undefined {
    const task = this.taskManager.readTask(taskId);

    // Log the reading of the task using the provided logger in bstack
    this.bstack.log.info(`Task read: ${JSON.stringify(task)}`);

    return task;
  }

  /**
   * Deletes a task by its ID.
   * @param taskId - The ID of the task to delete.
   */
  deleteTask(taskId: TaskId): void {
    this.taskManager.deleteTask(taskId);

    // Log the deletion of the task using the provided logger in bstack
    this.bstack.log.info(`Task deleted: ${taskId}`);

    // Optionally, emit an event to notify other parts of the application about the task deletion
    this.emitTaskEvent("taskDeleted", { taskId });
  }

  /**
   * Retrieves a copy of the current task list.
   * @returns A record of tasks, where the keys are task IDs.
   */
  listTasks(): Record<TaskId, ChainedTask | FunctionTask | EventTask> {
    const tasks = this.taskManager.listTasks();

    // Log the listing of tasks using the provided logger in bstack
    this.bstack.log.info(`List of tasks: ${JSON.stringify(tasks)}`);

    return tasks;
  }

  /**
   * Starts the execution of a task.
   * @param taskId - The ID of the task to start.
   */
  startTask(taskId: TaskId): void {
    this.taskManager.startTask(taskId);

    // Log the starting of the task using the provided logger in bstack
    this.bstack.log.info(`Task started: ${taskId}`);

    // Optionally, emit an event to notify other parts of the application about the task start
    this.emitTaskEvent("taskStarted", { taskId });
  }

  /**
   * Stops the execution of a task.
   * @param taskId - The ID of the task to stop.
   */
  stopTask(taskId: TaskId): void {
    this.taskManager.stopTask(taskId);

    // Log the stopping of the task using the provided logger in bstack
    this.bstack.log.info(`Task stopped: ${taskId}`);

    // Optionally, emit an event to notify other parts of the application about the task stop
    this.emitTaskEvent("taskStopped", { taskId });
  }

  /**
   * Pauses the execution of a task.
   * @param taskId - The ID of the task to pause.
   */
  pauseTask(taskId: TaskId): void {
    this.taskManager.pauseTask(taskId);

    // Log the pausing of the task using the provided logger in bstack
    this.bstack.log.info(`Task paused: ${taskId}`);

    // Optionally, emit an event to notify other parts of the application about the task pause
    this.emitTaskEvent("taskPaused", { taskId });
  }

  /**
   * Resumes the execution of a paused task.
   * @param taskId - The ID of the task to resume.
   */
  resumeTask(taskId: TaskId): void {
    this.taskManager.resumeTask(taskId);

    // Log the resuming of the task using the provided logger in bstack
    this.bstack.log.info(`Task resumed: ${taskId}`);

    // Optionally, emit an event to notify other parts of the application about the task resume
    this.emitTaskEvent("taskResumed", { taskId });
  }

  /**
   * Emits an event using the Brainstack store.
   * @param eventName - The name of the event to emit.
   * @param payload - The payload to include in the event.
   */
  private emitTaskEvent(eventName: string, payload: any): void {
    this.bstack.store.emit(eventName, payload);

    // Log the event using the provided logger in bstack
    this.bstack.log.info(`Event "${eventName}" emitted with payload: ${JSON.stringify(payload)}`);
  }
}
