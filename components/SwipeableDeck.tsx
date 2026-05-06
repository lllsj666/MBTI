"use client";

import { useState, useCallback } from "react";

export type DeckCard = { key: string; title: string; content: string };

type Props = {
  cards: DeckCard[];
  accentClass?: string;
  className?: string;
};

export function SwipeableDeck({ cards, accentClass = "bg-violet-500", className = "" }: Props) {
  const [page, setPage] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const total = cards.length;
  if (total === 0) return null;

  const next = useCallback(() => setPage((p) => Math.min(p + 1, total - 1)), [total]);
  const prev = useCallback(() => setPage((p) => Math.max(p - 1, 0)), []);

  const onTouchStart = useCallback((e: React.TouchEvent) => setTouchStart(e.touches[0].clientX), []);
  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (touchStart === null) return;
      const d = touchStart - e.changedTouches[0].clientX;
      if (Math.abs(d) > 50) d > 0 ? next() : prev();
      setTouchStart(null);
    },
    [touchStart, next, prev]
  );

  return (
    <div className={`flex flex-col ${className}`}>
      {/* Cards */}
      <div
        className="relative flex-1 overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="flex h-full transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${page * 100}%)`, width: `${total * 100}%` }}
        >
          {cards.map((c) => (
            <div key={c.key} className="h-full w-full flex-shrink-0 overflow-y-auto px-2">
              <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                <h4 className="mb-3 text-sm font-semibold text-slate-800">{c.title}</h4>
                <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-600">{c.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer: dots + arrows */}
      <div className="flex items-center justify-between pt-3">
        <button
          onClick={prev}
          disabled={page === 0}
          className={`flex h-8 w-8 items-center justify-center rounded-full transition ${
            page === 0 ? "cursor-default text-slate-300" : "text-slate-500 hover:bg-slate-100"
          }`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div className="flex items-center gap-1.5">
          {cards.map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`h-2 rounded-full transition-all ${
                i === page ? `w-6 ${accentClass}` : "w-2 bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>

        <button
          onClick={next}
          disabled={page === total - 1}
          className={`flex h-8 w-8 items-center justify-center rounded-full transition ${
            page === total - 1 ? "cursor-default text-slate-300" : "text-slate-500 hover:bg-slate-100"
          }`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
