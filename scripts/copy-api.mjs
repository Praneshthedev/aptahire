import { cpSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const source = join(root, "api");
const target = join(root, "dist", "api");

if (!existsSync(join(root, "dist"))) {
  console.error("dist/ not found. Run vite build first.");
  process.exit(1);
}

mkdirSync(target, { recursive: true });
cpSync(source, target, {
  recursive: true,
  filter: (src) => {
    const name = src.split(/[/\\]/).pop() ?? "";
    return name !== "config.php" && name !== "mail.log" && name !== "aptahire_leads.csv";
  },
});

console.log("Copied api/ to dist/api/");
