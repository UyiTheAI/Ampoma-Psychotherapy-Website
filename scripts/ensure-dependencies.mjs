import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const requiredPackages = [
  ['Express', resolve(projectRoot, 'node_modules', 'express', 'package.json')],
  ['Vite', resolve(projectRoot, 'node_modules', 'vite', 'package.json')],
];
const missingPackages = requiredPackages
  .filter(([, packagePath]) => !existsSync(packagePath))
  .map(([name]) => name);

if (missingPackages.length === 0) {
  process.exit(0);
}

console.info(
  `Installing missing project dependencies (${missingPackages.join(', ')}).`,
);
const result = spawnSync('npm', ['install'], {
  cwd: projectRoot,
  stdio: 'inherit',
  shell: process.platform === 'win32',
});

if (result.error) {
  console.error(`Could not install dependencies: ${result.error.message}`);
  process.exitCode = 1;
} else if (result.status !== 0) {
  process.exitCode = result.status ?? 1;
}
