import { spawnSync } from 'node:child_process';
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { phpRuntime } from '../scripts/php-runtime.mjs';

const runtime = phpRuntime();
test('Hostinger PHP enquiry validation, routing, delivery and rate-limit tests', () => {
  const result = spawnSync(runtime.command, [...runtime.args, 'tests/enquiry.test.php'], { encoding: 'utf8' });
  assert.ifError(result.error);
  assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
  assert.equal(result.stdout.match(/^PASS:/gm)?.length, 9, result.stdout);
});
