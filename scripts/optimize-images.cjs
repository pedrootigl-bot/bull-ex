/**
 * Comprime imagens de public/images para 3G (WebP + resize).
 * Rode: node scripts/optimize-images.cjs
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const ROOT = path.join(process.cwd(), "public", "images");

const JOBS = [
  { file: "promo-megahaval.jpg", width: 480, quality: 62, toWebp: true },
  { file: "bullex-why-investor.jpg", width: 720, quality: 64, toWebp: true },
  { file: "bullex-team-trading.jpg", width: 720, quality: 64, toWebp: true },
  { file: "prizes/trader-top-box.jpg", width: 640, quality: 64, toWebp: true },
  { file: "prizes/trader-top.jpg", width: 640, quality: 64, toWebp: true },
  { file: "prizes/haval-h6.webp", width: 640, quality: 68 },
  { file: "bullex-platform-devices.webp", width: 900, quality: 68 },
  { file: "bullex-mobile-app.webp", width: 560, quality: 68 },
  { file: "bullex-logo.webp", width: 320, quality: 75 },
  { file: "testimonials/thiago.webp", width: 280, quality: 62 },
  { file: "testimonials/eduardo.webp", width: 280, quality: 62 },
  { file: "testimonials/camila.webp", width: 280, quality: 62 },
  { file: "testimonials/rogerio.webp", width: 280, quality: 62 },
  { file: "testimonials/juliana.webp", width: 280, quality: 62 },
  { file: "testimonials/fernanda.webp", width: 280, quality: 62 },
];

async function writeReplace(bufferOrPipeline, destPath) {
  const tmp = `${destPath}.${process.pid}.tmp`;
  if (Buffer.isBuffer(bufferOrPipeline)) {
    fs.writeFileSync(tmp, bufferOrPipeline);
  } else {
    await bufferOrPipeline.toFile(tmp);
  }
  fs.copyFileSync(tmp, destPath);
  fs.unlinkSync(tmp);
}

async function optimizeOne(job) {
  const input = path.join(ROOT, job.file);
  if (!fs.existsSync(input)) {
    console.warn("skip missing", job.file);
    return;
  }

  const before = fs.statSync(input).length;
  const base = sharp(input).rotate().resize({
    width: job.width,
    withoutEnlargement: true,
  });

  if (job.toWebp) {
    const outPath = input.replace(/\.(jpe?g|png)$/i, ".webp");
    const webpBuf = await base.clone().webp({ quality: job.quality, effort: 6 }).toBuffer();
    await writeReplace(webpBuf, outPath);
    const jpgBuf = await base
      .clone()
      .jpeg({ quality: Math.max(50, job.quality - 6), mozjpeg: true })
      .toBuffer();
    await writeReplace(jpgBuf, input);
    console.log(
      `${job.file}: ${(before / 1024).toFixed(0)}KB → jpg ${(fs.statSync(input).length / 1024).toFixed(0)}KB | webp ${(fs.statSync(outPath).length / 1024).toFixed(0)}KB`,
    );
    return;
  }

  const ext = path.extname(input).toLowerCase();
  const buf =
    ext === ".webp"
      ? await base.webp({ quality: job.quality, effort: 6 }).toBuffer()
      : await base.jpeg({ quality: job.quality, mozjpeg: true }).toBuffer();
  await writeReplace(buf, input);
  console.log(`${job.file}: ${(before / 1024).toFixed(0)}KB → ${(fs.statSync(input).length / 1024).toFixed(0)}KB`);
}

(async () => {
  // limpa .tmp órfãos
  for (const entry of fs.readdirSync(ROOT, { recursive: true })) {
    if (String(entry).endsWith(".tmp")) {
      fs.unlinkSync(path.join(ROOT, entry));
    }
  }

  for (const job of JOBS) {
    await optimizeOne(job);
  }
  console.log("Imagens otimizadas.");
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
