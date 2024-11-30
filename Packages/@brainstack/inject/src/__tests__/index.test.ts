import { register, get, Inject, Service, getInstance } from '../implementation';

describe('inject', () => {
  it('should register and get an instance', () => {
    const unregister = register('test', 'instance');

    expect(get('test')).toBe('instance');

    unregister();

    expect(get('test')).toBeUndefined();
  });

  it('should throw an error when registering an instance with an existing ID', () => {
    register('test', 'instance');

    expect(() => {
      register('test', 'another instance');
    }).toThrowError("An instance with the ID 'test' is already registered.");
  });

  it('should return undefined when getting an instance with a non-existing ID', () => {

    expect(get('non-existing')).toBeUndefined();
  });

  it('should resolve dependencies using the Inject decorator', () => {
    @Service
    class Serv {
      getServiceInfo() {
        return 'Service information';
      }
    }

    class Ticket {
      constructor(@Inject private service: Serv) { }

      getTicketInfo() {
        return `Ticket info with ${this.service.getServiceInfo()}`;
      }
    }

    const ticketInstance = getInstance(Ticket);
    expect(ticketInstance.getTicketInfo()).toBe('Ticket info with Service information');
  });

  it('should allow multiple instances of different classes', () => {

    @Service
    class ServiceA {
      getInfo() {
        return 'Service A';
      }
    }

    @Service
    class ServiceB {
      getInfo() {
        return 'Service B';
      }
    }

    class Consumer {
      constructor(@Inject private serviceA: ServiceA, @Inject private serviceB: ServiceB) { }

      getServicesInfo() {
        return `${this.serviceA.getInfo()} and ${this.serviceB.getInfo()}`;
      }
    }

    const consumerInstance = getInstance(Consumer);
    expect(consumerInstance.getServicesInfo()).toBe('Service A and Service B');
  });
});
