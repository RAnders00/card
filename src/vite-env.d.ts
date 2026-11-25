/// <reference types="vite/client" />

declare module '*.toml' {
  const value: unknown;
  export default value;
}

declare module 'virtual:photos' {
  import type { ResolvedPhoto } from './types';
  const photos: ResolvedPhoto[];
  export default photos;
}
