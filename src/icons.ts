const PLATFORM_ICONS: Record<string, string> = {
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
};

export function getPlatformIcon(platform: string): string {
  return PLATFORM_ICONS[platform.toLowerCase()] ?? PLATFORM_ICONS.default;
}
