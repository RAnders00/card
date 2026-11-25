import {
  formatBio,
  type PolaroidPlacement,
  renderPolaroidCardHtml,
  renderSiteHtml,
} from './template.js';
import type { ResolvedPhoto, SiteContent } from './types';

export type { PolaroidPlacement };

/**
 * Creates a single Polaroid DOM card for the stack.
 */
export function createPolaroidCard(
  photo: ResolvedPhoto,
  placement: PolaroidPlacement,
  isInitial = false,
): HTMLElement {
  const tpl = document.createElement('template');
  tpl.innerHTML = renderPolaroidCardHtml(photo, placement, isInitial);
  return tpl.content.firstElementChild as HTMLElement;
}

/**
 * Updates live document metadata and `{age}` bio text on pre-rendered HTML
 * without replacing existing DOM nodes.
 */
export function hydrateSite(root: HTMLElement, content: SiteContent): void {
  const resolvedBio = formatBio(content.profile.bio, content.profile.birthday);

  document.title = content.meta.title;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute('content', resolvedBio);
  }

  const bioEl = root.querySelector<HTMLElement>('.profile-bio');
  if (bioEl && bioEl.textContent !== resolvedBio) {
    bioEl.textContent = resolvedBio;
  }
}

/**
 * Renders the single-page Carrd-style site strictly from SiteContent + initial Polaroid.
 */
export function renderSite(
  root: HTMLElement,
  content: SiteContent,
  initialPhoto: ResolvedPhoto,
  initialPlacement: PolaroidPlacement,
): void {
  const resolvedBio = formatBio(content.profile.bio, content.profile.birthday);

  document.title = content.meta.title;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute('content', resolvedBio);
  }

  root.innerHTML = renderSiteHtml(content, initialPhoto, initialPlacement);
}
