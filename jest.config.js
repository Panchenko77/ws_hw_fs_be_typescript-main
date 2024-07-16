module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: [
    '<rootDir>/tests',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: [
    'lcov',
    'cobertura',
  ],
  forceCoverageMatch: ['<rootDir>/src'],
  setupFilesAfterEnv: [
    'jest-extended/all',
    '<rootDir>/tests/bootstrap.ts',
  ],
  testTimeout: 20000,
};
