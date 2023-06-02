import type { Config } from 'jest';

export const config: Config = {
  preset: 'ts-jest',
  reporters: ['default', 'github-actions'],
  setupFiles: ['../../jestSetupFile.ts'],
  setupFilesAfterEnv: ['../../jestSetupFileAfterEnv.ts'],
  testEnvironment: 'node',
};
