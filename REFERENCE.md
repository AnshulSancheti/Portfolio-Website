# Davies portfolio clone reference

Primary reference: `https://davies.framer.website/` (opened from the Framer Marketplace listing). Motion reference: `/home/intelligentape/Videos/Screencasts/Screencast From 2026-07-13 11-23-42.mp4` (1920x1080, 97.65 seconds).

## Desktop geometry (1920x1080)

The page uses a 1340px outer shell centered at x=290 and a 1310px content grid centered at x=305. Total live-page height measured 16,381px.

| Section | Top | Height | Key behavior |
| --- | ---: | ---: | --- |
| Hero | 0 | 750 | Full-bleed looping liquid video, fixed text composition |
| Works | 750 | 3,600 | 228px marquee followed by three 1080px sticky project cards |
| Featured Products | 4,350 | 948 | Two-card carousel |
| Services | 5,298 | 2,310 | Three 770px full-width sticky panels |
| Process | 7,608 | 928 | Three-card hover accordion/spotlight |
| About | 8,536 | 937 | Parallax portrait/video and rotating award seal |
| Brands | 9,473 | 764 | 5x2 bordered logo grid |
| Awards | 10,237 | 1,199 | Split copy, vertical award ticker, layered parallax collage |
| Testimonials and stats | 11,436 | 1,220 | Three-card carousel followed by perspective-grid counters |
| Pricing | 12,656 | 1,372 | Monthly/annual switch and three tiers |
| FAQ | 14,028 | 900 | Green glow curve and one-open accordion |
| Contact | 14,928 | 794 | Perspective grid, two-column form |
| Footer | 15,722 | 659 | Navigation, large Davies wordmark, copyright row |

The Works container begins at y=978, is 1,340px wide and 3,372px tall, and has 60px top padding. Its three 1,310x1,080 cards are direct sticky siblings separated by a 36px flex gap. Their normal-flow tops are y=1,038, 2,154 and 3,270; while scrolling, each earlier card remains at viewport y=0 until the common container releases all three together. This shared containing block is essential—the cards do not work when each sticky item is constrained by its own wrapper.

Each desktop service is 1,920x770. The content is arranged on a common 1,340px inner composition: left artwork at x=290 (382x530), copy at x=783 (424px wide), and right artwork at x=1,317 (185px wide). The panels are sticky siblings in the same 2,310px parent.

## Mobile geometry (390x844)

The live and cloned pages both measure 15,833px. Key boundaries are Works y=612/2,754px, Featured y=3,366/618px, Services y=3,984/2,672px, Process y=6,656/554px, About and Brands y=7,210–9,453, Awards y=9,453/959px, Testimonials and stats y=10,412–11,734, Pricing y=11,734/2,028px, FAQ y=13,762/868px, Contact y=14,630/635px, and Footer y=15,265/568px.

## Motion and interaction specification

- Hero content enters with restrained opacity/vertical easing over the looping liquid footage.
- The Selected Work marquee runs continuously right-to-left; its text is 96px/108px and sits against the bottom of its 228px band.
- Project cards pin to the viewport and are covered by the following card at exactly the same offsets. Their media has a subtle scrubbed scale/vertical shift.
- On project hover the native cursor disappears. A dark 120px arrow orb follows with a stiff spring, while three green translucent followers use progressively softer springs to create the requested visible trail.
- The first project’s third-party Nexbot video is unavailable on both the live reference and clone, so its exact poster artwork is the rendered state; the next two use still presentation artwork.
- On desktop, each outgoing service panel shrinks toward 70% and fades toward 2% as the next panel travels from the viewport bottom to the top. Phone layouts retain normal document flow and do not inherit this desktop fade.
- The active process card expands while inactive cards narrow; the active card exposes supporting copy and a pointer-positioned green glow.
- About media, the rotating seal, background glows, pricing/FAQ/contact entrances, and the footer wordmark use independent scroll-linked rates.
- The award artwork uses the six exact SVG covers from the source in an animated 3D slideshow; the copy and vertical award ticker remain independently animated.
- Product, testimonial, pricing, FAQ, and menu controls have animated state changes rather than navigation reloads.
- Menu opens as a dark translucent, heavily blurred overlay over the current page. Links are right aligned in the order Works, About, Services, Contact.
- `prefers-reduced-motion` disables continuous and scroll-linked animation.

## Verification stages

Playwright comparisons were captured at matched desktop scroll offsets y=1,038, 1,600, 2,070, 2,154, 2,400, 2,800, 3,190 and 3,270 for Works; y=5,200 through 6,838 for Services; and section-entry checkpoints from y=7,608 through 16,200. Mobile comparisons used matched checkpoints from y=714 through 15,265. Work-card viewport rectangles match the live page at every measured stage, including the common-container release at y=3,270–3,500.

## Visual system

- Background: pure black with near-black cards (`#030303` to `#0c0c0e`).
- Primary text: off-white; secondary text: low-contrast gray.
- Accent: vivid green, approximately `#07c42c` on the source page.
- Typeface: Figtree. Display text uses medium weight and tight negative tracking.
- Desktop corners are mostly square; controls use thin gray outlines and small 6-8px radii.
