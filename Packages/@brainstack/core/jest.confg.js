module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
  },  
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '\\.d\\.ts$',
  ],
  testMatch: ['**/__tests__/index.test.ts'],
  verbose: true,
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
};