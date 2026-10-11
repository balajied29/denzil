"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";
import { FrameDots, Monogram, Vine } from "./ornaments";

type Phase = "closed" | "opening" | "open";

/**
 * Holds the sealed envelope cover, the scroll-reveal observer and the optional
 * music. The invitation itself is server-rendered underneath and kept inert
 * until the guest breaks the seal.
 */
export default function Shell({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<Phase>("closed");
  const [gateGone, setGateGone] = useState(false);
  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const opened = phase === "open";

  useEffect(() => {
    const root = document.documentElement;
    root.style.overflow = opened ? "" : "hidden";
    return () => {
      root.style.overflow = "";
    };
  }, [opened]);

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -6% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const open = () => {
    if (phase !== "closed") return;
    window.scrollTo({ top: 0 });
    setPhase("opening");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.setTimeout(() => setPhase("open"), reduced ? 0 : 1900);
    window.setTimeout(() => setGateGone(true), reduced ? 50 : 2800);
    if (audio.current) {
      audio.current.volume = 0.6;
      audio.current.play().then(
        () => setPlaying(true),
        () => setPlaying(false),
      );
    }
  };

  const toggleMusic = () => {
    const a = audio.current;
    if (!a) return;
    if (a.paused) a.play().then(() => setPlaying(true), () => {});
    else {
      a.pause();
      setPlaying(false);
    }
  };

  return (
    <div data-opened={opened}>
      <div inert={!opened}>{children}</div>

      {!gateGone && <Envelope phase={phase} onOpen={open} />}

      {site.music && (
        <>
          <audio ref={audio} src={site.music} loop preload="none" />
          <button
            type="button"
            onClick={toggleMusic}
            aria-label={playing ? "Pause music" : "Play music"}
            aria-pressed={playing}
            className={`fixed bottom-5 right-5 z-40 grid size-12 place-items-center rounded-full border border-gold/60 bg-cream/90 text-maroon shadow-[0_8px_24px_-8px_rgba(92,27,33,0.45)] backdrop-blur transition-opacity duration-700 ${
              opened ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <span className="flex h-4 items-end gap-[3px]" aria-hidden>
              {[0, 1, 2, 3].map((i) => (
                <span
                  key={i}
                  className="block h-full w-[2px] origin-bottom rounded-full bg-current"
                  style={{
                    animation: playing ? `eq 0.9s ease-in-out ${i * 0.15}s infinite` : "none",
                    transform: playing ? undefined : "scaleY(0.35)",
                  }}
                />
              ))}
            </span>
          </button>
        </>
      )}
    </div>
  );
}

const rise = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

function Envelope({ phase, onOpen }: { phase: Phase; onOpen: () => void }) {
  const { couple, date, monogram } = site;
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Invitation to the Holy Matrimony of ${couple.first} and ${couple.second}`}
      data-phase={phase}
      className="gate fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-maroon-deep px-6 text-cream"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_55%,rgba(255,251,234,0.10),transparent_60%)]" />
      <Vine className="sway pointer-events-none absolute -left-4 -top-4 w-40 text-gold-soft/35 sm:w-56" />
      <Vine className="sway pointer-events-none absolute -bottom-4 -right-4 w-40 rotate-180 text-gold-soft/35 sm:w-56" />

      <div className="gate-copy relative text-center">
        <p className="eyebrow gate-rise text-gold-soft" style={rise(100)}>
          {site.occasion}
        </p>
        <p className="gate-rise mt-3 font-script text-5xl leading-tight sm:text-6xl" style={rise(300)}>
          {couple.first} <span className="font-serif text-3xl italic text-gold-soft">&amp;</span> {couple.second}
        </p>
      </div>

      {/* The envelope: back, card, front pocket, flap, seal — stacked in that order. */}
      <div className="gate-rise relative mt-10 aspect-[7/5] w-[min(86vw,26rem)] [perspective:1400px]" style={rise(500)}>
        <div className="absolute inset-0 rounded-[3px] bg-[#eadcc0] shadow-[0_40px_70px_-25px_rgba(0,0,0,0.6)]" />

        <div className="env-card absolute inset-x-[7%] bottom-[5%] top-[6%] bg-maroon text-cream">
          <div className="frame absolute inset-2 text-gold-soft/60">
            <FrameDots />
          </div>
          <div className="flex h-full flex-col items-center justify-start pt-[9%]">
            <Monogram first={monogram.first} second={monogram.second} className="text-[3.4rem] sm:text-6xl" />
            <p className="mt-4 font-serif text-sm tracking-[0.3em] text-gold-soft">{date.dotted}</p>
          </div>
        </div>

        <svg className="absolute inset-0 z-[2] h-full w-full" viewBox="0 0 700 500" preserveAspectRatio="none" aria-hidden>
          <polygon points="0,0 0,500 345,268" fill="#f3e8d0" />
          <polygon points="700,0 700,500 355,268" fill="#f3e8d0" />
          <polygon points="0,500 700,500 350,236" fill="#f8efdb" />
          <polyline points="0,500 350,236 700,500" fill="none" stroke="#d9c6a1" strokeWidth="1.5" />
        </svg>

        <div className="env-flap absolute inset-x-0 top-0 h-[60%]">
          <svg className="h-full w-full drop-shadow-[0_6px_6px_rgba(60,20,20,0.18)]" viewBox="0 0 700 300" preserveAspectRatio="none" aria-hidden>
            <polygon points="0,0 700,0 350,300" fill="#efe2c6" />
            <polyline points="0,0 350,300 700,0" fill="none" stroke="#d6c29b" strokeWidth="1.5" />
          </svg>
        </div>

        <button
          type="button"
          onClick={onOpen}
          aria-label="Break the seal to open the invitation"
          className="env-seal absolute left-1/2 top-[60%] z-[5] grid size-[5.5rem] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-soft"
        >
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full drop-shadow-[0_6px_8px_rgba(40,8,12,0.45)]" aria-hidden>
            <defs>
              <radialGradient id="wax" cx="38%" cy="32%" r="75%">
                <stop offset="0%" stopColor="#8b2a33" />
                <stop offset="55%" stopColor="#661d25" />
                <stop offset="100%" stopColor="#3f1016" />
              </radialGradient>
            </defs>
            <path
              d="M50 3c6 0 8 4 13 5s10-1 13 3 2 9 6 12 9 3 10 8-3 8-3 13 4 9 2 13-7 4-9 8-1 9-5 12-9 0-13 3-6 8-12 8-8-4-13-5-10 1-13-3-2-9-6-12-9-3-10-8 3-8 3-13-4-9-2-13 7-4 9-8 1-9 5-12 9 0 13-3 6-8 13-8Z"
              fill="url(#wax)"
            />
            <circle cx="50" cy="50" r="31" fill="none" stroke="#e0bf86" strokeOpacity="0.55" strokeWidth="1.2" />
            <circle cx="50" cy="50" r="27.5" fill="none" stroke="#2c0a0e" strokeOpacity="0.35" strokeWidth="0.8" />
          </svg>
          <Monogram
            first={monogram.first}
            second={monogram.second}
            className="relative text-[2.1rem] text-[#ead3a2] [text-shadow:0_1px_0_rgba(0,0,0,0.35)]"
          />
        </button>
      </div>

      <div className="gate-copy relative mt-10 text-center">
        <p className="gate-rise font-serif text-lg tracking-[0.3em] text-cream/85" style={rise(800)}>
          {date.dotted}
        </p>
        <p className="eyebrow gate-rise tap-hint mt-5 text-gold-soft [--eyebrow-size:0.65rem]" style={rise(1000)}>
          Tap the seal to open
        </p>
      </div>
    </div>
  );
}
