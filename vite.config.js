import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { basename, dirname, extname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { parse as parseToml } from 'smol-toml';
import { defineConfig } from 'vite';

const rootDir = dirname(fileURLToPath(import.meta.url));
const VIRTUAL_PHOTOS_ID = 'virtual:photos';
const RESOLVED_VIRTUAL_PHOTOS_ID = `\0${VIRTUAL_PHOTOS_ID}`;

const TARGET_WIDTHS = [320, 640, 960];
const PHOTO_SIZES_ATTR = '(max-width: 780px) 254px, 286px';

function readToml(relativePath) {
  return parseToml(readFileSync(resolve(rootDir, relativePath), 'utf8'));
}

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function normalizePhotoFile(file) {
  return file.replace(/^\.?\//, '').replace(/^photos\//, '');
}

function getPreviewPhotoFile(photosConfig) {
  const first = photosConfig.photos?.[0]?.file ?? 'headshot.jpg';
  return normalizePhotoFile(first);
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

function pickWidths(sourceWidth) {
  if (!sourceWidth) return TARGET_WIDTHS;
  const filtered = TARGET_WIDTHS.filter((w) => w <= sourceWidth);
  if (filtered.length === 0) return [sourceWidth];
  return filtered;
}

async function encodeVariant(photoPath, width, format) {
  const pipeline = sharp(photoPath)
    .rotate()
    .resize({ width, withoutEnlargement: true });

  if (format === 'avif') {
    return pipeline.avif({ quality: 52, effort: 5 }).toBuffer();
  }
  if (format === 'webp') {
    return pipeline.webp({ quality: 78, effort: 4 }).toBuffer();
  }
  return pipeline.jpeg({ quality: 82, mozjpeg: true }).toBuffer();
}

function contentHash(buffer) {
  return createHash('sha256').update(buffer).digest('hex').slice(0, 8);
}

/**
 * Loads .toml imports, optimizes photos into responsive AVIF/WebP/JPEG variants
 * via sharp, injects SEO/OpenGraph metadata into index.html, and emits an
 * optimized static OpenGraph preview image.
 */
function siteContentPlugin() {
  let isBuild = false;
  let basePath = '/';
  const devCache = new Map();

  return {
    name: 'site-content-plugin',
    configResolved(config) {
      isBuild = config.command === 'build';
      basePath = config.base.endsWith('/') ? config.base : `${config.base}/`;
    },
    resolveId(id) {
      if (id === VIRTUAL_PHOTOS_ID) {
        return RESOLVED_VIRTUAL_PHOTOS_ID;
      }
      return null;
    },
    async load(id) {
      if (id !== RESOLVED_VIRTUAL_PHOTOS_ID) return null;

      const photosTomlPath = resolve(rootDir, 'photos.toml');
      this.addWatchFile(photosTomlPath);

      const photosConfig = readToml('photos.toml');
      const photographers = photosConfig.photographers ?? {};
      const entries = photosConfig.photos ?? [];

      const resolvedPhotos = await Promise.all(
        entries.map(async (entry) => {
          const fileName = normalizePhotoFile(entry.file);
          const photoPath = resolve(rootDir, 'photos', fileName);
          this.addWatchFile(photoPath);

          const photographer = photographers[entry.photographer];
          if (!photographer) {
            this.warn(
              `[photos.toml] Unknown photographer "${entry.photographer}" for "${fileName}". Define it under [photographers.${entry.photographer}].`,
            );
          }

          const meta = await sharp(photoPath).rotate().metadata();
          const origWidth = meta.width ?? 640;
          const origHeight = meta.height ?? 640;
          const widths = pickWidths(origWidth);
          const fallbackWidth = widths[widths.length - 1];
          const outHeight = Math.round((origHeight / origWidth) * fallbackWidth);

          let avifSrcset = '';
          let webpSrcset = '';
          let jpgSrcset = '';
          let fallbackSrc = '';

          if (isBuild) {
            const stem = basename(fileName, extname(fileName));
            const formatSets = { avif: [], webp: [], jpg: [] };

            await Promise.all(
              widths.flatMap((w) =>
                ['avif', 'webp', 'jpg'].map(async (fmt) => {
                  const buf = await encodeVariant(photoPath, w, fmt);
                  const hash = contentHash(buf);
                  const emittedName = `assets/${stem}-${w}w-${hash}.${fmt}`;
                  this.emitFile({
                    type: 'asset',
                    fileName: emittedName,
                    source: buf,
                  });
                  const url = `${basePath}${emittedName}`;
                  formatSets[fmt].push({ w, url });
                }),
              ),
            );

            for (const fmt of ['avif', 'webp', 'jpg']) {
              formatSets[fmt].sort((a, b) => a.w - b.w);
            }

            avifSrcset = formatSets.avif
              .map(({ url, w }) => `${url} ${w}w`)
              .join(', ');
            webpSrcset = formatSets.webp
              .map(({ url, w }) => `${url} ${w}w`)
              .join(', ');
            jpgSrcset = formatSets.jpg
              .map(({ url, w }) => `${url} ${w}w`)
              .join(', ');
            fallbackSrc = formatSets.jpg[formatSets.jpg.length - 1].url;
          } else {
            const makeDevUrl = (w, fmt) =>
              `/__opt-photo?file=${encodeURIComponent(fileName)}&w=${w}&fmt=${fmt}`;

            avifSrcset = widths
              .map((w) => `${makeDevUrl(w, 'avif')} ${w}w`)
              .join(', ');
            webpSrcset = widths
              .map((w) => `${makeDevUrl(w, 'webp')} ${w}w`)
              .join(', ');
            jpgSrcset = widths
              .map((w) => `${makeDevUrl(w, 'jpg')} ${w}w`)
              .join(', ');
            fallbackSrc = makeDevUrl(fallbackWidth, 'jpg');
          }

          return {
            src: fallbackSrc,
            srcset: jpgSrcset,
            sizes: PHOTO_SIZES_ATTR,
            sources: {
              avif: avifSrcset,
              webp: webpSrcset,
            },
            width: fallbackWidth,
            height: outHeight,
            alt: entry.alt,
            photographerName: photographer?.name ?? entry.photographer,
            photographerUrl: photographer?.url?.trim() ?? '',
            sourceUrl: entry.source?.trim() ?? '',
          };
        }),
      );

      return `export default ${JSON.stringify(resolvedPhotos)};`;
    },
    configureServer(server) {
      server.middlewares.use('/__opt-photo', async (req, res, next) => {
        try {
          const url = new URL(req.url ?? '', 'http://localhost');
          const file = normalizePhotoFile(url.searchParams.get('file') ?? '');
          const width = Number(url.searchParams.get('w')) || 640;
          const fmt = url.searchParams.get('fmt') || 'jpg';

          if (!file || file.includes('..') || !['avif', 'webp', 'jpg'].includes(fmt)) {
            res.statusCode = 400;
            res.end('Invalid image request');
            return;
          }

          const photoPath = resolve(rootDir, 'photos', file);
          if (!existsSync(photoPath)) {
            res.statusCode = 404;
            res.end('Photo not found');
            return;
          }

          const cacheKey = `${file}:${width}:${fmt}`;
          let buffer = devCache.get(cacheKey);
          if (!buffer) {
            buffer = await encodeVariant(photoPath, width, fmt);
            devCache.set(cacheKey, buffer);
          }

          const mime =
            fmt === 'avif'
              ? 'image/avif'
              : fmt === 'webp'
                ? 'image/webp'
                : 'image/jpeg';
          res.setHeader('Content-Type', mime);
          res.setHeader('Cache-Control', 'public, max-age=3600');
          res.end(buffer);
        } catch (err) {
          next(err);
        }
      });
    },
    handleHotUpdate(ctx) {
      if (ctx.file.endsWith('photos.toml') || ctx.file.includes(`${resolve(rootDir, 'photos')}`)) {
        devCache.clear();
        const mod = ctx.server.moduleGraph.getModuleById(
          RESOLVED_VIRTUAL_PHOTOS_ID,
        );
        if (mod) {
          ctx.server.moduleGraph.invalidateModule(mod);
          return [mod];
        }
      }
      return undefined;
    },
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
    async generateBundle() {
      const photosConfig = readToml('photos.toml');
      const previewFile = getPreviewPhotoFile(photosConfig);
      const photoPath = resolve(rootDir, 'photos', previewFile);
      if (existsSync(photoPath)) {
        const optimizedOg = await sharp(photoPath)
          .rotate()
          .resize({
            width: 1200,
            height: 1200,
            fit: 'inside',
            withoutEnlargement: true,
          })
          .jpeg({ quality: 82, mozjpeg: true })
          .toBuffer();

        this.emitFile({
          type: 'asset',
          fileName: previewFile,
          source: optimizedOg,
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
