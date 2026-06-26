import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const templatePath = path.join(root, "hyperbolt-template.html");
const sectionPath = path.join(root, "scripts", "get-started-section.html");

const template = fs.readFileSync(templatePath, "utf8");
const section = fs.readFileSync(sectionPath, "utf8").trim();

const ctaMarker = 'id="cta"';
const ctaIdx = template.indexOf(ctaMarker);
if (ctaIdx < 0) {
  console.error("Could not locate #cta section");
  process.exit(1);
}

const ctaStart = template.lastIndexOf("<section", ctaIdx);
if (ctaStart < 0) {
  console.error("Could not locate start of #cta section");
  process.exit(1);
}

const getStartedMarker = 'id="get-started"';
const existingStart = template.indexOf(getStartedMarker);

let updated;
if (existingStart >= 0 && existingStart < ctaStart) {
  const existingSectionStart = template.lastIndexOf("<section", existingStart);
  const existingSectionEnd =
    template.indexOf("</section>", existingStart) + "</section>".length;
  updated =
    template.slice(0, existingSectionStart) +
    section +
    "\n\n    " +
    template.slice(existingSectionEnd);
  console.log("Replaced existing get-started section");
} else {
  updated =
    template.slice(0, ctaStart) + section + "\n\n    " + template.slice(ctaStart);
  console.log("Inserted get-started section before #cta");
}

fs.writeFileSync(templatePath, updated);
