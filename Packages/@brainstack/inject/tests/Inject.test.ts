import { Inject } from '../src/Inject';
import { Container } from '../src/Container';

describe('@Inject decorator', () => {
  it('should inject dependencies correctly', () => {
    class Service {}
    class Client {
      constructor(private service: Service) {}
    }
    const container = new Container();
    container.register(Service);
    container.register(Client);
    const client = container.resolve(Client);
    expect(client.service).toBeInstanceOf(Service);
  });
});
