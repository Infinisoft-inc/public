import {
  createConfigManager,
  ConfigManagerIntegration,
  ConfigManager,
} from '..';

// Mock integration for testing
class MockConfigIntegration<T> implements ConfigManagerIntegration<T> {
  private configs: Record<string, T> = {};

  get(key: string): T | undefined {
    return this.configs[key];
  }

  set(key: string, value: T): void {
    this.configs[key] = value;
  }

  remove(key: string): void {
    delete this.configs[key];
  }
}

describe('ConfigManager', () => {
  let mockIntegration: MockConfigIntegration<string>;
  let configManager: ConfigManager<string>;

  beforeEach(() => {
    mockIntegration = new MockConfigIntegration<string>();
    configManager = createConfigManager<string>(mockIntegration);
  });

  it('should set and get a config value', () => {
    const key = 'testKey';
    const value = 'testValue';

    configManager.set(key, value);
    const retrievedValue = configManager.get(key);

    expect(retrievedValue).toBe(value);
  });

  it('should return undefined for non-existent config', () => {
    const key = 'nonExistentKey';
    const retrievedValue = configManager.get(key);

    expect(retrievedValue).toBeUndefined();
  });

  it('should remove a config value', () => {
    const key = 'toBeRemovedKey';
    const value = 'toBeRemovedValue';

    configManager.set(key, value);
    configManager.remove(key);
    const retrievedValue = configManager.get(key);

    expect(retrievedValue).toBeUndefined();
  });
});
