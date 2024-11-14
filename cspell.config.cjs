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
    'CHANGELOG.md',
    '.gitignore',
  ],
  words: vscodeConfig['cSpell.words'],
};
