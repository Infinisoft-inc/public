import {
  ChainTaskCreation,
  EventTaskCreation,
  FunctionTaskCreation,
  TaskManager,
} from "./TaskManager";
import {
  TaskType,
  TaskStatus,
  ChainedTask,
  FunctionTask,
  EventTask,

} from "./types";

describe("TaskManager", () => {
  let taskManager: TaskManager;

  beforeEach(() => {
    taskManager = new TaskManager(jest.fn() as any, {
      someChain: () => Promise.resolve("Yes"),
    });
  });

  it("should create, read, update, and delete tasks", () => {
    // Create tasks
    const chainedTask: ChainTaskCreation = {
      description: "Chained Task",
      status: TaskStatus.Draft,
      execute: () => {},
      abort: () => {},
      type: TaskType.ChainTask,
      chain: "someChain",
      chainArgs: () => {},
    };

    const functionTask: FunctionTaskCreation = {
      description: "Function Task",
      status: TaskStatus.Draft,
      execute: async () => {},
      abort: async () => {},
      type: TaskType.FunctionTask,
      func: async () => {},
      funcArgs: () => {},
    };

    const eventTask: EventTaskCreation = {
      description: "Event Task",
      status: TaskStatus.Draft,
      execute: async () => {},
      abort: async () => {},
      type: TaskType.EventTask,
      event: "Event",
      eventArgs: () => {},
    };

    // Add tasks
    const c = taskManager.createTask(chainedTask, 0) as ChainedTask;
    const f = taskManager.createTask(functionTask, 0) as FunctionTask;
    const e = taskManager.createTask(eventTask, 0) as EventTask;

    // List tasks
    const tasks = taskManager.listTasks();
    expect(Object.keys(tasks)).toHaveLength(3);

    // Update expectations
    expect(c.chain).toBe(chainedTask.chain);
    expect(f.func).toBe(functionTask.func);
    expect(e.event).toBe(eventTask.event);

    // Update tasks
    const updatedChainedTask: Partial<ChainedTask> = {
      id: c.id,
      type: TaskType.ChainTask,
      status: TaskStatus.InProgress,
    };
    taskManager.updateTask(updatedChainedTask);

    const updatedFunctionTask: Partial<FunctionTask> = {
      id: f.id,
      type: TaskType.FunctionTask,
      status: TaskStatus.Complete,
    };
    taskManager.updateTask(updatedFunctionTask);

    const updatedEventTask: Partial<EventTask> = {
      id: e.id,
      type: TaskType.EventTask,
      status: TaskStatus.Cancel,
    };
    taskManager.updateTask(updatedEventTask);

    expect(taskManager.readTask(c.id)?.status).toEqual(TaskStatus.InProgress);
    expect(taskManager.readTask(f.id)?.status).toEqual(TaskStatus.Complete);
    expect(taskManager.readTask(e.id)?.status).toEqual(TaskStatus.Cancel);

    // Delete tasks
    taskManager.deleteTask(c.id);
    taskManager.deleteTask(f.id);
    taskManager.deleteTask(e.id);

    expect(taskManager.readTask(c.id)).toBeUndefined();
    expect(taskManager.readTask(f.id)).toBeUndefined();
    expect(taskManager.readTask(e.id)).toBeUndefined();
  });

  it("should start, stop, cancel, pause, and resume tasks", () => {
    // Create tasks
    const chainedTask: ChainTaskCreation = {
      description: "Chained Task",
      status: TaskStatus.Draft,
      execute: async () => {},
      abort: async () => {},
      type: TaskType.ChainTask,
      chain: "someChain",
      chainArgs: () => {},
    };

    // Add tasks
    const c = taskManager.createTask(chainedTask, 0);

    // Start a task
    taskManager.startTask(c.id);
    expect(taskManager.readTask(c.id)?.status).toEqual(TaskStatus.InProgress);

    // Pause a task
    taskManager.pauseTask(c.id);
    expect(taskManager.readTask(c.id)?.status).toEqual(TaskStatus.Pause);

    // Resume a task
    taskManager.resumeTask(c.id);
    expect(taskManager.readTask(c.id)?.status).toEqual(TaskStatus.InProgress);
    // Stop a task
    taskManager.stopTask(c.id);
    expect(taskManager.readTask(c.id)?.status).toEqual(TaskStatus.Cancel);

    const c1 = taskManager.createTask(chainedTask, 0);
    // Cancel a task
    taskManager.cancelTask(c1.id);
    expect(taskManager.readTask(c1.id)?.status).toEqual(TaskStatus.Cancel);
  });

  it("should list tasks", async () => {
    //   Create tasks
    const chainedTask: ChainTaskCreation = {
      description: "Chained Task",
      status: TaskStatus.Draft,
      execute: async () => {},
      abort: async () => {},
      type: TaskType.ChainTask,
      chain: "someChain",
      chainArgs: () => {},
    };

    const functionTask: FunctionTaskCreation = {
      description: "Function Task",
      status: TaskStatus.Draft,
      execute: async () => {},
      abort: async () => {},
      type: TaskType.FunctionTask,
      func: async () => {},
      funcArgs: () => {},
    };

    // Add tasks

    const c = taskManager.createTask(chainedTask, 0);
    const f = taskManager.createTask(functionTask, 0);

    // List tasks
    const tasks = taskManager.listTasks();
    expect(Object.keys(tasks)).toHaveLength(2);

    // Update expectations
    expect(c.status).toEqual(TaskStatus.Draft);

    expect(f.type).toEqual(TaskType.FunctionTask);
  });
});
