export interface CRUDIntegration<T> {
  init(): Promise<void>;
  create(item: T): Promise<T>;
  read(id: string): Promise<T | undefined>;
  update(id: string, item: T): Promise<T | undefined>;
  delete(id: string): Promise<void>;
  list(options?: { page?: number; limit?: number }): Promise<T[]>;
  search(term: string): Promise<T[]>;
  filter(criterias: { [key: string]: any }): Promise<T[]>;
  chdir(path: string): void
  pwd(): string
  cwd: T
}

export interface CRUD<T> {
  init(): Promise<void>;
  create(item: T): Promise<T>;
  read(id: string): Promise<T | undefined>;
  update(id: string, item: T): Promise<T | undefined>;
  delete(id: string): Promise<void>;
  list(options?: { page?: number; limit?: number }): Promise<T[]>;
  search(term: string): Promise<T[]>;
  filter(criterias: { [key: string]: any }): Promise<T[]>;
  chdir(path: string): void
  pwd(): string
  cwd: T
}
