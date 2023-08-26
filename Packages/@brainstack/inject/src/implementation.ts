import { Dependency } from './abstraction';

export const inject = () => {
  const container: Record<string, Dependency> = {};

  const register = (dependency: Dependency): (() => void) => {
    const id = dependency.id;
    if (id in container) {
      throw new Error(
        `A dependency with the ID '${id}' is already registered.`
      );
    }

    container[id] = dependency;

    const unregister = () => {
      delete container[id];
    };

    return unregister;
  };

  const get = (id: string): Dependency | undefined => {
    return container[id];
  };

  const search = (term: string): Dependency[] => {
    return Object.values(container).filter(
      (dep) => dep.name.includes(term) || dep.description.includes(term)
    );
  };

  return {
    register,
    get,
    search,
  };
};
