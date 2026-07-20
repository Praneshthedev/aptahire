import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const stagingDir = join(root, "deploy-staging", "recruiters");
const zipPath = join(root, "recruiters-deploy.zip");

if (!existsSync(dist)) {
  console.error("dist/ not found. Run npm run build first.");
  process.exit(1);
}

rmSync(join(root, "deploy-staging"), { recursive: true, force: true });
mkdirSync(stagingDir, { recursive: true });
cpSync(dist, stagingDir, { recursive: true });

writeFileSync(
  join(stagingDir, "UPLOAD-README.txt"),
  [
    "UPLOAD INSTRUCTIONS",
    "===================",
    "",
    "1. In cPanel File Manager (or FTP), open your site root for connect.aptahire.ai",
    "   Usually: public_html/",
    "",
    "2. Create folder: recruiters",
    "",
    "3. Upload ALL files from this zip INTO public_html/recruiters/",
    "   You must see these directly inside recruiters/:",
    "   - index.html",
    "   - .htaccess",
    "   - assets/",
    "   - api/",
    "   - image/",
    "",
    "4. Do NOT upload the recruiters folder itself again.",
    "   Wrong: public_html/recruiters/recruiters/index.html",
    "   Right: public_html/recruiters/index.html",
    "",
    "5. Open: https://connect.aptahire.ai/recruiters/",
    "",
  ].join("\n"),
  "utf8"
);

rmSync(zipPath, { force: true });

if (process.platform === "win32") {
  execSync(
    `powershell -NoProfile -Command "Compress-Archive -Path '${stagingDir}\\*' -DestinationPath '${zipPath}' -Force"`,
    { stdio: "inherit" }
  );
} else {
  execSync(`cd "${stagingDir}" && zip -r "${zipPath}" .`, { stdio: "inherit" });
}

console.log(`Deploy package ready: ${zipPath}`);
console.log("Upload and extract into public_html/recruiters/ on connect.aptahire.ai");
