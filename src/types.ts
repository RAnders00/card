export type PlatformId =
  | 'x'
  | 'bluesky'
  | 'furtrack'
  | 'instagram'
  | 'telegram'
  | string;

export interface LinkItem {
  platform: PlatformId;
  label: string;
  handle: string;
  url: string;
}

export interface SiteContent {
  meta: {
    title: string;
    url: string;
  };
  profile: {
    name: string;
    birthday?: string;
    bio?: string;
  };
  links: LinkItem[];
}

export interface Photographer {
  name: string;
  url?: string;
}

export interface PhotoEntry {
  file: string;
  alt: string;
  photographer: string;
  source?: string;
}

export interface PhotosConfig {
  photographers: Record<string, Photographer>;
  photos: PhotoEntry[];
}

export interface ResolvedPhoto {
  src: string;
  srcset: string;
  sizes: string;
  sources: {
    avif?: string;
    webp?: string;
  };
  width: number;
  height: number;
  alt: string;
  photographerName: string;
  photographerUrl: string;
  sourceUrl: string;
}
