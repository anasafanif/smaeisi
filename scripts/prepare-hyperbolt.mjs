import fs from "node:fs";
import path from "node:path";
import { WHATSAPP_NUMBER } from "./site-config.mjs";
import { applyArabicLocale, applyFrenchLocale } from "./apply-locale.mjs";

const root = path.resolve(import.meta.dirname, "..");
const input = path.join(root, "hyperbolt-template.html");
const outDir = path.join(root, "public", "hyperbolt");
const outputEn = path.join(outDir, "index.html");
const outputArDir = path.join(outDir, "ar");
const outputAr = path.join(outputArDir, "index.html");
const outputFrDir = path.join(outDir, "fr");
const outputFr = path.join(outputFrDir, "index.html");

function sanitize(html) {
  let out = html;
  out = out.replace(/<script id="aura-supabase-token-firewall">[\s\S]*?<\/script>\s*/i, "");
  out = out.replace(/<script async="" src="https:\/\/www\.googletagmanager\.com[\s\S]*?<\/script>\s*/gi, "");
  out = out.replace(/<script>\s*window\.dataLayer[\s\S]*?gtag\("config"[\s\S]*?<\/script>\s*/gi, "");
  out = out.replace(/<script type="text\/javascript" async="" src="https:\/\/googleads\.g\.doubleclick\.net[\s\S]*?<\/script>/gi, "");
  out = out.replace(/<style id="aura-share-responsive-guards">[\s\S]*?<\/style>\s*/i, "");
  out = out.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>\s*/gi, "");
  out = out.replace(/\s*data-lyric-init="true"/g, "");
  out = out.replace(/aria-label="Hyperbolt Studio home"/g, 'aria-label="SMAESI Studio home"');
  out = out.replace(/>\s*HYPERBOLT\s*</g, ">smaesi<");
  out = out.replace(/<title>[^<]*<\/title>/i, "<title>SMAESI</title>");

  if (!out.includes('rel="icon"')) {
    out = out.replace(
      /<head>/i,
      '<head>\n<link rel="icon" href="/favicon.svg" type="image/svg+xml">',
    );
  }

  if (!out.includes("<title>")) {
    out = out.replace(/<head>/i, '<head>\n    <title>SMAESI</title>');
  }

  out = out.replace(/212622905838/g, WHATSAPP_NUMBER);
  return out;
}

const html = sanitize(fs.readFileSync(input, "utf8"));

fs.mkdirSync(outDir, { recursive: true });
fs.mkdirSync(outputArDir, { recursive: true });
fs.mkdirSync(outputFrDir, { recursive: true });

fs.writeFileSync(outputEn, html, "utf8");
console.log(`Wrote ${outputEn} (${html.length} bytes)`);

const htmlAr = applyArabicLocale(html);
fs.writeFileSync(outputAr, htmlAr, "utf8");
console.log(`Wrote ${outputAr} (${htmlAr.length} bytes)`);

const htmlFr = applyFrenchLocale(html);
fs.writeFileSync(outputFr, htmlFr, "utf8");
console.log(`Wrote ${outputFr} (${htmlFr.length} bytes)`);
