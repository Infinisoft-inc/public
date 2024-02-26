module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
  },
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/__tests__/',
    '\\.d\\.ts$',
    '*.test.ts$',
    'dist'
  ],
  testMatch: ['**/__tests__/index.test.ts'],
  verbose: true,
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
};
