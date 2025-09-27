module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/$1', // ← ça dit à Jest de comprendre les imports depuis 'src/'
  },
  collectCoverageFrom: ['/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
};