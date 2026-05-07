"use client";

import { getMbtiTheme } from "@/app/data/mbti-themes";
import { ResultModalShell } from "./ResultModalShell";

export type RelationshipDetail = {
  type: string; title: string;
  description: string;
  traits: string;
  chemistry: string;
  frictionPoint: string;
  howToGetAlong: string;
  possibleFriction: string;
};

type Props = { open: boolean; onClose: () => void; item: RelationshipDetail | null; variant: "match" | "challenge" };

function splitChineseParagraph(text: string): string[] {
  if (!text) return [];
  return text.split(/(?<=。|！|？|；|，)/).map((s) => s.trim()).filter(Boolean);
}

export function RelationshipDetailModal({ open, onClose, item, variant }: Props) {
  if (!item) return null;

  const camp = getMbtiTheme(item.type);

  return (
    <ResultModalShell open={open} onClose={onClose}>
      {/* Close */}
      <button onClick={onClose} className="absolute right-5 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--surface)] text-[var(--muted)] transition hover:bg-[var(--border)]" aria-label="关闭详情">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
      </button>

      {/* Header */}
      <div className="shrink-0 bg-gradient-to-br from-[var(--accent-soft)]/60 via-[var(--surface)] to-[var(--surface)] px-5 pt-6 pb-5 md:px-8 md:pt-7 md:pb-6">
        <div className="mb-2 flex items-center gap-2">
          <span className="rounded-full bg-[var(--accent)]/15 px-2.5 py-0.5 text-[11px] font-medium text-[var(--accent)]">{camp.label}</span>
          <span className="text-[11px] font-medium text-[var(--muted)]">{variant === "match" ? "更容易产生默契" : "更需要磨合"}</span>
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-[var(--accent)] md:text-4xl">{item.type}</h2>
        <p className="mt-1 text-xl font-bold text-[var(--text)] md:text-2xl">{item.title}</p>
      </div>

      {/* Body — 2 refined cards */}
      <div className="flex-1 overflow-y-auto px-5 py-5 pb-[calc(24px+env(safe-area-inset-bottom,0px))] md:px-8 md:py-6">
        <div className="space-y-5">
          {/* Card 1: 完整描述 */}
          <div className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6 shadow-sm md:rounded-3xl md:p-7">
            <div className="pointer-events-none absolute -top-12 right-0 h-[120px] w-[200px] rounded-full bg-[var(--accent)]/6 blur-[50px]" />
            <h4 className="relative mb-4 text-lg font-bold text-[var(--accent)] md:text-xl">完整描述</h4>
            <div className="relative space-y-3 text-[15px] leading-7 text-[var(--text)] md:text-base">
              {splitChineseParagraph(item.description).map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </div>

          {/* Card 2: 默契点 / 磨合点 */}
          <div className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6 shadow-sm md:rounded-3xl md:p-7">
            <div className="pointer-events-none absolute -top-12 right-0 h-[120px] w-[200px] rounded-full bg-[var(--accent)]/8 blur-[50px]" />
            <h4 className="relative mb-4 text-lg font-bold text-[var(--accent)] md:text-xl">
              {variant === "match" ? "你们的默契点" : "你们的磨合点"}
            </h4>
            <div className="relative space-y-3 text-[15px] leading-7 text-[var(--text)] md:text-base">
              {splitChineseParagraph(variant === "match" ? item.chemistry : item.frictionPoint).map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </div>
        </div>
      </div>
    </ResultModalShell>
  );
}
