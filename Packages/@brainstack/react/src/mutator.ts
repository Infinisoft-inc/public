/**
 * A function that mutates a deeply nested field in an object state.
 *
 * @template T - The type of the state object.
 * @param {string} fieldPath - The dot-separated path to the deeply nested field.
 * @returns {DeepFieldMutator<T>} A function to mutate the specified field.
 *
 * @example
 * const fieldMutator = createDeepFieldMutator<MyState>('user.profile.name');
 * const newState = fieldMutator('John')(prevState);
 */
export type DeepFieldMutator<T> = (value: any) => (prevState: T) => T;

/**
 * Creates a deep field mutator function.
 *
 * @template T - The type of the state object.
 * @param {string} fieldPath - The dot-separated path to the deeply nested field.
 * @returns {DeepFieldMutator<T>} A function to mutate the specified field.
 */
export const createDeepFieldMutator = <T>(
  fieldPath: string
): DeepFieldMutator<T> => {
  const fields = fieldPath.split('.');

  return (value) => (prevState) => {
    const newState = { ...prevState };
    let current: any = newState;

    for (let i = 0; i < fields.length - 1; i++) {
      current = current[fields[i]] = { ...current[fields[i]] };
    }

    current[fields[fields.length - 1]] = value;

    return newState;
  };
};
