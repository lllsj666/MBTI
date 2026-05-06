"use client";

import { useState } from "react";
import { RelationshipCard } from "./RelationshipCard";
import { RelationshipDetailModal, type RelationshipDetail } from "./RelationshipDetailModal";
import { FullKnowledgeModal } from "./FullKnowledgeModal";
import { normalizeMatch } from "@/app/data/mbti-results";
import type { MatchType } from "@/app/data/mbti-results";

type Props = { matches: MatchType[]; challengingMatches: MatchType[] };

export function RelationshipSection({ matches, challengingMatches }: Props) {
  const [selected, setSelected] = useState<RelationshipDetail | null>(null);
  const [variant, setVariant] = useState<"match" | "challenge">("match");
  const [knowledgeOpen, setKnowledgeOpen] = useState(false);

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 sm:items-stretch">
        {/* Matches */}
        <div className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white/70 p-5 shadow-sm backdrop-blur-sm">
          <div className="mb-1 flex items-start justify-between">
            <div>
              <h4 className="text-sm font-semibold text-slate-800">更容易产生默契的类型</h4>
              <p className="mt-0.5 text-xs text-slate-400">更容易和你聊到一起的类型。</p>
            </div>
            <button onClick={() => setKnowledgeOpen(true)} className="shrink-0 text-[11px] font-medium text-violet-500 hover:text-violet-700 transition">
              查看全部默契知识 →
            </button>
          </div>
          <div className="mt-4 grid flex-1 gap-3">
            {matches.map((m) => {
              const d = normalizeMatch(m);
              return (
                <RelationshipCard key={m.type} type={d.type} title={d.title} shortDescription={d.shortDescription} variant="match"
                  onClick={() => { setSelected(d); setVariant("match"); }} />
              );
            })}
          </div>
        </div>

        {/* Challenging */}
        <div className="flex h-full flex-col rounded-3xl border border-[#E8E4ED] bg-[#F8F7FA]/70 p-5 shadow-sm backdrop-blur-sm">
          <div className="mb-1 flex items-start justify-between">
            <div>
              <h4 className="text-sm font-semibold text-slate-800">更需要磨合的类型</h4>
              <p className="mt-0.5 text-xs text-slate-400">你们的节奏不同，需要更多沟通来彼此理解。</p>
            </div>
            <button onClick={() => setKnowledgeOpen(true)} className="shrink-0 text-[11px] font-medium text-amber-500 hover:text-amber-700 transition">
              查看全部磨合知识 →
            </button>
          </div>
          <div className="mt-4 grid flex-1 gap-3">
            {challengingMatches.map((m) => {
              const d = normalizeMatch(m);
              return (
                <RelationshipCard key={m.type} type={d.type} title={d.title} shortDescription={d.shortDescription} variant="challenge"
                  onClick={() => { setSelected(d); setVariant("challenge"); }} />
              );
            })}
          </div>
        </div>
      </div>

      <RelationshipDetailModal open={!!selected} item={selected} variant={variant} onClose={() => setSelected(null)} />
      <FullKnowledgeModal open={knowledgeOpen} onClose={() => setKnowledgeOpen(false)} title="完整相处知识" matches={matches} challengingMatches={challengingMatches} />
    </>
  );
}
