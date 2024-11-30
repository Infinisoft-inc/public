// src/implementation.ts
import 'reflect-metadata';

const container: Record<string, any> = {};

/**
 * Registers a service instance in the container.
 * @param id - The unique identifier for the service.
 * @param instance - The instance of the service to register.
 * @returns A function to unregister the service.
 */
export function register<T>(id: string, instance: T) {
  if (container[id]) {
    throw new Error(`An instance with the ID '${id}' is already registered.`);
  }
  container[id] = instance;

  return () => {
    delete container[id]
  }
}

/**
 * Retrieves an instance from the container by its ID.
 * @param id - The unique identifier for the service.
 * @returns The instance of the service or undefined if not found.
 */
export function get<T>(id: string): T | undefined {
  return container[id];
}

/**
 * Decorator to mark constructor parameters for dependency injection.
 * @param target - The target class.
 * @param propertyKey - The name of the method or property.
 * @param parameterIndex - The index of the parameter to inject.
 */
export function Inject(target: any, propertyKey: string | symbol | undefined, parameterIndex: number) {
  const existingInjectedParams: number[] = Reflect.getMetadata('inject_params', target, propertyKey!) || [];
  existingInjectedParams.push(parameterIndex);
  Reflect.defineMetadata('inject_params', existingInjectedParams, target, propertyKey!);
}

/**
 * Service decorator to register service classes.
 * @param constructor - The constructor of the service class.
 * @returns The constructor of the service class.
 */
export function Service<T extends { new(...args: any[]): {} }>(constructor: T) {
  const serviceInstance = new constructor();
  register(constructor.name, serviceInstance);
  return constructor;
}

/**
 * Resolves dependencies for a class and creates an instance.
 * @param ctor - The constructor of the class to instantiate.
 * @returns An instance of the class with dependencies resolved.
 */
export function getInstance<T>(ctor: new (...args: any[]) => T): T {
  const paramTypes = Reflect.getMetadata('design:paramtypes', ctor) || [];
  const params = paramTypes.map((param: any) => get(param.name));
  return new ctor(...params);
}
