import { copyFile } from 'node:fs/promises';
import { glob } from 'glob';

async function copyDtsToMts() {
  const dtsFiles = await glob('packages/*/build/**/*.d.ts');

  for (const file of dtsFiles) {
    const mtsFile = file.replace('.d.ts', '.d.mts');
    await copyFile(file, mtsFile);
  }
}

copyDtsToMts().catch(console.error);
