#!/usr/bin/env node
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import * as OpenCC from 'opencc-js';

const convert = OpenCC.Converter({ from: 'cn', to: 'twp' });
const marker = '# @generated zh-Hant from zh-Hans (s2twp) - edit the zh-Hans source; delete this line to hand-maintain.';
const blogDir = path.join(process.cwd(), 'content', 'blog');

const files = await readdir(blogDir).catch(() => []);
let made = 0;
let kept = 0;

for (const file of files) {
  if (!file.endsWith('.zh-Hans.mdx')) continue;
  const source = path.join(blogDir, file);
  const target = path.join(blogDir, file.replace(/\.zh-Hans\.mdx$/, '.zh-Hant.mdx'));

  if (existsSync(target)) {
    const current = await readFile(target, 'utf8');
    if (!current.includes(marker)) {
      kept++;
      continue;
    }
  }

  const raw = await readFile(source, 'utf8');
  const converted = convert(raw).replace(/^---\n/, `---\n${marker}\n`);
  await writeFile(target, converted, 'utf8');
  made++;
}

const metaSource = path.join(blogDir, 'meta.zh-Hans.json');
const metaTarget = path.join(blogDir, 'meta.zh-Hant.json');
if (existsSync(metaSource)) {
  const raw = await readFile(metaSource, 'utf8');
  await writeFile(metaTarget, convert(raw), 'utf8');
}

console.log(`✓ zh-Hant: generated ${made}, kept ${kept} hand-maintained`);
