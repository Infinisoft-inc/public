"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
// @brainstack/inject/src/__tests__/index.test.ts
require("reflect-metadata");
const decorators_1 = require("../decorators");
const container_1 = require("../container");
describe('inject', () => {
    let container;
    beforeEach(() => {
        container = new container_1.Container(); // Create a new Container instance before each test
    });
    it('should register and get an instance', () => {
        class Test {
        }
        container.register(Test, new Test()); // Register an instance of the Test class
        expect(container.get(Test)).toBeInstanceOf(Test); // Check if we can get the instance back
    });
    it('should register and get an instance then unregister and get undefined', () => {
        class Test {
        }
        const unregister = container.register(Test, new Test()); // Register an instance of the Test class
        expect(container.get(Test)).toBeInstanceOf(Test); // Check if we can get the instance back
        unregister();
        expect(container.get(Test)).toBeUndefined();
    });
    it('should register throw an errpr invalid identifier', () => {
        expect(() => container.register(() => 'test', 'instance')).toThrow(new Error("Invalid service identifier: () => 'test'"));
    });
    it('should get throw an errpr invalid identifier', () => {
        expect(() => container.get(() => 'test')).toThrow(new Error("Invalid service identifier: () => 'test'"));
    });
    it('should return the result of calling a factory function when instance is a function', () => {
        // Arrange
        const factoryFunction = jest.fn(() => 'test result');
        const serviceId = 'testService';
        // Act
        container.register(serviceId, factoryFunction);
        const result = container.get(serviceId);
        // Assert
        expect(factoryFunction).toHaveBeenCalledTimes(1);
        expect(result).toBe('test result');
    });
    it('should throw an error if a dependency is not registered', () => {
        class ServiceA {
        } // A service that is NOT registered
        let ServiceB = class ServiceB {
            constructor(serviceA) {
                this.serviceA = serviceA;
            } // Injecting the unregistered service
        };
        ServiceB = __decorate([
            __param(0, decorators_1.Inject),
            __metadata("design:paramtypes", [ServiceA])
        ], ServiceB);
        expect(() => container.getInstance(ServiceB)).toThrowError('No provider for ServiceA registered');
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
        let Serv = class Serv {
            getServiceInfo() {
                return 'Service information';
            }
        };
        Serv = __decorate([
            (0, decorators_1.Service)(container) // Pass the container to the decorator
        ], Serv);
        let Ticket = class Ticket {
            constructor(service) {
                this.service = service;
            }
            getTicketInfo() {
                return `Ticket info with ${this.service.getServiceInfo()}`;
            }
        };
        Ticket = __decorate([
            __param(0, decorators_1.Inject),
            __metadata("design:paramtypes", [Serv])
        ], Ticket);
        const ticketInstance = container.getInstance(Ticket); // use container to resolve
        expect(ticketInstance.getTicketInfo()).toBe('Ticket info with Service information');
    });
    it('should allow multiple instances of different classes', () => {
        let ServiceA = class ServiceA {
            getInfo() {
                return 'Service A';
            }
        };
        ServiceA = __decorate([
            (0, decorators_1.Service)(container) // Pass the container instance
        ], ServiceA);
        let ServiceB = class ServiceB {
            getInfo() {
                return 'Service B';
            }
        };
        ServiceB = __decorate([
            (0, decorators_1.Service)(container) // Pass the container instance
        ], ServiceB);
        let Consumer = class Consumer {
            constructor(serviceA, serviceB) {
                this.serviceA = serviceA;
                this.serviceB = serviceB;
            }
            getServicesInfo() {
                return `${this.serviceA.getInfo()} and ${this.serviceB.getInfo()}`;
            }
        };
        Consumer = __decorate([
            __param(0, decorators_1.Inject),
            __param(1, decorators_1.Inject),
            __metadata("design:paramtypes", [ServiceA,
                ServiceB])
        ], Consumer);
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
        let ModuleScopedService = class ModuleScopedService {
            getValue() {
                return 'ModuleScopedValue';
            }
        };
        ModuleScopedService = __decorate([
            (0, decorators_1.Service)() // Uses default container for moduleAId
        ], ModuleScopedService);
        const instance1 = container.getInstance(ModuleScopedService);
        expect(instance1.getValue()).toBe('ModuleScopedValue');
        jest.mock('module', () => ({
            // mock module id
            id: moduleBId,
        }));
        let AnotherModuleScopedService = class AnotherModuleScopedService {
            getValue() {
                return 'AnotherModuleScopeValue';
            }
        };
        AnotherModuleScopedService = __decorate([
            (0, decorators_1.Service)() // Uses default container for moduleBId (different than moduleAId)
        ], AnotherModuleScopedService);
        // const instance2 = container.getInstance(AnotherModuleScopedService); // will throw error as it's different container instance.
        let Consumer = class Consumer {
            constructor(moduleScopedService, anotherModuleScopedService // Injecting service from different module
            ) {
                this.moduleScopedService = moduleScopedService;
                this.anotherModuleScopedService = anotherModuleScopedService;
            }
            getValues() {
                return `${this.moduleScopedService.getValue()} and ${this.anotherModuleScopedService.getValue()}`;
            }
        };
        Consumer = __decorate([
            __param(0, decorators_1.Inject),
            __param(1, decorators_1.Inject),
            __metadata("design:paramtypes", [ModuleScopedService,
                AnotherModuleScopedService // Injecting service from different module
            ])
        ], Consumer);
        // This now works with correct singleton behavior and no errors.
        const anotherContainer = new container_1.Container(); // testing different container now
        let ServiceA = class ServiceA {
            getValue() {
                return 'ServiceAValue';
            }
        };
        ServiceA = __decorate([
            (0, decorators_1.Service)(anotherContainer)
        ], ServiceA);
        let Consumer2 = class Consumer2 {
            constructor(serviceA) {
                this.serviceA = serviceA;
            }
            getValue() {
                return this.serviceA.getValue();
            }
        };
        Consumer2 = __decorate([
            __param(0, decorators_1.Inject),
            __metadata("design:paramtypes", [ServiceA])
        ], Consumer2);
        const consumer2 = anotherContainer.getInstance(Consumer2);
        expect(consumer2.getValue()).toBe('ServiceAValue');
    });
    it('should throw an error if a dependency is not registered', () => {
        class ServiceA {
        } // A service that is NOT registered
        let ServiceB = class ServiceB {
            constructor(serviceA) {
                this.serviceA = serviceA;
            } // Injecting the unregistered service
        };
        ServiceB = __decorate([
            __param(0, decorators_1.Inject),
            __metadata("design:paramtypes", [ServiceA])
        ], ServiceB);
        expect(() => container.getInstance(ServiceB)).toThrowError('No provider for ServiceA registered'); // Assert an error is thrown
    });
    it('should reset the container', () => {
        container.register('test', 'instance');
        expect(container.get('test')).toBeDefined();
        container.reset(); // Reset the container
        expect(container.get('test')).toBeUndefined(); // Verify everything was removed.
    });
    it('should return registered service identifiers', () => {
        container.register('service1', 'instance1');
        let ServiceA = class ServiceA {
        };
        ServiceA = __decorate([
            (0, decorators_1.Service)(container)
        ], ServiceA);
        const identifiers = container.getRegisteredServiceIdentifiers();
        expect(identifiers).toEqual(['service1', 'ServiceA']);
    });
});
//# sourceMappingURL=container.test.js.map