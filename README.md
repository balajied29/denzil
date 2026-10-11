# Cordelia & Denzil — wedding invitation

Single-page invitation for the Holy Matrimony of Cordelia Ridashisha Lyngdoh and
Denzil Dapbiang Tanglieh, Saturday 14th November 2026, Shillong.

Next.js 16 (App Router) + React 19 + Tailwind CSS v4.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

## Where things live

| What | File |
| --- | --- |
| Every word on the page (names, parents, venues, times, verse, gift note) | `lib/site.ts` |
| Photos and their alt text | `assets/photos/`, `lib/photos.ts` |
| Page sections | `app/page.tsx` |
| Sealed-envelope cover, scroll reveals, music button | `components/shell.tsx` |
| Vines, icons, monogram, frame | `components/ornaments.tsx` |
| Colours and fonts | `app/globals.css` (`@theme`), `app/layout.tsx` |
| Link preview for WhatsApp etc. | `app/opengraph-image.jpg` |

Wording follows the printed card exactly; edit `lib/site.ts` rather than the
components. The countdown runs to the ceremony start, `date.countdownTo`.

## Background music

None is bundled. Put an mp3 in `public/music/` and set `music` in `lib/site.ts`
to its path (for example `"/music/song.mp3"`); a play/pause button then appears
and the track starts when the guest opens the envelope.

## Photos

Exported from the photographer's originals (Adobe RGB) to sRGB JPEGs: the hero
at 3600 px tall, the rest at 2400 px on the long edge. Next serves them at
quality 90 (`images.qualities` in `next.config.ts`); the default 75 visibly
softened faces.
