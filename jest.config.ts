import type { Config } from 'jest';

export const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ['../../jestSetupFile.ts'],
  setupFilesAfterEnv: ['../../jestSetupFileAfterEnv.ts'],
  reporters: ['default', 'github-actions'],
};
