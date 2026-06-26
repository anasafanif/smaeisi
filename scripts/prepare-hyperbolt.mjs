import fs from "node:fs";
import path from "node:path";
import { WHATSAPP_NUMBER } from "./site-config.mjs";

const root = path.resolve(import.meta.dirname, "..");
const input = path.join(root, "hyperbolt-template.html");
const outDir = path.join(root, "public", "hyperbolt");
const output = path.join(outDir, "index.html");

let html = fs.readFileSync(input, "utf8");

html = html.replace(/<script id="aura-supabase-token-firewall">[\s\S]*?<\/script>\s*/i, "");
html = html.replace(/<script async="" src="https:\/\/www\.googletagmanager\.com[\s\S]*?<\/script>\s*/gi, "");
html = html.replace(/<script>\s*window\.dataLayer[\s\S]*?gtag\("config"[\s\S]*?<\/script>\s*/gi, "");
html = html.replace(/<script type="text\/javascript" async="" src="https:\/\/googleads\.g\.doubleclick\.net[\s\S]*?<\/script>/gi, "");
html = html.replace(/<style id="aura-share-responsive-guards">[\s\S]*?<\/style>\s*/i, "");
html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>\s*/gi, "");
html = html.replace(/\s*data-lyric-init="true"/g, "");
html = html.replace(/aria-label="Hyperbolt Studio home"/g, 'aria-label="SMAESI Studio home"');
html = html.replace(/>\s*HYPERBOLT\s*</g, ">smaesi<");
html = html.replace(/<title>[^<]*<\/title>/i, "<title>SMAESI</title>");

if (!html.includes('rel="icon"')) {
  html = html.replace(
    /<head>/i,
    '<head>\n<link rel="icon" href="/favicon.svg" type="image/svg+xml">',
  );
}

if (!html.includes("<title>")) {
  html = html.replace(
    /<head>/i,
    '<head>\n    <title>Hyperbolt Digital</title>',
  );
}

html = html.replace(/212622905838/g, WHATSAPP_NUMBER);

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(output, html, "utf8");
console.log(`Wrote ${output} (${html.length} bytes)`);
