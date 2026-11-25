# randers.me

Minimal, single-page Carrd-style site for **randers** deployed to GitHub Pages at `randers.me`.

## Editing Content

Site copy and social links live separately from rendering code in [`content.toml`](./content.toml):

- `[meta]`: page title and canonical URL
- `[profile]`: name, optional ISO 8601 `birthday` (`YYYY-MM-DD`, substitutes `{age}` in `bio`), and `bio` (also used for the page description)
- `[[links]]`: list of platform links (`x`, `bluesky`, `furtrack`, `instagram`, `telegram`, or any custom platform)

## Editing Polaroid Photos & Credits

Photos for the interactive Polaroid stack live in [`photos/`](./photos) and are configured in [`photos.toml`](./photos.toml):

- `[photographers.<key>]`: reusable photographer `name` and `url`
- `[[photos]]`: photo entries referencing a file in `photos/`, `alt` text, a `photographer` key, and an optional `source` post URL

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Static output is generated in `dist/` (including the preview photo).

## GitHub Pages Deployment

Pushes to `main` automatically build and deploy via [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml).

In your GitHub repository settings:
1. Go to **Settings -> Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Set **Custom domain** to `randers.me` and point your DNS for `randers.me` at GitHub Pages.
