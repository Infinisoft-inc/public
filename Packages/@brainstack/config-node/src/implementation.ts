import { ConfigManager, ConfigManagerIntegration } from './abstraction';

export const createConfigManager = <T>(
  integration: ConfigManagerIntegration<T>
): ConfigManager<T> => {
  const configManager: ConfigManager<T> = {
    get(key: string): T | undefined {
      return integration.get(key);
    },

    set(key: string, value: T): void {
      integration.set(key, value);
    },

    remove(key: string): void {
      integration.remove(key);
    },
  };

  return configManager;
};
