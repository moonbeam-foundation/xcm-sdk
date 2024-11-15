import { exec } from 'node:child_process';
import { writeFile } from 'node:fs/promises';
import { promisify } from 'node:util';
import { glob } from 'glob';

const execPromise = promisify(exec);

async function getHighestDevTag(pkgs: { name: string }[]) {
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
    '************************************ update-dev-versions script start! ************************************',
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

    const newVersion = `1.0.0-dev.${nextVersionNumber}`;

    pkg.version = newVersion;

    pkgs.forEach((p) => {
      if (p.dependencies?.[name]) {
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
