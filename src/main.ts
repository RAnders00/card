import photos from 'virtual:photos';
import bioMarkdown from '../bio.md?raw';
import rawContent from '../content.toml';
import { attachMotion, PhotoRotator } from './motion';
import { hydrateSite, renderSite } from './render';
import './styles.css';
import { INITIAL_PLACEMENT } from './template.js';
import type { SiteContent } from './types';

const parsedContent = rawContent as SiteContent;
const content: SiteContent = {
  ...parsedContent,
  profile: {
    ...parsedContent.profile,
    bio: bioMarkdown || parsedContent.profile.bio || '',
  },
};
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
