module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
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
  testMatch: ['./__tests__/index.test.tsx'],
  verbose: true,
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
};
