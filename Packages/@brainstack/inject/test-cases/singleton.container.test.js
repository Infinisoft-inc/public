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
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
describe('SingletonContainer', () => {
    let container;
    beforeEach(() => {
        // Reset container before each test
        container = __1.SingletonContainer.getInstance();
        container.reset();
    });
    it('should register and get an instance', () => {
        class LoggerService {
            log(message) {
                return message;
            }
        }
        const logger = new LoggerService();
        container.register(LoggerService);
        const retrievedLogger = container.get(LoggerService);
        expect(retrievedLogger).toBeInstanceOf(LoggerService);
    });
    it('should throw error invalid type', () => {
        const singletonContainer = __1.SingletonContainer.getInstance();
        expect(() => singletonContainer.register(1)).toThrow('identifier is not a constructor');
    });
    it('should throw error for unregistered type', () => {
        class MessageA {
        }
        const singletonContainer = __1.SingletonContainer.getInstance();
        const unregister = singletonContainer.register(MessageA);
        const InstanceA = singletonContainer.get(MessageA);
        expect(InstanceA).toBeInstanceOf(MessageA);
        // Unregister the instance
        unregister();
        // Now expect an error when trying to get the unregistered instance
        expect(() => singletonContainer.get(MessageA)).toThrow(`Instance for ${MessageA.name} not found. Register it first.`);
    });
});
describe('SingletonService', () => {
    let instance1;
    let instance2;
    it('should work with classes without constructors', () => {
        let TestClass = class TestClass {
        };
        TestClass = __decorate([
            __1.SingletonService
        ], TestClass);
        instance1 = new TestClass();
        instance2 = new TestClass();
        expect(instance1).toBe(instance2);
    });
    it('should handle inheritance correctly', () => {
        let BaseClass = class BaseClass {
            constructor(value) {
                this.baseValue = value;
            }
        };
        BaseClass = __decorate([
            __1.SingletonService,
            __metadata("design:paramtypes", [Number])
        ], BaseClass);
        let DerivedClass = class DerivedClass extends BaseClass {
            constructor(baseValue, derivedValue) {
                super(baseValue);
                this.derivedValue = derivedValue;
            }
        };
        DerivedClass = __decorate([
            __1.SingletonService,
            __metadata("design:paramtypes", [Number, Number])
        ], DerivedClass);
        const singletonContainer = __1.SingletonContainer.getInstance();
        const unregisterBase = singletonContainer.register(BaseClass);
        const BaseInstance1 = singletonContainer.get(BaseClass);
    });
});
//# sourceMappingURL=singleton.container.test.js.map