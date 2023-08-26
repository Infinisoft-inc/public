export interface ConfigManagerIntegration<T> {
  get(key: string): T | undefined;
  set(key: string, value: T): void;
  remove(key: string): void;
}

export interface ConfigManager<T> {
  get(key: string): T | undefined;
  set(key: string, value: T): void;
  remove(key: string): void;
}
