import photos from 'virtual:photos';
import rawContent from '../content.toml';
import { attachMotion, PhotoRotator } from './motion';
import { hydrateSite, renderSite } from './render';
import './styles.css';
import { INITIAL_PLACEMENT } from './template.js';
import type { SiteContent } from './types';

const content = rawContent as SiteContent;
const app = document.getElementById('app');

if (app) {
  const rotator = new PhotoRotator(photos);
  const initialPhoto = rotator.initial();

  if (app.querySelector('.photobooth-stage')) {
    hydrateSite(app, content);
  } else {
    renderSite(app, content, initialPhoto, INITIAL_PLACEMENT);
  }

  attachMotion(app, rotator, INITIAL_PLACEMENT.rotateDeg);
}
