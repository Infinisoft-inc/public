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
const adapters_1 = require("../adapters");
const container_1 = require("../container");
const decorators_1 = require("../decorators");
describe('Service Decorators', () => {
    let container;
    beforeEach(() => {
        container = new container_1.Container();
    });
    it('asService should decorate a class as a service', () => {
        class TestService {
        }
        const DecoratedTestService = (0, adapters_1.asService)(TestService);
        expect(DecoratedTestService).toBeDefined();
        const instance = container.getInstance(DecoratedTestService);
        expect(instance).toBeInstanceOf(TestService);
    });
    it('asSingletonService should decorate a class as a singleton service', () => {
        class TestSingletonService {
        }
        const DecoratedSingletonService = (0, adapters_1.asSingletonService)(TestSingletonService);
        const instance1 = new DecoratedSingletonService();
        const instance2 = new DecoratedSingletonService();
        expect(instance1).toBeDefined();
        expect(instance1).toBe(instance2); // Ensure singleton behavior
    });
    it('asScopedService should decorate a class and register it with provided container', () => {
        class TestScopedService {
        }
        const DecoratedScopedService = (0, adapters_1.asScopedService)(TestScopedService, container);
        const instance1 = container.getInstance(DecoratedScopedService);
        expect(instance1).toBeDefined();
        expect(instance1).toBeInstanceOf(TestScopedService);
        const anotherContainer = new container_1.Container();
        expect(() => anotherContainer.getInstance(DecoratedScopedService)).toThrowError();
    });
    it('asService should correctly inject dependencies', () => {
        let Dependency = class Dependency {
        };
        Dependency = __decorate([
            (0, decorators_1.Service)()
        ], Dependency);
        let TestServiceWithDependency = class TestServiceWithDependency {
            constructor(dep) {
                this.dep = dep;
            }
        };
        TestServiceWithDependency = __decorate([
            adapters_1.asService,
            __metadata("design:paramtypes", [Dependency])
        ], TestServiceWithDependency);
        const instance = container.getInstance(TestServiceWithDependency);
        expect(instance).toBeDefined();
        expect(instance.dep).toBeDefined();
        expect(instance.dep).toBeInstanceOf(Dependency);
    });
    it('asSingletonService should correctly handle dependencies', () => {
        let Dep = class Dep {
        };
        Dep = __decorate([
            (0, decorators_1.Service)()
        ], Dep);
        let SingletonWithDep = class SingletonWithDep {
            constructor(dep) {
                this.dep = dep;
            }
        };
        SingletonWithDep = __decorate([
            adapters_1.asSingletonService,
            __metadata("design:paramtypes", [Dep])
        ], SingletonWithDep);
        const instance = container.getInstance(SingletonWithDep);
        expect(instance.dep).toBeInstanceOf(Dep);
    });
    it('asScopedService should correctly handle dependencies for the scoped container', () => {
        const depContainer = new container_1.Container();
        let Dep = class Dep {
        };
        Dep = __decorate([
            (0, decorators_1.Service)(depContainer)
        ], Dep);
        class ScopedWithDep {
            constructor(dep) {
                this.dep = dep;
            }
        }
        const scoopedService = (0, adapters_1.asScopedService)(ScopedWithDep, depContainer);
        const instance = container.getInstance(ScopedWithDep);
        expect(instance.dep).toBeInstanceOf(Dep);
    });
});
//# sourceMappingURL=adapters.test.js.map