import { renderHook, act } from '@testing-library/react-hooks';
import { StoreProvider, useMicroStore } from '../src/useMicroStore';

describe('useMicroStore', () => {
  it('should update state and trigger callbacks on mutation', () => {
    const initialState = { count: 0 };
    const wrapper = ({ children }) => (
      <StoreProvider initialState={initialState}>{children}</StoreProvider>
    );

    const { result } = renderHook(() => useMicroStore(), { wrapper });

    expect(result.current.state.count).toBe(0);

    act(() => {
      result.current.mutate((state) => {
        state.count += 1;
      });
    });

    expect(result.current.state.count).toBe(1);
  });
});
