import { SingletonContainer } from '../container/SingletonContainer';

/**
 * SingletonService decorator.
 * Marks a class as a Singleton, ensuring only one instance of the class
 * is created and shared across the application.
 *
 * @param target The target class to be decorated.
 */
export function SingletonService<T extends { new (...args: any[]): any }>(
  target: T
): T {
  return class extends target {
    constructor(...args: any[]) {
      // Call the base class constructor
      super(...args);

      const container = SingletonContainer.getInstance();
      container.getOrRegister<T>(target);

      return target;
    }
  };
}
