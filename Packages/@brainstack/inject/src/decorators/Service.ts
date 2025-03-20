import { Container,defaultContainerMap } from "../container";

/**
 * Decorator to mark a class as a service that can be injected.
 *
 * @param container - (Optional) The `Container` instance to register the service with.  If not provided, a module-scoped container is used.
 * @returns The decorated constructor function.
 * @example
 * ```typescript
 * import { Container, Service, Inject } from '@brainstack/inject';
 *
 * const customScopeContainer = new Container();
 *
 * @Service(customScopeContainer)
 * class MyService {  ...  }
 * ```
 *
 */

// Service.ts

export function Service<T extends new (...args: any[]) => any>(container?: Container) {
  return (constructor: T) => {
    const containerInstance = container || defaultContainerMap.get(module.id) || (() => {
      const moduleId = module.id;
      defaultContainerMap.set(moduleId, new Container());
      return defaultContainerMap.get(moduleId)!;
    })();

    let instance: InstanceType<T> | null = null; 

    const factory = (...args: any[]) => {  // <-- Add ...args
      if (!instance) {
        instance = containerInstance.getInstance(constructor);
      }
      return instance;
    };

    containerInstance.register(constructor.name, factory);
    return constructor;
  };
}

