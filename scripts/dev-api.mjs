import { spawn } from 'node:child_process';
import { phpRuntime } from './php-runtime.mjs';

const runtime = phpRuntime();
const server = spawn(runtime.command, [...runtime.args, '-S', '127.0.0.1:8080', '-t', 'public'], { stdio: 'inherit' });
server.on('error', () => {
  console.error('PHP 8.2+ is required for the email API. Install PHP or set PHP_BINARY to its executable path.');
  process.exitCode = 1;
});
server.on('exit', (code) => { process.exitCode = code ?? 0; });
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => server.kill(signal));
