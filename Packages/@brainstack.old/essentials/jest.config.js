module.exports = {
    testEnvironment: 'node',
    transform: {
      '^.+\\.(ts|mjs|js|jsx|tsx)$': 'babel-jest',
    },
    transformIgnorePatterns: ['/node_modules/(?!(your-esm-dependencies)/)'],
    moduleNameMapper: {
      '^.+\\.(css|less|scss)$': 'identity-obj-proxy',
    },
  };
  