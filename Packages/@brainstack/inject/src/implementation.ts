// @brainstack/inject/src/implementation.ts
import 'reflect-metadata';
import { ServiceIdentifier } from './abstraction';



/**
 * A dependency injection container.  Manages the registration and resolution of dependencies.
 * Each module or package should create its own instance of `Container`.
 */
export class Container {
  private _container: Record<string, any> = {};

  /**
   * Creates a new instance of the `Container`.
   */
  constructor() {}

  /**
   * Registers a service or factory in the container.
   * @param id - The service identifier (class or string).
   * @param instanceOrFactory - The service instance or a factory function.
   * @param transient - Set to `true` for transient services (new instance each time). Default is `false` (singleton).
   * @returns A function to unregister the service.
   * @throws {Error} If a service with the same ID is already registered.
   */
  register<T>(
    id: ServiceIdentifier<T> | string | (new (...args: any[]) => T),
    instanceOrFactory: T | (() => T),
    transient = false
): () => void {
    const idKey = typeof id === 'function' ? id.name : id;

    if (!idKey) {
        throw new Error(`Invalid service identifier: ${id}`);
    }

    if (this._container[idKey]) {
        throw new Error(`An instance with the ID '${idKey}' is already registered.`);
    }

    if (transient) {
        this._container[idKey] = instanceOrFactory;
    } else {
        this._container[idKey] =
            typeof instanceOrFactory === 'function'
                ? instanceOrFactory
                : () => instanceOrFactory; // Store as factory for consistent instantiation
    }

    return () => {
        delete this._container[idKey];
    };
}

get<T>(id: ServiceIdentifier<T> | string | (new (...args: any[]) => T)): T | undefined {
    const idKey = typeof id === 'function' ? id.name : id;

    if (!idKey) {
        throw new Error(`Invalid service identifier: ${id}`);
    }

    const instance = this._container[idKey];
    return typeof instance === 'function' ? instance() : instance;
}

  /**
   * Resolves dependencies for a class and creates an instance.
   * @param ctor - The constructor of the class to instantiate.
   * @returns An instance of the class with dependencies resolved.
   * @throws {Error} If a dependency cannot be resolved.
   */
  getInstance<T>(ctor: new (...args: any[]) => T): T {
    const paramTypes = Reflect.getMetadata('design:paramtypes', ctor) || [];
    const params = paramTypes.map((param: any) => {
      const instance = this.get(param.name);
      if (!instance) {
        throw Error(`No provider for ${param.name} registered`);
      }
      return typeof instance === 'function' ? instance() : instance;
    });
    return new ctor(...params);
  }

  /**
   * Resets the container (primarily for testing).  Removes all registered services.
   */
  reset() {
    this._container = {};
  }

  /**
   * Gets an array of all registered service identifiers.  Useful for debugging or introspection.
   * @returns An array of registered service identifiers (class constructors or strings).
   */
  getRegisteredServiceIdentifiers(): (ServiceIdentifier<any> | string)[] {
    return Object.keys(this._container);
  }
}

// Module-scoped default container map (one container per module)
const defaultContainerMap = new Map<string, Container>();

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
    const containerInstance =
      container ||
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

/**
 * Decorator to mark a constructor parameter for dependency injection.
 * @param target - The target class.
 * @param propertyKey - The name of the constructor (always `'constructor'`).
 * @param parameterIndex - The index of the parameter to inject.
 */
export function Inject(
  target: any,
  propertyKey: string | symbol | undefined,
  parameterIndex: number
) {
  const existingInjectedParams: number[] =
    Reflect.getMetadata('inject_params', target, propertyKey!) || [];
  existingInjectedParams.push(parameterIndex);
  Reflect.defineMetadata(
    'inject_params',
    existingInjectedParams,
    target,
    propertyKey!
  );
}
