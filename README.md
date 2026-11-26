# Buka

Order from the best local kitchens in Abuja. Buka is a food ordering front end built with React. You browse restaurants, filter the menu, build a cart, check out and follow your order live.

> All restaurants, dishes and prices are fictional. Data comes from a mock API with simulated network delay.

## Features

- Restaurant list with search, cuisine filters and sorting, all kept in the URL so you can share a link to filtered results
- Skeleton loading screens that match the final layout
- Menu with sticky category tabs and an item sheet for options (spice level, protein, sides)
- Cart with one restaurant per order, merged lines, persistent storage and live totals
- Checkout with inline validation and three payment methods
- Live order tracking with a step timeline and a moving rider on the map
- Light and dark themes, keyboard accessible dialogs, reduced-motion support

## Tech

React 19 · Vite · Tailwind CSS v4 · Framer Motion · React Router · Lucide icons

## Getting started

```bash
npm install
npm run dev
```

## Project structure

```
src/
  components/
    ui/          Shared building blocks (Button, Badge, Overlay, ...)
    layout/      Header, footer, page transition
    restaurant/  Restaurant cards, filters, category rail, header
    menu/        Menu items, category tabs, item sheet
    cart/        Cart drawer and summary
    checkout/    Checkout sections and order summary
    tracking/    Order timeline and map
  context/       Cart and theme state
  hooks/         Data fetching and order tracking
  lib/           API mock, formatting, cart maths, storage
  data/          Restaurant and menu data
  pages/         Route-level screens
  styles/        Design tokens and global styles
```

Design decisions (colour, type, motion) are documented in [BRAND.md](BRAND.md).

## Photo credits

Food photography from [Unsplash](https://unsplash.com), used under the Unsplash License. Thanks to Keesha's Kitchen, Tosan Dudun, Femoree, Jon Handley, Rimsha Noor, Gourmet Lenz, Emmanuel M, Valdhy Mbemba, Griffin Wooldridge, Kevin kevin, Umair Ali Asad, Eugene Krasnaok, Dr Muhammad Amer, Zoshua Colah, Femi Oyekoya, FitNish Media, Diego Arenas de Rodrigo, Eiliv Aceron, Gabi Miranda and Victoria Shes.
