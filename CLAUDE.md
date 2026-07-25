# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## What this is

Tasif Hossain Emon's portfolio site ("THE Portfolio" — game designer/Unity developer), mid-migration
from a static Bootstrap/vanilla-JS template into a Next.js App Router app. Both halves currently coexist:

- **New app** — `src/` — React/TypeScript, App Router, is what actually renders the site.
- **Legacy static site** — `public/assets/` — the pre-migration HTML-template's CSS, vanilla JS, and
  vendor libraries. It isn't a separate deployable; the new app pulls specific files from it directly
  (see "How the legacy assets are wired in" below). `ARCHITECTURE.md` documents this legacy static
  architecture in detail (its "Directory Structure" and CSS-layer docs are still accurate for
  `public/assets/`; its build/deploy instructions predate the Next.js migration and no longer apply).

`PREVIOUS_SESSION_TRANSCRIPT.md` is a log from an earlier AI session that audited the old static site
(broken contact form, dead buttons, typos, inconsistent "years of experience" copy, etc.). Useful
background on known content issues, but don't treat it as reflecting the current `src/` code.

## Commands

```bash
npm run dev      # next dev — local dev server
npm run build    # next build
npm run start    # next start — serve a production build
npm run lint     # eslint (flat config: eslint.config.mjs)
```

There is no test suite / test runner configured in this repo.

`.eslintrc.json` and `.stylelintrc.json` at the repo root are legacy configs written for the old
vanilla-JS/CSS codebase (`public/assets/js`, `public/assets/css`) — they are **not** referenced by
`npm run lint`, which uses the flat `eslint.config.mjs` (Next core-web-vitals + TypeScript rules)
against `src/`.

## Architecture

### App Router structure (`src/app`)

- `layout.tsx` — root layout. Sets metadata, and loads Google Fonts, Bootstrap, Bootstrap Icons, AOS,
  GLightbox, and Swiper CSS/JS, plus `/assets/css/redesign.css` and `/assets/js/main.js`, via plain
  `<link>`/`<script>` tags pointing into `public/assets/` (see below) — not npm packages.
- `page.tsx` — homepage; just composes the section components from `src/components` in order
  (Hero, About, Experience, Skills, WorkGrid, Contact).
- `work/[slug]/page.tsx` — per-project detail page. Uses `generateStaticParams`/`generateMetadata`
  and looks up the project by slug in `src/data/projects.ts`, rendering it via `ProjectDetail`.
  Its `params` prop is typed as a plain `{ slug: string }` object rather than a `Promise` — given
  this repo's AGENTS.md warning about non-standard Next.js API changes in this version, verify
  against `node_modules/next/dist/docs/` (if present) before assuming either convention is correct
  when touching this file.

### Components (`src/components`)

One component per homepage section (`Hero`, `About`, `Experience`, `Skills`, `WorkGrid`, `Contact`,
`Nav`, `Footer`), plus:
- `ProjectDetail` — renders a single project's full detail page (used by `work/[slug]`).
- `GenerativeBackground` — decorative canvas-based procedural grid animation (`"use client"`).
- `SystemStatusLine` — decorative rotating "compiling terrain chunk..."-style status text
  (`"use client"`), reinforcing the game-dev/HUD visual theme.

Imports are relative (`../components/...`, `../data/...`), not the `@/*` path alias — the alias is
configured in `tsconfig.json` but not currently used anywhere; match existing style unless asked to
change it.

### Data (`src/data`)

Typed content, not fetched from anywhere — plain arrays that drive rendering:
- `projects.ts` — `Project` type + array. Backs `WorkGrid` (cards) and `work/[slug]` (detail pages).
  Adding a project = adding an entry here (image paths point into `public/assets/img/`).
- `experience.ts` — `Experience` type + array. Backs the `Experience` timeline component.

### How the legacy assets are wired in (`public/assets`)

`layout.tsx` loads `/assets/js/main.js` and vendor bundles as raw `<script>` tags, so this legacy,
DOM-querying vanilla JS (`public/assets/js/app.js` orchestrator + `components/Navigation.js`,
`Portfolio.js`, `ContactForm.js`, `Animations.js`) executes independently of React, in the same DOM
React controls. When editing interactive pieces of `Nav`, `WorkGrid`, or `Contact`, check whether the
corresponding legacy JS module also targets those elements (by id/class) — id/class renames on the
React side can silently break the legacy script's DOM queries, and vice versa.

Styling is similarly split: `public/assets/css/redesign.css` (loaded in `layout.tsx`) is the active
stylesheet for the current design; the modular `base/`/`layout/`/`components/`/`pages/`/`themes/`
CSS layers described in `ARCHITECTURE.md` are the older per-section stylesheets and may or may not
still be loaded — check `layout.tsx` and `redesign.css`'s `@import`s before assuming a given class
is styled from one file vs. the other.

`public/assets/img/` mixes original raster images with generated `.webp` versions
(`scripts/optimize-images.js`). `scripts/*.js` are standalone Node maintenance scripts (image
optimization, legacy HTML rewriting) — not part of the Next.js build.

### Known non-functional piece

`Contact.tsx`'s submit handler is a stub (`setTimeout` → fake success), not wired to any backend.
`forms/contact.php` is the old template's PHP mailer and won't run on Vercel/static hosting — if
asked to make the contact form actually send mail, this needs a real endpoint (e.g. a Vercel-hosted
API route or a form/email marketplace integration), not a revival of the PHP script.
