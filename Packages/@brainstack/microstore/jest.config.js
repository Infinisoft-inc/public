module.exports = {
    testEnvironment: 'node',
    transform: {
      '^.+\\.(ts|js|jsx|tsx)$': 'babel-jest',
    },
    transformIgnorePatterns: ['/node_modules/(?!(your-esm-dependencies)/)'],
    moduleNameMapper: {
      '^.+\\.(css|less|scss)$': 'identity-obj-proxy',
    },
    coveragePathIgnorePatterns: [
      // Exclude dist directory from coverage
      '/node_modules/',
      '/dist/',
      '/coverage/'
    ],
  };
  