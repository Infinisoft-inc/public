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

export function Service<T extends new (...args: any[]) => any>(
  container?: Container
) {
  return (constructor: T) => {
    const containerInstance = container ||
      (() => {
        // IIFE to initialize default on first use
        const moduleId = module.id; // Get the module's unique ID
        if (!defaultContainerMap.has(moduleId)) {
          defaultContainerMap.set(moduleId, new Container());
        }

        return defaultContainerMap.get(moduleId)!;
      })();

    // Use a factory function for instantiation control; captured 'instance' variable.
    let instance: InstanceType<T> | null = null;
    const factory = () => {
      if (!instance) {
        instance = containerInstance.getInstance(constructor); // Proper instantiation.
      }

      return instance;
    };

    containerInstance.register(constructor.name, factory); // Register the factory.

    return constructor; // Return the original constructor
  };
}
