import { createState, State } from '..';

// Define a sample state type for testing
interface AppState {
  counter: number;
  name: string;
}

describe('createState', () => {
  let state: State<AppState>;

  beforeEach(() => {
    // Initialize the state before each test
    state = createState<AppState>({ counter: 0, name: 'John' });
  });

  it('should initialize with the correct initial state', () => {
    expect(state.getState()).toEqual({ counter: 0, name: 'John' });
  });

  it('should retrieve the current state', () => {
    expect(state.getState()).toEqual({ counter: 0, name: 'John' });
  });

  it('should retrieve a specific value from the state using a selector', () => {
    const counter = state.getState((s) => s.counter);
    expect(counter).toBe(0);
  });

  it('should mutate the state correctly', () => {
    state.mutate((currentState) => ({
      ...currentState,
      counter: currentState.counter + 1,
    }));
    expect(state.getState()).toEqual({ counter: 1, name: 'John' });

    state.mutate((currentState) => ({
      ...currentState,
      name: 'Jane',
    }));
    expect(state.getState()).toEqual({ counter: 1, name: 'Jane' });
  });
});
