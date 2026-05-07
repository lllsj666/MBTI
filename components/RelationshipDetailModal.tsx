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

function CardsSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm md:rounded-[22px] md:p-6">
      <h4 className="mb-3 text-base font-bold text-[var(--text)] md:text-lg">{label}</h4>
      <div className="text-[15px] leading-7 text-[var(--text)] md:text-base">{children}</div>
    </div>
  );
}

function textCards(content: string) {
  const parts = splitChineseParagraph(content);
  if (parts.length === 0) return <p>暂无内容。</p>;
  return parts.map((p, i) => <p key={i}>{p}</p>);
}

export function RelationshipDetailModal({ open, onClose, item, variant }: Props) {
  if (!item) return null;

  const camp = getMbtiTheme(item.type);
  const t = camp.theme;

  return (
    <ResultModalShell open={open} onClose={onClose}>
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute right-5 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--surface)] text-[var(--muted)] transition hover:bg-[var(--border)]"
        aria-label="关闭详情"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
      </button>

      {/* Header */}
      <div className={`shrink-0 bg-gradient-to-br ${t.heroGradient} px-5 pt-6 pb-5 md:px-8 md:pt-7 md:pb-6`}>
        <div className="mb-2 flex items-center gap-2">
          <span className={`rounded-full ${t.badge} px-2.5 py-0.5 text-[11px] font-medium`}>{camp.label}</span>
          <span className={`text-[11px] font-medium ${t.primaryText}`}>{variant === "match" ? "更容易产生默契" : "更需要磨合"}</span>
        </div>
        <h2 className={`text-3xl font-bold tracking-tight md:text-4xl ${t.primaryText}`}>{item.type}</h2>
        <p className="mt-1 text-xl font-bold text-[var(--text)] md:text-2xl">{item.title}</p>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-5 py-5 pb-[calc(24px+env(safe-area-inset-bottom,0px))] md:px-8 md:py-6">
        <div className="space-y-4">
          <CardsSection label="完整描述">{textCards(item.description)}</CardsSection>
          <CardsSection label="对方特点">{textCards(item.traits)}</CardsSection>
          <CardsSection label={variant === "match" ? "你们的默契点" : "你们的磨合点"}>{textCards(variant === "match" ? item.chemistry : item.frictionPoint)}</CardsSection>
          <CardsSection label="相处建议">{textCards(item.howToGetAlong)}</CardsSection>
          <CardsSection label="潜在摩擦">{textCards(item.possibleFriction)}</CardsSection>
        </div>
      </div>
    </ResultModalShell>
  );
}
