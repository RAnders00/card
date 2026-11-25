import photos from 'virtual:photos';
import rawContent from '../content.toml';
import { attachMotion, PhotoRotator } from './motion';
import { renderSite } from './render';
import './styles.css';
import type { SiteContent } from './types';

const content = rawContent as SiteContent;
const app = document.getElementById('app');

if (app) {
  const rotator = new PhotoRotator(photos);
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
