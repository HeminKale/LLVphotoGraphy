import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

export function phpRuntime() {
  if (process.env.PHP_BINARY) return { command: process.env.PHP_BINARY, args: [] };
  const portable = resolve('.tools/php/php.exe');
  if (process.platform === 'win32' && existsSync(portable)) {
    return { command: portable, args: ['-d', `extension_dir=${resolve('.tools/php/ext')}`, '-d', 'extension=curl', '-d', 'extension=openssl'] };
  }
  return { command: 'php', args: [] };
}
