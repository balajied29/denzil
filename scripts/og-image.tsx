// Renders the link-preview card (what WhatsApp, iMessage etc. show when the
// invitation link is shared) and saves it as app/opengraph-image.jpg.
//
//   npm run og
//
// It's a script rather than a generated opengraph-image.tsx route because
// ImageResponse only emits PNG (~370 KB here). Link previews are fetched by
// crawlers with tight size limits, and WhatsApp in particular is unreliable
// with large images, so we ship a ~100 KB JPEG instead.

import { ImageResponse } from "next/og";
import sharp from "sharp";
import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { Vine } from "@/components/ornaments";
import { site } from "@/lib/site";

const W = 1200;
const H = 630;

const MAROON = "#5c1b21";
const WINE = "#3f1519";
const ROSE = "#8a4a4e";
const GOLD = "#b08a52";
const CREAM = "#fffbea";
const IVORY = "#fbf5e8";

const root = process.cwd();
const asset = (p: string) => readFile(join(root, "assets", p));

/** Splits a phrase into two lines of roughly equal length. */
function balance(text: string): string[] {
  const words = text.split(" ");
  let best = [text];
  let bestLen = Infinity;
  for (let i = 1; i < words.length; i++) {
    const a = words.slice(0, i).join(" ");
    const b = words.slice(i).join(" ");
    const len = Math.max(a.length, b.length);
    if (len < bestLen) [best, bestLen] = [[a, b], len];
  }
  return best;
}

const eyebrow = {
  fontFamily: "Jost",
  fontSize: 15,
  letterSpacing: 5,
  textTransform: "uppercase",
  color: ROSE,
} as const;

const rule = { width: 64, height: 1, background: GOLD, margin: "18px 0" };

const box = (inset: number) => ({ position: "absolute", top: inset, left: inset, right: inset, bottom: inset }) as const;

function Dot({ x, y }: { x: "left" | "right"; y: "top" | "bottom" }) {
  return (
    <div
      style={{
        position: "absolute",
        [x]: 14,
        [y]: 14,
        width: 13,
        height: 13,
        borderRadius: 13,
        border: `1.5px solid ${MAROON}`,
        background: IVORY,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ width: 5, height: 5, borderRadius: 5, background: MAROON }} />
    </div>
  );
}

function Card({ archSrc }: { archSrc: string }) {
  const ceremony = site.events[0];
  return (
    <div style={{ width: W, height: H, display: "flex", position: "relative", background: IVORY, fontFamily: "Cormorant", color: WINE }}>
      {/* Double rule with corner dots, as on the printed card's second face */}
      <div style={{ ...box(20), border: `1.5px solid ${MAROON}`, display: "flex" }} />
      <div style={{ ...box(28), border: "1px solid rgba(92,27,33,0.4)", display: "flex" }} />
      <Dot x="left" y="top" />
      <Dot x="right" y="top" />
      <Dot x="left" y="bottom" />
      <Dot x="right" y="bottom" />

      <Vine size={128} color={GOLD} style={{ position: "absolute", left: 40, top: 40 }} />
      <Vine size={128} color={GOLD} style={{ position: "absolute", right: 40, bottom: 40, transform: "rotate(180deg)" }} />

      <div style={{ position: "absolute", top: 0, left: 0, width: W, height: H, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 350, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={eyebrow}>{site.occasion}</div>
          <div style={{ fontFamily: "Pinyon", fontSize: 100, color: MAROON, lineHeight: 1.2, marginTop: 6 }}>{site.couple.first}</div>
          <div style={rule} />
          <div style={{ fontSize: 32, letterSpacing: 9 }}>{site.date.dotted}</div>
        </div>

        <div
          style={{
            display: "flex",
            padding: 10,
            margin: "0 14px",
            background: CREAM,
            border: `1.5px solid ${GOLD}`,
            borderRadius: "170px 170px 0 0",
            boxShadow: "0 24px 40px -18px rgba(63,21,25,0.45)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain img only */}
          <img src={archSrc} alt="" width={320} height={444} style={{ objectFit: "cover", borderRadius: "160px 160px 0 0" }} />
        </div>

        <div style={{ width: 350, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ fontFamily: "Pinyon", fontSize: 100, color: MAROON, lineHeight: 1.2 }}>{site.couple.second}</div>
          <div style={rule} />
          {balance(ceremony.venue).map((line) => (
            <div key={line} style={{ fontFamily: "Cormorant Italic", fontSize: 27, lineHeight: 1.25 }}>
              {line}
            </div>
          ))}
          <div style={{ fontFamily: "Cormorant Italic", fontSize: 23, color: ROSE, marginTop: 6 }}>{ceremony.area}</div>
          <div style={{ ...eyebrow, marginTop: 18 }}>{`${site.date.day} · ${ceremony.time}`}</div>
        </div>
      </div>
    </div>
  );
}

async function main() {
  const [pinyon, cormorant, cormorantItalic, jost, arch] = await Promise.all([
    asset("fonts/PinyonScript-Regular.ttf"),
    asset("fonts/CormorantGaramond-Medium.ttf"),
    asset("fonts/CormorantGaramond-MediumItalic.ttf"),
    asset("fonts/Jost-Regular.ttf"),
    asset("og/arch.jpg"),
  ]);

  const png = await new ImageResponse(<Card archSrc={`data:image/jpeg;base64,${arch.toString("base64")}`} />, {
    width: W,
    height: H,
    fonts: [
      { name: "Pinyon", data: pinyon, weight: 400, style: "normal" },
      { name: "Cormorant", data: cormorant, weight: 500, style: "normal" },
      { name: "Cormorant Italic", data: cormorantItalic, weight: 500, style: "italic" },
      { name: "Jost", data: jost, weight: 400, style: "normal" },
    ],
  }).arrayBuffer();

  const jpg = await sharp(Buffer.from(png)).jpeg({ quality: 86, mozjpeg: true }).toBuffer();
  const out = join(root, "app", "opengraph-image.jpg");
  await writeFile(out, jpg);
  await writeFile(
    join(root, "app", "opengraph-image.alt.txt"),
    `${site.couple.first} & ${site.couple.second} — Holy Matrimony, ${site.date.day} ${site.date.long}, ${site.events[0].venue}, ${site.date.city}`,
  );
  console.log(`wrote ${out} (${Math.round(jpg.length / 1024)} KB)`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
