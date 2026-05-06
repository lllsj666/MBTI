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
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Matches */}
        <div>
          <h4 className="mb-1 text-sm font-semibold text-slate-800">
            更容易产生默契的类型
          </h4>
          <p className="mb-3 text-xs leading-relaxed text-slate-400">
            这些类型通常更容易与你形成互补、理解或有质量的交流。
          </p>
          <div className="space-y-2.5">
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

        {/* Challenging */}
        <div>
          <h4 className="mb-1 text-sm font-semibold text-slate-800">
            更需要磨合的类型
          </h4>
          <p className="mb-3 text-xs leading-relaxed text-slate-400">
            这些类型并不是不适合，而是相处节奏、表达方式或需求重点可能更不同。
          </p>
          <div className="space-y-2.5">
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
