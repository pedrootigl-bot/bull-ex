import sharp from "sharp";

function pixel(data, width, channels, x, y) {
  const i = (y * width + x) * channels;
  return { r: data[i], g: data[i + 1], b: data[i + 2], a: data[i + 3] };
}

function isWhite(p) {
  return p.a > 40 && p.r > 180 && p.g > 180 && p.b > 180 && Math.abs(p.r - p.g) < 40;
}

function isGreen(p) {
  return p.a > 40 && p.g > 90 && p.g > p.r + 25 && p.g > p.b + 10;
}

function isContent(p) {
  return p.a > 20 && (p.r > 18 || p.g > 18 || p.b > 18);
}

async function dump(file, yStart, yEnd, label) {
  const { data, info } = await sharp(file).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  console.log(`\n=== ${label} ${width}x${height} rows ${yStart}-${yEnd} ===`);
  for (let y = yStart; y < Math.min(yEnd, height); y += 4) {
    let wMin = width;
    let wMax = -1;
    let wCount = 0;
    let gMin = width;
    let gMax = -1;
    let cMin = width;
    let cMax = -1;
    let holeStart = -1;
    let holeEnd = -1;
    for (let x = 0; x < width; x += 1) {
      const p = pixel(data, width, channels, x, y);
      if (isContent(p)) {
        if (x < cMin) cMin = x;
        if (x > cMax) cMax = x;
      }
      if (isWhite(p)) {
        if (x < wMin) wMin = x;
        if (x > wMax) wMax = x;
        wCount += 1;
      }
      if (isGreen(p)) {
        if (x < gMin) gMin = x;
        if (x > gMax) gMax = x;
      }
    }
    if (cMin <= cMax) {
      for (let x = cMin; x <= cMax; x += 1) {
        const p = pixel(data, width, channels, x, y);
        if (!isContent(p)) {
          if (holeStart < 0) holeStart = x;
          holeEnd = x;
        }
      }
    }
    console.log(
      `y=${String(y).padStart(3)} content=${cMin}-${cMax} white=${wMin === width ? "-" : `${wMin}-${wMax} n=${wCount}`} green=${gMin === width ? "-" : `${gMin}-${gMax}`} hole=${holeStart < 0 ? "-" : `${holeStart}-${holeEnd}`}`,
    );
  }
}

await dump("public/bull/body.png", 0, 180, "BODY");
await dump("public/bull/head.png", 240, 504, "HEAD");
