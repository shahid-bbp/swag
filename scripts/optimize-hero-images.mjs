import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const directory = new URL('../public/images/hero/', import.meta.url);
const limit = 100_000;
const sources = [
  ['model-clean.png', 'model-1-hero.webp'],
  ['model-2-clean.webp', 'model-2-hero.webp'],
  ['Glamorous South Asian Beauty Cutout.png', 'model-3-hero.webp'],
];

for (const [source, filename] of sources) {
  const input = fileURLToPath(new URL(source, directory));
  let output;
  // Trim transparent padding, preserving the full portrait and its alpha channel.
  for (const height of [1024, 900, 800, 700]) {
    for (const quality of [90, 85, 80, 75, 70]) {
      const candidate = await sharp(input)
        .trim({ threshold: 10 })
        .resize({ height, withoutEnlargement: true })
        .webp({ quality, alphaQuality: 100, effort: 6 })
        .toBuffer();
      if (candidate.length < limit) { output = candidate; break; }
    }
    if (output) break;
  }
  if (!output) throw new Error(`Cannot encode ${source} below ${limit} bytes.`);
  await writeFile(new URL(filename, directory), output);
  const { width, height, hasAlpha } = await sharp(output).metadata();
  if (!hasAlpha) throw new Error(`Transparency lost in ${filename}.`);
  console.log(`${filename}: ${output.length} bytes, ${width} × ${height}, alpha preserved`);
}

const backgroundSource = fileURLToPath(new URL('../src/assets/hero/hero-bg-reference.png', import.meta.url));
let backgroundOutput;
for (const quality of [90, 85, 80, 75, 70]) {
  const candidate = await sharp(backgroundSource)
    .resize({ width: 1920, withoutEnlargement: true })
    .webp({ quality, effort: 6 })
    .toBuffer();
  if (candidate.length < limit) { backgroundOutput = candidate; break; }
}
if (!backgroundOutput) throw new Error('The hero background exceeds the image budget.');
await writeFile(new URL('hero-bg-reference.webp', directory), backgroundOutput);
console.log(`hero-bg-reference.webp: ${backgroundOutput.length} bytes`);
