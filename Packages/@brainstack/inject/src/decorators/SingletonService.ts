import { Container } from '../container';
import { SingletonContainer } from '../container/SingletonContainer';

/**
 * SingletonService decorator.
 * Marks a class as a Singleton, ensuring only one instance of the class
 * is created and shared across the application.
 *
 * @param target The target class to be decorated.
 */

import { defaultContainerMap } from '../container/Container'; // Import defaultContainerMap

export function SingletonService<T extends { new (...args: any[]): any }>(target: T): any {
  const container = SingletonContainer.getInstance();
  const key = target.name;

  const factory = (...args: any[]) => {
    return container.getOrRegister<T>(target, ...args);
  };


  Object.defineProperty(factory, 'name', { value: target.name, writable: false });

    // Get the module-scoped container (important!)
    const moduleId = module.id; // Get the module ID of where it's being used.
    const defaultContainer = defaultContainerMap.get(moduleId) || new Container();

    // Register with the module's default container
    defaultContainer.register(key, factory, false); // The 'false' here ensures it's registered as a singleton within the module.
    // Add to default container if it doesn't exist
    if (!defaultContainerMap.has(moduleId))
        defaultContainerMap.set(moduleId, defaultContainer);

  return factory;
}
