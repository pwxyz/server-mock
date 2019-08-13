module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePathIgnorePatterns: [
    '<rootDir>/lib/',
    '<rootDir>/dist/',
    '<rootDir>/node_modules/'
  ]
};