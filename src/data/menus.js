const photo = (name) => `/images/dishes/${name}.webp`

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
        { id: 'mn-jollof', name: 'Firewood Jollof & Fish', description: 'Smoky party jollof with grilled fish and fried plantain.', price: 4500, image: photo('firewood-jollof'), popular: true, options: [SPICE, PROTEIN] },
        { id: 'mn-fried-rice', name: 'Nigerian Fried Rice', description: 'Mixed veg, sweetcorn, peas and carrots.', price: 3800, image: photo('fried-rice'), options: [PROTEIN, SIDES] },
      ],
    },
    {
      category: 'Rice',
      items: [
        { id: 'mn-white-stew', name: 'White Rice & Chicken Stew', description: 'Fluffy white rice, tomato stew, boiled egg.', price: 4200, image: photo('rice-and-stew'), options: [PROTEIN, SIDES] },
        { id: 'mn-party', name: 'Party Jollof (Large)', description: 'The real party pot. Feeds two.', price: 6500, image: photo('jollof-tray'), options: [SPICE, PROTEIN] },
      ],
    },
    {
      category: 'Extras',
      items: [
        { id: 'mn-dodo', name: 'Dodo', description: 'Sweet fried ripe plantain.', price: 1000, image: photo('dodo') },
        { id: 'mn-platter', name: 'Moi Moi & Plantain Platter', description: 'Moi moi, boiled egg, dodo and pepper sauce.', price: 3500, image: photo('swallow-platter') },
      ],
    },
  ],
  'arewa-suya': [
    {
      category: 'Popular',
      items: [
        { id: 'as-suya-jollof', name: 'Suya Skewers & Jollof', description: 'Yaji-spiced beef skewers on a bed of jollof.', price: 4800, image: photo('suya-jollof'), popular: true, options: [SPICE] },
        { id: 'as-chicken', name: 'Grilled Chicken & Rice', description: 'Half chicken, charcoal grilled, with jollof.', price: 5500, image: photo('grilled-chicken'), options: [SPICE] },
      ],
    },
    {
      category: 'Grill',
      items: [
        { id: 'as-fish', name: 'Grilled Fish Platter', description: 'Whole fish, skewers, jollof and fresh salad.', price: 7500, image: photo('jollof-fish'), options: [SPICE] },
        { id: 'as-goat', name: 'Peppered Goat Meat', description: 'Goat meat in rich pepper sauce with potatoes.', price: 4000, image: photo('goat-stew'), options: [SPICE] },
      ],
    },
  ],
  'calabar-pot': [
    {
      category: 'Popular',
      items: [
        { id: 'cp-afang', name: 'Afang Soup & Fufu', description: 'Afang and waterleaf, periwinkle and assorted meat.', price: 5500, image: photo('afang'), popular: true, options: [SWALLOW] },
        { id: 'cp-egusi', name: 'Egusi Soup', description: 'Melon seed soup with assorted meat and stockfish.', price: 4800, image: photo('egusi'), options: [SWALLOW] },
      ],
    },
    {
      category: 'Soups',
      items: [
        { id: 'cp-pepper', name: 'Fish Pepper Soup', description: 'Fresh fish, uziza and scent leaf.', price: 6500, image: photo('fish-pepper-soup'), options: [SPICE] },
        { id: 'cp-egg', name: 'Ofe Akwu with Egg', description: 'Palm nut soup with boiled egg.', price: 4500, image: photo('egg-stew'), options: [SWALLOW] },
        { id: 'cp-goat', name: 'Goat Meat Stew', description: 'Slow-cooked goat meat and yam chunks.', price: 5000, image: photo('goat-stew'), options: [SWALLOW] },
      ],
    },
  ],
  'tuwo-corner': [
    {
      category: 'Popular',
      items: [
        { id: 'tc-tuwo', name: 'Tuwo & Soup Combo', description: 'Tuwo shinkafa with miyan kuka and miyan taushe.', price: 3000, image: photo('soup-bowls'), popular: true },
        { id: 'tc-masa', name: 'Masa (6 pcs)', description: 'Fermented rice cakes with yaji.', price: 1500, image: photo('small-chops') },
      ],
    },
    {
      category: 'Northern classics',
      items: [
        { id: 'tc-jollof', name: 'Garau Garau', description: 'Rice and beans with spiced oil and onions.', price: 2500, image: photo('spiced-rice'), options: [PROTEIN] },
        { id: 'tc-platter', name: 'Tuwo Platter', description: 'Tuwo, plantain, egg and two soups.', price: 4500, image: photo('swallow-platter') },
      ],
    },
  ],
  'puff-and-chops': [
    {
      category: 'Popular',
      items: [
        { id: 'pc-puff', name: 'Puff-Puff (10 pcs)', description: 'Soft, sweet and freshly fried.', price: 1200, image: photo('puff-puff'), popular: true },
        { id: 'pc-pack', name: 'Small Chops Pack', description: 'Puff-puff, samosa, spring roll and gizzard.', price: 5000, image: photo('small-chops') },
      ],
    },
    {
      category: 'Pastries',
      items: [
        { id: 'pc-meatpie', name: 'Meat Pie', description: 'Buttery crust, minced beef and potato.', price: 900, image: photo('meat-pie') },
        { id: 'pc-roll', name: 'Fish Roll Basket', description: 'Four fish rolls with chips and coleslaw.', price: 3500, image: photo('pastry-basket') },
        { id: 'pc-chin', name: 'Buns (6 pcs)', description: 'Crunchy outside, soft inside.', price: 1500, image: photo('chin-chin') },
      ],
    },
  ],
  'jollof-republic': [
    {
      category: 'Popular',
      items: [
        { id: 'jr-party', name: 'Party Jollof', description: 'The one from every wedding you remember.', price: 3200, image: photo('jollof-tray'), popular: true, options: [SPICE, PROTEIN] },
        { id: 'jr-chicken', name: 'Jollof & Roast Chicken', description: 'Quarter chicken, roasted till crispy.', price: 4800, image: photo('grilled-chicken'), options: [SPICE] },
      ],
    },
  ],
  'bole-junction': [
    {
      category: 'Popular',
      items: [
        { id: 'bj-bole', name: 'Bole & Fish', description: 'Roasted plantain, grilled fish, pepper sauce and onions.', price: 4000, image: photo('bole-fish'), popular: true, options: [SPICE] },
        { id: 'bj-tilapia', name: 'Grilled Tilapia', description: 'Whole tilapia, lemon and fresh tomato.', price: 6000, image: photo('grilled-tilapia'), options: [SPICE] },
      ],
    },
    {
      category: 'Sides',
      items: [
        { id: 'bj-plantain', name: 'Fried Plantain (Tray)', description: 'Party tray of golden dodo.', price: 3000, image: photo('fried-plantain') },
      ],
    },
  ],
  'zobo-and-co': [
    {
      category: 'Popular',
      items: [
        { id: 'zc-zobo', name: 'Zobo', description: 'Hibiscus, ginger, pineapple and cloves.', price: 1000, image: photo('zobo'), popular: true, options: [SIZE] },
        { id: 'zc-chapman', name: 'Chapman', description: 'Classic Nigerian mocktail with cucumber and citrus.', price: 1800, image: photo('chapman'), options: [SIZE] },
      ],
    },
    {
      category: 'Hot drinks',
      items: [
        { id: 'zc-tea', name: 'Hot Zobo Tea', description: 'Warm hibiscus with ginger and honey.', price: 900, image: photo('zobo-tea') },
      ],
    },
  ],
}
