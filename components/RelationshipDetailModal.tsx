"use client";

import { getMbtiTheme } from "@/app/data/mbti-themes";
import { ResultModalShell } from "./ResultModalShell";

export type RelationshipDetail = {
  type: string; title: string;
  description: string; traits: string;
  chemistry: string; frictionPoint: string;
  howToGetAlong: string; possibleFriction: string;
};

type Props = { open: boolean; onClose: () => void; item: RelationshipDetail | null; variant: "match" | "challenge" };

function textCards(text: string) {
  if (!text) return <p>暂无内容。</p>;
  return text.split(/(?<=。|！|？|；|，)/).map((s) => s.trim()).filter(Boolean).map((p, i) => <p key={i} className="leading-[1.85]">{p}</p>);
}

export function RelationshipDetailModal({ open, onClose, item, variant }: Props) {
  if (!item) return null;

  const camp = getMbtiTheme(item.type);
  const t = camp.theme;

  return (
    <ResultModalShell open={open} onClose={onClose}>
      <button onClick={onClose} className="absolute right-5 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--surface)] text-[var(--muted)] transition hover:bg-[var(--border)]" aria-label="关闭详情">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
      </button>

      {/* Header — camp-specific gradient and colors */}
      <div className="shrink-0 bg-gradient-to-br from-[var(--accent-soft)]/60 via-[var(--surface)] to-[var(--surface)] px-5 pt-6 pb-5 md:px-8 md:pt-7 md:pb-6">
        <div className="mb-2 flex items-center gap-2">
          <span className={`rounded-full ${t.badge} px-2.5 py-0.5 text-[11px] font-medium`}>{camp.label}</span>
          <span className="text-[11px] font-medium text-[var(--muted)]">{variant === "match" ? "更容易产生默契" : "更需要磨合"}</span>
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-[var(--accent)] md:text-4xl">{item.type}</h2>
        <p className="mt-1 text-xl font-bold text-[var(--text)] md:text-2xl">{item.title}</p>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-5 py-5 pb-[calc(24px+env(safe-area-inset-bottom,0px))] md:px-8 md:py-6">
        <div className={`relative overflow-hidden rounded-2xl border ${t.cardBorder} bg-[var(--bg)] p-6 shadow-sm md:rounded-3xl md:p-7`}>
          <div className={`pointer-events-none absolute -top-12 right-0 h-[120px] w-[200px] rounded-full opacity-20 blur-[50px] ${t.accentDot}`} />
          <h4 className="relative mb-4 text-lg font-bold text-[var(--accent)] md:text-xl">
            {variant === "match" ? "你们的默契点" : "你们的磨合点"}
          </h4>
          <div className="relative space-y-2 font-sans text-[15px] leading-[1.85] text-[var(--text)] md:text-[17px]">
            {textCards(variant === "match" ? item.chemistry : item.frictionPoint)}
          </div>
        </div>
      </div>
    </ResultModalShell>
  );
}
