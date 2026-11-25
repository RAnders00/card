import { formatBio } from './bio';
import { getPlatformIcon, UI_ICONS } from './icons';
import type { ResolvedPhoto, SiteContent } from './types';

function createEl<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className?: string,
  text?: string,
): HTMLElementTagNameMap[K] {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text !== undefined) el.textContent = text;
  return el;
}

export interface PolaroidPlacement {
  rotateDeg: number;
  offsetX: number;
  offsetY: number;
  dropSpinDeg: number;
  dropX: number;
}

/**
 * Creates a single Polaroid DOM card for the stack.
 */
export function createPolaroidCard(
  photo: ResolvedPhoto,
  placement: PolaroidPlacement,
  isInitial = false,
): HTMLElement {
  const figure = createEl(
    'figure',
    isInitial ? 'polaroid-card is-top' : 'polaroid-card is-top is-dropping',
  );
  figure.style.setProperty('--card-rotate', `${placement.rotateDeg.toFixed(2)}deg`);
  figure.style.setProperty('--card-tx', `${placement.offsetX.toFixed(1)}px`);
  figure.style.setProperty('--card-ty', `${placement.offsetY.toFixed(1)}px`);
  figure.style.setProperty('--drop-spin', `${placement.dropSpinDeg.toFixed(2)}deg`);
  figure.style.setProperty('--drop-x', `${placement.dropX.toFixed(1)}px`);

  const photoBtn = createEl('button', 'polaroid-photo-btn');
  photoBtn.type = 'button';
  photoBtn.setAttribute('aria-label', `${photo.alt} — click for another photo`);

  const viewport = createEl('span', 'polaroid-viewport');
  const img = createEl('img', 'polaroid-img');
  img.src = photo.src;
  img.alt = photo.alt;
  img.decoding = 'async';
  img.loading = 'eager';

  const sheen = createEl('span', 'polaroid-sheen');
  sheen.setAttribute('aria-hidden', 'true');

  viewport.append(img, sheen);
  photoBtn.appendChild(viewport);

  const caption = createEl('figcaption', 'polaroid-caption');

  const credit = createEl('span', 'polaroid-credit');
  credit.append(document.createTextNode('Photo credit: '));

  if (photo.photographerUrl) {
    const creditLink = createEl('a', 'polaroid-link polaroid-credit__link');
    creditLink.href = photo.photographerUrl;
    creditLink.target = '_blank';
    creditLink.rel = 'noopener noreferrer';
    creditLink.append(createEl('span', undefined, photo.photographerName));

    const icon = createEl('span', 'external-icon');
    icon.innerHTML = UI_ICONS.externalTab;
    creditLink.appendChild(icon);

    credit.appendChild(creditLink);
  } else {
    credit.append(createEl('span', 'polaroid-credit__name', photo.photographerName));
  }

  caption.appendChild(credit);

  if (photo.sourceUrl) {
    const postLink = createEl('a', 'polaroid-link polaroid-post-link');
    postLink.href = photo.sourceUrl;
    postLink.target = '_blank';
    postLink.rel = 'noopener noreferrer';
    postLink.append(createEl('span', undefined, 'View post'));

    const icon = createEl('span', 'external-icon');
    icon.innerHTML = UI_ICONS.externalTab;
    postLink.appendChild(icon);

    caption.appendChild(postLink);
  }

  figure.append(photoBtn, caption);
  return figure;
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

  root.replaceChildren();

  const stage = createEl('div', 'photobooth-stage');

  // Ambient subtle background light washes
  const ambiance = createEl('div', 'ambient-backdrop');
  ambiance.setAttribute('aria-hidden', 'true');
  ambiance.append(
    createEl('span', 'ambient-orb ambient-orb--warm'),
    createEl('span', 'ambient-orb ambient-orb--maroon'),
    createEl('span', 'film-grain'),
  );
  stage.appendChild(ambiance);

  const card = createEl('main', 'booth-card');
  card.setAttribute('aria-label', `${content.profile.name} profile card`);

  const grid = createEl('div', 'booth-grid');

  // --- Left Column: Polaroid Stack ---
  const photoColumn = createEl('section', 'photo-column');
  photoColumn.setAttribute('aria-label', 'Photos');

  const stageWrap = createEl('div', 'polaroid-stage-wrap');

  const stack = createEl('div', 'polaroid-stack');
  stack.appendChild(createPolaroidCard(initialPhoto, initialPlacement, true));

  const pawGuide = createEl('div', 'paw-guide');
  pawGuide.setAttribute('aria-hidden', 'true');
  const pawRipple = createEl('span', 'paw-guide__ripple');
  const pawSprite = createEl('span', 'paw-guide__paw');
  pawSprite.innerHTML = UI_ICONS.lynxPaw;
  pawGuide.append(pawRipple, pawSprite);

  stageWrap.append(stack, pawGuide);

  const tapHint = createEl('p', 'tap-hint');
  tapHint.setAttribute('aria-live', 'polite');
  const tapHintIcon = createEl('span', 'tap-hint__icon');
  tapHintIcon.innerHTML = UI_ICONS.miniPaw;
  const tapHintText = createEl('span', 'tap-hint__text', 'Tap photo for more');
  tapHint.append(tapHintIcon, tapHintText);

  photoColumn.append(stageWrap, tapHint);

  // --- Right Column: Identity, Bio, & Links ---
  const infoColumn = createEl('section', 'info-column');

  const header = createEl('header', 'profile-header');
  header.style.setProperty('--stagger', '1');

  const nameHeading = createEl('h1', 'profile-name', content.profile.name);
  const bio = createEl('p', 'profile-bio', resolvedBio);

  header.append(nameHeading, bio);

  const linksNav = createEl('nav', 'links-nav');
  linksNav.setAttribute('aria-label', 'Social links');

  const linksList = createEl('ul', 'links-list');

  content.links.forEach((link, index) => {
    const li = createEl('li', 'link-item');
    li.style.setProperty('--stagger', String(index + 2));

    const anchor = createEl('a', 'link-anchor');
    anchor.href = link.url;
    anchor.target = '_blank';
    anchor.rel = 'noopener noreferrer';

    const iconBox = createEl('span', 'link-icon');
    iconBox.innerHTML = getPlatformIcon(link.platform);

    const meta = createEl('span', 'link-meta');
    meta.append(
      createEl('span', 'link-label', link.label),
      createEl('span', 'link-handle', link.handle),
    );

    const arrow = createEl('span', 'link-arrow');
    arrow.innerHTML = UI_ICONS.arrowUpRight;

    anchor.append(iconBox, meta, arrow);

    const copyBtn = createEl('button', 'copy-btn');
    copyBtn.type = 'button';
    copyBtn.dataset.copyValue = link.handle;
    copyBtn.setAttribute('aria-label', `Copy ${link.label} handle ${link.handle}`);
    copyBtn.title = `Copy ${link.handle}`;
    copyBtn.innerHTML = `<span class="copy-btn__icon">${UI_ICONS.copy}</span><span class="copy-btn__done">${UI_ICONS.check}</span>`;

    li.append(anchor, copyBtn);
    linksList.appendChild(li);
  });

  linksNav.appendChild(linksList);
  infoColumn.append(header, linksNav);

  grid.append(photoColumn, infoColumn);
  card.appendChild(grid);
  stage.appendChild(card);
  root.appendChild(stage);
}
