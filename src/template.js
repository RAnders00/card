export const INITIAL_PLACEMENT = {
  rotateDeg: -1.4,
  offsetX: 0,
  offsetY: 0,
  dropSpinDeg: 0,
  dropX: 0,
};

export const PLATFORM_ICONS = {
  x: `<svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>`,

  bluesky: `<svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
    <path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.275-.039.415-.056-.138.022-.276.04-.415.056-3.912.58-7.387 2.005-2.83 7.078 5.013 5.19 6.87-1.113 7.823-4.308.953 3.195 2.05 9.271 7.733 4.308 4.267-4.308 1.172-6.498-2.74-7.078a8.74 8.74 0 0 1-.415-.056c.14.017.279.036.415.056 2.67.297 5.568-.628 6.383-3.364.246-.828.624-5.79.624-6.478 0-.69-.139-1.861-.902-2.206-.659-.298-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8"/>
  </svg>`,

  furtrack: `<svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
    <defs>
      <g id="ft-paw">
        <path d="M-0.9 0.55c0-0.48 0.42-0.88 0.9-0.88s0.9 0.4 0.9 0.88c0 0.34-0.25 0.55-0.55 0.52-0.16-0.02-0.23-0.1-0.35-0.1s-0.19 0.08-0.35 0.1c-0.3 0.03-0.55-0.18-0.55-0.52Z"/>
        <ellipse cx="-0.95" cy="-0.4" rx="0.26" ry="0.38" transform="rotate(-18 -0.95 -0.4)"/>
        <ellipse cx="-0.36" cy="-0.85" rx="0.25" ry="0.4" transform="rotate(-6 -0.36 -0.85)"/>
        <ellipse cx="0.36" cy="-0.85" rx="0.25" ry="0.4" transform="rotate(6 0.36 -0.85)"/>
        <ellipse cx="0.95" cy="-0.4" rx="0.26" ry="0.38" transform="rotate(18 0.95 -0.4)"/>
      </g>
    </defs>
    <path d="M8.1 3.4h7.4l-.8 2.25H8.35c-.7 0-.98.35-1.25 1.2l-1.2 3.4h6.45l-.8 2.25H5.5L3.1 19.5H.55L4.5 8.1C5.35 5.6 6.1 3.4 8.1 3.4Z"/>
    <use href="#ft-paw" transform="translate(15.0 16.3) scale(1.05)"/>
    <use href="#ft-paw" transform="translate(17.3 19.4) scale(1.05)"/>
    <use href="#ft-paw" transform="translate(16.6 11.1) scale(1.05)"/>
    <use href="#ft-paw" transform="translate(18.8 14.3) scale(1.05)"/>
    <use href="#ft-paw" transform="translate(18.2 6.4) scale(1.05)"/>
    <use href="#ft-paw" transform="translate(20.4 9.8) scale(1.05)"/>
    <use href="#ft-paw" transform="translate(21.8 4.7) scale(1.05)"/>
  </svg>`,

  instagram: `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">
    <rect x="2.75" y="2.75" width="18.5" height="18.5" rx="5.2"/>
    <circle cx="12" cy="12" r="4.1"/>
    <circle cx="17.4" cy="6.6" r="1.15" fill="currentColor" stroke="none"/>
  </svg>`,

  telegram: `<svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
    <path d="M21.43 3.74a1.15 1.15 0 0 0-1.18-.15L2.77 10.67c-.96.39-.93 1.76.05 2.11l4.38 1.54 1.73 5.42c.25.79 1.24.99 1.77.36l2.46-2.94 4.61 3.4c.69.51 1.68.13 1.85-.71L21.97 4.9a1.15 1.15 0 0 0-.54-1.16ZM9.53 13.73l8.67-5.58-6.82 6.84-.27 2.97-1.29-4.03-.29-.2Z"/>
  </svg>`,

  default: `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
  </svg>`,
};

export const UI_ICONS = {
  arrowUpRight: `<svg viewBox="0 0 20 20" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">
    <path d="M6 14 14 6M8 6h6v6"/>
  </svg>`,
  externalTab: `<svg viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M11.5 8.5v3.75A1.25 1.25 0 0 1 10.25 13.5h-6.5A1.25 1.25 0 0 1 2.5 12.25v-6.5A1.25 1.25 0 0 1 3.75 4.5H7.5"/>
    <path d="M10 2.5h3.5V6"/>
    <path d="M7.25 8.75 13.5 2.5"/>
  </svg>`,
  copy: `<svg viewBox="0 0 20 20" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
    <rect x="7" y="7" width="9.5" height="9.5" rx="2"/>
    <path d="M4.5 13H4a1.5 1.5 0 0 1-1.5-1.5V4A1.5 1.5 0 0 1 4 2.5h7.5A1.5 1.5 0 0 1 13 4v.5"/>
  </svg>`,
  check: `<svg viewBox="0 0 20 20" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round">
    <path d="m4.5 10.5 3.6 3.6 7.4-8.2"/>
  </svg>`,
  miniPaw: `<svg viewBox="0 0 20 20" aria-hidden="true" fill="currentColor">
    <path d="M10 15.8c-2.6 0-4.2-1.5-4.2-3.2 0-1.5 1.7-3.6 4.2-3.6s4.2 2.1 4.2 3.6c0 1.7-1.6 3.2-4.2 3.2Z"/>
    <ellipse cx="5.4" cy="8.4" rx="1.35" ry="1.85" transform="rotate(-18 5.4 8.4)"/>
    <ellipse cx="8.4" cy="5.8" rx="1.3" ry="1.95" transform="rotate(-6 8.4 5.8)"/>
    <ellipse cx="11.6" cy="5.8" rx="1.3" ry="1.95" transform="rotate(6 11.6 5.8)"/>
    <ellipse cx="14.6" cy="8.4" rx="1.35" ry="1.85" transform="rotate(18 14.6 8.4)"/>
  </svg>`,
  lynxPaw: `<svg viewBox="0 0 64 64" aria-hidden="true" fill="currentColor">
    <path d="M16.5 45.2 C16.5 36.8 23.4 30.8 32 30.8 C40.6 30.8 47.5 36.8 47.5 45.2 C47.5 51.6 42.4 55.6 37.3 54.7 C35 54.3 33.6 53 32 53 C30.4 53 29 54.3 26.7 54.7 C21.6 55.6 16.5 51.6 16.5 45.2 Z"/>
    <ellipse cx="13.5" cy="27.5" rx="5.4" ry="8" transform="rotate(-22 13.5 27.5)"/>
    <ellipse cx="25.2" cy="16.2" rx="5.4" ry="8.4" transform="rotate(-7 25.2 16.2)"/>
    <ellipse cx="38.8" cy="16.2" rx="5.4" ry="8.4" transform="rotate(7 38.8 16.2)"/>
    <ellipse cx="50.5" cy="27.5" rx="5.4" ry="8" transform="rotate(22 50.5 27.5)"/>
  </svg>`,
  pause: `<svg viewBox="0 0 16 16" aria-hidden="true" fill="currentColor">
    <rect x="3.5" y="2.8" width="3" height="10.4" rx="1"/>
    <rect x="9.5" y="2.8" width="3" height="10.4" rx="1"/>
  </svg>`,
  play: `<svg viewBox="0 0 16 16" aria-hidden="true" fill="currentColor">
    <path d="M4.6 2.9a.75.75 0 0 1 1.13-.64l7.6 4.6a.75.75 0 0 1 0 1.28l-7.6 4.6a.75.75 0 0 1-1.13-.64V2.9Z"/>
  </svg>`,
  moon: `<svg viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
    <path d="M13.2 9.8A5.4 5.4 0 0 1 6.2 2.8a5.5 5.5 0 1 0 7 7Z"/>
  </svg>`,
  sun: `<svg viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round">
    <circle cx="8" cy="8" r="2.7"/>
    <path d="M8 1.8v1.3M8 12.9v1.3M1.8 8h1.3M12.9 8h1.3M3.6 3.6l.9.9M11.5 11.5l.9.9M12.4 3.6l-.9.9M4.5 11.5l-.9.9"/>
  </svg>`,
  github: `<svg viewBox="0 0 16 16" aria-hidden="true" fill="currentColor">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z"/>
  </svg>`,
};

export function getPlatformIcon(platform) {
  return PLATFORM_ICONS[platform.toLowerCase()] ?? PLATFORM_ICONS.default;
}

export function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Calculates age in completed years from an ISO 8601 date (YYYY-MM-DD) or Date
 * using local calendar fields to avoid UTC timezone off-by-one shifts.
 */
export function calculateAge(birthday, now = new Date()) {
  if (!birthday) return null;

  const raw =
    birthday instanceof Date
      ? birthday.toISOString()
      : typeof birthday === 'string'
        ? birthday
        : '';
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(raw.trim());
  if (!match) return null;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  if (month < 1 || month > 12 || day < 1 || day > 31) return null;

  let age = now.getFullYear() - year;
  const currentMonth = now.getMonth() + 1;
  const currentDay = now.getDate();

  if (currentMonth < month || (currentMonth === month && currentDay < day)) {
    age -= 1;
  }

  return age >= 0 ? age : null;
}

/**
 * Replaces `{age}` placeholders in the profile bio when a valid birthday is set.
 */
export function formatBio(bio, birthday, now = new Date()) {
  if (!bio.includes('{age}')) return bio;
  const age = calculateAge(birthday, now);
  return age === null ? bio : bio.replaceAll('{age}', String(age));
}

function isSafeUrl(url) {
  const trimmed = url.trim();
  return /^(https?:\/\/|mailto:|\/(?!\/)|\.\/|\.\.\/|#)/i.test(trimmed);
}

function buildAnchorHtml(url, labelHtml, title = '') {
  const trimmed = url.trim();
  if (!isSafeUrl(trimmed)) return labelHtml;

  const isExternal = /^https?:\/\//i.test(trimmed);
  const externalAttrs = isExternal
    ? ' target="_blank" rel="noopener noreferrer"'
    : '';
  const titleAttr = title ? ` title="${escapeHtml(title)}"` : '';
  const iconHtml = isExternal
    ? `<span class="external-icon" aria-hidden="true">${UI_ICONS.externalTab}</span>`
    : '';
  return `<a href="${escapeHtml(trimmed)}"${externalAttrs}${titleAttr}>${labelHtml}${iconHtml}</a>`;
}

function applyEmphasis(escapedText) {
  return escapedText
    .replace(/\*\*([^\s*](?:.*?[^\s*])?)\*\*/g, '<strong>$1</strong>')
    .replace(
      /(^|[^\w])__([^\s_](?:.*?[^\s_])?)__(?=[^\w]|$)/g,
      '$1<strong>$2</strong>',
    )
    .replace(/~~(.+?)~~/g, '<del>$1</del>')
    .replace(/\*([^\s*](?:.*?[^\s*])?)\*/g, '<em>$1</em>')
    .replace(
      /(^|[^\w])_([^\s_](?:.*?[^\s_])?)_(?=[^\w]|$)/g,
      '$1<em>$2</em>',
    );
}

function restoreTokens(text, tokens) {
  return text.replace(/\x00(\d+)\x00/g, (_, idx) => tokens[Number(idx)] ?? '');
}

function renderInlineMarkdown(raw) {
  const tokens = [];
  const stash = (html) => {
    const id = tokens.length;
    tokens.push(html);
    return `\x00${id}\x00`;
  };

  let text = String(raw ?? '').replace(/\x00/g, '');

  // Protect backslash escapes and inline code first
  text = text.replace(/\\([\\`*_{}[\]()#+\-.!~|])/g, (_, ch) =>
    stash(escapeHtml(ch)),
  );
  text = text.replace(/`([^`]+)`/g, (_, code) =>
    stash(`<code>${escapeHtml(code)}</code>`),
  );

  // Markdown links: [label](url) or [label](url "title")
  text = text.replace(
    /\[([^\]]+)\]\(<?((?:[^()\s<>]|\([^()\s<>]*\))+)>?(?:\s+"([^"]*)")?\)/g,
    (_, label, url, title = '') => {
      const labelHtml = restoreTokens(applyEmphasis(escapeHtml(label)), tokens);
      return stash(buildAnchorHtml(url, labelHtml, title));
    },
  );

  // Angle-bracket autolinks: <https://...>
  text = text.replace(/<(https?:\/\/[^\s>]+)>/g, (_, url) =>
    stash(buildAnchorHtml(url, escapeHtml(url))),
  );

  // Bare URL autolinks (keeping trailing sentence punctuation outside <a>)
  text = text.replace(/(^|[\s(])(https?:\/\/[^\s<>"'\x00]+)/g, (full, prefix, rawUrl) => {
    let cleanUrl = rawUrl;
    let trailing = '';

    while (/[.,!?;:]$/.test(cleanUrl)) {
      trailing = cleanUrl.slice(-1) + trailing;
      cleanUrl = cleanUrl.slice(0, -1);
    }
    while (cleanUrl.endsWith(')')) {
      const opens = (cleanUrl.match(/\(/g) ?? []).length;
      const closes = (cleanUrl.match(/\)/g) ?? []).length;
      if (closes > opens) {
        trailing = `)${trailing}`;
        cleanUrl = cleanUrl.slice(0, -1);
      } else {
        break;
      }
    }

    if (!cleanUrl || !/^https?:\/\/\S/i.test(cleanUrl)) return full;
    return `${prefix}${stash(buildAnchorHtml(cleanUrl, escapeHtml(cleanUrl)))}${trailing}`;
  });

  return restoreTokens(applyEmphasis(escapeHtml(text)), tokens);
}

function renderMarkdown(source) {
  const lines = String(source ?? '')
    .replace(/\r\n?/g, '\n')
    .split('\n');
  const blocks = [];
  let i = 0;

  while (i < lines.length) {
    if (lines[i].trim() === '') {
      i += 1;
      continue;
    }

    if (/^\s*[-*+]\s+/.test(lines[i])) {
      const items = [];
      while (i < lines.length && /^\s*[-*+]\s+(.*)$/.test(lines[i])) {
        const match = /^\s*[-*+]\s+(.*)$/.exec(lines[i]);
        items.push(`<li>${renderInlineMarkdown(match[1])}</li>`);
        i += 1;
      }
      blocks.push(`<ul>${items.join('')}</ul>`);
      continue;
    }

    if (/^\s*\d+\.\s+/.test(lines[i])) {
      const items = [];
      while (i < lines.length && /^\s*\d+\.\s+(.*)$/.test(lines[i])) {
        const match = /^\s*\d+\.\s+(.*)$/.exec(lines[i]);
        items.push(`<li>${renderInlineMarkdown(match[1])}</li>`);
        i += 1;
      }
      blocks.push(`<ol>${items.join('')}</ol>`);
      continue;
    }

    if (/^\s*>\s?/.test(lines[i])) {
      const quoteLines = [];
      while (i < lines.length && /^\s*>\s?(.*)$/.test(lines[i])) {
        const match = /^\s*>\s?(.*)$/.exec(lines[i]);
        quoteLines.push(renderInlineMarkdown(match[1]));
        i += 1;
      }
      blocks.push(`<blockquote><p>${quoteLines.join('<br>')}</p></blockquote>`);
      continue;
    }

    const paraLines = [];
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !/^\s*(?:[-*+]|\d+\.)\s+/.test(lines[i]) &&
      !/^\s*>\s?/.test(lines[i])
    ) {
      paraLines.push(renderInlineMarkdown(lines[i]));
      i += 1;
    }
    blocks.push(`<p>${paraLines.join('<br>')}</p>`);
  }

  return blocks.join('');
}

/**
 * Resolves `{age}` and renders the profile bio Markdown as HTML.
 */
export function renderBioHtml(bio, birthday, now = new Date()) {
  return renderMarkdown(formatBio(bio ?? '', birthday, now));
}

/**
 * Resolves `{age}` and strips Markdown syntax from the first paragraph for plain-text metadata tags.
 */
export function renderBioPlainText(bio, birthday, now = new Date()) {
  const formatted = formatBio(bio ?? '', birthday, now);
  const firstParagraph =
    formatted.replace(/\r\n?/g, '\n').trim().split(/\n\s*\n/)[0] ?? '';
  return firstParagraph
    .replace(/^\s*>\s?/gm, '')
    .replace(/^\s*(?:[-*+]|\d+\.)\s+/gm, '')
    .replace(/\[([^\]]+)\]\(<?(?:[^()\s<>]|\([^()\s<>]*\))+>?(?:\s+"[^"]*")?\)/g, '$1')
    .replace(/<(https?:\/\/[^\s>]+)>/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\\([\\`*_{}[\]()#+\-.!~|])/g, '$1')
    .replace(/\*\*([^\s*](?:.*?[^\s*])?)\*\*/g, '$1')
    .replace(/(^|[^\w])__([^\s_](?:.*?[^\s_])?)__(?=[^\w]|$)/g, '$1$2')
    .replace(/~~(.+?)~~/g, '$1')
    .replace(/\*([^\s*](?:.*?[^\s*])?)\*/g, '$1')
    .replace(/(^|[^\w])_([^\s_](?:.*?[^\s_])?)_(?=[^\w]|$)/g, '$1$2')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Renders a single Polaroid card as HTML for both build-time pre-rendering and runtime stack drops.
 */
export function renderPolaroidCardHtml(photo, placement, isInitial = false) {
  const cardClass = isInitial
    ? 'polaroid-card is-top'
    : 'polaroid-card is-top is-dropping';
  const photoRatio =
    photo.width && photo.height ? photo.width / photo.height : 1;
  const styleAttr = [
    `--photo-ratio: ${photoRatio.toFixed(4)}`,
    `--card-rotate: ${placement.rotateDeg.toFixed(2)}deg`,
    `--card-tx: ${placement.offsetX.toFixed(1)}px`,
    `--card-ty: ${placement.offsetY.toFixed(1)}px`,
    `--drop-spin: ${placement.dropSpinDeg.toFixed(2)}deg`,
    `--drop-x: ${placement.dropX.toFixed(1)}px`,
  ].join('; ');

  const avifSource = photo.sources?.avif
    ? `<source type="image/avif" srcset="${escapeHtml(photo.sources.avif)}" sizes="${escapeHtml(photo.sizes)}">`
    : '';
  const webpSource = photo.sources?.webp
    ? `<source type="image/webp" srcset="${escapeHtml(photo.sources.webp)}" sizes="${escapeHtml(photo.sizes)}">`
    : '';
  const srcsetAttrs = photo.srcset
    ? ` srcset="${escapeHtml(photo.srcset)}" sizes="${escapeHtml(photo.sizes)}"`
    : '';
  const fetchPriorityAttr = isInitial ? ' fetchpriority="high"' : '';

  const creditHtml = photo.photographerUrl
    ? `<a class="polaroid-link polaroid-credit__link" href="${escapeHtml(photo.photographerUrl)}" target="_blank" rel="noopener noreferrer"><span>${escapeHtml(photo.photographerName)}</span><span class="external-icon">${UI_ICONS.externalTab}</span></a>`
    : `<span class="polaroid-credit__name">${escapeHtml(photo.photographerName)}</span>`;

  const postLinkHtml = photo.sourceUrl
    ? `<a class="polaroid-link polaroid-post-link" href="${escapeHtml(photo.sourceUrl)}" target="_blank" rel="noopener noreferrer"><span>View post</span><span class="external-icon">${UI_ICONS.externalTab}</span></a>`
    : '';

  return `<figure class="${cardClass}" style="${styleAttr}"><button class="polaroid-photo-btn" type="button" aria-label="${escapeHtml(`${photo.alt} — click for another photo`)}"><span class="polaroid-viewport"><picture class="polaroid-picture">${avifSource}${webpSource}<img class="polaroid-img" src="${escapeHtml(photo.src)}"${srcsetAttrs} width="${photo.width}" height="${photo.height}" alt="${escapeHtml(photo.alt)}" decoding="async" loading="eager"${fetchPriorityAttr}></picture><span class="polaroid-sheen" aria-hidden="true"></span></span></button><figcaption class="polaroid-caption"><span class="polaroid-credit">Photo credit: ${creditHtml}</span>${postLinkHtml}</figcaption></figure>`;
}

/**
 * Renders the full `#app` markup as HTML so dist/index.html ships complete static HTML.
 */
export function renderSiteHtml(content, initialPhoto, initialPlacement) {
  const bioHtml = renderBioHtml(
    content.profile.bio ?? '',
    content.profile.birthday,
  );
  const pronouns = content.profile.pronouns?.trim();
  const pronounsHtml = pronouns
    ? `<span class="profile-pronouns">${escapeHtml(pronouns)}</span>`
    : '';
  const repoUrl = content.meta.repo?.trim();
  const githubHtml =
    repoUrl && isSafeUrl(repoUrl)
      ? `<a class="github-link" href="${escapeHtml(repoUrl)}" target="_blank" rel="noopener noreferrer" aria-label="View source on GitHub"><span class="github-link__icon">${UI_ICONS.github}</span><span>source on github</span></a>`
      : '';
  const polaroidHtml = renderPolaroidCardHtml(initialPhoto, initialPlacement, true);

  const linksHtml = content.links
    .map((link) => {
      const label = escapeHtml(link.label);
      const handle = escapeHtml(link.handle);
      const url = escapeHtml(link.url);
      return `<li class="link-item"><a class="link-anchor" href="${url}" target="_blank" rel="noopener noreferrer"><span class="link-icon">${getPlatformIcon(link.platform)}</span><span class="link-meta"><span class="link-label">${label}</span><span class="link-handle">${handle}</span></span><span class="link-arrow">${UI_ICONS.arrowUpRight}</span></a><button class="copy-btn" type="button" data-copy-value="${handle}" aria-label="${escapeHtml(`Copy ${link.label} handle ${link.handle}`)}" title="${escapeHtml(`Copy ${link.handle}`)}"><span class="copy-btn__icon">${UI_ICONS.copy}</span><span class="copy-btn__done">${UI_ICONS.check}</span></button></li>`;
    })
    .join('');

  return `<div class="photobooth-stage"><div class="ambient-backdrop" aria-hidden="true"><span class="ambient-orb ambient-orb--warm"></span><span class="ambient-orb ambient-orb--maroon"></span><span class="film-grain"></span></div><main class="booth-card" aria-label="${escapeHtml(`${content.profile.name} profile card`)}"><div class="booth-grid"><section class="photo-column" aria-label="Photos"><div class="polaroid-stage-wrap"><div class="polaroid-stack">${polaroidHtml}</div><div class="paw-guide" aria-hidden="true"><span class="paw-guide__ripple"></span><span class="paw-guide__paw">${UI_ICONS.lynxPaw}</span></div><p class="tap-hint" aria-live="polite"><span class="tap-hint__icon">${UI_ICONS.miniPaw}</span><span class="tap-hint__text">Tap for more!</span></p></div><div class="photo-controls"><button class="slideshow-toggle" type="button" aria-pressed="false" aria-label="Pause photo slideshow"><svg class="slideshow-toggle__ring" aria-hidden="true" viewBox="0 0 130 24"><path class="slideshow-toggle__track" d="M 65 0.5 H 118 A 11.5 11.5 0 0 1 118 23.5 H 12 A 11.5 11.5 0 0 1 12 0.5 Z" pathLength="100"/><path class="slideshow-toggle__progress" d="M 65 0.5 H 118 A 11.5 11.5 0 0 1 118 23.5 H 12 A 11.5 11.5 0 0 1 12 0.5 Z" pathLength="100"/></svg><span class="slideshow-toggle__icon slideshow-toggle__icon--pause">${UI_ICONS.pause}</span><span class="slideshow-toggle__icon slideshow-toggle__icon--play">${UI_ICONS.play}</span><span class="slideshow-toggle__label">pause slideshow</span></button></div></section><section class="info-column"><header class="profile-header"><div class="profile-title"><h1 class="profile-name">${escapeHtml(content.profile.name)}</h1>${pronounsHtml}</div><div class="profile-bio">${bioHtml}</div></header><nav class="links-nav" aria-label="Social links"><ul class="links-list">${linksHtml}</ul></nav></section></div></main><footer class="site-footer">${githubHtml}<button class="theme-toggle" type="button" aria-label="Switch to dark mode"><span class="theme-toggle__icon theme-toggle__icon--moon">${UI_ICONS.moon}</span><span class="theme-toggle__icon theme-toggle__icon--sun">${UI_ICONS.sun}</span><span class="theme-toggle__label">dark mode</span></button></footer></div>`;
}
