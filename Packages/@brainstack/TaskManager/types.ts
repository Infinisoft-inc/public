type TChainList = any
type TEventList = any
export type TaskId = string;
/**
 * Represents the chain list type.
 * @typedef {Record<any, any>} TChainList
 */

/**
 * Represents the event list type.
 * @typedef {Record<any, any>} TEventList
 */

/**
 * Represents the identifier for a task.
 * @typedef {string} TaskId
 */

/**
 * Represents the type of a task.
 * @readonly
 * @enum {number}
 */
export enum TaskType {
  EventTask,
  ChainTask,
  FunctionTask,
}

/**
 * Represents the status of a task.
 * @readonly
 * @enum {number}
 */
export enum TaskStatus {
  Draft,
  Planned,
  Complete,
  Cancel,
  Error,
  InProgress,
  Pause,
  Timeout,
  Retry,
}

/**
 * Represents common properties shared among different task types.
 * @interface
 * @property {TaskId} id - The identifier of the task.
 * @property {string} description - The description of the task.
 * @property {TaskStatus} status - The status of the task.
 * @property {Date | undefined} [startTime] - The start time of the task.
 * @property {number | undefined} [elapsedTime] - The elapsed time of the task in milliseconds.
 * @property {number | undefined} [totalDuration] - The total duration of the task in milliseconds.
 * @property {string[]} log - An array of log messages related to the task.
 * @property {Date} executionDateTime - The execution date and time of the task.
 * @property {() => void} execute - A function representing the execution of the task.
 * @property {() => void} abort - A function representing the abortion of the task.
 */
export interface CommonTaskProperties {
  id: TaskId;
  description: string;
  status: TaskStatus;
  startTime?: Date;
  elapsedTime?: number;
  totalDuration?: number;
  log: string[];
  executionDateTime: Date;
  execute: () => void;
  abort: () => void;
}

/**
 * Represents a chained task.
 * @interface
 * @extends CommonTaskProperties
 * @property {TaskType.ChainTask} type - The type of the task.
 * @property {keyof TChainList} chain - The key of the chain in the chain list.
 * @property {(...args: any[]) => any} chainArgs - A function representing the arguments for the chain.
 */
export interface ChainedTask extends CommonTaskProperties {
  type: TaskType.ChainTask;
  chain: keyof TChainList;
  chainArgs: (...args: any[]) => any;
}

/**
 * Represents a function task.
 * @interface
 * @extends CommonTaskProperties
 * @property {TaskType.FunctionTask} type - The type of the task.
 * @property {(...args: any[]) => any} func - A function representing the task.
 * @property {(...args: any[]) => any} funcArgs - A function representing the arguments for the task.
 */
export interface FunctionTask extends CommonTaskProperties {
  type: TaskType.FunctionTask;
  func: (...args: any[]) => any;
  funcArgs: (...args: any[]) => any;
}

/**
 * Represents an event task.
 * @interface
 * @extends CommonTaskProperties
 * @property {TaskType.EventTask} type - The type of the task.
 * @property {keyof TEventList} event - The key of the event in the event list.
 * @property {(...args: any[]) => any} eventArgs - A function representing the arguments for the event.
 */
export interface EventTask extends CommonTaskProperties {
  type: TaskType.EventTask;
  event: keyof TEventList;
  eventArgs: (...args: any[]) => any;
}
