import sharp from "sharp";

const top = -45;
const left = 28;
const widthPct = 0.66;
const bw = 395;
const bh = 663;
const headW = Math.round(bw * widthPct);
const resized = await sharp("public/bull/head.png")
  .resize({ width: headW })
  .ensureAlpha()
  .toBuffer();
const hm = await sharp(resized).metadata();
const padTop = -top;

const bodyBuf = await sharp("public/bull/body.png")
  .ensureAlpha()
  .extend({
    top: padTop,
    left: 0,
    bottom: 0,
    right: 0,
    background: { r: 0, g: 0, b: 0, alpha: 1 },
  })
  .toBuffer();

const full = await sharp(bodyBuf)
  .composite([{ input: resized, top: 0, left }])
  .png()
  .toBuffer();

await sharp(full).toFile("public/bull/preview-final.png");
await sharp(full)
  .extract({ left: 0, top: 0, width: bw, height: 220 })
  .resize({ width: bw * 2, kernel: "nearest" })
  .toFile("public/bull/preview-neck.png");
console.log({ headW, headH: hm.height, padTop, left, widthPct });
