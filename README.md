# Anant Kumar: portfolio

A one-page portfolio built on a single idea: every project starts as a vague
ask and ends as an exact output. The headline resolves from a hedging sentence
into a precise one, and each case study has a yellow focus line that brings the
output into focus as you scroll, or when you drag it.

It is a static site built with [Astro](https://astro.build). There is no server
code, no tracking, and no external requests: fonts, images and the resume PDF
are all in this repository.

## Run it locally

You need Node.js 22.23 or newer (Astro requires it).

```bash
npm install
npm run dev
```

Open the address the command prints (usually http://localhost:4321).

## Edit the content

All text on the site lives in one file:

```
src/content/content.json
```

Change the text, save, and the page reloads. You do not need to touch any
component.

- **Placeholders.** Any value that starts with `[ADD:` is shown on the page
  with a dashed outline so it cannot be missed. Replace it with real text.
  Set a field to an empty string (`""`) to hide it.
- **Case studies.** Each entry in `pairs.items` is one ask-and-output pair.
  Add, remove or reorder entries freely. `id` must be unique and is used as the
  link anchor (for example `#cobol-to-java`).
- **Headline.** `hero.exact` is a list of lines. Each line is shown on its own
  row on wide screens.
- **Links and email.** These are under `contact`.

Other things you may want to replace:

| What | Where |
|---|---|
| Resume PDF | `public/resume/Anant_Kumar_Resume.pdf` (keep the name, or update `contact.resume.file`) |
| Share image (1200 × 630) | `public/og.jpg` |
| Icons | `public/favicon.svg`, `public/favicon-32.png`, `public/apple-touch-icon.png` |
| Colors, type, spacing | the variables at the top of `src/styles/global.css` |

The share image repeats the headline as a picture. If you change the headline,
replace `public/og.jpg` with a new 1200 × 630 image.

## Build

```bash
npm run build
```

The finished site is written to `dist/`. To look at the built version:

```bash
npm run preview
```

## Deploy to GitHub Pages

The site address and base path are set in one place, `site.config.mjs`:

| Repository name | Site address | `SITE_BASE` |
|---|---|---|
| `<username>.github.io` (user site) | `https://<username>.github.io` | `/` |
| anything else (project site) | `https://<username>.github.io/<repo>` | `/<repo>/` |

The home page uses relative paths, so it works under either setting. The base
path matters for the 404 page, the sitemap and the share-image address.

### Option A: GitHub Actions (recommended)

1. Push this folder to a GitHub repository on the `main` branch.
2. In the repository, open Settings → Pages and set Source to "GitHub Actions".
3. The workflow in `.github/workflows/deploy.yml` builds and publishes on every
   push. It reads the address and base path from GitHub, so you do not need to
   edit `site.config.mjs` for this route.

To update the site later: edit, commit, push.

### Option B: upload the built files

1. Set `SITE_URL` and `SITE_BASE` in `site.config.mjs`, then run `npm run build`.
2. Upload the contents of `dist/` (not the folder itself) to the repository, so
   that `index.html` sits at the top level. Include the empty `.nojekyll` file.
3. In Settings → Pages, set Source to "Deploy from a branch", branch `main`,
   folder `/ (root)`.

## How it is put together

```
site.config.mjs            site address and base path
astro.config.mjs           Astro settings
src/content/content.json   all copy
src/pages/index.astro      the page
src/pages/404.astro        the "page not found" page
src/pages/sitemap.xml.ts   sitemap
src/pages/robots.txt.ts    robots.txt
src/layouts/Base.astro     <head>, fonts, share tags
src/components/            top bar, ask-and-output pair, placeholder helpers
src/styles/global.css      all styles
src/scripts/focus.js       the focus line (the only JavaScript on the page)
public/                    fonts, icons, share image, resume PDF
```

## Accessibility and fallbacks

- **Reduced motion.** With "reduce motion" turned on in the operating system,
  the headline appears already resolved and every output starts in focus. The
  focus lines still work by hand.
- **No JavaScript.** Everything is readable and in focus. The focus lines are
  hidden because they would do nothing.
- **Keyboard.** Each focus line is a slider. Tab to it, then use the arrow
  keys, Home and End.
- **Screen readers.** The output text is ordinary page text and is never
  hidden; the blur is purely visual.
- **Print.** The page prints without the blur, the top bar or the dark
  backgrounds.

## Fonts

Instrument Serif, Martian Mono and Hanken Grotesk are open-source fonts under
the SIL Open Font License 1.1. The license texts are in `licenses/`.
