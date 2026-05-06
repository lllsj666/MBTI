"use client";

import { useState } from "react";
import { RelationshipCard } from "./RelationshipCard";
import {
  RelationshipDetailModal,
  type RelationshipDetail,
} from "./RelationshipDetailModal";
import { normalizeMatch } from "@/app/data/mbti-results";
import type { MatchType } from "@/app/data/mbti-results";

type Props = {
  matches: MatchType[];
  challengingMatches: MatchType[];
};

export function RelationshipSection({ matches, challengingMatches }: Props) {
  const [selected, setSelected] = useState<RelationshipDetail | null>(null);
  const [variant, setVariant] = useState<"match" | "challenge">("match");

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 sm:items-stretch">
        {/* Matches column */}
        <div className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white/70 p-5 shadow-sm backdrop-blur-sm">
          <h4 className="mb-1 text-sm font-semibold text-slate-800">
            更容易产生默契的类型
          </h4>
          <p className="mb-4 text-xs leading-relaxed text-slate-400">
            这些类型通常更容易与你形成互补、理解或有质量的交流。
          </p>
          <div className="grid flex-1 gap-3">
            {matches.map((m) => {
              const d = normalizeMatch(m);
              return (
                <RelationshipCard
                  key={m.type}
                  type={d.type}
                  title={d.title}
                  shortDescription={d.shortDescription}
                  variant="match"
                  onClick={() => {
                    setSelected(d);
                    setVariant("match");
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* Challenging column */}
        <div className="flex h-full flex-col rounded-3xl border border-[#E8E4ED] bg-[#F8F7FA]/70 p-5 shadow-sm backdrop-blur-sm">
          <h4 className="mb-1 text-sm font-semibold text-slate-800">
            更需要磨合的类型
          </h4>
          <p className="mb-4 text-xs leading-relaxed text-slate-400">
            这些类型并不是不适合，而是相处节奏、表达方式或需求重点可能更不同。
          </p>
          <div className="grid flex-1 gap-3">
            {challengingMatches.map((m) => {
              const d = normalizeMatch(m);
              return (
                <RelationshipCard
                  key={m.type}
                  type={d.type}
                  title={d.title}
                  shortDescription={d.shortDescription}
                  variant="challenge"
                  onClick={() => {
                    setSelected(d);
                    setVariant("challenge");
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>

      <RelationshipDetailModal
        open={!!selected}
        item={selected}
        variant={variant}
        onClose={() => setSelected(null)}
      />
    </>
  );
}
