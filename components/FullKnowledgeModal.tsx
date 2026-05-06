"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { getMbtiTheme } from "@/app/data/mbti-themes";
import { normalizeMatch, type MatchType } from "@/app/data/mbti-results";

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  matches: MatchType[];
  challengingMatches: MatchType[];
};

function SectionBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <h4 className="mb-2 text-sm font-semibold text-slate-800">{label}</h4>
      <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-600">{children}</p>
    </div>
  );
}

export function FullKnowledgeModal({ open, onClose, title, matches, challengingMatches }: Props) {
  const [activeChip, setActiveChip] = useState<string>("");
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const scrollTo = useCallback((type: string) => {
    setActiveChip(type);
    sectionRefs.current[type]?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  // Track which section is visible
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handleScroll = () => {
      const sections = [...matches, ...challengingMatches];
      for (const m of sections) {
        const node = sectionRefs.current[m.type];
        if (node) {
          const rect = node.getBoundingClientRect();
          const parent = el.getBoundingClientRect();
          if (rect.top >= parent.top && rect.top < parent.top + 200) {
            setActiveChip(m.type);
            break;
          }
        }
      }
    };
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [matches, challengingMatches]);

  if (!open) return null;

  const allTypes = [...matches.map((m) => ({ ...normalizeMatch(m), kind: "match" as const })), ...challengingMatches.map((m) => ({ ...normalizeMatch(m), kind: "challenge" as const }))];

  return (
    <div className="fixed inset-0 z-50 flex animate-[fadeIn_0.2s_ease-out] items-end justify-center bg-slate-900/40 backdrop-blur-sm md:items-center md:p-4" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="relative flex max-h-[90vh] w-full animate-[slideUp_0.25s_ease-out] flex-col overflow-hidden rounded-t-3xl bg-white/95 shadow-2xl backdrop-blur-xl md:max-w-4xl md:rounded-3xl">
        {/* Close */}
        <button onClick={onClose} className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-600">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
        </button>

        {/* Header */}
        <div className="shrink-0 border-b border-slate-100 px-6 pb-3 pt-8 md:px-8 md:pt-10">
          <h2 className="text-xl font-bold text-slate-900">{title}</h2>
          <p className="mt-1 text-sm text-slate-500">共 {allTypes.length} 种类型 · 完整相处知识</p>

          {/* Chip nav */}
          <div className="mt-3 flex gap-1.5 overflow-x-auto pb-1">
            {allTypes.map(({ type, kind }) => {
              const camp = getMbtiTheme(type);
              return (
                <button
                  key={type}
                  onClick={() => scrollTo(type)}
                  className={`shrink-0 rounded-full border px-3 py-1 text-xs font-medium transition ${
                    activeChip === type
                      ? `${camp.theme.badge} border-transparent`
                      : "border-slate-200 bg-white text-slate-500 hover:border-slate-300"
                  }`}
                >
                  {type}
                  <span className="ml-1 text-[10px] opacity-60">{kind === "match" ? "默契" : "磨合"}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Scrollable body */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-5 md:px-8 md:py-6">
          <div className="space-y-6">
            {allTypes.map(({ type, title: ttl, kind, traits, chemistry, frictionPoint, howToGetAlong, possibleFriction }) => {
              const camp = getMbtiTheme(type);
              const t = camp.theme;
              return (
                <div
                  key={type}
                  ref={(el) => { sectionRefs.current[type] = el; }}
                >
                  {/* Section header */}
                  <div className={`mb-3 flex items-center gap-2 rounded-2xl border ${t.cardBorder} bg-gradient-to-br ${t.heroGradient} px-4 py-3`}>
                    <span className={`rounded-full ${t.badge} px-2 py-0.5 text-[11px] font-medium`}>{type}</span>
                    <span className="text-sm font-semibold text-slate-800">{ttl}</span>
                    <span className="ml-auto text-[11px] text-slate-400">{kind === "match" ? "容易产生默契" : "需要更多磨合"}</span>
                  </div>

                  <div className="space-y-3">
                    <SectionBlock label="对方特点">{traits}</SectionBlock>
                    <SectionBlock label={kind === "match" ? "你们的默契点" : "你们的磨合点"}>
                      {kind === "match" ? chemistry : frictionPoint}
                    </SectionBlock>
                    <SectionBlock label="相处建议">{howToGetAlong}</SectionBlock>
                    <SectionBlock label="潜在摩擦">{possibleFriction}</SectionBlock>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
