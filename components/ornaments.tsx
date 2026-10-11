import type { EventIcon } from "@/lib/site";

type P = { className?: string };

// Cubic bezier helpers so leaves can be laid along the stem instead of
// hand-placed; the result is deterministic, so it renders on the server.
type Pt = [number, number];
const bez = (a: Pt, b: Pt, c: Pt, d: Pt, t: number): Pt => {
  const u = 1 - t;
  return [
    u * u * u * a[0] + 3 * u * u * t * b[0] + 3 * u * t * t * c[0] + t * t * t * d[0],
    u * u * u * a[1] + 3 * u * u * t * b[1] + 3 * u * t * t * c[1] + t * t * t * d[1],
  ];
};
const tangent = (a: Pt, b: Pt, c: Pt, d: Pt, t: number) => {
  const u = 1 - t;
  const dx = 3 * u * u * (b[0] - a[0]) + 6 * u * t * (c[0] - b[0]) + 3 * t * t * (d[0] - c[0]);
  const dy = 3 * u * u * (b[1] - a[1]) + 6 * u * t * (c[1] - b[1]) + 3 * t * t * (d[1] - c[1]);
  return (Math.atan2(dy, dx) * 180) / Math.PI;
};

const LEAF = "M0 0 C5 -6.5 15 -7.5 23 0 C15 7.5 5 6.5 0 0 Z";

/**
 * Line-art vine like the corners of the card. Drawn in currentColor on the
 * page; the share-image generator passes an explicit `color` and `size`
 * because it renders outside the DOM.
 */
export function Vine({
  className,
  leaves = 11,
  color = "currentColor",
  size,
  style,
}: P & { leaves?: number; color?: string; size?: number; style?: React.CSSProperties }) {
  const a: Pt = [6, 194];
  const b: Pt = [40, 120];
  const c: Pt = [70, 40];
  const d: Pt = [194, 10];
  const fr = (n: number) => Math.round(n * 100) / 100;
  const items = Array.from({ length: leaves }, (_, i) => {
    const t = 0.08 + (i / (leaves - 1)) * 0.86;
    const [x, y] = bez(a, b, c, d, t);
    const side = i % 2 === 0 ? -1 : 1;
    const ang = tangent(a, b, c, d, t) + side * 52;
    const s = 1.05 - t * 0.45;
    return { x: fr(x), y: fr(y), ang: fr(ang), s: fr(s), k: i };
  });
  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      fill="none"
      stroke={color}
      className={className}
      style={style}
      aria-hidden
    >
      <path d={`M${a} C${b} ${c} ${d}`} strokeWidth="1.1" strokeLinecap="round" />
      {items.map((l) => (
        <g key={l.k} transform={`translate(${l.x} ${l.y}) rotate(${l.ang}) scale(${l.s})`}>
          <path d={LEAF} strokeWidth="1" strokeLinejoin="round" />
          <path d="M2 0 L18 0" strokeWidth="0.6" opacity="0.7" />
        </g>
      ))}
      <circle cx={d[0]} cy={d[1]} r="2.2" fill={color} stroke="none" />
    </svg>
  );
}

/** Rule — leaf sprig — rule. */
export function Divider({ className }: P) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className ?? ""}`} aria-hidden>
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-current opacity-50" />
      <svg viewBox="0 0 64 20" width="64" height="20" fill="none" stroke="currentColor">
        <path d="M4 10 H60" strokeWidth="0.9" />
        {[
          [14, -1],
          [24, 1],
          [32, -1],
          [40, 1],
          [50, -1],
        ].map(([x, s], i) => (
          <g key={i} transform={`translate(${x} 10) rotate(${s * -38}) scale(${i === 2 ? 0.5 : 0.42})`}>
            <path d={LEAF} strokeWidth="1.8" fill="currentColor" fillOpacity="0.18" />
          </g>
        ))}
      </svg>
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-current opacity-50" />
    </div>
  );
}

function Church() {
  return (
    <>
      <path d="M24 3v6M21.5 5.5h5" />
      <path d="M18 22 24 10l6 12" />
      <path d="M18 22v22h12V22" />
      <circle cx="24" cy="27" r="2.6" />
      <path d="M21.5 44v-7a2.5 2.5 0 0 1 5 0v7" />
      <path d="M18 30H8v14h10M30 30h10v14H30" />
      <path d="M8 30l5-5 5 5M30 30l5-5 5 5" />
      <path d="M11.5 36v4M35.5 36v4" />
      <path d="M5 44h38" />
    </>
  );
}

function Cheers() {
  return (
    <>
      <g transform="rotate(-16 17 26)">
        <path d="M12 12h10l-1.2 11a3.8 3.8 0 0 1-7.6 0Z" />
        <path d="M12.7 17.5h8.6" opacity="0.6" />
        <path d="M17 27v12M13 39h8" />
      </g>
      <g transform="rotate(16 31 26)">
        <path d="M26 12h10l-1.2 11a3.8 3.8 0 0 1-7.6 0Z" />
        <path d="M26.7 17.5h8.6" opacity="0.6" />
        <path d="M31 27v12M27 39h8" />
      </g>
      <path d="M24 3v4M19 5l1.6 2.6M29 5l-1.6 2.6" />
    </>
  );
}

function Envelope() {
  return (
    <>
      <rect x="6" y="12" width="36" height="25" rx="1.5" />
      <path d="M6 13.5 24 27l18-13.5" />
      <path d="M6 36l13-11.5M42 36 29 24.5" opacity="0.6" />
      <path
        d="M24 33.2s-3.6-2.2-3.6-4.6a1.9 1.9 0 0 1 3.6-.9 1.9 1.9 0 0 1 3.6.9c0 2.4-3.6 4.6-3.6 4.6Z"
        fill="currentColor"
        fillOpacity="0.15"
      />
    </>
  );
}

const ICONS = { church: Church, cheers: Cheers, envelope: Envelope } as const;

export function Icon({ name, className }: P & { name: EventIcon | "envelope" }) {
  const Glyph = ICONS[name];
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <Glyph />
    </svg>
  );
}

export function Pin({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className={className} aria-hidden>
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" />
      <circle cx="12" cy="10" r="2.3" />
    </svg>
  );
}

/**
 * Script monogram set the way the card does it: C high-left, D low-right.
 * Both letters share one grid cell and are pushed apart by equal and opposite
 * offsets, so the pair stays centred in whatever circle or card holds it.
 */
export function Monogram({ first, second, className }: P & { first: string; second: string }) {
  return (
    <span
      role="img"
      aria-label={`${first} ${second}`}
      className={`inline-grid place-items-center px-[0.2em] py-[0.12em] font-script leading-none ${className ?? ""}`}
    >
      <span aria-hidden className="col-start-1 row-start-1 -translate-x-[0.2em] -translate-y-[0.14em]">
        {first}
      </span>
      <span aria-hidden className="col-start-1 row-start-1 translate-x-[0.2em] translate-y-[0.14em]">
        {second}
      </span>
    </span>
  );
}

/** Corner dots for the double-rule `.frame`. */
export function FrameDots() {
  return (
    <>
      <span className="dot tl" aria-hidden />
      <span className="dot tr" aria-hidden />
      <span className="dot bl" aria-hidden />
      <span className="dot br" aria-hidden />
    </>
  );
}
