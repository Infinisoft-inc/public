/**
 * @brainstack/inject
 * A lightweight dependency injection library for JavaScript and TypeScript, designed to facilitate dependency management and injection in your projects.
 * @module DependencyInjection
 */

/**
 * Creates a new dependency injection container.
 * @function
 * @returns {{ register: <T>(id: string, instance: T) => () => void, get: <T>(id: string) => T | undefined }}
 */
export const inject = () => {
  const container: Record<string, any> = {};

  /**
   * Registers a new instance with the given ID.
   * @function
   * @template T
   * @param {string} id - The ID of the instance.
   * @param {T} instance - The instance to register.
   * @returns {() => void} - A function to unregister the instance.
   * @throws {Error} - If an instance with the given ID is already registered.
   */
  const register = <T>(id: string, instance: T): (() => void) => {
    if (id in container) {
      throw new Error(
        `An instance with the ID '${id}' is already registered.`
      );
    }

    container[id] = instance;

    const unregister = () => {
      delete container[id];
    };

    return unregister;
  };

  /**
   * Retrieves the instance with the given ID.
   * @function
   * @template T
   * @param {string} id - The ID of the instance.
   * @returns {T | undefined} - The instance with the given ID, or undefined if no such instance is registered.
   */
  const get = <T>(id: string): T | undefined => {
    return container[id];
  };

  return {
    register,
    get,
  };
};
