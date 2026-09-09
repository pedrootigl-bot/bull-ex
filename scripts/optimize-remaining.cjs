const sharp = require("sharp");
const fs = require("fs");

const jobs = [
  ["public/images/prizes/haval-h6.webp", 640, 68],
  ["public/images/bullex-platform-devices.webp", 900, 68],
  ["public/images/bullex-mobile-app.webp", 560, 68],
  ["public/images/testimonials/thiago.webp", 280, 60],
  ["public/images/testimonials/eduardo.webp", 280, 60],
  ["public/images/testimonials/camila.webp", 280, 60],
  ["public/images/testimonials/rogerio.webp", 280, 60],
  ["public/images/testimonials/juliana.webp", 280, 60],
  ["public/images/testimonials/fernanda.webp", 280, 60],
];

(async () => {
  for (const [file, width, quality] of jobs) {
    if (!fs.existsSync(file)) {
      console.log("miss", file);
      continue;
    }
    const before = fs.statSync(file).length;
    const buf = await sharp(file)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality, effort: 6 })
      .toBuffer();
    const out = file.replace(/\.webp$/i, ".opt.webp");
    fs.writeFileSync(out, buf);
    try {
      fs.unlinkSync(file);
      fs.renameSync(out, file);
    } catch {
      // se o original estiver locked, mantém .opt e segue
      console.warn("locked, kept", out);
      continue;
    }
    console.log(
      `${file}: ${Math.round(before / 1024)}KB → ${Math.round(fs.statSync(file).length / 1024)}KB`,
    );
  }
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
