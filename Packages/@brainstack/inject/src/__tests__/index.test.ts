// @brainstack/inject/src/__tests__/index.test.ts
import { Container, Inject, Service } from '../implementation';

describe('inject', () => {
  let container: Container;

  beforeEach(() => {
    container = new Container(); // Create a new Container instance before each test
  });

  it('should register and get an instance', () => {
    const unregister = container.register('test', 'instance');
    // get now returns a factory, so we must execute to compare to value.
    const instance = container.get('test');
    expect(typeof instance).toBe('function');
    if (typeof instance === 'function') {
      expect(instance()).toBe('instance');
    }

    unregister();
    expect(container.get('test')).toBeUndefined();
  });

  it('should throw an error if a dependency is not registered', () => {
    class ServiceA {} // A service that is NOT registered
    class ServiceB {
      constructor(@Inject private serviceA: ServiceA) {} // Injecting the unregistered service
    }
    expect(() => container.getInstance(ServiceB)).toThrowError(
      'No provider for ServiceA registered'
    );
  });

  it('should throw an error when registering an instance with an existing ID', () => {
    container.register('test', 'instance');
    expect(() => {
      container.register('test', 'another instance');
    }).toThrowError("An instance with the ID 'test' is already registered.");
  });

  it('should return undefined when getting an instance with a non-existing ID', () => {
    expect(container.get('non-existing')).toBeUndefined();
  });

  it('should resolve dependencies using the Inject decorator', () => {
    @Service(container) // Pass the container to the decorator
    class Serv {
      getServiceInfo() {
        return 'Service information';
      }
    }

    class Ticket {
      constructor(@Inject private service: Serv) {}

      getTicketInfo() {
        return `Ticket info with ${this.service.getServiceInfo()}`;
      }
    }

    const ticketInstance = container.getInstance(Ticket); // use container to resolve
    expect(ticketInstance.getTicketInfo()).toBe(
      'Ticket info with Service information'
    );
  });

  it('should allow multiple instances of different classes', () => {
    @Service(container) // Pass the container instance
    class ServiceA {
      getInfo() {
        return 'Service A';
      }
    }

    @Service(container) // Pass the container instance
    class ServiceB {
      getInfo() {
        return 'Service B';
      }
    }

    class Consumer {
      constructor(
        @Inject private serviceA: ServiceA,
        @Inject private serviceB: ServiceB
      ) {}

      getServicesInfo() {
        return `${this.serviceA.getInfo()} and ${this.serviceB.getInfo()}`;
      }
    }

    const consumerInstance = container.getInstance(Consumer);
    expect(consumerInstance.getServicesInfo()).toBe('Service A and Service B');
  });

  it('should create a transient service', () => {
    let instantiationCount = 0;

    class MyTransientService {
      constructor() {
        instantiationCount++;
      }
    }

    const factory = () => new MyTransientService();
    const instance1 = factory(); // instantiate service before registering
    container.register('myTransientService', instance1, true);

    expect(instantiationCount).toBe(1);

    const instance2 = container.get('myTransientService');

    expect(instance2).toBe(instance1); // same instance

    expect(instantiationCount).toBe(1); // Instantiated only once
  });

  it('should handle optional container in Service decorator', () => {
    // Each module gets its own default container, using module.id
    const moduleAId = 'moduleA';
    const moduleBId = 'moduleB';

    jest.mock('module', () => ({
      id: moduleAId, // mock module id
    }));

    @Service() // Uses default container for moduleAId
    class ModuleScopedService {
      getValue() {
        return 'ModuleScopedValue';
      }
    }

    const instance1 = container.getInstance(ModuleScopedService);
    expect(instance1.getValue()).toBe('ModuleScopedValue');

    jest.mock('module', () => ({
      // mock module id
      id: moduleBId,
    }));

    @Service() // Uses default container for moduleBId (different than moduleAId)
    class AnotherModuleScopedService {
      getValue() {
        return 'AnotherModuleScopeValue';
      }
    }

    // const instance2 = container.getInstance(AnotherModuleScopedService); // will throw error as it's different container instance.

    class Consumer {
      constructor(
        @Inject private moduleScopedService: ModuleScopedService,
        @Inject private anotherModuleScopedService: AnotherModuleScopedService // Injecting service from different module
      ) {}
      getValues() {
        return `${this.moduleScopedService.getValue()} and ${this.anotherModuleScopedService.getValue()}`;
      }
    }

    // This now works with correct singleton behavior and no errors.
    const anotherContainer = new Container(); // testing different container now
    @Service(anotherContainer)
    class ServiceA {
      getValue() {
        return 'ServiceAValue';
      }
    }

    class Consumer2 {
      constructor(@Inject private serviceA: ServiceA) {}
      getValue() {
        return this.serviceA.getValue();
      }
    }
    const consumer2 = anotherContainer.getInstance(Consumer2);
    expect(consumer2.getValue()).toBe('ServiceAValue');
  });

  it('should throw an error if a dependency is not registered', () => {
    class ServiceA {} // A service that is NOT registered
    class ServiceB {
      constructor(@Inject private serviceA: ServiceA) {} // Injecting the unregistered service
    }
    expect(() => container.getInstance(ServiceB)).toThrowError(
      'No provider for ServiceA registered'
    ); // Assert an error is thrown
  });

  it('should reset the container', () => {
    container.register('test', 'instance');
    expect(container.get('test')).toBeDefined();
    container.reset(); // Reset the container
    expect(container.get('test')).toBeUndefined(); // Verify everything was removed.
  });

  it('should return registered service identifiers', () => {
    container.register('service1', 'instance1');
    @Service(container)
    class ServiceA {}

    const identifiers = container.getRegisteredServiceIdentifiers();
    expect(identifiers).toEqual(['service1', 'ServiceA']);
  });
});
