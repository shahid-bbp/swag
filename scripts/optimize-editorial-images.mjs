import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const root = new URL('../', import.meta.url);
const assets = [
  ['src/assets/editorial/ritual.png', 'public/images/editorial/ritual.webp', 1200],
  ['src/assets/editorial/bridal-details.png', 'public/images/editorial/bridal-details.webp', 1200],
  ['public/images/bridal/bridal-main.webp', 'public/images/optimized/bridal-main.webp', 1000],
  ['public/images/hair/hair-care.webp', 'public/images/optimized/hair-care.webp', 1000],
  ['public/images/nails/nail-care.webp', 'public/images/optimized/nail-care.webp', 1000],
];
for (const [input, output, width] of assets) {
  const destination = new URL(output, root);
  await mkdir(new URL('.', destination), { recursive: true });
  let selected;
  for (const size of [width, 960, 800]) {
    for (const quality of [88, 82, 76, 70]) {
      const data = await sharp(fileURLToPath(new URL(input, root))).resize({ width: size, withoutEnlargement: true }).webp({ quality, effort: 6 }).toBuffer();
      if (data.length < 100_000) { selected = data; break; }
    }
    if (selected) break;
  }
  if (!selected) throw new Error(`${output} could not meet the 100 KB budget.`);
  await writeFile(destination, selected);
  console.log(`${output}: ${selected.length} bytes`);
}
