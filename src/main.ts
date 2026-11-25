import rawContent from '../content.toml';
import rawPhotosConfig from '../photos.toml';
import { attachMotion, PhotoRotator } from './motion';
import { renderSite } from './render';
import './styles.css';
import type { PhotosConfig, ResolvedPhoto, SiteContent } from './types';

const content = rawContent as SiteContent;
const photosConfig = rawPhotosConfig as PhotosConfig;

// Bundle all images placed in the photos/ directory via Vite
const photoAssets = import.meta.glob('../photos/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

function resolveAssetUrl(file: string): string {
  const normalized = file.replace(/^\.?\//, '').replace(/^photos\//, '');
  const matchedKey = Object.keys(photoAssets).find(
    (key) => key.endsWith(`/${normalized}`) || key === `../photos/${normalized}`,
  );
  return matchedKey ? photoAssets[matchedKey] : `/photos/${normalized}`;
}

function buildPhotoPool(): ResolvedPhoto[] {
  const photographers = photosConfig.photographers ?? {};

  return photosConfig.photos.map((entry) => {
    const photographer = photographers[entry.photographer];
    if (!photographer) {
      console.warn(
        `[photos.toml] Unknown photographer "${entry.photographer}" for "${entry.file}". Define it under [photographers.${entry.photographer}].`,
      );
    }
    return {
      src: resolveAssetUrl(entry.file),
      alt: entry.alt,
      photographerName: photographer?.name ?? entry.photographer,
      photographerUrl: photographer?.url?.trim() ?? '',
      sourceUrl: entry.source?.trim() ?? '',
    };
  });
}

const app = document.getElementById('app');

if (app) {
  const pool = buildPhotoPool();
  const rotator = new PhotoRotator(pool);
  const initialPhoto = rotator.initial();
  const initialPlacement = {
    rotateDeg: -1.4,
    offsetX: 0,
    offsetY: 0,
    dropSpinDeg: 0,
    dropX: 0,
  };

  renderSite(app, content, initialPhoto, initialPlacement);
  attachMotion(app, rotator, initialPlacement.rotateDeg);
}
