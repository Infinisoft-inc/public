// @brainstack/state

export interface State<T> {
    /**
     * Gets the current state or a specific part of it.
     * @param selector - An optional selector function to get a specific part of the state.
     * @returns The current state or a specific part of it.
     */
    getState(selector?: (state: T) => any): any;

    /**
     * Mutates the current state using a mutator function and returns the new state.
     * @param mutator - The mutator function to update the state.
     * @returns The new state after applying the mutator function.
     */
    mutate(mutator: (currentState: T) => T): T;
}


export type StateFactory = <T>(initializer: T) => State<T>


