import Image from "next/image";
import Shell from "@/components/shell";
import Countdown from "@/components/countdown";
import Gallery from "@/components/gallery";
import { Divider, FrameDots, Icon, Monogram, Pin, Vine } from "@/components/ornaments";
import { gallery, heroPhoto } from "@/lib/photos";
import { site } from "@/lib/site";

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as React.CSSProperties;

/** Splits a line into words that fade in one after another. */
function Words({ text, offset = 0 }: { text: string; offset?: number }) {
  return text.split(" ").map((w, i) => (
    <span key={i} className="word" style={{ "--i": i + offset } as React.CSSProperties}>
      {w}
      {" "}
    </span>
  ));
}

export default function Home() {
  const { couple, date } = site;

  return (
    <Shell>
      <main className="overflow-x-clip">
        {/* ---------- Hero: photo full-bleed on phones, photo | maroon panel on desktop ---------- */}
        <section className="relative min-h-svh bg-maroon text-cream lg:grid lg:grid-cols-[1.05fr_1fr]">
          <div className="absolute inset-0 overflow-hidden lg:relative lg:inset-auto lg:min-h-svh">
            <Image
              src={heroPhoto.src}
              alt={heroPhoto.alt}
              placeholder="blur"
              preload
              fill
              quality={90}
              // Full-height cover on a phone renders the portrait ~1.5x wider than the screen.
              sizes="(max-width: 1024px) 150vw, 52vw"
              className="object-cover object-[50%_22%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-maroon via-maroon/55 via-35% to-transparent to-65% lg:hidden" />
            <div className="frame pointer-events-none absolute inset-3 text-cream/45 sm:inset-5">
              <FrameDots />
            </div>
          </div>

          <div className="relative flex min-h-svh flex-col items-center justify-end px-8 pb-24 text-center lg:justify-center lg:pb-0">
            <Vine className="sway pointer-events-none absolute right-6 top-6 hidden w-44 -scale-x-100 text-gold-soft/40 lg:block" />
            <Vine className="sway pointer-events-none absolute bottom-6 left-6 hidden w-44 -scale-y-100 text-gold-soft/40 lg:block" />

            <p data-intro style={delay(500)} className="eyebrow text-gold-soft">
              {site.occasion}
            </p>
            <h1 data-intro style={delay(700)} className="mt-4 font-script text-[3.6rem] leading-[1.08] sm:text-7xl xl:text-8xl">
              {couple.first}
              <span className="block font-serif text-3xl italic leading-tight text-gold-soft sm:text-4xl">&amp;</span>
              {couple.second}
            </h1>
            <div data-intro style={delay(950)} className="mt-8 flex items-center gap-4 text-gold-soft">
              <span className="h-px w-8 bg-current opacity-60 sm:w-14" />
              <span className="font-serif text-xl tracking-[0.28em] text-cream sm:text-2xl">{date.dotted}</span>
              <span className="h-px w-8 bg-current opacity-60 sm:w-14" />
            </div>
            <p data-intro style={delay(1150)} className="eyebrow mt-4 text-cream/75 [--eyebrow-size:0.68rem]">
              {date.city}, Meghalaya
            </p>

            <a
              href="#card"
              data-intro
              style={delay(1500)}
              aria-label="Scroll to the invitation"
              className="absolute bottom-7 left-1/2 -translate-x-1/2 text-gold-soft"
            >
              <span className="scroll-cue block h-9 w-px bg-current" />
            </a>
          </div>
        </section>

        {/* ---------- The card: a digital twin of the printed maroon face ---------- */}
        <section id="card" className="px-4 py-24 sm:py-32">
          <div data-reveal className="card-stack relative mx-auto max-w-[30rem]">
            <div className="card-back frame absolute inset-0 bg-cream text-maroon/70 shadow-[0_30px_60px_-35px_rgba(92,27,33,0.6)]" aria-hidden>
              <FrameDots />
            </div>
            <article className="card-front relative overflow-hidden bg-maroon px-7 pb-14 pt-16 text-center text-cream shadow-[0_40px_80px_-30px_rgba(63,21,25,0.75)] sm:px-12">
              <div className="frame pointer-events-none absolute inset-3 text-gold-soft/55" aria-hidden />
              <Vine className="pointer-events-none absolute left-4 top-4 w-28 text-gold-soft/70" />
              <Vine className="pointer-events-none absolute bottom-4 right-4 w-28 rotate-180 text-gold-soft/70" />

              <Monogram first={site.monogram.first} second={site.monogram.second} className="text-[5.5rem] sm:text-[6.5rem]" />

              <p className="mx-auto mt-10 max-w-xs font-serif text-lg italic leading-snug text-cream/90">{site.invitation}</p>

              <h2 className="mt-8 text-balance font-serif text-[1.75rem] font-semibold italic leading-tight sm:text-3xl">
                {couple.bride.fullName}
              </h2>
              <p className="mt-1.5 text-balance font-serif text-[0.95rem] italic text-cream/75">{couple.bride.parents}</p>

              <p className="my-3 font-serif text-2xl italic text-gold-soft">&amp;</p>

              <h2 className="text-balance font-serif text-[1.75rem] font-semibold italic leading-tight sm:text-3xl">
                {couple.groom.fullName}
              </h2>
              <p className="mt-1.5 text-balance font-serif text-[0.95rem] italic text-cream/75">{couple.groom.parents}</p>

              <p className="mt-9 font-serif text-lg italic text-cream/90">{date.day}</p>
              <p className="font-serif text-2xl italic">{date.long}</p>

              <Divider className="mt-10 text-gold-soft" />

              <blockquote className="mx-auto mt-8 max-w-xs">
                <p className="font-serif text-lg italic leading-snug text-cream/90">“{site.verse.text}”</p>
                <footer className="mt-4 font-serif italic text-gold-soft">— {site.verse.ref}</footer>
              </blockquote>
            </article>
          </div>
        </section>

        {/* ---------- Countdown ---------- */}
        <section className="bg-parchment px-6 py-20 text-center sm:py-24">
          <div data-reveal className="mx-auto max-w-2xl">
            <p className="font-script text-4xl text-maroon sm:text-5xl">Counting the days</p>
            <p className="eyebrow mt-3 text-rosewood">until we say “I do”</p>
            <div className="mt-10">
              <Countdown to={date.countdownTo} />
            </div>
          </div>
        </section>

        {/* ---------- Order of the day ---------- */}
        <section className="px-6 py-24 sm:py-32">
          <div className="text-center">
            <p data-reveal className="eyebrow text-rosewood">
              {date.day}, {date.long}
            </p>
            <h2 data-reveal style={delay(120)} className="mt-3 font-script text-[3.4rem] leading-tight text-maroon sm:text-7xl">
              Order of the Day
            </h2>
          </div>

          <ol className="relative mx-auto mt-16 max-w-xl">
            <span className="absolute bottom-10 left-7 top-10 w-px bg-gradient-to-b from-gold/0 via-gold/60 to-gold/0 sm:left-9" aria-hidden />
            {site.events.map((ev, i) => (
              <li
                key={ev.key}
                data-reveal
                style={delay(i * 160)}
                className="relative grid grid-cols-[3.5rem_1fr] gap-5 pb-16 last:pb-0 sm:grid-cols-[4.5rem_1fr] sm:gap-8"
              >
                <div className="relative z-10 grid size-14 place-items-center rounded-full border border-gold/60 bg-ivory text-maroon shadow-[0_0_0_6px_var(--color-ivory)] sm:size-[4.5rem]">
                  <Icon name={ev.icon} className="size-8 sm:size-10" />
                </div>
                <div className="pt-1">
                  <p className="font-serif text-[2rem] leading-none text-gold sm:text-4xl">{ev.time}</p>
                  <h3 className="mt-3 font-serif text-2xl font-semibold italic text-maroon sm:text-[1.7rem]">{ev.title}</h3>
                  <p className="mt-2 text-balance font-serif text-xl leading-snug text-wine">{ev.venue}</p>
                  <p className="font-serif text-lg italic text-wine/70">{ev.area}</p>
                  <a
                    href={ev.map}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="eyebrow mt-5 inline-flex items-center gap-2 border-b border-maroon/40 pb-1 text-maroon transition-colors [--eyebrow-size:0.68rem] hover:border-maroon"
                  >
                    <Pin className="size-4" />
                    Get directions
                  </a>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* ---------- Moments ---------- */}
        <section className="bg-wine py-24 text-cream sm:py-28">
          <div className="px-6 text-center">
            <p data-reveal className="eyebrow text-gold-soft">A few frames</p>
            <h2 data-reveal style={delay(120)} className="mt-3 font-script text-6xl sm:text-7xl">
              Moments
            </h2>
          </div>
          <div data-reveal style={delay(200)} className="mt-12">
            <Gallery photos={gallery} />
          </div>
        </section>

        {/* ---------- Gifts ---------- */}
        <section className="px-6 py-24 sm:py-32">
          <div data-reveal className="frame relative mx-auto max-w-xl bg-cream px-6 py-14 text-center text-maroon sm:px-12">
            <FrameDots />
            <Icon name="envelope" className="mx-auto size-14" />
            <h2 className="mt-4 font-serif text-[2rem] font-semibold italic">{site.gifts.title}</h2>
            <p className="mt-5 font-serif text-xl italic leading-relaxed text-wine sm:text-[1.4rem]">
              <span className="sr-only">{site.gifts.lines.join(" ")}</span>
              {site.gifts.lines.map((line, n) => (
                <span key={line} aria-hidden className="block">
                  <Words
                    text={line}
                    offset={site.gifts.lines.slice(0, n).reduce((sum, l) => sum + l.split(" ").length, 0)}
                  />
                </span>
              ))}
            </p>
          </div>
        </section>

        {/* ---------- Closing ---------- */}
        <footer className="relative overflow-hidden bg-maroon px-6 pb-16 pt-24 text-center text-cream sm:pt-32">
          <Vine className="sway pointer-events-none absolute -left-4 bottom-0 w-36 text-gold-soft/45 sm:w-52" />
          <Vine className="sway pointer-events-none absolute -right-4 bottom-0 w-36 -scale-x-100 text-gold-soft/45 sm:w-52" />
          <div data-reveal className="mx-auto grid size-24 place-items-center rounded-full border border-gold-soft/50">
            <Monogram first={site.monogram.first} second={site.monogram.second} className="text-[2.8rem] text-cream" />
          </div>
          <p data-reveal style={delay(150)} className="mt-10 font-serif text-xl italic text-cream/85">
            With joyful hearts,
          </p>
          <p data-reveal style={delay(300)} className="mt-3 font-script text-[3.2rem] leading-tight sm:text-7xl">
            {couple.first}
            <span className="mx-3 font-serif text-4xl italic text-gold-soft sm:text-5xl">&amp;</span>
            {couple.second}
          </p>
          <p data-reveal style={delay(450)} className="eyebrow mt-6 pb-10 text-gold-soft">
            {date.long} · {date.city}
          </p>
        </footer>
      </main>
    </Shell>
  );
}
