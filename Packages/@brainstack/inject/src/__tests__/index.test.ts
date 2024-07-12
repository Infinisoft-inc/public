import { inject } from '../implementation';

describe('inject', () => {
  it('should register and get an instance', () => {
    const container = inject();
    const unregister = container.register('test', 'instance');

    expect(container.get('test')).toBe('instance');

    unregister();

    expect(container.get('test')).toBeUndefined();
  });

  it('should throw an error when registering an instance with an existing ID', () => {
    const container = inject();
    container.register('test', 'instance');

    expect(() => {
      container.register('test', 'another instance');
    }).toThrowError("An instance with the ID 'test' is already registered.");
  });

  it('should return undefined when getting an instance with a non-existing ID', () => {
    const container = inject();

    expect(container.get('non-existing')).toBeUndefined();
  });
});
