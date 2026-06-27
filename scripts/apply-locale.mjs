import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const localesDir = path.join(__dirname, "locales");

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function applyOne(html, from, to) {
  if (!from) return html;
  if (/\s/.test(from)) {
    const parts = from.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 1) {
      return html.split(from).join(to);
    }
    const escaped = parts.map(escapeRegExp);
    const re = new RegExp(escaped.join("\\s+"), "g");
    return html.replace(re, to.replace(/\s+/g, " ").trim());
  }
  if (from.length <= 8 && /^[A-Za-z]+$/.test(from)) {
    const re = new RegExp(`(?<![A-Za-z])${escapeRegExp(from)}(?![A-Za-z])`, "g");
    return html.replace(re, to);
  }
  return html.split(from).join(to);
}

function loadReplacements(files) {
  const all = [];
  for (const file of files) {
    const filePath = path.join(localesDir, file);
    if (fs.existsSync(filePath)) {
      all.push(...JSON.parse(fs.readFileSync(filePath, "utf8")));
    }
  }
  return all.sort((a, b) => b.from.length - a.from.length);
}

function applyReplacements(html, files) {
  let out = html;
  for (const { from, to } of loadReplacements(files)) {
    out = applyOne(out, from, to);
  }
  return out;
}

const VISION_AR = `
    <span class="lyric-word">نؤمن</span>
    <span class="lyric-word">أن</span>
    <span class="lyric-word">التصميم</span>
    <span class="lyric-word">العظيم</span>
    <span class="lyric-word">ليس</span>
    <span class="lyric-word">زينة</span>
    <span class="lyric-word">—</span>
    <span class="lyric-word">بل</span>
    <span class="lyric-word">قوة.</span>
    <br class="hidden md:block">
    <span class="lyric-word">كل</span>
    <span class="lyric-word">منتج</span>
    <span class="lyric-word">نصنعه</span>
    <span class="lyric-word">يُبنى</span>
    <span class="lyric-word">لإثارة</span>
    <span class="lyric-word">الفضول،</span>
    <span class="lyric-word">والتحرك</span>
    <br class="hidden md:block">
    <span class="lyric-word">بنية،</span>
    <span class="lyric-word">والإصابة</span>
    <span class="lyric-word">بدقة.</span>
  `.trim();

const VISION_FR = `
    <span class="lyric-word">Nous</span>
    <span class="lyric-word">croyons</span>
    <span class="lyric-word">que</span>
    <span class="lyric-word">le</span>
    <span class="lyric-word">design</span>
    <span class="lyric-word">n'est</span>
    <span class="lyric-word">pas</span>
    <span class="lyric-word">décoratif</span>
    <span class="lyric-word">—</span>
    <span class="lyric-word">c'est</span>
    <span class="lyric-word">une</span>
    <span class="lyric-word">force.</span>
    <br class="hidden md:block">
    <span class="lyric-word">Chaque</span>
    <span class="lyric-word">produit</span>
    <span class="lyric-word">que</span>
    <span class="lyric-word">nous</span>
    <span class="lyric-word">créons</span>
    <span class="lyric-word">est</span>
    <span class="lyric-word">pensé</span>
    <span class="lyric-word">pour</span>
    <span class="lyric-word">éveiller</span>
    <span class="lyric-word">la</span>
    <span class="lyric-word">curiosité,</span>
    <span class="lyric-word">avancer</span>
    <br class="hidden md:block">
    <span class="lyric-word">avec</span>
    <span class="lyric-word">intention</span>
    <span class="lyric-word">et</span>
    <span class="lyric-word">frapper</span>
    <span class="lyric-word">juste.</span>
  `.trim();

function replaceVision(html, visionHtml) {
  return html.replace(
    /<h2 id="lyric-container"[\s\S]*?<\/h2>/,
    `<h2 id="lyric-container" class="relative z-10 mx-auto max-w-7xl text-center text-[clamp(2rem,4vw,6rem)] font-black uppercase tracking-[-0.055em] leading-[0.95] text-white">\n${visionHtml}\n  </h2>`,
  );
}

export function applyArabicLocale(html) {
  let out = replaceVision(html, VISION_AR);
  out = applyReplacements(out, ["ar-replacements.json", "ar-replacements-extra.json"]);
  out = out.replace(/<html lang="en">/i, '<html lang="ar" dir="rtl">');
  out = out.replace(/<html lang="en"/i, '<html lang="ar" dir="rtl"');
  out = out.replace(/<title>SMAESI<\/title>/i, "<title>SMAESI — استوديو رقمي</title>");

  const rtlCss = fs.readFileSync(path.join(localesDir, "ar-rtl.css"), "utf8");
  if (!out.includes('id="smaesi-rtl"')) {
    out = out.replace("</head>", `${rtlCss}\n</head>`);
  }

  return out;
}

export function applyFrenchLocale(html) {
  let out = replaceVision(html, VISION_FR);
  out = applyReplacements(out, ["fr-replacements.json", "fr-replacements-extra.json"]);
  out = out.replace(/<html lang="en">/i, '<html lang="fr">');
  out = out.replace(/<html lang="en"/i, '<html lang="fr"');
  out = out.replace(/<title>SMAESI<\/title>/i, "<title>SMAESI — Studio Digital</title>");
  return out;
}
