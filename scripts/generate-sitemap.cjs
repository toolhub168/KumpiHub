const fs = require("fs");
const path = require("path");

const toolsDataPath = path.join(
  __dirname,
  "../src/pages/toolsData.jsx"
);

const sitemapPath = path.join(
  __dirname,
  "../public/sitemap.xml"
);

const baseUrl = "https://kumpihub-1.onrender.com";

const toolsData = fs.readFileSync(toolsDataPath, "utf8");

// Get tool slugs from the top-level keys in toolsData.jsx
const slugMatches = [
  ...toolsData.matchAll(/^\s*['"]([^'"]+)['"]\s*:\s*\{/gm),
];

const slugs = [...new Set(slugMatches.map((match) => match[1]))];

const urls = [
  baseUrl,
  ...slugs.map((slug) => `${baseUrl}/tools/${slug}`),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${url}</loc>
  </url>`
  )
  .join("\n")}
</urlset>
`;

fs.writeFileSync(sitemapPath, sitemap, "utf8");

console.log(`Sitemap generated: ${urls.length} URLs`);