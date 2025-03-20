import { Container, Service, Inject, SingletonService } from '..';

@SingletonService
export class Configuration {
  public setting1 = 'Default Value 1';
  public setting2 = 123;

  constructor() {
    console.log("Singleton Configuration created");
  }

  changeSetting1(newValue: string) {
    this.setting1 = newValue;
  }
}

@Service()
export class ApiService {
  constructor(@Inject private config: Configuration) {
    console.log("ApiService created");
  }

  getData() {
    console.log("Getting data using config:", this.config.setting1, this.config.setting2);
    return { data: 'Some data' };
  }
}

@Service()
export class AuthService {
  constructor(@Inject private config: Configuration) {
    console.log("AuthService created");
  }

  authenticate() {
    console.log("Authenticating using config:", this.config.setting1);
    return true;
  }
}

