import { CRUD, CRUDIntegration } from './abstraction';

export const createCRUD = <T>(integration: CRUDIntegration<T>): CRUD<T> => {
  const crud: CRUD<T> = {
    async create(item: T): Promise<T> {
      return integration.create(item);
    },

    async read(id: string): Promise<T | undefined> {
      return integration.read(id);
    },

    async update(id: string, item: T): Promise<T | undefined> {
      return integration.update(id, item);
    },

    async delete(id: string): Promise<void> {
      await integration.delete(id);
    },

    async list(options?: { page?: number; limit?: number }): Promise<T[]> {
      return integration.list(options);
    },

    async search(term: string): Promise<T[]> {
      return integration.search(term);
    },

    async filter(criterias: { [key: string]: any }): Promise<T[]> {
      return integration.filter(criterias);
    },
  };

  return crud;
};
