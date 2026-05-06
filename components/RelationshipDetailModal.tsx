"use client";

import { useState, useEffect, useCallback } from "react";
import { getMbtiTheme } from "@/app/data/mbti-themes";

export type RelationshipDetail = {
  type: string;
  title: string;
  traits: string;
  chemistry: string;
  frictionPoint: string;
  howToGetAlong: string;
  possibleFriction: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  item: RelationshipDetail | null;
  variant: "match" | "challenge";
};

const CARDS = [
  { key: "traits", label: "对方特点" },
  { key: "chemistry", matchLabel: "你们的默契点", challengeLabel: "你们的磨合点" },
  { key: "howToGetAlong", label: "相处建议" },
  { key: "possibleFriction", label: "潜在摩擦" },
] as const;

export function RelationshipDetailModal({ open, onClose, item, variant }: Props) {
  const [page, setPage] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const total = CARDS.length;

  // Reset page on open
  useEffect(() => {
    if (open) setPage(0);
  }, [open]);

  // Prevent body scroll
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const next = useCallback(() => setPage((p) => Math.min(p + 1, total - 1)), [total]);
  const prev = useCallback(() => setPage((p) => Math.max(p - 1, 0)), []);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  }, []);
  const onTouchEnd = useCallback((e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) next();
      else prev();
    }
    setTouchStart(null);
  }, [touchStart, next, prev]);

  if (!open || !item) return null;

  const camp = getMbtiTheme(item.type);
  const t = camp.theme;

  const getContent = (key: string) => {
    if (key === "traits") return item.traits;
    if (key === "chemistry") return item.chemistry;
    if (key === "howToGetAlong") return item.howToGetAlong;
    if (key === "possibleFriction") return item.possibleFriction;
    return "";
  };

  const getLabel = (c: typeof CARDS[number]) => {
    if (c.key === "chemistry") {
      return variant === "match" ? c.matchLabel : c.challengeLabel;
    }
    return c.label;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex animate-[fadeIn_0.25s_ease-out] items-end justify-center bg-slate-900/40 backdrop-blur-sm md:items-center md:p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className="relative flex max-h-[88vh] w-full animate-[slideUp_0.3s_ease-out] flex-col overflow-hidden rounded-t-3xl bg-white/95 shadow-2xl backdrop-blur-xl md:max-w-xl md:rounded-3xl"
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
          aria-label="关闭"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Header — compact, no summary */}
        <div className={`shrink-0 bg-gradient-to-br ${t.heroGradient} px-6 pb-4 pt-8 md:px-8 md:pt-10`}>
          <div className="mb-1.5 flex items-center gap-2">
            <span className={`rounded-full ${t.badge} px-2.5 py-0.5 text-[11px] font-medium`}>
              {camp.label}
            </span>
            <span className={`text-[11px] font-medium ${t.primaryText}`}>
              {variant === "match" ? "容易产生默契" : "需要更多磨合"}
            </span>
          </div>
          <h2 className={`text-3xl font-bold tracking-tight ${t.primaryText}`}>{item.type}</h2>
          <p className="mt-1 text-base font-semibold text-slate-700">{item.title}</p>
        </div>

        {/* Swipeable card deck */}
        <div className="relative flex-1 overflow-hidden">
          <div
            className="flex h-full transition-transform duration-300 ease-out"
            style={{ transform: `translateX(-${page * 100}%)`, width: `${total * 100}%` }}
          >
            {CARDS.map((c) => (
              <div key={c.key} className="h-full w-full flex-shrink-0 overflow-y-auto px-6 py-5 md:px-8 md:py-6">
                <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                  <h4 className="mb-3 text-sm font-semibold text-slate-800">{getLabel(c)}</h4>
                  <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-600">{getContent(c.key)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer: dots + arrows */}
        <div className="shrink-0 border-t border-slate-100 px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={prev}
              disabled={page === 0}
              className={`flex h-8 w-8 items-center justify-center rounded-full transition ${
                page === 0 ? "text-slate-300 cursor-default" : "text-slate-500 hover:bg-slate-100"
              }`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            {/* Dots */}
            <div className="flex items-center gap-1.5">
              {CARDS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === page
                      ? `w-6 ${t.accentDot}`
                      : "w-2 bg-slate-300 hover:bg-slate-400"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              disabled={page === total - 1}
              className={`flex h-8 w-8 items-center justify-center rounded-full transition ${
                page === total - 1 ? "text-slate-300 cursor-default" : "text-slate-500 hover:bg-slate-100"
              }`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
