// Flat top-down plate illustrations. Food colours are illustration-only (see BRAND.md).
const FOOD = {
  rice: '#E0782F',
  riceLight: '#F0A25A',
  stew: '#B23A1A',
  plantain: '#E9B949',
  plantainDark: '#C98A2B',
  greens: '#4F8A3C',
  greensLight: '#7DB35F',
  meat: '#7A3B22',
  swallow: '#F1E6CF',
  bowl: '#FFFFFF',
  rim: '#EDE3D6',
  white: '#FAF7F0',
  carrot: '#F08A2C',
  pea: '#6DA544',
  pastry: '#D9A35A',
  pastryDark: '#B97F38',
  zobo: '#8E1B3A',
  kunu: '#EADBC0',
  juice: '#F6C23E',
  glass: '#DCEBEF',
}

// Deterministic scatter so every render looks the same.
function scatter(count, radius, seed = 1, cx = 60, cy = 60) {
  const points = []
  let s = seed
  const rand = () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
  for (let i = 0; i < count; i++) {
    const a = rand() * Math.PI * 2
    const r = Math.sqrt(rand()) * radius
    points.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r, rand() * 180])
  }
  return points
}

const Plate = ({ children }) => (
  <>
    <circle cx="60" cy="60" r="56" fill={FOOD.bowl} />
    <circle cx="60" cy="60" r="46" fill="none" stroke={FOOD.rim} strokeWidth="2" />
    {children}
  </>
)

const Bowl = ({ fill, children }) => (
  <>
    <circle cx="60" cy="60" r="56" fill={FOOD.bowl} />
    <circle cx="60" cy="60" r="44" fill={fill} />
    {children}
  </>
)

const Glass = ({ fill, children }) => (
  <>
    <circle cx="60" cy="60" r="40" fill={FOOD.glass} />
    <circle cx="60" cy="60" r="33" fill={fill} />
    {children}
  </>
)

const Grains = ({ color, count = 70, radius = 30, cx, cy, seed }) =>
  scatter(count, radius, seed, cx, cy).map(([x, y, rot], i) => (
    <ellipse key={i} cx={x} cy={y} rx="2.6" ry="1.2" fill={color} transform={`rotate(${rot} ${x} ${y})`} />
  ))

const Plantains = ({ x = 78, y = 74 }) => (
  <g>
    {[0, 1, 2].map((i) => (
      <ellipse key={i} cx={x + i * 7 - 7} cy={y - i * 4} rx="7" ry="4.5" fill={FOOD.plantain} stroke={FOOD.plantainDark} strokeWidth="1.2" transform={`rotate(-25 ${x + i * 7 - 7} ${y - i * 4})`} />
    ))}
  </g>
)

const Leaves = ({ seed = 3 }) =>
  scatter(12, 30, seed).map(([x, y, rot], i) => (
    <ellipse key={i} cx={x} cy={y} rx="6" ry="3" fill={i % 2 ? FOOD.greens : FOOD.greensLight} transform={`rotate(${rot} ${x} ${y})`} />
  ))

const Meat = ({ seed = 7, count = 4, radius = 26 }) =>
  scatter(count, radius, seed).map(([x, y, rot], i) => (
    <rect key={i} x={x - 6} y={y - 4.5} width="12" height="9" rx="3" fill={FOOD.meat} transform={`rotate(${rot} ${x} ${y})`} />
  ))

const ART = {
  rice: () => (
    <Plate>
      <circle cx="54" cy="56" r="34" fill={FOOD.rice} />
      <Grains color={FOOD.riceLight} cx={54} cy={56} seed={2} />
      <Plantains />
    </Plate>
  ),
  friedRice: () => (
    <Plate>
      <circle cx="60" cy="60" r="36" fill="#E9C46A" />
      <Grains color="#F6DE9A" cx={60} cy={60} radius={32} seed={4} />
      {scatter(14, 30, 11).map(([x, y], i) => (
        <rect key={i} x={x - 2} y={y - 2} width="4" height="4" rx="1" fill={i % 2 ? FOOD.carrot : FOOD.pea} />
      ))}
    </Plate>
  ),
  stew: () => (
    <Plate>
      <circle cx="48" cy="58" r="28" fill={FOOD.white} />
      <Grains color="#E8E0CF" cx={48} cy={58} radius={24} count={45} seed={5} />
      <circle cx="78" cy="58" r="20" fill={FOOD.stew} />
      <Meat seed={8} count={3} radius={10} />
    </Plate>
  ),
  plantain: () => (
    <Plate>
      <Plantains x={52} y={58} />
      <Plantains x={70} y={72} />
      <circle cx="78" cy="42" r="10" fill={FOOD.stew} />
    </Plate>
  ),
  moimoi: () => (
    <Plate>
      <path d="M38 48 Q60 30 82 48 L76 80 Q60 88 44 80 Z" fill="#D9824A" />
      <circle cx="60" cy="60" r="6" fill="#F5D56B" />
    </Plate>
  ),
  suya: () => (
    <Plate>
      {[38, 52, 66].map((y, i) => (
        <g key={y}>
          <line x1="24" y1={y + 6} x2="96" y2={y - 6} stroke="#C8A27A" strokeWidth="2" strokeLinecap="round" />
          {[0, 1, 2, 3].map((j) => (
            <rect key={j} x={34 + j * 14} y={y + 1 - j * 2.3} width="11" height="9" rx="2" fill={FOOD.meat} transform={`rotate(-9 ${40 + j * 14} ${y + 5})`} opacity={1 - i * 0.08} />
          ))}
        </g>
      ))}
      {scatter(10, 30, 21).map(([x, y], i) => (
        <circle key={i} cx={x} cy={y + 10} r="2.2" fill={i % 2 ? '#F3E2E8' : '#E05A3A'} />
      ))}
    </Plate>
  ),
  soup: () => (
    <Bowl fill="#3F6B2E">
      <Leaves />
      <Meat seed={12} />
    </Bowl>
  ),
  egusi: () => (
    <Bowl fill="#D89A3C">
      {scatter(28, 34, 9).map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3.2" fill="#F2D18A" />
      ))}
      <Leaves seed={14} />
      <Meat seed={15} count={3} />
    </Bowl>
  ),
  pepperSoup: () => (
    <Bowl fill="#A8461F">
      <ellipse cx="60" cy="60" rx="26" ry="11" fill="#6E5A4B" transform="rotate(-20 60 60)" />
      <circle cx="46" cy="66" r="3" fill="#2A2420" />
      {scatter(8, 32, 6).map(([x, y, rot], i) => (
        <ellipse key={i} cx={x} cy={y} rx="5" ry="2.4" fill={FOOD.greensLight} transform={`rotate(${rot} ${x} ${y})`} />
      ))}
    </Bowl>
  ),
  swallow: () => (
    <Plate>
      <ellipse cx="46" cy="58" rx="22" ry="20" fill={FOOD.swallow} />
      <ellipse cx="40" cy="52" rx="8" ry="5" fill="#FFFDF7" />
      <circle cx="80" cy="62" r="20" fill="#5D7A2F" />
      <Leaves seed={19} />
    </Plate>
  ),
  snack: () => (
    <Plate>
      {scatter(9, 26, 31).map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="9" fill={FOOD.pastry} />
          <circle cx={x - 2.5} cy={y - 2.5} r="3" fill="#E9C188" />
        </g>
      ))}
    </Plate>
  ),
  pie: () => (
    <Plate>
      <path d="M30 70 A30 30 0 0 1 90 70 Z" fill={FOOD.pastry} />
      <path d="M30 70 A30 30 0 0 1 90 70" fill="none" stroke={FOOD.pastryDark} strokeWidth="5" strokeDasharray="2 5" strokeLinecap="round" />
    </Plate>
  ),
  corn: () => (
    <Plate>
      {[46, 72].map((x) => (
        <g key={x} transform={`rotate(-30 ${x} 60)`}>
          <rect x={x - 9} y="30" width="18" height="60" rx="9" fill="#F0C94C" />
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <line key={i} x1={x - 8} x2={x + 8} y1={38 + i * 7.5} y2={38 + i * 7.5} stroke="#C98A2B" strokeWidth="1" />
          ))}
        </g>
      ))}
    </Plate>
  ),
  drink: () => (
    <Glass fill={FOOD.kunu}>
      <circle cx="50" cy="52" r="6" fill="#FFFFFF" opacity="0.6" />
    </Glass>
  ),
  zobo: () => (
    <Glass fill={FOOD.zobo}>
      <rect x="54" y="38" width="12" height="12" rx="3" fill="#FFFFFF" opacity="0.35" transform="rotate(15 60 44)" />
      <circle cx="72" cy="66" r="7" fill="#F6C23E" />
    </Glass>
  ),
  juice: () => (
    <Glass fill={FOOD.juice}>
      <path d="M66 28 l8 -14" stroke="#4F8A3C" strokeWidth="4" strokeLinecap="round" />
      <circle cx="50" cy="52" r="6" fill="#FFFFFF" opacity="0.5" />
    </Glass>
  ),
}

export default function DishArt({ kind = 'rice', image, alt = '', className = '' }) {
  if (image) {
    return <img src={image} alt={alt} loading="lazy" className={`object-cover ${className}`} />
  }
  const Art = ART[kind] ?? ART.rice
  return (
    <svg viewBox="0 0 120 120" className={className} role={alt ? 'img' : undefined} aria-label={alt || undefined} aria-hidden={alt ? undefined : true}>
      <Art />
    </svg>
  )
}
