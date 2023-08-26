import { inject, Dependency } from '..';

describe('inject', () => {
  let container: ReturnType<typeof inject>;

  beforeEach(() => {
    container = inject<any>(); // You can replace 'any' with the actual type of the instantiated object
  });

  it('should register a dependency', () => {
    const dependency: Dependency<any> = {
      id: 'testDependency',
      name: 'Test Dependency',
      description: 'A test dependency',
      instance: {}, // Provide the actual instance here
    };

    const unregister = container.register(dependency);

    expect(container.get('testDependency')).toEqual(dependency);

    unregister();

    expect(container.get('testDependency')).toBeUndefined();
  });

  it('should throw an error when registering a duplicate dependency', () => {
    const dependency: Dependency<any> = {
      id: 'testDependency',
      name: 'Test Dependency',
      description: 'A test dependency',
      instance: {}, // Provide the actual instance here
    };

    container.register(dependency);

    expect(() => {
      container.register(dependency);
    }).toThrowError(
      "A dependency with the ID 'testDependency' is already registered."
    );
  });

  it('should get a dependency by ID', () => {
    const dependency: Dependency<any> = {
      id: 'testDependency',
      name: 'Test Dependency',
      description: 'A test dependency',
      instance: {}, // Provide the actual instance here
    };

    container.register(dependency);

    const retrievedDependency = container.get('testDependency');

    expect(retrievedDependency).toEqual(dependency);
  });

  it('should return undefined when getting a non-existent dependency', () => {
    const retrievedDependency = container.get('nonExistentDependency');

    expect(retrievedDependency).toBeUndefined();
  });

  it('should search for dependencies by term', () => {
    const dependency1: Dependency<any> = {
      id: 'dependency1',
      name: 'Test Dependency 1',
      description: 'A test dependency',
      instance: {}, // Provide the actual instance here
    };

    const dependency2: Dependency<any> = {
      id: 'dependency2',
      name: 'Another Dependency',
      description: 'Another test dependency',
      instance: {}, // Provide the actual instance here
    };

    container.register(dependency1);
    container.register(dependency2);

    const searchResults = container.search('Test');

    expect(searchResults).toContainEqual(dependency1);
    expect(searchResults).not.toContainEqual(dependency2);
  });

  it('should return an empty array when no dependencies match the search term', () => {
    const searchResults = container.search('NonExistentTerm');

    expect(searchResults).toEqual([]);
  });
});
