/* eslint-disable import/no-dynamic-require */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
// eslint-disable-next-line import/no-extraneous-dependencies
import { glob } from 'glob';
import { exec } from 'node:child_process';
import { writeFile } from 'node:fs/promises';
import { promisify } from 'node:util';

const execPromise = promisify(exec);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function getHighestDevTag(pkgs: any[]) {
  const promises = pkgs.map(async (pkg) => {
    const { name } = pkg;
    const { stdout } = await execPromise(`npm view ${name} dist-tags.dev`);
    const current = stdout.replace(/\n$/, '');

    const number = current.split('.').at(-1) || '0';

    return Number(number);
  });

  const allVersions = await Promise.all(promises);

  return Math.max(...allVersions);
}

async function main() {
  console.log(
    `************************************ update-dev-versions script start! ************************************`,
  );
  const files = await glob(`${process.env.PWD}/packages/**/package.json`, {
    ignore: '**/node_modules/**',
  });
  const pkgs = await Promise.all(
    files.map(async (file) => {
      const { default: pkg } = await import(file, { assert: { type: 'json' } });
      return pkg;
    }),
  );

  const highestCurrent = await getHighestDevTag(pkgs);
  const nextVersionNumber = highestCurrent + 1;

  console.log(`highestCurrent = ${highestCurrent}`);
  console.log(`newVersion = ${nextVersionNumber}`);

  for (const pkg of pkgs) {
    const { name } = pkg;
    const { stdout } = await execPromise(`npm view ${name} dist-tags.dev`);

    const current = stdout.replace(/\n$/, '');
    const newVersion = current.replace(/\.\d+$/, `.${nextVersionNumber}`);

    pkg.version = newVersion;

    pkgs.forEach((p) => {
      if (p.dependencies && p.dependencies[name]) {
        // eslint-disable-next-line no-param-reassign
        p.dependencies[name] = newVersion;
      }
    });
  }

  await Promise.all(
    pkgs.map(async (pkg, index) =>
      writeFile(files[index], JSON.stringify(pkg, null, 2)),
    ),
  );
}

main()
  .then(() => console.log('done'))
  .catch(console.error)
  .finally(() => process.exit(0));
