# Buka brand guide

Buka is named after the roadside kitchens found on every Nigerian street: warm, busy and honest. The UI should feel the same. It's warm but not loud, with food at the centre and one clear action per screen.

## Colour

Every colour lives as a token in `src/styles/index.css`. Components never use raw hex values.

| Token         | Light     | Dark      | Use                                              |
| ------------- | --------- | --------- | ------------------------------------------------ |
| `bg`          | `#FBF6EE` | `#15110E` | Page background ("cream")                        |
| `surface`     | `#FFFFFF` | `#211B17` | Cards, drawers, modals                           |
| `sunk`        | `#F3EADD` | `#2B241F` | Inputs, chips, skeletons                         |
| `line`        | `#EADFD1` | `#3A312A` | Borders and dividers                             |
| `ink`         | `#1F1A17` | `#F5EDE3` | Main text                                        |
| `muted`       | `#6B5C50` | `#B3A496` | Secondary text ("clay")                          |
| `pepper`      | `#C2410C` | `#FF7A45` | Primary action, brand ("ata rodo" pepper red)    |
| `palm`        | `#F2A541` | `#F2A541` | Highlights, ratings, promos ("palm oil")         |
| `leaf`        | `#2F6B4F` | `#6FCF9F` | Success, open now, free delivery ("ugu leaf")    |
| `on-palm`     | `#1F1A17` | `#1F1A17` | Text on palm (dark in both themes)               |
| `on-pepper`   | `#FFFFFF` | `#15110E` | Text on pepper buttons                           |
| `*-soft`      | tints     | tints     | Background behind a badge of the same colour     |

Rules:

- **Pepper is for actions only.** One pepper button per view. Everything else is ink or outline.
- **Palm never carries text by itself.** Text on palm is always `ink`.
- **Leaf means good news.** Use it for success states only, never for decoration.

### Contrast (WCAG 2.1)

| Pair                         | Ratio  | Level |
| ---------------------------- | ------ | ----- |
| ink on bg                    | 16.0   | AAA   |
| muted on bg                  | 5.97   | AA    |
| white on pepper (button)     | 5.18   | AA    |
| pepper on bg (link)          | 4.81   | AA    |
| ink on palm                  | 8.40   | AAA   |
| leaf on bg                   | 5.85   | AA    |
| dark: ink on bg              | 16.2   | AAA   |
| dark: muted on surface       | 7.02   | AAA   |
| dark: bg-ink on pepper       | 7.26   | AAA   |
| dark: leaf on surface        | 9.00   | AAA   |

### Logo

The logo is a steaming bowl in a pepper square. It always uses the fixed colours `brand` (#C2410C), `brand-cream` (#FBF6EE) and `brand-palm` (#F2A541), so it looks the same in light and dark themes.

## Type

- **Display:** Bricolage Grotesque for headings, prices and the logo. It's a bit quirky, like hand-painted shop signs.
- **Body:** Inter for everything else, chosen because it stays readable at small sizes.
- Scale: 12 / 14 / 16 / 20 / 24 / 32 / 48 px. Headings use tight tracking.

## Shape and depth

- Cards: `rounded-card` (20px). Buttons and chips: fully rounded.
- One shadow token (`shadow-card`). Hover lifts a card by 2px. Nothing else floats.

## Motion

- Short and physical: 150–250ms, spring for "add to cart", ease-out for page changes.
- Motion always explains something (an item went into the cart, a page changed). It's never decoration.
- Respects `prefers-reduced-motion`.

## Illustration

Dishes are drawn as flat, top-down plates (`DishArt`). The food colours below are illustration-only and never used for UI:

`rice #E0782F · stew #B23A1A · plantain #E9B949 · greens #4F8A3C · meat #7A3B22 · swallow #F1E6CF · bowl #FFFFFF`
