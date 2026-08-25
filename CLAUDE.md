# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Transforms the "Caderno Técnico de Turnê — Lula 2026" (a technical/logistics manual for campaign
rally events) into a visual, schematic, publishable HTML document. Static site, deployed via
GitHub Pages. No backend, no build tooling, no package manager — plain HTML/CSS/JS.

**Current state:** source material only. No `index.html` / CSS / JS exist yet. Implementation
does not start until the user explicitly says "pode começar" — do not write site code before that,
even if asked to process or organize more source material.

## Repository layout

```
fonte/                          # Source material — reference only, never the deliverable itself
  caderno-tecnico-comicio.md    # Full manual text (32 sections), captured from Google Docs.
                                 # Personal contact info (names/phones) is redacted — see policy below.
  identidade-visual/
    guia-simplificado-design.md # Extracted color palette (hex+CMYK) and typography specs
    manual_simplificado_lula.pdf
    manual-completo-l26/        # Brand assets: logo variants, avatars, boxes, emojis, pins
  renders/palco-{1,2}/          # Original high-res stage renders (PNG, ~2MB each)

assets/img/palco-{1,2}/         # Web-optimized copies of the renders (JPEG, max 1920px, q80)
                                 # Naming: palco-N-drone-01.jpg ... -11.jpg, -house.jpg, -multidao.jpg
```

The planned deliverable structure (not yet built) is: `index.html` at repo root, `assets/css/`
(`main.css`, `components.css`, `print.css` for the PDF export via `@media print`), `assets/js/`
(`main.js`, `export-pdf.js` using `window.print()`), `assets/icons/`, and optionally `sections/`
for partial HTML if the single-page document gets too long. Single-page with scroll + anchor
sidebar nav was chosen over paginated/slide navigation.

## Working with source material in `fonte/`

- Treat everything under `fonte/` as read-only reference, not something to edit into shape.
- **Personal data policy:** never commit names, phone numbers, or other personal contact info
  captured from source documents. Redact before saving (see how `caderno-tecnico-comicio.md`
  handles the "Contatos Técnicos" and "Libras" sections as the pattern to follow).
- Large source binaries (`.psd`, `.ai`) are intentionally excluded from this repo — they're
  design-tool files, not usable in a static HTML/CSS/JS site, and routinely exceed GitHub's
  100MB per-file limit. Only exported/flattened assets (PNG/PDF/JPEG) get copied in. When
  pulling more material from the Dropbox source folders, check file sizes first and flag
  anything unusually large before copying.

## Environment notes (Windows, Git Bash)

- No ImageMagick/ffmpeg/poppler `pdfimages`/`pdftoppm` available. `pdftotext` (from
  poppler, bundled with Git for Windows at `/mingw64/bin/`) works for PDF text extraction.
- Image resizing/compression is done via PowerShell + `System.Drawing` (see the pattern used
  to produce `assets/img/palco-*` from `fonte/renders/palco-*`) since no dedicated image CLI
  is installed.
- Bash tool paths: use forward slashes and avoid a trailing backslash immediately before a
  closing double-quote (e.g. `"...\folder\"`) — Git Bash reads `\"` as an escaped quote and the
  string fails to close, breaking command parsing.
- Git identity is configured locally in this repo (not global) — see `git config user.name` /
  `user.email` if you need to check it; already set, no need to redo.
- This repo lives inside a Dropbox-synced folder. Occasionally `git add`/`commit` fails with
  `unable to write file .git/objects/.. : Permission denied` — that's Dropbox's sync client
  transiently locking the new object file, not a real permissions problem. Just retry the same
  `git add` command after a few seconds; it's not worth deep-diagnosing.
- The three CSS files (`main.css`, `components.css`, `print.css`) are linked from `index.html`,
  `comicio.html`, and `caminhada.html` with a `?v=YYYYMMDDx` cache-busting query string. GitHub
  Pages/browsers cache these filenames aggressively across deploys, so a CSS-only change can go
  live on the HTML but still render with the *old* cached CSS (symptom: SVG shapes/colors looking
  wrong or defaulting to black, since classes silently fail to apply). **Whenever you edit any of
  the three CSS files, bump the `?v=` value on all three `<link>` tags in all three HTML files
  before publishing** (a new date+letter suffix is enough, e.g. `20260825c` → `20260825d`).

## Brand reference (from `fonte/identidade-visual/guia-simplificado-design.md`)

- Primary typeface: **Transducer** (Adobe Fonts) for headings/emphasis. Support typeface:
  **Gotham** (Adobe Fonts) for body text. Neither is available via Google Fonts — an open
  decision is whether to load Adobe Fonts/Typekit or substitute with open alternatives
  (e.g. Montserrat/Poppins for Gotham, Oswald/Barlow Condensed for Transducer condensed).
- Color palette (11 colors, hex+CMYK) is documented in that file. Which color is dominant vs.
  accent was not resolved from the source PDF (that section was image-only) — confirm with the
  user when defining the CSS palette.
