"use client";

import { useEffect } from "react";
import { getMbtiTheme } from "@/app/data/mbti-themes";

export type RelationshipDetail = {
  type: string;
  title: string;
  shortDescription: string;
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

function DetailCard({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
      <h4 className="mb-2 text-sm font-semibold text-slate-800">{label}</h4>
      <p className="text-sm leading-relaxed text-slate-600">{children}</p>
    </div>
  );
}

export function RelationshipDetailModal({ open, onClose, item, variant }: Props) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open || !item) return null;

  const camp = getMbtiTheme(item.type);
  const t = camp.theme;

  return (
    <div
      className="fixed inset-0 z-50 flex animate-[fadeIn_0.2s_ease-out] items-end justify-center bg-slate-900/40 backdrop-blur-sm md:items-center md:p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-[85vh] w-full animate-[slideUp_0.25s_ease-out] flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl md:max-w-xl md:rounded-3xl"
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200"
          aria-label="关闭"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Header */}
        <div className={`shrink-0 bg-gradient-to-br ${t.heroGradient} px-6 pb-5 pt-8 md:px-8 md:pt-10`}>
          <div className="mb-2 flex items-center gap-2">
            <span className={`inline-block rounded-full ${t.badge} px-2.5 py-0.5 text-[11px] font-medium`}>
              {camp.label}
            </span>
            <span className={`text-[11px] font-medium ${t.primaryText}`}>
              {variant === "match" ? "更容易产生默契" : "更需要磨合理解"}
            </span>
          </div>
          <h2 className={`text-3xl font-bold tracking-tight ${t.primaryText}`}>{item.type}</h2>
          <p className="mt-1 text-lg font-semibold text-slate-800">{item.title}</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.shortDescription}</p>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 md:px-8 md:py-6">
          <div className="space-y-4">
            <DetailCard label="对方特点">{item.traits}</DetailCard>
            <DetailCard label={variant === "match" ? "你们的默契点" : "你们的磨合点"}>
              {variant === "match" ? item.chemistry : item.frictionPoint}
            </DetailCard>
            <DetailCard label="相处建议">{item.howToGetAlong}</DetailCard>
            <DetailCard label="潜在摩擦">{item.possibleFriction}</DetailCard>
          </div>
        </div>

        {/* Bottom */}
        <div className="shrink-0 border-t border-slate-100 px-6 py-4 md:px-8">
          <button
            onClick={onClose}
            className={`w-full rounded-xl ${t.button} py-3 text-sm font-medium text-white shadow-sm transition active:scale-[0.98]`}
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  );
}
