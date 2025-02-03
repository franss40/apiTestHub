module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.ts'],
  verbose: true,
  moduleNameMapper: { '^@src/(.*)$': '<rootDir>/src/$1' }
}