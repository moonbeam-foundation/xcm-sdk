import { readdirSync, rmSync } from 'fs';

const modules = ['cjs', 'mjs'];
const filesToRemove = [
  'package.json',
  'package-lock.json',
  'tsconfig.json',
  'tsconfig.cjs.json',
  'tsconfig.tsbuildinfo',
  'tsconfig.cjs.tsbuildinfo',
];

const packages = readdirSync('packages', { withFileTypes: true })
  .filter((pkg) => pkg.isDirectory())
  .map((pkg) => pkg.name);

packages.forEach((pkg) =>
  modules.forEach((module) =>
    filesToRemove.forEach((file) =>
      rmSync(`packages/${pkg}/build/${module}/${file}`, { force: true }),
    ),
  ),
);
