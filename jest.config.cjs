module.exports = {
  preset: 'ts-jest',
  moduleFileExtensions: ['js', 'ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.js$': 'babel-jest',
  },
  testEnvironment: 'jest-environment-jsdom',
  testMatch: ['**/*.test.ts'],
};
