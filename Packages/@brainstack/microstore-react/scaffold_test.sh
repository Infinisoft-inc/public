#!/bin/bash

# Install necessary packages
npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event @testing-library/react-hooks babel-jest @babel/preset-env @babel/preset-react

# Create .babelrc file
echo '{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}' > .babelrc

# Add test script to package.json
sed -i '/"scripts": {/a \
    "test": "jest",
' package.json

# Create a __tests__ folder
mkdir -p __tests__

# Create a test file for the provided code
cat > __tests__/useMicroStore.test.js << EOL
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
EOL

# Run the tests
npm test
