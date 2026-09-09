const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");

const previewRoot = path.join(process.cwd(), ".preview-static");
if (!fs.existsSync(path.join(previewRoot, "bullex", "pt-br", "index.html"))) {
  console.error("Rode npm run build antes do preview.");
  process.exit(1);
}

const child = spawn(
  "npx",
  ["--yes", "serve", ".preview-static", "-p", "4173"],
  { stdio: "inherit", shell: true, cwd: process.cwd() },
);

child.on("exit", (code) => process.exit(code ?? 0));
