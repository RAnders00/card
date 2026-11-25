import type { ResolvedPhoto, SiteContent } from './types';

export interface PolaroidPlacement {
  rotateDeg: number;
  offsetX: number;
  offsetY: number;
  dropSpinDeg: number;
  dropX: number;
}

export const INITIAL_PLACEMENT: PolaroidPlacement;

export const PLATFORM_ICONS: Record<string, string>;

export const UI_ICONS: {
  arrowUpRight: string;
  externalTab: string;
  copy: string;
  check: string;
  miniPaw: string;
  lynxPaw: string;
};

export function getPlatformIcon(platform: string): string;

export function escapeHtml(value: string): string;

export function calculateAge(
  birthday: string | Date | undefined,
  now?: Date,
): number | null;

export function formatBio(
  bio: string,
  birthday?: string | Date,
  now?: Date,
): string;

export function renderPolaroidCardHtml(
  photo: ResolvedPhoto,
  placement: PolaroidPlacement,
  isInitial?: boolean,
): string;

export function renderSiteHtml(
  content: SiteContent,
  initialPhoto: ResolvedPhoto,
  initialPlacement: PolaroidPlacement,
): string;
