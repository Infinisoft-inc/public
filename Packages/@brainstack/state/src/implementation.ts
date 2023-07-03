/**
 * Represents the state management module for managing application state.
 * Allows for retrieving and mutating the state synchronously.
 * @template T - The type of the state.
 */
export interface State<T> {
    /**
     * Retrieves the current state of the application.
     * @param {function} [selector] - An optional selector function to retrieve a specific value from the state.
     * @returns {any} The selected value or the entire state.
     */
    getState: (selector?: (state: T) => any) => any;
  
    /**
     * Mutates the state of the application.
     * @param {function} mutator - The mutator function to update the state.
     * @returns {T} The updated state.
     */
    mutate: (mutator: (currentState: T) => T) => T;
  }
  
  /**
   * Creates a state instance with the initial state.
   * @template T - The type of the state.
   * @param {T} initialState - The initial state of the application.
   * @returns {State<T>} The state instance.
   */
  export const createState = <T>(initialState: T): State<T> => {
    let state: T = initialState;
  
    const getState = (selector?: (state: T) => any): any => {
      if (selector) {
        return selector(state);
      }
      return state;
    };
  
    const mutate = (mutator: (currentState: T) => T): T => {
      const newState = mutator(state);
      state = newState;
      return newState;
    };
  
    return {
      getState,
      mutate,
    };
  };
  