import { StateFactory, State } from "./abstraction";

 
  /**
   * Creates a state instance with the initial state.
   * @template T - The type of the state.
   * @param {T} initialState - The initial state of the application.
   * @returns {State<T>} The state instance.
   */
  export const createState: StateFactory = (initialState) => {
    let state = initialState;
  
    const getState = (selector?: (_state: typeof state) => any): any => {
      if (selector) {
        return selector(state);
      }
      return state;
    };
  
    const mutate = (mutator: (currentState: typeof state) => typeof state): typeof state => {
      const newState = mutator(state);
      state = newState;
      return newState;
    };
  
    return {
      getState,
      mutate,
    };
  };
  