// eslint-disable-next-line jest/no-jest-import
import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['build'],
  setupFiles: ['./jestSetupFile.ts'],
  setupFilesAfterEnv: ['./jestSetupFileAfterEnv.ts'],
  reporters: ['default', 'github-actions'],
  // modulePathIgnorePatterns: ['<rootDir>/packages/**/tests'],
};

// eslint-disable-next-line import/no-default-export
export default config;
