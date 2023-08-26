import { Dependency } from './abstraction';

export const inject = <T>() => {
  const container: Record<string, Dependency<T>> = {};

  const register = (dependency: Dependency<T>): (() => void) => {
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

  const get = (id: string): Dependency<T> | undefined => {
    return container[id];
  };

  const search = (term: string): Dependency<T>[] => {
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
