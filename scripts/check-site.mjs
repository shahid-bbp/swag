import { readFile, readdir, stat } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import sharp from 'sharp';

const root = resolve(import.meta.dirname, '..');
const output = join(root, 'dist');
const pages = [];
async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) await walk(path);
    else if (entry.name.endsWith('.html')) pages.push(path);
  }
}
await walk(output);
const failures = [];
const images = new Set();
for (const page of pages) {
  const html = await readFile(page, 'utf8');
  const label = page.slice(output.length);
  if ([...html.matchAll(/<h1(?:\s|>)/g)].length !== 1) failures.push(`${label}: expected exactly one H1`);
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
  if (new Set(ids).size !== ids.length) failures.push(`${label}: duplicate element IDs`);
  for (const [, raw] of html.matchAll(/\s(?:href|src)="([^"]*)"/g)) {
    if (!raw.startsWith('/') && !raw.startsWith('#')) continue;
    const url = new URL(raw.replaceAll('&amp;', '&'), 'https://local.test');
    let target = raw.startsWith('#') ? page : join(output, decodeURIComponent(url.pathname));
    try {
      if ((await stat(target)).isDirectory()) target = join(target, 'index.html');
      await stat(target);
      if (url.hash && target.endsWith('.html')) {
        const targetHtml = target === page ? html : await readFile(target, 'utf8');
        if (!targetHtml.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`)) failures.push(`${label}: missing anchor ${raw}`);
      }
      if (/\.(webp|png|jpe?g|avif)$/i.test(target)) images.add(target);
    } catch { failures.push(`${label}: missing file ${raw}`); }
  }
}
for (const path of images) {
  const size = (await stat(path)).size;
  if (size >= 100_000) failures.push(`${path.slice(output.length)}: ${size} bytes exceeds the 100 KB budget`);
}
for (const name of ['ritual', 'bridal-details']) {
  const path = join(output, `images/editorial/${name}.webp`);
  const { width, height } = await sharp(path).metadata();
  if (width !== 1200 || height !== 800) failures.push(`${name}: update EditorialFeature image dimensions to ${width} × ${height}`);
}
if (failures.length) { console.error(failures.join('\n')); process.exitCode = 1; }
else console.log(`PASS: ${pages.length} pages; one H1 each; unique IDs; internal links, anchors and assets resolve; ${images.size} referenced raster assets below 100 KB.`);
