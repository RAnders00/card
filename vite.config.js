import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse as parseToml } from 'smol-toml';
import { defineConfig } from 'vite';

const rootDir = dirname(fileURLToPath(import.meta.url));

function readToml(relativePath) {
  return parseToml(readFileSync(resolve(rootDir, relativePath), 'utf8'));
}

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function getPreviewPhotoFile(photosConfig) {
  const first = photosConfig.photos?.[0]?.file ?? 'headshot.jpg';
  return first.replace(/^\.?\//, '').replace(/^photos\//, '');
}

function formatBioText(bio, birthday) {
  if (!bio.includes('{age}') || !birthday) return bio;
  const raw =
    birthday instanceof Date
      ? birthday.toISOString()
      : typeof birthday === 'string'
        ? birthday
        : '';
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(raw.trim());
  if (!match) return bio;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  if (month < 1 || month > 12 || day < 1 || day > 31) return bio;

  const now = new Date();
  let age = now.getFullYear() - year;
  const currentMonth = now.getMonth() + 1;
  const currentDay = now.getDate();
  if (currentMonth < month || (currentMonth === month && currentDay < day)) {
    age -= 1;
  }
  return age >= 0 ? bio.replaceAll('{age}', String(age)) : bio;
}

/**
 * Loads .toml imports at build time, injects SEO/OpenGraph metadata from
 * content.toml + photos.toml into index.html, and emits the primary preview
 * photo so static meta tags (e.g. og:image) resolve cleanly.
 */
function siteContentPlugin() {
  return {
    name: 'site-content-plugin',
    transform(code, id) {
      if (!id.endsWith('.toml')) return null;
      return {
        code: `export default ${JSON.stringify(parseToml(code))};`,
        map: null,
      };
    },
    transformIndexHtml(html) {
      const content = readToml('content.toml');
      const photosConfig = readToml('photos.toml');
      const title = content.meta.title;
      const description = formatBioText(
        content.profile.bio,
        content.profile.birthday,
      );
      const baseUrl = content.meta.url.replace(/\/$/, '');
      const previewFile = getPreviewPhotoFile(photosConfig);
      const imageUrl = `${baseUrl}/${previewFile}`;

      return {
        html: html.replace(
          /<title>.*?<\/title>/s,
          `<title>${escapeHtml(title)}</title>`,
        ),
        tags: [
          {
            tag: 'meta',
            attrs: { name: 'description', content: description },
            injectTo: 'head',
          },
          {
            tag: 'meta',
            attrs: { property: 'og:type', content: 'website' },
            injectTo: 'head',
          },
          {
            tag: 'meta',
            attrs: { property: 'og:url', content: `${baseUrl}/` },
            injectTo: 'head',
          },
          {
            tag: 'meta',
            attrs: { property: 'og:title', content: title },
            injectTo: 'head',
          },
          {
            tag: 'meta',
            attrs: { property: 'og:description', content: description },
            injectTo: 'head',
          },
          {
            tag: 'meta',
            attrs: { property: 'og:image', content: imageUrl },
            injectTo: 'head',
          },
          {
            tag: 'meta',
            attrs: { name: 'twitter:card', content: 'summary_large_image' },
            injectTo: 'head',
          },
          {
            tag: 'meta',
            attrs: { name: 'twitter:title', content: title },
            injectTo: 'head',
          },
          {
            tag: 'meta',
            attrs: { name: 'twitter:description', content: description },
            injectTo: 'head',
          },
          {
            tag: 'meta',
            attrs: { name: 'twitter:image', content: imageUrl },
            injectTo: 'head',
          },
          {
            tag: 'link',
            attrs: { rel: 'canonical', href: `${baseUrl}/` },
            injectTo: 'head',
          },
        ],
      };
    },
    generateBundle() {
      const photosConfig = readToml('photos.toml');
      const previewFile = getPreviewPhotoFile(photosConfig);
      const photoPath = resolve(rootDir, 'photos', previewFile);
      if (existsSync(photoPath)) {
        this.emitFile({
          type: 'asset',
          fileName: previewFile,
          source: readFileSync(photoPath),
        });
      }
    },
  };
}

export default defineConfig({
  base: '/',
  plugins: [siteContentPlugin()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
