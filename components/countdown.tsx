"use client";

import { useSyncExternalStore } from "react";

const subscribe = (tick: () => void) => {
  const id = window.setInterval(tick, 1000);
  return () => window.clearInterval(id);
};
const nowSeconds = () => Math.floor(Date.now() / 1000);
// The server has no business guessing the guest's clock; render dashes until hydrated.
const serverNow = () => null;

const pad = (n: number) => String(n).padStart(2, "0");

export default function Countdown({ to }: { to: string }) {
  const now = useSyncExternalStore(subscribe, nowSeconds, serverNow);
  const target = Math.floor(new Date(to).getTime() / 1000);
  const left = now === null ? null : Math.max(0, target - now);

  if (left === 0) {
    return (
      <p className="font-serif text-3xl italic text-maroon">
        Thank you for celebrating with us
      </p>
    );
  }

  const units = [
    { label: "Days", v: left === null ? null : Math.floor(left / 86400) },
    { label: "Hours", v: left === null ? null : Math.floor((left % 86400) / 3600) },
    { label: "Minutes", v: left === null ? null : Math.floor((left % 3600) / 60) },
    { label: "Seconds", v: left === null ? null : left % 60 },
  ];

  return (
    <div className="grid grid-cols-4 divide-x divide-gold/35" role="timer" aria-live="off">
      {units.map((u) => (
        <div key={u.label} className="flex flex-col items-center px-1 py-2">
          <span className="font-serif text-[2.6rem] font-medium leading-none tabular-nums text-maroon sm:text-6xl">
            {u.v === null ? "--" : pad(u.v)}
          </span>
          <span className="eyebrow mt-3 text-rosewood [--eyebrow-size:0.6rem] [--eyebrow-track:0.22em] sm:[--eyebrow-size:0.75rem]">{u.label}</span>
        </div>
      ))}
    </div>
  );
}
