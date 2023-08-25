/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { BrainStackProvider, useBrainStack } from '..';
import { createLogger } from '@brainstack/log';
import { createEventHub } from '@brainstack/hub';
import React from 'react';

describe('BrainStackProvider', () => {
  it('should render the children with the correct context value', () => {
    const logger = createLogger();
    const hub = createEventHub();
    const initialState = { count: 0 };
    const TestComponent: React.FC = () => {
      const { state } = useBrainStack();
      state.mutate(()=>initialState)
      return (<div>{state.getState()}</div>);
    };
    const { getByText } = render(
      <BrainStackProvider>
        <TestComponent />
      </BrainStackProvider>
    );
    expect(getByText('0')).toBeInTheDocument();
  });
});