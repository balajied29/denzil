"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { Photo } from "@/lib/photos";

/** Swipeable filmstrip; tapping a frame opens it full screen. */
export default function Gallery({ photos }: { photos: Photo[] }) {
  const strip = useRef<HTMLUListElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);

  const show = (i: number) => {
    setIndex(i);
    dialog.current?.showModal();
  };
  const step = (d: number) => setIndex((i) => (i + d + photos.length) % photos.length);
  const scrollBy = (d: number) => {
    const el = strip.current;
    if (el) el.scrollBy({ left: d * el.clientWidth * 0.7, behavior: "smooth" });
  };
  const current = photos[index];

  return (
    <>
      <div className="relative">
        <ul
          ref={strip}
          className="no-scrollbar flex snap-x snap-mandatory items-center gap-4 overflow-x-auto scroll-smooth px-[12vw] pb-2 sm:gap-6 lg:px-[calc(50vw-30rem)]"
        >
          {photos.map((p, i) => (
            <li key={p.src.src} className="shrink-0 snap-center">
              <button
                type="button"
                onClick={() => show(i)}
                className="group block overflow-hidden bg-maroon-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-soft"
                aria-label={`View photo ${i + 1} of ${photos.length}: ${p.alt}`}
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  placeholder="blur"
                  quality={90}
                  sizes={p.wide ? "(max-width: 640px) 90vw, 40rem" : "(max-width: 640px) 76vw, 22rem"}
                  className={`h-[min(68svh,30rem)] w-auto object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04] ${
                    p.wide ? "aspect-[3/2] max-w-[88vw]" : "aspect-[2/3]"
                  }`}
                />
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex items-center justify-center gap-6 text-gold-soft">
          <button type="button" onClick={() => scrollBy(-1)} aria-label="Scroll photos left" className="px-3 py-2 font-serif text-3xl leading-none hover:text-cream">
            ‹
          </button>
          <span className="eyebrow text-cream/60 [--eyebrow-size:0.62rem]">Swipe</span>
          <button type="button" onClick={() => scrollBy(1)} aria-label="Scroll photos right" className="px-3 py-2 font-serif text-3xl leading-none hover:text-cream">
            ›
          </button>
        </div>
      </div>

      <dialog
        ref={dialog}
        aria-label="Photo viewer"
        onClick={(e) => e.target === e.currentTarget && dialog.current?.close()}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-transparent p-0 backdrop:bg-[#1f0a0d]/92 backdrop:backdrop-blur-sm"
      >
        <div
          className="flex h-full w-full items-center justify-center p-4 sm:p-10"
          onClick={(e) => e.target === e.currentTarget && dialog.current?.close()}
        >
          <Image
            key={current.src.src}
            src={current.src}
            alt={current.alt}
            placeholder="blur"
            quality={90}
            sizes="100vw"
            className="max-h-full w-auto max-w-full object-contain shadow-2xl"
            style={{ aspectRatio: `${current.src.width} / ${current.src.height}` }}
          />
        </div>
        <button
          type="button"
          onClick={() => dialog.current?.close()}
          className="eyebrow fixed right-4 top-4 px-3 py-2 text-cream/90 hover:text-cream"
          autoFocus
        >
          Close
        </button>
        <button
          type="button"
          onClick={() => step(-1)}
          aria-label="Previous photo"
          className="fixed left-2 top-1/2 -translate-y-1/2 px-3 py-6 font-serif text-4xl text-cream/80 hover:text-cream"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={() => step(1)}
          aria-label="Next photo"
          className="fixed right-2 top-1/2 -translate-y-1/2 px-3 py-6 font-serif text-4xl text-cream/80 hover:text-cream"
        >
          ›
        </button>
        <p className="eyebrow fixed bottom-5 left-0 right-0 text-center text-cream/70">
          {index + 1} / {photos.length}
        </p>
      </dialog>
    </>
  );
}
