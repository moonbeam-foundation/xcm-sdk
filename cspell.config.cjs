const vscodeConfig = require('./.vscode/settings.json');

module.exports = {
  ignorePaths: [
    'node_modules',
    'coverage',
    'build',
    'tsconfig.tsbuildinfo',
    '**/*.abi.ts',
    '**/*Abi.ts',
    '**/*.ts.snap',
    '**/*.sol',
    'pnpm-lock.yaml',
  ],
  words: vscodeConfig['cSpell.words'],
};
