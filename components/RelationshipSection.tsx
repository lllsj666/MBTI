"use client";

import { useState } from "react";
import { RelationshipCard } from "./RelationshipCard";
import { RelationshipDetailModal, type RelationshipDetail } from "./RelationshipDetailModal";
import { normalizeMatch } from "@/app/data/mbti-results";
import type { MatchType } from "@/app/data/mbti-results";

type Props = { matches: MatchType[]; challengingMatches: MatchType[] };

export function RelationshipSection({ matches, challengingMatches }: Props) {
  const [selected, setSelected] = useState<RelationshipDetail | null>(null);
  const [variant, setVariant] = useState<"match" | "challenge">("match");

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 sm:items-stretch">
        {/* Matches */}
        <div className="flex h-full flex-col rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm backdrop-blur-sm">
          <h4 className="text-sm font-semibold text-[var(--text)]">更容易产生默契的类型</h4>
          <p className="mt-0.5 text-xs text-[var(--muted)]">更容易和你聊到一起的类型。</p>
          <div className="mt-4 grid flex-1 gap-3">
            {matches.map((m) => {
              const d = normalizeMatch(m);
              return (
                <RelationshipCard key={m.type} type={d.type} title={d.title} shortDescription={d.shortDescription} variant="match"
                  onClick={() => { setSelected({ type: d.type, title: d.title, description: d.description, traits: d.traits, chemistry: d.chemistry, frictionPoint: d.frictionPoint, howToGetAlong: d.howToGetAlong, possibleFriction: d.possibleFriction }); setVariant("match"); }} />
              );
            })}
          </div>
        </div>

        {/* Challenging */}
        <div className="flex h-full flex-col rounded-3xl border border-[var(--border)] bg-[var(--surface)]/70 p-5 shadow-sm backdrop-blur-sm">
          <h4 className="text-sm font-semibold text-[var(--text)]">更需要磨合的类型</h4>
          <p className="mt-0.5 text-xs text-[var(--muted)]">你们的节奏不同，需要更多沟通来彼此理解。</p>
          <div className="mt-4 grid flex-1 gap-3">
            {challengingMatches.map((m) => {
              const d = normalizeMatch(m);
              return (
                <RelationshipCard key={m.type} type={d.type} title={d.title} shortDescription={d.shortDescription} variant="challenge"
                  onClick={() => { setSelected({ type: d.type, title: d.title, description: d.description, traits: d.traits, chemistry: d.chemistry, frictionPoint: d.frictionPoint, howToGetAlong: d.howToGetAlong, possibleFriction: d.possibleFriction }); setVariant("challenge"); }} />
              );
            })}
          </div>
        </div>
      </div>

      <RelationshipDetailModal open={!!selected} item={selected} variant={variant} onClose={() => setSelected(null)} />
    </>
  );
}
