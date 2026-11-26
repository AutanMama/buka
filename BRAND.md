# Buka brand guide

Buka is named after the roadside kitchens found on every Nigerian street. The product should feel like a dependable everyday app, not a poster: the food photography does the selling and the interface stays out of the way.

## Principles

1. **Food first.** Photos carry the colour. The UI itself is mostly black, white and grey.
2. **One loud colour.** Pepper red is only for the main action on a screen and for prices that matter.
3. **Plain words.** "Add to order", "View order", "Closed · opens 8:00". No slogans inside the product.

## Colour

Every colour is a token in `src/styles/index.css`. Components never use raw hex values.

| Token         | Light     | Dark      | Use                                     |
| ------------- | --------- | --------- | --------------------------------------- |
| `bg`          | `#FFFFFF` | `#0E0E0D` | Page background                         |
| `surface`     | `#FFFFFF` | `#1A1A18` | Cards, drawers, dialogs                 |
| `sunk`        | `#F4F3F0` | `#252523` | Search field, image placeholders        |
| `line`        | `#E7E5E0` | `#2E2D2A` | Borders and dividers                    |
| `ink`         | `#141414` | `#F2F1EE` | Main text, secondary buttons            |
| `muted`       | `#5F5B55` | `#A8A49D` | Supporting text                         |
| `pepper`      | `#CC3214` | `#FF5B3A` | Primary action, promos, errors          |
| `leaf`        | `#1E7A4C` | `#4FCB8A` | Free delivery, completed steps          |
| `star`        | `#F5A623` | `#F5A623` | Rating star icon only (never text)      |
| `*-soft`      | tints     | tints     | Background behind text of that colour   |

### Contrast (WCAG 2.1)

| Pair                          | Ratio | Level |
| ----------------------------- | ----- | ----- |
| ink on bg                     | 18.4  | AAA   |
| muted on bg                   | 6.74  | AA    |
| muted on sunk                 | 6.08  | AA    |
| white on pepper (button)      | 5.21  | AA    |
| pepper on pepper-soft         | 4.54  | AA    |
| leaf on bg                    | 5.33  | AA    |
| dark: ink on bg               | 17.1  | AAA   |
| dark: muted on surface        | 7.02  | AAA   |
| dark: bg on pepper (button)   | 6.26  | AA    |
| dark: leaf on surface         | 8.50  | AAA   |

## Type

One family: **Archivo**, using its width axis.

- **Headings** use the condensed width (78%) at weight 800, which nods to the hand-painted signs over real bukas.
- **Body and UI** use the normal width at 400–600.
- Sizes: 12 / 14 / 15 / 17 / 24 / 30 / 36 / 48 / 60 px.
- Prices and counts use tabular numbers so they don't jump when they change.

## Logo

A lowercase wordmark, `buka.`, set in condensed Archivo with a pepper full stop. The stop is always `brand` (#CC3214) in both themes.

## Shape

- Cards and photos: 12px radius. Buttons, inputs and chips: 8px. Only avatars and category photos are round.
- Borders separate things. Shadows are only for things that float (add button on a photo, dialogs).

## Photography

- Real dishes, shot close, with natural light. Square crops for dishes, 16:10 for restaurant covers.
- Closed restaurants show their cover in greyscale.
- All photos are from Unsplash (see README for credits) and are served as WebP.

## Motion

- 150–250ms. Springs for things that react to a tap (add button, cart count), ease-out for page changes.
- Motion always explains something. It is never decoration.
- Respects `prefers-reduced-motion`.
