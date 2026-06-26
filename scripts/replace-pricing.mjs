import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const templatePath = path.join(root, "hyperbolt-template.html");
const pricingPath = path.join(root, "scripts", "pricing-section.html");

const template = fs.readFileSync(templatePath, "utf8");
const pricing = fs.readFileSync(pricingPath, "utf8");

const marker = 'id="pricing"';
const start = template.indexOf("<section", template.indexOf(marker) - 200);
const end = template.indexOf("</section>", template.indexOf(marker)) + "</section>".length;

if (start < 0 || end <= start) {
  console.error("Could not locate pricing section");
  process.exit(1);
}

const updated = template.slice(0, start) + pricing.trim() + "\n    " + template.slice(end);
fs.writeFileSync(templatePath, updated);
console.log("Replaced pricing section successfully");
