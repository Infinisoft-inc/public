export interface Dependency<T> {
  id: string;
  name: string;
  description: string;
  instance: T;
}
