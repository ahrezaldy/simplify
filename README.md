# Simplify — interactive deck

Web version of the "Simplify" talk by Arif Hidayah Rezaldy (Mamikos), based on *Simplify: How the Best Businesses in the World Succeed* by Richard Koch & Greg Lockwood. 34 slides with 2D motion (Motion) and 3D scenes (React Three Fiber).

**Private / internal.** Indexing is blocked by `public/robots.txt` and the `robots` meta tag.

## Run

Requires Node 20+ and pnpm.

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build && pnpm start
```

Designed for desktop (≥1024px wide). The 1600×900 stage scales to fit the window.

## Keyboard

| Key | Action |
|---|---|
| → / Space / PageDown | Next slide |
| ← / PageUp | Previous slide |
| Home / End | First / last slide |
| digits + Enter | Jump to slide N |
| F | Fullscreen |
| Esc | Leave fullscreen, or open the slide overview |

Deep link: `/#/slide/7`. The bottom bar has prev/next, overview, theme and fullscreen buttons; it fades when idle.

## Structure

```
docs/                    local planning notes (source notes, slide plan); git-ignored
src/components/deck/     Deck shell: navigation, overview, SlideFrame, Divider, providers
src/components/slides/   slides grouped by section; index.tsx is the ordered registry
src/components/three/    R3F scenes (lazy-loaded per slide) and the shared ThreeCanvas
src/components/ui/       SplitText, Tilt, Magnetic, Parallax, Photo, Counter
src/lib/                 motion presets, photo credits, seeded random, three.js console filter
public/images/           Wikimedia Commons photos (see credits below)
public/fonts/            Lato Black, used for 3D text
```

## Editing slides

- Add or reorder slides in `src/components/slides/index.tsx`. Each entry has an `id`, `title` (used in the overview and tab title), `section`, `kind` (`divider` or `content`) and a component.
- Content slides wrap their body in `<SlideFrame title="…">`; section breaks use `<Divider title subtitle />`.
- Stage coordinates are fixed at 1600×900, so absolute positions in px are safe.
- Use `stagger`, `rise`, `pop` from `src/lib/motion.ts` with `initial="hidden" animate="show" exit="exit"` so slides choreograph in and out.

## 3D scenes

- Wrap scenes in `ThreeCanvas` (`src/components/three/ThreeCanvas.tsx`). It sets `dpr={[1, 2]}`, uses `resize={{ offsetSize: true }}` so pointer maths work inside the scaled stage, and provides `useSceneEnv()` for theme colours and reduced-motion (`calm`).
- Import scenes with `next/dynamic` and `ssr: false`. Only the active slide is mounted, so a scene unmounts when you leave it.
- Avoid drei `<Html>`: it raced React 19 on slide unmount. Use `<Text font="/fonts/Lato-Black.ttf">` for labels.
- The `THREE.Clock` deprecation warning (R3F still constructs one per canvas) is silenced in `src/lib/three-console.ts`; all other three.js warnings still log. Remove it once R3F moves to `THREE.Timer`.

## Theme and motion

- `next-themes` toggles a `.dark` class; colours are CSS variables in `src/app/globals.css`. 3D scenes read the theme through `useSceneEnv()`.
- `MotionConfig reducedMotion="user"` keeps fades but drops movement when the OS asks for reduced motion; 3D scenes slow down via `calm`.

## Credits

Photos from Wikimedia Commons (on-slide credit shown where the licence needs it):

| File | Author | Licence |
|---|---|---|
| henry-ford.jpg | Hartsook | Public domain |
| model-t.jpg | ModelTMitch | Public domain |
| kamprad.jpg | Sandra Baqirjazid / Swedish Ministry of Enterprise | CC BY 2.0 |
| ikea-store.jpg | Ben MacLeod | CC BY-SA 4.0 |
| speedee-sign.jpg | Northwalker | CC0 |
| first-mcdonalds.jpg | Cogart Strangehill | CC BY-SA 2.0 |
| mosquito.jpg | Pjsime | CC BY-SA 4.0 |

Source links are in `src/lib/credits.ts`. Icons: [Lucide](https://lucide.dev) (ISC). Brand logos: [Simple Icons](https://simpleicons.org) (CC0; trademarks belong to their owners). Font: Lato (SIL OFL). The book cover is drawn procedurally; no cover image is bundled.
