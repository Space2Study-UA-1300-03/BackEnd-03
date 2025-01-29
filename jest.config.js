/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */
const config = {
  roots: ['<rootDir>/src/test'],
  moduleNameMapper: {
    '^#src/(.*)$': '<rootDir>/src/$1',
    '^#initialization/(.*)$': '<rootDir>/src/initialization/$1',
    '^#logger/(.*)$': '<rootDir>/src/logger/$1',
    '^#configs/(.*)$': '<rootDir>/src/configs/$1',
    '^#consts/(.*)$': '<rootDir>/src/consts/$1',
    '^#utils/(.*)$': '<rootDir>/src/utils/$1',
    '^#controllers/(.*)$': '<rootDir>/src/controllers/$1',
    '^#middlewares/(.*)$': '<rootDir>/src/middlewares/$1',
    '^#services/(.*)$': '<rootDir>/src/services/$1',
    '^#cron-jobs/(.*)$': '<rootDir>/src/cron-jobs/$1',
    '^#seed/(.*)$': '<rootDir>/src/seed/$1',
    '^#routes/(.*)$': '<rootDir>/src/routes/$1',
    '^#models/(.*)$': '<rootDir>/src/models/$1',
    '^#validation/(.*)$': '<rootDir>/src/validation/$1'
  },
  verbose: true,
  collectCoverage: true,
  testEnvironment: 'node',
  coverageReporters: ['html', 'lcov'],
  moduleFileExtensions: ['js', 'mjs', 'json'],
  coverageDirectory: '<rootDir>/src/test/coverage',
  testTimeout: 12000,

  collectCoverageFrom: [
    '!<rootDir>/node_modules/*',
    '!<rootDir>/src/test/**/*',
    '!<rootDir>/src/consts/*',
    '!<rootDir>/src/configs/*',
    '!<rootDir>/docs/*',
    '!<rootDir>/src/emails/*',
    '!<rootDir>/*.json',
    '!<rootDir>/*.yaml'
  ],

  coverageThreshold: {
    global: {
      statements: 70,
      functions: 70,
      branches: 70,
      lines: 70
    }
  },

  testMatch: ['<rootDir>/src/test/integration/**/*.test.js', '<rootDir>/src/test/unit/**/*.test.js'],
  testResultsProcessor: 'jest-sonar-reporter'
}

export default config
