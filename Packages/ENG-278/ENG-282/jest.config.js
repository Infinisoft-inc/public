module.exports = {
    // Test file patterns
    testMatch: ['**/__tests__/**/*.js', '**/?(*.)+(spec|test).js'],
  
    // Module file extensions
    moduleFileExtensions: ['js', 'json'],
  
    // Collect code coverage information
    collectCoverage: true,
  
    // Specify the directories where Jest should output its coverage files
    coverageDirectory: 'coverage',
  
    // Specify which files should be included in code coverage reports
    coveragePathIgnorePatterns: ['/node_modules/'],
  
    // Specify the coverage thresholds for each metric (statements, branches, functions, and lines)
    coverageThreshold: {
      global: {
        statements: 80,
        branches: 80,
        functions: 80,
        lines: 80,
      },
    },
  };