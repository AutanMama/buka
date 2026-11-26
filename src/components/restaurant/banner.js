// Banner style per restaurant type: a soft brand tint plus a signature dish.
export const BANNERS = {
  rice: { tint: 'bg-pepper-soft', art: 'rice' },
  grill: { tint: 'bg-palm-soft', art: 'suya' },
  soup: { tint: 'bg-leaf-soft', art: 'soup' },
  swallow: { tint: 'bg-leaf-soft', art: 'swallow' },
  snack: { tint: 'bg-palm-soft', art: 'snack' },
  plantain: { tint: 'bg-palm-soft', art: 'plantain' },
  drink: { tint: 'bg-pepper-soft', art: 'zobo' },
}

export const bannerFor = (key) => BANNERS[key] ?? BANNERS.rice
