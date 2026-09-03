import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const src = process.argv[2];
const outDir = process.argv[3];

const image = sharp(src);
const { data, info } = await image.ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;

function isContent(x, y) {
  const i = (y * width + x) * channels;
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  const a = data[i + 3];
  if (a < 12) {
    return false;
  }
  return r > 16 || g > 16 || b > 16;
}

function bounds(x0, x1) {
  let minX = width;
  let minY = height;
  let maxX = 0;
  let maxY = 0;
  let found = false;
  for (let y = 0; y < height; y += 1) {
    for (let x = x0; x < x1; x += 1) {
      if (!isContent(x, y)) {
        continue;
      }
      found = true;
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    }
  }
  if (!found) {
    throw new Error(`no content between x=${x0} and x=${x1}`);
  }
  const pad = 8;
  return {
    left: Math.max(0, minX - pad),
    top: Math.max(0, minY - pad),
    width: Math.min(width, maxX + pad + 1) - Math.max(0, minX - pad),
    height: Math.min(height, maxY + pad + 1) - Math.max(0, minY - pad),
  };
}

const splitX = 500;
const bodyBox = bounds(0, splitX);
const headBox = bounds(splitX, width);

fs.mkdirSync(outDir, { recursive: true });

async function extract(box, name) {
  const buf = await sharp(src)
    .extract(box)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const px = buf.data;
  for (let i = 0; i < px.length; i += 4) {
    const r = px[i];
    const g = px[i + 1];
    const b = px[i + 2];
    if (r < 14 && g < 14 && b < 14) {
      px[i + 3] = 0;
    }
  }

  await sharp(px, {
    raw: { width: buf.info.width, height: buf.info.height, channels: 4 },
  })
    .png()
    .toFile(path.join(outDir, name));
}

await extract(bodyBox, "body.png");
await extract(headBox, "head.png");

console.log(JSON.stringify({ width, height, splitX, bodyBox, headBox }, null, 2));
