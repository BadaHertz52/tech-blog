## Setup

No provider is required to render these components in isolation — they're
plain functions with no context dependency, except `Modal` and `Toast`,
which use `overlay-kit`'s imperative overlay system and must be wrapped in
`OverlayProvider` (also exported from this bundle):

```jsx
<OverlayProvider>
  <YourApp />
</OverlayProvider>
```

`Toast` is triggered imperatively via `openToast({ variant, description })`
exported from the Toast module, not mounted directly with props for content
(pass `isOpen`/`onClose` only if composing your own trigger).

## Styling idiom: Tailwind utility classes, project-defined tokens

Every component is styled with Tailwind utility classes reading from this
project's `tailwind.config.ts` theme — there is no CSS-in-JS and no runtime
theming. Build new layout/glue code with the same utility classes and the
project's named tokens, not raw hex values or arbitrary Tailwind values:

| Concern | Tokens |
|---|---|
| Brand blue | `bg-primary-blue` / `text-primary-blue` (`#056FE8`), `hover:bg-blue-600` |
| Secondary accents | `secondary-sky-blue`, `secondary-yellow` |
| Grays | `gray-light`, `gray-medium`, `gray-charcoal` |
| Text | `text-text-primary` (headings/body), `text-text-secondary` (muted) |
| Backgrounds | `bg-bg-white`, `bg-bg-pale-blue`, `bg-bg-white-anti-gray` |
| Spacing (padding/gap/margin) | `xs` 8px, `sm` 12px, `md` 16px, `lg` 24px, `xl` 32px, `2xl` 48px |
| Radius | `rounded-button` (12px, buttons/pills), `rounded-card` (24px, cards/media), `rounded-default` (32px) |
| Font | body text is set globally to Pretendard; use `font-display` (Space Grotesk) only for headings that opt into it |
| Font sizes | `text-xs` .. `text-xl` for body copy; `text-h1-mobile`/`text-h1-desktop` etc. for headings (paired responsively, e.g. `text-h2-mobile md:text-h2-desktop`) |
| Font weight | `font-regular` (400), `font-medium` (500), `font-bold` (700), `font-extrabold` (800) |
| Buttons | `.btn-primary` / `.btn-secondary` / `.btn-black` (see `Button`/`ButtonLink`) |

Mobile-first responsive: use `sm:`/`md:`/`lg:` breakpoints, default styles
target mobile.

## Where the truth lives

- `_ds/styles.css` and its `@import` chain — the full compiled Tailwind
  output plus component CSS (`_ds_bundle.css`). Read this before styling
  anything by hand; the token table above is a summary, not the full set.
- Each component's own `.prompt.md` in `components/<group>/<Name>/` for
  usage examples and prop notes.

## Example: composing with the design system

```jsx
<OverlayProvider>
  <Header />
  <main className="flex flex-col gap-lg px-md py-xl">
    <div className="grid gap-lg md:grid-cols-2 lg:grid-cols-3">
      <ArticleCard.Loaded
        article={{
          title: "Async/Await 깊이 있게 이해하기",
          description: "이벤트 루프와 Promise, 그리고 async 함수의 동작 원리",
          date: "2026-02-10",
          category: "cs",
          thumbnail: "/articles/assets/basic-thumbnail.webp",
          slug: "understanding-async-await",
        }}
      />
    </div>
    <Button variant="primary">LOGIN</Button>
  </main>
  <Footer />
</OverlayProvider>
```
