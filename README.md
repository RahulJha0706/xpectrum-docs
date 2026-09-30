# Xpectrum AI — documentation

The Xpectrum AI docs site: guides, block and channel reference, API reference and troubleshooting. Next.js with MDX pages.

```bash
npm install
npm run dev      # http://localhost:3000/docs
npm run build
```

## Where things are

- `src/app/docs/**/page.mdx` — one file per page; the URL matches the folder
- `src/docs/nav.ts` — the sidebar; add a page here when you add a folder
- `src/docs/components/` — the docs shell (header, sidebar, search, table of contents) and the MDX components
- `src/styles/docs.css` — docs typography and theme
- `scripts/gen-search-index.mjs` — builds the search index from page headings (runs before `dev` and `build`)
