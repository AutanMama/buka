// `art` picks the plate drawing in DishArt. `image` can replace it with a photo.

const SPICE = {
  id: 'spice',
  label: 'Spice level',
  type: 'single',
  required: true,
  choices: [
    { id: 'mild', label: 'Mild', price: 0 },
    { id: 'medium', label: 'Medium', price: 0 },
    { id: 'hot', label: 'Very hot', price: 0 },
  ],
}

const PROTEIN = {
  id: 'protein',
  label: 'Add protein',
  type: 'multi',
  choices: [
    { id: 'chicken', label: 'Chicken', price: 1500 },
    { id: 'beef', label: 'Beef (2 pcs)', price: 1200 },
    { id: 'fish', label: 'Fried fish', price: 1800 },
    { id: 'egg', label: 'Boiled egg', price: 300 },
  ],
}

const SIDES = {
  id: 'sides',
  label: 'Sides',
  type: 'multi',
  choices: [
    { id: 'dodo', label: 'Dodo (plantain)', price: 800 },
    { id: 'moimoi', label: 'Moi moi', price: 700 },
    { id: 'coleslaw', label: 'Coleslaw', price: 500 },
  ],
}

const SWALLOW = {
  id: 'swallow',
  label: 'Choose swallow',
  type: 'single',
  required: true,
  choices: [
    { id: 'pounded-yam', label: 'Pounded yam', price: 0 },
    { id: 'eba', label: 'Eba', price: 0 },
    { id: 'semo', label: 'Semo', price: 0 },
    { id: 'fufu', label: 'Fufu', price: 0 },
  ],
}

const SIZE = {
  id: 'size',
  label: 'Size',
  type: 'single',
  required: true,
  choices: [
    { id: 'small', label: '35cl', price: 0 },
    { id: 'large', label: '1 litre', price: 1200 },
  ],
}

export const menus = {
  'mama-nkechi': [
    {
      category: 'Popular',
      items: [
        { id: 'mn-jollof', name: 'Firewood Jollof', description: 'Smoky party jollof rice with fried plantain.', price: 3500, art: 'rice', popular: true, options: [SPICE, PROTEIN] },
        { id: 'mn-fried-rice', name: 'Nigerian Fried Rice', description: 'Mixed veg, liver and prawns.', price: 3800, art: 'friedRice', options: [PROTEIN, SIDES] },
      ],
    },
    {
      category: 'Rice',
      items: [
        { id: 'mn-white-stew', name: 'White Rice & Ofada Stew', description: 'Locust beans, assorted meat, green pepper.', price: 4200, art: 'stew', options: [PROTEIN, SIDES] },
        { id: 'mn-coconut', name: 'Coconut Rice', description: 'Slow-cooked in fresh coconut milk.', price: 3700, art: 'rice', options: [SPICE, PROTEIN] },
      ],
    },
    {
      category: 'Extras',
      items: [
        { id: 'mn-dodo', name: 'Dodo', description: 'Sweet fried ripe plantain.', price: 1000, art: 'plantain' },
        { id: 'mn-moimoi', name: 'Moi Moi', description: 'Steamed bean pudding with egg and fish.', price: 900, art: 'moimoi' },
      ],
    },
  ],
  'arewa-suya': [
    {
      category: 'Popular',
      items: [
        { id: 'as-beef', name: 'Beef Suya', description: 'Thin-sliced beef, yaji spice, onions and tomato.', price: 3000, art: 'suya', popular: true, options: [SPICE] },
        { id: 'as-chicken', name: 'Chicken Suya', description: 'Grilled chicken thighs on skewers.', price: 3500, art: 'suya', options: [SPICE] },
      ],
    },
    {
      category: 'Grill',
      items: [
        { id: 'as-kilishi', name: 'Kilishi (100g)', description: 'Sun-dried spiced beef jerky.', price: 2500, art: 'suya' },
        { id: 'as-ram', name: 'Ram Suya', description: 'Tender ram meat, slow grilled.', price: 4500, art: 'suya', options: [SPICE] },
        { id: 'as-gizzard', name: 'Peppered Gizzard', description: 'Gizzard in rich pepper sauce.', price: 2800, art: 'stew', options: [SPICE] },
      ],
    },
  ],
  'calabar-pot': [
    {
      category: 'Popular',
      items: [
        { id: 'cp-afang', name: 'Afang Soup', description: 'Afang and waterleaf with periwinkle and assorted meat.', price: 5500, art: 'soup', popular: true, options: [SWALLOW] },
        { id: 'cp-edikang', name: 'Edikang Ikong', description: 'Ugu and waterleaf, stockfish and dry fish.', price: 6000, art: 'soup', options: [SWALLOW] },
      ],
    },
    {
      category: 'Soups',
      items: [
        { id: 'cp-pepper', name: 'Catfish Pepper Soup', description: 'Fresh catfish, uziza and scent leaf.', price: 6500, art: 'pepperSoup', options: [SPICE] },
        { id: 'cp-egusi', name: 'Egusi Soup', description: 'Melon seed soup with bitter leaf.', price: 4800, art: 'egusi', options: [SWALLOW] },
        { id: 'cp-okra', name: 'Seafood Okra', description: 'Prawns, crab and fish in fresh okra.', price: 7000, art: 'soup', options: [SWALLOW] },
      ],
    },
  ],
  'tuwo-corner': [
    {
      category: 'Popular',
      items: [
        { id: 'tc-tuwo', name: 'Tuwo Shinkafa & Miyan Kuka', description: 'Soft rice swallow with baobab leaf soup.', price: 3000, art: 'swallow', popular: true },
        { id: 'tc-masa', name: 'Masa (6 pcs)', description: 'Fermented rice cakes with yaji.', price: 1500, art: 'snack' },
      ],
    },
    {
      category: 'Northern classics',
      items: [
        { id: 'tc-taliya', name: 'Taliya', description: 'Local spaghetti in pepper sauce.', price: 2500, art: 'friedRice', options: [PROTEIN] },
        { id: 'tc-fura', name: 'Fura da Nono', description: 'Millet balls in fresh cow milk.', price: 1200, art: 'drink' },
      ],
    },
  ],
  'puff-and-chops': [
    {
      category: 'Popular',
      items: [
        { id: 'pc-puff', name: 'Puff-Puff (10 pcs)', description: 'Soft, sweet and freshly fried.', price: 1200, art: 'snack', popular: true },
        { id: 'pc-pack', name: 'Small Chops Pack', description: 'Puff-puff, samosa, spring roll and peppered gizzard.', price: 5000, art: 'snack' },
      ],
    },
    {
      category: 'Pastries',
      items: [
        { id: 'pc-meatpie', name: 'Meat Pie', description: 'Buttery crust, minced beef and potato.', price: 900, art: 'pie' },
        { id: 'pc-sausage', name: 'Sausage Roll', description: 'Flaky pastry, beef sausage.', price: 800, art: 'pie' },
        { id: 'pc-chin', name: 'Chin Chin (250g)', description: 'Crunchy and lightly sweet.', price: 1500, art: 'snack' },
      ],
    },
  ],
  'jollof-republic': [
    {
      category: 'Popular',
      items: [
        { id: 'jr-party', name: 'Party Jollof', description: 'The one from every wedding you remember.', price: 3200, art: 'rice', popular: true, options: [SPICE, PROTEIN] },
        { id: 'jr-ofada', name: 'Ofada & Ayamase', description: 'Local rice with green pepper stew.', price: 4500, art: 'stew', options: [PROTEIN] },
      ],
    },
  ],
  'bole-junction': [
    {
      category: 'Popular',
      items: [
        { id: 'bj-bole', name: 'Bole & Fish', description: 'Roasted plantain, grilled fish and pepper sauce.', price: 4000, art: 'plantain', popular: true, options: [SPICE] },
        { id: 'bj-yam', name: 'Roasted Yam & Palm Oil Sauce', description: 'Fire-roasted yam with ugba.', price: 2500, art: 'plantain' },
      ],
    },
    {
      category: 'Add-ons',
      items: [
        { id: 'bj-corn', name: 'Roasted Corn & Pear', description: 'Seasonal, two cobs.', price: 1200, art: 'corn' },
      ],
    },
  ],
  'zobo-and-co': [
    {
      category: 'Popular',
      items: [
        { id: 'zc-zobo', name: 'Zobo', description: 'Hibiscus, ginger, pineapple and cloves.', price: 1000, art: 'zobo', popular: true, options: [SIZE] },
        { id: 'zc-kunu', name: 'Kunu Aya', description: 'Tiger nut and date milk.', price: 1200, art: 'drink', options: [SIZE] },
      ],
    },
    {
      category: 'Fresh juice',
      items: [
        { id: 'zc-pineapple', name: 'Pineapple Ginger', description: 'Pressed daily, no added sugar.', price: 1500, art: 'juice', options: [SIZE] },
        { id: 'zc-chapman', name: 'Chapman', description: 'Classic Nigerian mocktail.', price: 1800, art: 'zobo' },
      ],
    },
  ],
}
