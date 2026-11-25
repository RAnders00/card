import {
  type PolaroidPlacement,
  renderBioHtml,
  renderBioPlainText,
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
 * Updates live document metadata and `{age}` bio HTML on pre-rendered HTML
 * without replacing unrelated DOM nodes.
 */
export function hydrateSite(root: HTMLElement, content: SiteContent): void {
  const rawBio = content.profile.bio ?? '';
  const resolvedBioText = renderBioPlainText(rawBio, content.profile.birthday);
  const resolvedBioHtml = renderBioHtml(rawBio, content.profile.birthday);

  document.title = content.meta.title;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute('content', resolvedBioText);
  }

  const bioEl = root.querySelector<HTMLElement>('.profile-bio');
  if (bioEl && bioEl.innerHTML !== resolvedBioHtml) {
    bioEl.innerHTML = resolvedBioHtml;
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
  const resolvedBioText = renderBioPlainText(
    content.profile.bio ?? '',
    content.profile.birthday,
  );

  document.title = content.meta.title;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute('content', resolvedBioText);
  }

  root.innerHTML = renderSiteHtml(content, initialPhoto, initialPlacement);
}
