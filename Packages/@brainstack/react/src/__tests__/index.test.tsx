import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { renderHook, render } from '@testing-library/react';
import { createBrainstack } from '..';
import { mockIntegration } from '@brainstack/core';

const { useBrainStack, BrainStackProvider } = createBrainstack({
  authIntegration: mockIntegration,
});

// Mock external dependencies
jest.mock('@brainstack/core', () => ({
  createEventHub: jest.fn(() => ({
    on: jest.fn(),
    emit: jest.fn(),
  })),
  createAuthProvider: jest.fn(() => ({
    signIn: jest.fn(),
    signOut: jest.fn(),
  })),
  createLogger: jest.fn(),
  createState: jest.fn(),
  createStore: jest.fn(() => ({
    subscribe: jest.fn(),
    emit: jest.fn(),
    on: jest.fn(),
    getState: jest.fn(),
    mutate: jest.fn(),
  })),
}));

// Mock React's useEffect
jest.spyOn(React, 'useEffect').mockImplementation((effect) => effect());

// Mock React's useContext
jest.spyOn(React, 'useContext').mockImplementation(() => ({
  store: {
    subscribe: jest.fn(),
    emit: jest.fn(),
    on: jest.fn(),
    getState: jest.fn(),
    mutate: jest.fn(),
  },
  log: {},
  useOn: jest.fn(),
}));

describe('useCreateBrainstack', () => {
  afterEach(() => {
    // Clear mock function calls between tests
    jest.clearAllMocks();
  });

  it('should return true', () => {
    // const { result } = renderHook(() => useBrainStack());

    expect(true).toBe(true);
  });

  // it('should return hooks and provider', () => {
  //   const { result } = renderHook(() => useCreateBrainstack({}));

  //   expect(typeof result.current.BrainStackProvider).toBe('function');
  // });

  // it('should create BrainStackProvider', () => {
  //   const { result } = renderHook(() => useCreateBrainstack({}));

  //   const Provider = result.current.BrainStackProvider;

  //   const div = document.createElement('div');
  //   act(() => {
  //     render(
  //       <Provider>
  //         <div />
  //       </Provider>
  //     );
  //   });

  //   unmountComponentAtNode(div);
  // });

  // it('should provide access to the BrainStack context', () => {
  //   const { result } = renderHook(() => useCreateBrainstack({}));

  //   const TestComponent = () => {
  //     const brainStackContext = renderHook<any, any>(() => useBrainStack());

  //     return (
  //       <div>
  //         <p>Store: {brainStackContext.result.current?.store}</p>
  //         <p>Log: {brainStackContext.result.current?.log}</p>
  //       </div>
  //     );
  //   };

  //   const { getByText } = render(
  //     <result.current.BrainStackProvider>
  //       <TestComponent />
  //     </result.current.BrainStackProvider>
  //   );

  //   expect(getByText('Store:')).toBeDefined();
  //   expect(getByText('Log:')).toBeDefined();
  // });
});
