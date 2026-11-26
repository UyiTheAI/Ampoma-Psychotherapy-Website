import { spawn } from 'node:child_process';
import process from 'node:process';

const isWindows = process.platform === 'win32';
const npmScript = process.env.npm_execpath;
const command = npmScript
  ? process.execPath
  : isWindows
    ? 'npm.cmd'
    : 'npm';
const commandPrefix = npmScript ? [npmScript] : [];
const children = [];
let stopping = false;

function stop(code = 0, signal = 'SIGTERM') {
  if (stopping) return;
  stopping = true;
  process.exitCode = code;

  for (const child of children) {
    if (child.exitCode === null && child.signalCode === null) {
      child.kill(signal);
    }
  }
}

function start(label, script) {
  const child = spawn(
    command,
    [...commandPrefix, 'run', script],
    {
      shell: !npmScript && isWindows,
      stdio: 'inherit',
    },
  );
  children.push(child);

  child.on('error', (error) => {
    console.error(`[${label}] Could not start: ${error.message}`);
    stop(1);
  });

  child.on('exit', (code, signal) => {
    if (stopping) return;
    console.error(
      `[${label}] stopped${signal ? ` after ${signal}` : ` with exit code ${code}`}`,
    );
    stop(code ?? 1);
  });
}

process.on('SIGINT', () => stop(0, 'SIGINT'));
process.on('SIGTERM', () => stop(0, 'SIGTERM'));

console.info('Starting the Ampoma Psychotherapy frontend and backend.');
console.info('Frontend: http://localhost:5173');
console.info('Backend:  http://localhost:5000/api/site-content');

start('Backend', 'dev:backend');
start('Frontend', 'dev:frontend');
