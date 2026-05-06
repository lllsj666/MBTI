"use client";

import { useEffect } from "react";
import { getMbtiTheme } from "@/app/data/mbti-themes";
import { SwipeableDeck, type DeckCard } from "./SwipeableDeck";

export type RelationshipDetail = {
  type: string; title: string;
  description: string;
  howToGetAlong: string; possibleFriction: string;
};

type Props = { open: boolean; onClose: () => void; item: RelationshipDetail | null; variant: "match" | "challenge" };

export function RelationshipDetailModal({ open, onClose, item, variant }: Props) {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open || !item) return null;

  const camp = getMbtiTheme(item.type);
  const t = camp.theme;

  const cards: DeckCard[] = [
    { key: "desc", title: "完整描述", content: item.description },
    { key: "guide", title: "相处指南", content: `${item.howToGetAlong}\n\n${item.possibleFriction}` },
  ];

  return (
    <div className="fixed inset-0 z-50 flex animate-[fadeIn_0.2s_ease-out] items-end justify-center bg-slate-900/40 backdrop-blur-sm md:items-center md:p-4" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="relative flex max-h-[90vh] w-full animate-[slideUp_0.25s_ease-out] flex-col overflow-hidden rounded-t-3xl bg-white/95 shadow-2xl backdrop-blur-xl md:max-w-2xl md:rounded-3xl">
        {/* Close */}
        <button onClick={onClose} className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-600" aria-label="关闭">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
        </button>

        {/* Header */}
        <div className={`shrink-0 bg-gradient-to-br ${t.heroGradient} px-6 pb-4 pt-8 md:px-8 md:pt-10`}>
          <div className="mb-1.5 flex items-center gap-2">
            <span className={`rounded-full ${t.badge} px-2.5 py-0.5 text-[11px] font-medium`}>{camp.label}</span>
            <span className={`text-[11px] font-medium ${t.primaryText}`}>{variant === "match" ? "容易产生默契" : "需要更多磨合"}</span>
          </div>
          <h2 className={`text-3xl font-bold tracking-tight ${t.primaryText}`}>{item.type}</h2>
          <p className="mt-1 text-base font-semibold text-slate-700">{item.title}</p>
        </div>

        {/* 2-page SwipeableDeck */}
        <div className="flex-1 overflow-hidden px-6 py-4 md:px-8 md:py-5">
          <SwipeableDeck cards={cards} accentClass={t.accentDot} />
        </div>
      </div>
    </div>
  );
}
