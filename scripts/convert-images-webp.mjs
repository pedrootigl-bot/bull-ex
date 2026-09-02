import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const roots = [path.resolve("public/images")];
const exts = new Set([".png", ".jpg", ".jpeg"]);

async function* walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(full);
    } else {
      yield full;
    }
  }
}

const results = [];

for (const root of roots) {
  for await (const file of walk(root)) {
    const ext = path.extname(file).toLowerCase();
    if (!exts.has(ext)) continue;

    const out = file.slice(0, -ext.length) + ".webp";
    const input = sharp(file).rotate();
    const meta = await input.metadata();
    const hasAlpha = Boolean(meta.hasAlpha);

    // Logos / UI with transparency: higher quality, lossless-ish feel
    const isLogo = /logo/i.test(path.basename(file));
    const quality = isLogo ? 90 : 78;

    await input
      .webp({
        quality,
        alphaQuality: 90,
        effort: 6,
        smartSubsample: true,
      })
      .toFile(out);

    const before = fs.statSync(file).size;
    const after = fs.statSync(out).size;
    results.push({
      from: path.relative(process.cwd(), file).replaceAll("\\", "/"),
      to: path.relative(process.cwd(), out).replaceAll("\\", "/"),
      before,
      after,
      savedPct: Number((((before - after) / before) * 100).toFixed(1)),
      alpha: hasAlpha,
      quality,
    });
  }
}

const beforeTotal = results.reduce((s, r) => s + r.before, 0);
const afterTotal = results.reduce((s, r) => s + r.after, 0);

console.log(JSON.stringify({ results, beforeTotal, afterTotal, savedBytes: beforeTotal - afterTotal }, null, 2));
