const fs = require("fs");
const path = require("path");

const BASE_PATH = (process.env.BASE_PATH ?? "/bullex").replace(/\/$/, "");

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const from = path.join(src, entry.name);
    const to = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(from, to);
    } else {
      fs.copyFileSync(from, to);
    }
  }
}

function walkFiles(dir, exts, onFile) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkFiles(full, exts, onFile);
      continue;
    }
    if (exts.some((ext) => entry.name.endsWith(ext))) {
      onFile(full);
    }
  }
}

/**
 * Next 16 static export grava segmentos RSC em pastas aninhadas
 * (`__next.$d$locale/__PAGE__.txt`), mas o client pede nomes flat
 * (`__next.$d$locale.__PAGE__.txt`). Sem esse flatten → 404 no console.
 * Ref: https://github.com/vercel/next.js/issues/85374
 */
function flattenRscSegmentDirs(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (!entry.isDirectory()) {
      continue;
    }

    if (entry.name.startsWith("__next.")) {
      flattenNestedNextDir(full, dir, [entry.name]);
      fs.rmSync(full, { recursive: true, force: true });
      continue;
    }

    flattenRscSegmentDirs(full);
  }
}

function flattenNestedNextDir(currentDir, outputDir, nameParts) {
  for (const entry of fs.readdirSync(currentDir, { withFileTypes: true })) {
    const full = path.join(currentDir, entry.name);
    if (entry.isDirectory()) {
      flattenNestedNextDir(full, outputDir, [...nameParts, entry.name]);
      continue;
    }

    const flatName = [...nameParts, entry.name].join(".");
    const dest = path.join(outputDir, flatName);
    fs.copyFileSync(full, dest);
  }
}

/** next/image às vezes não prefixa public/ com basePath no HTML exportado */
function rewritePublicAssetPaths(filePath) {
  if (!BASE_PATH) {
    return;
  }
  let content = fs.readFileSync(filePath, "utf8");
  const before = content;
  content = content.replace(
    /(src|href)=(["'])\/(?!bullex\/)(images|legal|videos)\//g,
    `$1=$2${BASE_PATH}/$3/`,
  );
  content = content.replace(
    /url\((["']?)\/(?!bullex\/)(images|legal|videos)\//g,
    `url($1${BASE_PATH}/$2/`,
  );
  content = content.replace(
    /"\/(?!bullex\/)(images|legal|videos)\//g,
    `"${BASE_PATH}/$1/`,
  );
  if (content !== before) {
    fs.writeFileSync(filePath, content, "utf8");
  }
}

const root = process.cwd();
const outDir = path.join(root, "out");
const distDir = path.join(root, "dist");
const previewRoot = path.join(root, ".preview-static");
const previewBullex = path.join(previewRoot, "bullex");

if (!fs.existsSync(outDir)) {
  console.error("Pasta out/ não encontrada. Rode `next build` antes.");
  process.exit(1);
}

fs.rmSync(distDir, { recursive: true, force: true });
copyDir(outDir, distDir);
flattenRscSegmentDirs(distDir);

const rootIndex = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta http-equiv="refresh" content="0; url=./pt-br/" />
  <link rel="canonical" href="./pt-br/" />
  <title>Bull-ex</title>
  <script>location.replace("./pt-br/");</script>
</head>
<body style="margin:0;background:#000;color:#fff;font-family:system-ui,sans-serif;display:grid;place-items:center;min-height:100vh">
  <p>Redirecionando… <a href="./pt-br/" style="color:#00ff55">Abrir site</a></p>
</body>
</html>
`;

fs.writeFileSync(path.join(distDir, "index.html"), rootIndex, "utf8");
walkFiles(distDir, [".html", ".txt", ".js", ".css"], rewritePublicAssetPaths);

const required = [
  "pt-br/index.html",
  ".htaccess",
  "index.php",
  "_next",
  "images",
  "pt-br/__next.$d$locale.__PAGE__.txt",
];
for (const rel of required) {
  if (!fs.existsSync(path.join(distDir, rel))) {
    console.error(`Arquivo/pasta obrigatória ausente em dist/: ${rel}`);
    process.exit(1);
  }
}

fs.rmSync(previewRoot, { recursive: true, force: true });
fs.mkdirSync(previewBullex, { recursive: true });
copyDir(distDir, previewBullex);

const sample = fs.readFileSync(path.join(distDir, "pt-br", "index.html"), "utf8");
if (!sample.includes(`${BASE_PATH}/_next/`)) {
  console.warn(`AVISO: HTML sem ${BASE_PATH}/_next/ — confira BASE_PATH.`);
}
if (!sample.includes(`${BASE_PATH}/images/`)) {
  console.warn(`AVISO: HTML sem ${BASE_PATH}/images/ — imagens podem 404.`);
}

console.log("Deploy estático pronto em dist/");
console.log(`Hostinger: envie o CONTEÚDO de dist/ para public_html${BASE_PATH}/`);
console.log(`URLs: https://campanhasbullex.com${BASE_PATH}/  e  ...${BASE_PATH}/pt-br/`);
console.log(`Preview: npm run preview:static → http://localhost:4173${BASE_PATH}/pt-br/`);
