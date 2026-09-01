# design-sync notes for tech-blog

This repo is a Next.js app, not a publishable component library — there is
no `dist/` build and no real `package.json` `types`/`main` field. The sync
uses a synthesized entry (`src/design-sync-entry.ts`) covering the 17
top-level components under `src/components/`.

- [GENERAL] `package.json` doesn't declare a `types` field, so the
  converter's export-name gate (which checks storybook titles against real
  package exports) saw zero exports. Fix: added `.design-sync/entry.d.ts`
  (hand-written barrel declaring the 17 export names) and pointed
  `package.json`'s new `types` field at it. Harmless for the actual app
  build — nothing in the app imports itself as a package.
- [GENERAL] `.webp` static imports (`@/assets/images/bada.webp`,
  `bada-3d-half.webp`) have no esbuild loader in the converter's main
  bundle pass (hardcoded loader map in `lib/bundle.mjs`, not configurable,
  and that file is off-limits to fork). Routed around it with exact-match
  `tsconfig.paths` aliases (`.design-sync/ds-tsconfig.json`) pointing those
  two specifiers at tiny shim modules (`.design-sync/shims/bada*.ts`) that
  export a data-URI placeholder.
- [GENERAL] Do NOT add a wildcard `"@/*"` entry to `.design-sync/ds-tsconfig.json`.
  The converter's own `tsconfigPathsPlugin` (lib/bundle.mjs) resolves a
  matched alias's first existing path and returns it even when that path is
  a directory — it never appends `/index.tsx`. Real `@/*` imports must fall
  through to esbuild's native tsconfig auto-discovery (which resolves
  directories correctly via `./tsconfig.json`), so `ds-tsconfig.json` only
  ever carries exact-match overrides for specific specifiers.
- [GENERAL] `MDXContent` is excluded (`cfg.titleMap: {"MDXContent": null}`
  and dropped from the entry file) — it's built on `next-mdx-remote/rsc`,
  a React Server Component, which cannot render in a browser preview.
- [GENERAL] `next/image` and `next/link` are aliased (same exact-match
  tsconfig technique) to plain `<img>`/`<a>` shims in `.design-sync/shims/`.
  Importing the real `next/image`/`next/link` pulled in ~2MB of Next.js
  internals that reference `process` at runtime (undefined in-browser) —
  every preview failed with `ReferenceError: process is not defined`.
- `Toast/index.tsx` has no default export (only named `Toast` + `openToast`)
  — the entry re-exports it as `export { Toast } from './components/Toast'`,
  not `export { default as Toast }`.
- `cfg.provider = { component: "OverlayProvider" }` — re-exported from
  `overlay-kit` in the entry file so Modal/Toast get the same overlay
  context the app provides via `.storybook/preview.ts`'s decorator. The
  decorator bundle itself fails (`.storybook/preview.ts` pulls in
  `../src/app/globals.css` → a `@font-face` `.woff2` url() the decorator
  bundler has no loader for), but `cfg.provider` bypasses that path
  entirely — this is the intended fallback per the skill docs.
- `[RENDER_THIN]` on ShareButton is expected/benign: it's an icon-only
  button with no visible text in its default stories.

## Re-sync risks
- The `.design-sync/entry.d.ts` barrel and `src/design-sync-entry.ts` must
  both be updated together whenever components are added/removed/renamed
  under `src/components/`.
- If `next/image`/`next/link` usage patterns change (e.g. a component starts
  using `next/navigation` hooks), expect the same `process is not defined`
  failure class and the same alias-shim fix.
