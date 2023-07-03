module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
  },
  coveragePathIgnorePatterns: [
    '/node_modules/',
    'dist/',
    '\\.d\\.ts$',
  ],
  testMatch: ['**/__tests__/*.ts?(x)', '**/__tests__/?(*.)+(spec|test).ts?(x)'],
  verbose: true,
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
};
