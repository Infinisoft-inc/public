import { TBrainStackContext } from "@brainstack/react";
import {
  TaskType,
  TaskStatus,
  ChainedTask,
  FunctionTask,
  EventTask,
  TaskId,
} from "./types";
import { uuid } from "uuidv4";

const generateUUID = () => uuid();

// Create a new task
// Define separate types for each task type
export type ChainTaskCreation = Omit<
  ChainedTask,
  | "id"
  | "startTime"
  | "elapsedTime"
  | "totalDuration"
  | "log"
  | "executionDateTime"
> & { type: TaskType.ChainTask };
export type FunctionTaskCreation = Omit<
  FunctionTask,
  | "id"
  | "startTime"
  | "elapsedTime"
  | "totalDuration"
  | "log"
  | "executionDateTime"
> & { type: TaskType.FunctionTask };
export type EventTaskCreation = Omit<
  EventTask,
  | "id"
  | "startTime"
  | "elapsedTime"
  | "totalDuration"
  | "log"
  | "executionDateTime"
> & { type: TaskType.EventTask };

export class TaskManager {
  tasks: Record<TaskId, ChainedTask | FunctionTask | EventTask> = {};

  constructor(
    private bstack: TBrainStackContext,
    private chainList: Record<any, any>
  ) {
    this.tasks = {};
  }

  createTask(
    task: ChainTaskCreation | FunctionTaskCreation | EventTaskCreation,
    delayInSeconds: number
  ) {
    const taskId: TaskId = generateUUID();
    const startTime: Date = new Date(Date.now() + delayInSeconds * 1000);
    const elapsedTime: number = 0;
    const totalDuration: number = 0;
    const log: string[] = [];
    const executionDateTime: Date = new Date();

    let newTask: ChainedTask | FunctionTask | EventTask;

    switch (task.type) {
      case TaskType.ChainTask:
        newTask = {
          id: taskId,
          startTime,
          elapsedTime,
          totalDuration,
          log,
          executionDateTime,
          status: TaskStatus.Draft,
          chain: task.chain,
          chainArgs: task.chainArgs,
          description: task.description,
          type: task.type,
          execute: () => {
            setTimeout(() => {
              this.chainList[String(task.chain)](task.chainArgs());
            }, delayInSeconds * 1000);
          },
          abort: () => {},
        };
        break;
      case TaskType.FunctionTask:
        newTask = {
          id: taskId,
          startTime,
          elapsedTime,
          totalDuration,
          log,
          executionDateTime,
          status: TaskStatus.Draft,
          func: task.func,
          funcArgs: task.funcArgs,
          description: task.description,
          type: task.type,
          execute: () => {
            setTimeout(() => {
              task.func(task.funcArgs());
            }, delayInSeconds * 1000);
          },
          abort: () => {},
        };
        break;
      case TaskType.EventTask:
        newTask = {
          id: taskId,
          startTime,
          elapsedTime,
          totalDuration,
          log,
          executionDateTime,
          status: TaskStatus.Draft,
          event: task.event,
          eventArgs: task.eventArgs,
          description: task.description,
          type: task.type,
          execute: () => {
            setTimeout(() => {
              this.bstack.store.emit(String(task.event), task.eventArgs());
            }, delayInSeconds * 1000);
          },
          abort: () => {},
        };
        break;
      default:
        // Handle unknown task type
        throw new Error("Unknown task type");
    }

    this.tasks[taskId] = newTask;
    return newTask;
  }

  updateTask(
    updatedTask: Partial<ChainedTask | FunctionTask | EventTask>
  ): void {
    if (!updatedTask?.id) {
      throw new Error("Wrong tasks.");
    }
    const existingTask = this.tasks[updatedTask.id];

    if (existingTask && updatedTask.type === existingTask.type) {
      //@ts-ignore
      this.tasks[updatedTask.id] = {
        ...existingTask,
        ...updatedTask,
      };
    }
   
  }

  // Read a task by ID
  readTask(taskId: TaskId): ChainedTask | FunctionTask | EventTask | undefined {
    return this.tasks[taskId];
  }

  // Delete a task by ID
  deleteTask(taskId: TaskId): void {
    delete this.tasks[taskId];
  }

  // List all tasks
  listTasks(): Record<TaskId, ChainedTask | FunctionTask | EventTask> {
    return { ...this.tasks };
  }

  // Start a task
  startTask(taskId: TaskId): void {
    const task = this.tasks[taskId];
    if (task) {
      task.status = TaskStatus.InProgress;
      task.execute();
    }
  }
  // Stop a task
  stopTask(taskId: TaskId): void {
    const task = this.tasks[taskId];
    if (task && task.status === TaskStatus.InProgress) {
      task.abort(); // Assuming you have an `abort` method in CommonTaskProperties
      task.status = TaskStatus.Cancel;
      task.log.push(`Task ${taskId} stopped.`);
    }
  }

  // Cancel a task
  cancelTask(taskId: TaskId): void {
    const task = this.tasks[taskId];
    if (task && task.status !== TaskStatus.Complete) {
      task.abort(); // Assuming you have an `abort` method in CommonTaskProperties
      task.status = TaskStatus.Cancel;
      task.log.push(`Task ${taskId} canceled.`);
    }
  }

  // Pause a task
  pauseTask(taskId: TaskId): void {
    const task = this.tasks[taskId];
    if (task && task.status === TaskStatus.InProgress) {
      task.status = TaskStatus.Pause;
      task.log.push(`Task ${taskId} paused.`);
    }
  }

  // Resume a task
  resumeTask(taskId: TaskId): void {
    const task = this.tasks[taskId];
    if (task && task.status === TaskStatus.Pause) {
      task.status = TaskStatus.InProgress;
      task.log.push(`Task ${taskId} resumed.`);
    }
  }
}