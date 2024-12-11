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

  // Retrieves the instance associated with the provided identifier
  public get<T>(identifier: new (...args: any[]) => T): T {
    if (!this.instances.has(identifier.name)) {
      throw new Error(`Instance for ${identifier.name} not found. Register it first.`);
    }
    return this.instances.get(identifier.name) as T;
  }

  // Retrieves or creates an instance, and registers it if not already registered
  public getOrRegister<T>(identifier: new (...args: any[]) => T, ...args: any[]): T {
    if (!this.instances.has(identifier.name)) {
      // If instance doesn't exist, create a new one and register it
      const instance = new identifier(...args);
      this.instances.set(identifier.name, instance);
    }
    // Return the instance (either the existing one or the newly created one)
    return this.instances.get(identifier.name) as T;
  }

  // Registers an instance for the given identifier
  public register<T>(identifier: new (...args: any[]) => T, ...args: any[]): () => void {
    const key = identifier.name;
    if (this.instances.has(key)) {
      throw new Error(`Instance for ${key} is already registered.`);
    }
    this.instances.set(key, new identifier(...args));
    return () => this.instances.delete(key);
  }

  // Clears all registered instances
  public reset(): void {
    this.instances.clear();
  }
}
