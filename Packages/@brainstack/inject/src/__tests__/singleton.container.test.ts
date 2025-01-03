import { Log } from '@tensorflow/tfjs';
import { SingletonContainer, SingletonService, Inject } from '..';
import { console } from 'inspector';
import { isPromise } from 'util/types';

describe('SingletonContainer', () => {
  let container: SingletonContainer;

  beforeEach(() => {
    // Reset container before each test
    container = SingletonContainer.getInstance();
    container.reset();
  });

  it('should register and get an instance', () => {
    class LoggerService {
      log(message: string) {
        return message;
      }
    }

    const logger = new LoggerService();
    container.register(LoggerService);

    const retrievedLogger = container.get(LoggerService);
    expect(retrievedLogger).toBeInstanceOf(LoggerService);
  });

  it('should throw error invalid type', () => {
    const singletonContainer = SingletonContainer.getInstance();
    expect(() => singletonContainer.register(1 as any)).toThrow(
      'identifier is not a constructor'
    );
  });

  it('should throw error for unregistered type', () => {
    class MessageA {}

    const singletonContainer = SingletonContainer.getInstance();
    const unregister = singletonContainer.register(MessageA);
    const InstanceA = singletonContainer.get(MessageA);
    expect(InstanceA).toBeInstanceOf(MessageA);

    // Unregister the instance
    unregister();

    // Now expect an error when trying to get the unregistered instance
    expect(() => singletonContainer.get(MessageA)).toThrow(
      `Instance for ${MessageA.name} not found. Register it first.`
    );
  });
});

describe('SingletonService', () => {
  let instance1: any;
  let instance2: any;

  it('should work with classes without constructors', () => {
    @SingletonService
    class TestClass {}

    instance1 = new TestClass();
    instance2 = new TestClass();

    expect(instance1).toBe(instance2);
  });

  it('should handle inheritance correctly', () => {
    @SingletonService
    class BaseClass {
      baseValue: number;
      constructor(value: number) {
        this.baseValue = value;
      }
    }

    @SingletonService
    class DerivedClass extends BaseClass {
      derivedValue: number;
      constructor(baseValue: number, derivedValue: number) {
        super(baseValue);
        this.derivedValue = derivedValue;
      }
    }

    const singletonContainer = SingletonContainer.getInstance();
    const unregisterBase = singletonContainer.register(BaseClass);
    const BaseInstance1 = singletonContainer.get(BaseClass);
  });
});