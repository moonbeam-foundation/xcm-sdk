import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePaths: ['<rootDir>'],
  testPathIgnorePatterns: ['<rootDir>/packages/.*/build/'],
  setupFiles: ['./jestSetupFile.ts'],
  setupFilesAfterEnv: ['./jestSetupFileAfterEnv.ts'],
  reporters: ['default', 'github-actions'],
};

// eslint-disable-next-line import/no-default-export
export default config;
