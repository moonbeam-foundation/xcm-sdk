/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['build'],
  setupFiles: ['./jestSetupFile.ts'],
  setupFilesAfterEnv: ['./jestSetupFileAfterEnv.ts'],
};
