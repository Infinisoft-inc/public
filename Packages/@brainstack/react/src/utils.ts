/**
 * Generates a version 1 UUID.
 * @returns The generated UUID string.
 */
export const uuidv1 = (): string =>
  'xxxxxxxx-xxxx-1xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });

// /**
//  * A function that mutates a deeply nested field in an object state.
//  *
//  * @template T - The type of the state object.
//  * @param {string} fieldPath - The dot-separated path to the deeply nested field.
//  * @returns {DeepFieldMutator<T>} A function to mutate the specified field.
//  *
//  * @example
//  * const fieldMutator = createDeepFieldMutator<MyState>('user.profile.name');
//  * const newState = fieldMutator('John')(prevState);
//  */
// type DeepFieldMutator<T> = (value: any) => (prevState: T) => T;

// /**
//  * Creates a deep field mutator function.
//  *
//  * @template T - The type of the state object.
//  * @param {string} fieldPath - The dot-separated path to the deeply nested field.
//  * @returns {DeepFieldMutator<T>} A function to mutate the specified field.
//  */
// export const createDeepFieldMutator = <T>(
//   fieldPath: string
// ): DeepFieldMutator<T> => {
//   const fields = fieldPath.split('.');

//   return (value) => (prevState) => {
//     const newState = { ...prevState };
//     let current: any = newState;

//     for (let i = 0; i < fields.length - 1; i++) {
//       current = current[fields[i]] = { ...current[fields[i]] };
//     }

//     current[fields[fields.length - 1]] = value;

//     return newState;
//   };
// };






// /**
//  * Creates an event handler function that uses the provided deep field mutator.
//  *
//  * @template T - The type of the state object.
//  * @param {DeepFieldMutator<T>} fieldMutator - The deep field mutator.
//  * @param {T} state - The current state object.
//  * @returns {React.ChangeEventHandler<HTMLInputElement>} The event handler function.
//  */
// export const createFieldChangeHandler = <T>(
//   fieldMutator: DeepFieldMutator<T>,
//   state: T
// ): React.ChangeEventHandler<HTMLInputElement> => {
//   return (e) => {
//     const newValue = e.target.value;
//     const newState = fieldMutator(newValue)(state);
//     // You can update your state with newState here if needed
//   };
// };

// // Define your initial state object
// const initialState = {
//   user: {
//     profile: {
//       name: '',
//       age: 0,
//     },
//   },
// };

// // Create event handlers using the utility function
// const nameChangeHandler = createFieldChangeHandler(
//   createDeepFieldMutator('user.profile.name'),
//   initialState
// );
// const ageChangeHandler = createFieldChangeHandler(
//   createDeepFieldMutator('user.profile.age'),
//   initialState
// );