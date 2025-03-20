export class SingletonContainer {
  private static instance: SingletonContainer;
  private instances: Map<string, any>;

  // Private constructor to enforce the singleton pattern
  private constructor() {
    this.instances = new Map();
  }

  // Gets the single instance of the SingletonContainer
  public static getInstance(): SingletonContainer {
    if (!SingletonContainer.instance) {
      SingletonContainer.instance = new SingletonContainer();
    }
    return SingletonContainer.instance;
  }

  get<T>(identifier: string | (new (...args: any[]) => T)): T {
    // <-- Accepts string or constructor
    const key = typeof identifier === 'string' ? identifier : identifier.name;
    if (!this.instances.has(key)) {
      throw new Error(`Instance for ${key} not found. Register it first.`);
    }
    return this.instances.get(key) as T;
  }

  getOrRegister<T>(identifier: new (...args: any[]) => T, ...args: any[]): T {
    const key = identifier.name;
    if (!this.instances.has(key)) {
      const instance = new identifier(...args);
      this.instances.set(key, instance);
    }
    return this.instances.get(key) as T;
  }

  // Registers an instance for the given identifier

  register<T>(
    identifier: (new (...args: any[]) => T) | string,
    instance: T
  ): () => void {
    const key = typeof identifier === 'string' ? identifier : identifier.name;
    if (this.instances.has(key)) {
      throw new Error(`Instance for ${key} is already registered.`);
    }
    this.instances.set(key, instance);

    return () => this.instances.delete(key);
  }

  // Clears all registered instances
  public reset(): void {
    this.instances.clear();
  }
}
