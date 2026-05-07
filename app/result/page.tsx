"use client";

import { useState, useEffect, useCallback, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { mbtiResults, type MBTIResult } from "@/app/data/mbti-results";
import { STORAGE_KEYS, type MBTIResult2 } from "@/app/data/questions";
import { getMbtiTheme, getDefaultDimensionScores, type DimensionScore } from "@/app/data/mbti-themes";
import { SectionHeader } from "@/components/SectionHeader";
import { RelationshipSection } from "@/components/RelationshipSection";
import { ResultModalShell } from "@/components/ResultModalShell";

function splitChineseParagraph(text: string): string[] {
  if (!text) return [];
  return text.split(/(?<=。|！|？)/).map((s) => s.trim()).filter(Boolean);
}

function ResultContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [result, setResult] = useState<MBTIResult | null>(null);
  const [tendency, setTendency] = useState<MBTIResult2 | null>(null);
  const [isExample, setIsExample] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [dimModal, setDimModal] = useState<DimensionScore | null>(null);
  const [descModal, setDescModal] = useState(false);
  const [isDeepReadingOpen, setIsDeepReadingOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let type = searchParams.get("type")?.toUpperCase() ?? "";
    if (type && mbtiResults[type]) { setResult(mbtiResults[type]); setIsExample(false); }
    else {
      try {
        const saved = localStorage.getItem(STORAGE_KEYS.result);
        if (saved && mbtiResults[saved]) { type = saved; setResult(mbtiResults[type]); setIsExample(false); }
        else { setResult(mbtiResults["INFJ"]); setIsExample(true); }
      } catch { setResult(mbtiResults["INFJ"]); setIsExample(true); }
    }
    try { const s = localStorage.getItem(STORAGE_KEYS.tendency); if (s) setTendency(JSON.parse(s)); } catch {}
    setLoaded(true);
  }, [searchParams]);

  const handleRestart = useCallback(() => {
    try { localStorage.removeItem(STORAGE_KEYS.answers); localStorage.removeItem(STORAGE_KEYS.scores); localStorage.removeItem(STORAGE_KEYS.result); localStorage.removeItem(STORAGE_KEYS.tendency); } catch {}
    router.push("/test");
  }, [router]);

  const scrollToContent = useCallback(() => {
    contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  if (!loaded || !result) {
    return <main className="flex min-h-screen items-center justify-center bg-[var(--bg)]"><div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--accent)] border-t-transparent" /></main>;
  }

  const camp = getMbtiTheme(result.type);
  const t = camp.theme;
  const isExampleScores = !tendency;

  const dimScores: DimensionScore[] = tendency
    ? tendency.tendencies.map((td) => {
        const total = td.leftScore + td.rightScore || 1;
        const leftPct = Math.round((td.leftScore / total) * 100);
        const m: Record<string, any> = {
          EI: { dimension: "EI", label: "社交能量", left: { letter: "E", label: "外向" }, right: { letter: "I", label: "内向" } },
          SN: { dimension: "SN", label: "信息偏好", left: { letter: "S", label: "实感" }, right: { letter: "N", label: "直觉" } },
          TF: { dimension: "TF", label: "决策方式", left: { letter: "T", label: "思考" }, right: { letter: "F", label: "情感" } },
          JP: { dimension: "JP", label: "生活节奏", left: { letter: "J", label: "判断" }, right: { letter: "P", label: "知觉" } },
        };
        const b = m[td.dimension];
        return { dimension: b.dimension, label: b.label, left: { letter: b.left.letter, label: b.left.label, pct: leftPct }, right: { letter: b.right.letter, label: b.right.label, pct: 100 - leftPct } };
      })
    : getDefaultDimensionScores(result.type);

  const winnerChips = dimScores.map((ds) => {
    const isLeft = ds.left.pct >= ds.right.pct;
    return { dim: ds.dimension, letter: isLeft ? ds.left.letter : ds.right.letter, pct: isLeft ? ds.left.pct : ds.right.pct, full: ds };
  });

  const insights = [
    { label: "亲密关系模式", content: result.love },
    { label: "金钱观与资源管理", content: result.wealth },
    { label: "适合的发展方向", content: result.career },
    { label: "近期生活建议", content: result.luck },
  ];

  return (
    <main className="relative min-h-screen bg-[var(--bg)] text-[var(--text)]">
      {/* Background glow */}
      <div className={`pointer-events-none fixed -top-32 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full opacity-[0.06] blur-[120px] ${t.accentDot}`} />

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between border-b border-[var(--border)] bg-[var(--surface)]/90 backdrop-blur-xl px-5 py-3.5">
        <Link href="/" className="text-sm text-[var(--muted)] transition hover:text-[var(--text)]">← 返回首页</Link>
        <span className="text-sm font-medium text-[var(--text)]">MBTI-覆</span>
        <button onClick={handleRestart} className="text-sm text-[var(--muted)] transition hover:text-[var(--accent)]">重新测试</button>
      </div>

      {/* ===== 1. Hero Card ===== */}
      <section className="relative z-10 px-5 pt-8 sm:pt-10">
        <div className="mx-auto max-w-2xl">
          {isExample && (
            <div className="mb-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-center text-sm text-amber-700">
              这是示例报告。完成测试后可生成你的专属结果。
            </div>
          )}

          <button type="button" onClick={scrollToContent}
            className="group w-full overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] text-left shadow-lg backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="relative overflow-hidden bg-gradient-to-br from-[var(--accent-soft)]/30 via-[var(--surface)] to-[var(--bg)] px-6 py-7 text-center sm:px-10 sm:py-10">
              <div className={`pointer-events-none absolute -top-12 left-1/2 h-[180px] w-[280px] -translate-x-1/2 rounded-full opacity-15 blur-[60px] ${t.accentDot}`} />
              <p className="relative mb-1 text-[11px] text-[var(--muted)]">你的 MBTI-覆 结果卡</p>
              <span className="relative mb-3 inline-block rounded-full border border-[var(--border)] bg-[var(--accent-soft)] px-3 py-0.5 text-xs font-medium text-[var(--accent)]">{camp.label}</span>
              <p className={`relative mb-0.5 text-5xl font-black tracking-widest sm:text-7xl bg-gradient-to-r ${t.typeGradient} bg-clip-text text-transparent`}>{result.type}</p>
              <p className="relative mb-3 text-lg font-semibold text-[var(--text)] sm:text-xl">{result.name}</p>
              <div className="relative flex flex-wrap justify-center gap-1.5">
                {result.keywords.map((kw) => (
                  <span key={kw} className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-2.5 py-0.5 text-xs text-[var(--muted)] backdrop-blur-sm">{kw}</span>
                ))}
              </div>
              <div className="relative mt-4 flex justify-center gap-2 overflow-x-auto pb-1">
                {winnerChips.map(({ dim, letter, pct, full }) => (
                  <button key={dim} onClick={(e) => { e.stopPropagation(); setDimModal(full); }}
                    className="shrink-0 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-xs backdrop-blur-sm transition hover:-translate-y-0.5 hover:shadow-sm">
                    <span className="font-bold text-[var(--text)]">{letter}</span>
                    <span className="ml-1 text-[var(--muted)]">{pct}%</span>
                  </button>
                ))}
              </div>
              <p className="relative mt-4 text-[11px] text-[var(--muted)] transition group-hover:opacity-80">点击查看完整解读 ↓</p>
            </div>

            {/* Description preview */}
            <div className="border-t border-[var(--border)] px-6 py-4 sm:px-10 cursor-pointer transition hover:bg-[var(--accent-soft)]/20"
              onClick={(e) => { e.stopPropagation(); setDescModal(true); }}>
              <h4 className="mb-1 text-xs font-semibold text-[var(--accent)]">完整描述</h4>
              <p className="line-clamp-2 text-sm leading-relaxed text-[var(--muted)]">{result.summary}</p>
              <p className="mt-2 text-[11px] text-[var(--muted)] transition group-hover:opacity-80">点击查看完整描述 →</p>
            </div>
          </button>
        </div>
      </section>

      <div ref={contentRef} className="scroll-mt-20" />

      {/* ===== 2. Core Snapshot ===== */}
      <section className="relative z-10 px-5 pt-8">
        <div className="mx-auto max-w-2xl">
          <SectionHeader eyebrow="Core Snapshot" title="先看最像你的地方" description="最常被感受到的样子。" />
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm backdrop-blur-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <h3 className="mb-1 text-sm font-semibold text-emerald-600">你的优势</h3>
              <p className="mb-3 text-xs text-[var(--muted)]">你身上自然发光的部分。</p>
              <ul className="space-y-2">{result.strengths.map((s) => <li key={s} className="flex items-start gap-2 text-sm leading-relaxed text-[var(--text)]"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />{s}</li>)}</ul>
            </div>
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm backdrop-blur-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <h3 className="mb-1 text-sm font-semibold text-amber-600">你需要注意</h3>
              <p className="mb-3 text-xs text-[var(--muted)]">压力下容易被忽略的地方。</p>
              <ul className="space-y-2">{result.cautions.map((c) => <li key={c} className="flex items-start gap-2 text-sm leading-relaxed text-[var(--text)]"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />{c}</li>)}</ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 3. Relationship ===== */}
      <section className="relative z-10 px-5 py-8">
        <div className="mx-auto max-w-2xl">
          <SectionHeader eyebrow="Relationship Snapshot" title="和不同人格的相处节奏" description="默契与磨合。" />
          <div className="mt-5"><RelationshipSection matches={result.matches} challengingMatches={result.challengingMatches} /></div>
        </div>
      </section>

      {/* ===== 4. Deep Reading — Entry ===== */}
      <section className="relative z-10 px-5 py-8 pb-4">
        <div className="mx-auto max-w-2xl">
          <SectionHeader eyebrow="Deep Reading" title="更具体地理解你的生活模式" />
          <div className="mt-5">
            <button type="button" onClick={() => setIsDeepReadingOpen(true)}
              className="group relative w-full overflow-hidden rounded-[28px] border border-[var(--border)] bg-[var(--surface)] px-5 py-5 text-left shadow-sm backdrop-blur-xl transition hover:-translate-y-0.5 hover:shadow-lg md:px-7 md:py-6">
              {/* Ambient glows — work in both light and dark */}
              <div className="pointer-events-none absolute -top-12 right-0 h-[160px] w-[200px] rounded-full bg-[var(--accent)]/5 blur-[60px] transition group-hover:bg-[var(--accent)]/10" />
              <div className="pointer-events-none absolute -bottom-12 -left-8 h-[120px] w-[160px] rounded-full bg-amber-400/5 blur-[50px] transition group-hover:bg-amber-400/10" />
              <div className="relative flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium tracking-wide text-[var(--text)] md:text-[15px]">不被任何定义，这只是参考。</p>
                  <p className="mt-2 text-xs leading-6 text-[var(--muted)] md:text-[13px]">如果你愿意，可以翻开一些更细的观察。</p>
                </div>
                <div className="shrink-0 rounded-full border border-[var(--border)] bg-[var(--surface)] p-2 transition group-hover:bg-[var(--accent-soft)]">
                  <svg className="text-[var(--muted)]" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="6 9 12 15 18 9" /></svg>
                </div>
              </div>
            </button>
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-[var(--border)] px-5 py-8">
        <p className="text-center text-xs leading-relaxed text-[var(--muted)]">MBTI 性格测试-覆</p>
        <p className="mt-3 text-center text-[11px] leading-relaxed text-[var(--muted)]">这只是参考，不是定义。</p>
      </footer>

      {/* ===== Dimension modal ===== */}
      {dimModal && (
        <div className="fixed inset-0 z-[9999] flex animate-[fadeIn_0.2s_ease-out] items-end justify-center bg-slate-900/40 backdrop-blur-sm md:items-center md:p-4" onClick={() => setDimModal(null)}>
          <div onClick={(e) => e.stopPropagation()} className="relative flex max-h-[85vh] w-full animate-[slideUp_0.25s_ease-out] flex-col overflow-hidden rounded-t-3xl bg-[var(--surface-strong)] shadow-2xl backdrop-blur-xl md:max-w-md md:rounded-3xl">
            <button onClick={() => setDimModal(null)} className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--bg)] text-[var(--muted)] transition hover:bg-[var(--border)]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            </button>
            <div className="shrink-0 bg-gradient-to-br from-[var(--accent-soft)]/30 via-[var(--surface)] to-[var(--bg)] px-6 pb-5 pt-8 text-center">
              <span className="mb-3 inline-block rounded-full border border-[var(--border)] bg-[var(--accent-soft)] px-3 py-0.5 text-xs font-medium text-[var(--accent)]">{dimModal.label}</span>
              <h2 className="text-2xl font-bold text-[var(--text)]">{dimModal.left.label}({dimModal.left.letter}) / {dimModal.right.label}({dimModal.right.letter})</h2>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-5">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <span className="w-8 text-right font-medium text-[var(--text)]">{dimModal.left.letter}</span>
                  <div className="relative h-2.5 flex-1 overflow-hidden rounded-full bg-[var(--border)]">
                    <div className={`absolute left-0 top-0 h-full rounded-full ${t.accentDot}`} style={{ width: `${dimModal.left.pct}%` }} />
                  </div>
                  <span className="w-8 font-medium text-[var(--text)]">{dimModal.right.letter}</span>
                </div>
                <p className="text-center text-sm text-[var(--muted)]">{dimModal.left.pct}% / {dimModal.right.pct}%</p>
                <p className="text-sm leading-relaxed text-[var(--muted)]">这个维度反映你 {dimModal.label} 的自然倾向。如果分差较小，说明你在不同场景中可能会灵活切换。</p>
                {isExampleScores && <p className="text-center text-xs text-amber-600">示例倾向 · 完成测试后显示真实分数</p>}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== Description modal ===== */}
      {descModal && (
        <div className="fixed inset-0 z-[9999] flex animate-[fadeIn_0.2s_ease-out] items-end justify-center bg-slate-900/40 backdrop-blur-sm md:items-center md:p-4" onClick={() => setDescModal(false)}>
          <div onClick={(e) => e.stopPropagation()} className="relative flex max-h-[88vh] w-full animate-[slideUp_0.25s_ease-out] flex-col overflow-hidden rounded-t-3xl bg-[var(--surface-strong)] shadow-2xl backdrop-blur-xl md:max-h-[82vh] md:w-[min(92vw,680px)] md:rounded-3xl">
            <button onClick={() => setDescModal(false)} className="absolute right-5 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--bg)] text-[var(--muted)] transition hover:bg-[var(--border)]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            </button>
            <div className="shrink-0 bg-gradient-to-br from-[var(--accent-soft)]/30 via-[var(--surface)] to-[var(--bg)] px-6 pt-6 pb-4 md:px-8 md:pt-7">
              <div className="mb-2 flex items-center gap-2">
                <span className="rounded-full border border-[var(--border)] bg-[var(--accent-soft)] px-2.5 py-0.5 text-[11px] font-medium text-[var(--accent)]">{camp.label}</span>
                <span className="text-[11px] font-medium text-[var(--muted)]">{result.type}</span>
              </div>
              <h2 className="text-xl font-bold text-[var(--text)] md:text-2xl">完整描述</h2>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-5 md:px-8 md:py-6">
              <div className="space-y-3 text-[15px] leading-7 text-[var(--text)] md:text-base">
                {splitChineseParagraph(result.summary).map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== Deep Reading modal ===== */}
      <ResultModalShell open={isDeepReadingOpen} onClose={() => setIsDeepReadingOpen(false)}>
        <button onClick={() => setIsDeepReadingOpen(false)} className="absolute right-5 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--surface)] text-[var(--muted)] transition hover:bg-[var(--border)]">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
        </button>
        <div className="shrink-0 bg-gradient-to-br from-[var(--accent-soft)]/60 via-[var(--surface)] to-[var(--surface)] px-6 pt-6 pb-4 md:px-8 md:pt-7">
          <div className="mb-2 flex items-center gap-2">
            <span className="rounded-full bg-[var(--accent)]/15 px-2.5 py-0.5 text-[11px] font-medium text-[var(--accent)]">隐藏观察</span>
          </div>
          <h2 className="text-xl font-bold text-[var(--text)] md:text-2xl">不被任何定义，这只是参考。</h2>
          <p className="mt-1 text-[13px] leading-6 text-[var(--muted)]">你就是你，不是任何人。</p>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-5 md:px-8 md:py-6">
          <div className="space-y-4">
            {insights.map(({ label, content }) => (
              <div key={label} className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-5">
                <div className="pointer-events-none absolute -top-8 right-0 h-[80px] w-[120px] rounded-full bg-[var(--accent)]/8 blur-[40px]" />
                <h4 className="relative mb-2 text-[13px] font-semibold tracking-[0.02em] text-[var(--accent)] md:text-sm">{label}</h4>
                <div className="relative space-y-2 text-[13px] leading-6 text-[var(--text)] md:text-[14px] md:leading-7">
                  {splitChineseParagraph(content).map((p, j) => <p key={j}>{p}</p>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </ResultModalShell>
    </main>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={<main className="flex min-h-screen items-center justify-center bg-[var(--bg)]"><div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--accent)] border-t-transparent" /></main>}>
      <ResultContent />
    </Suspense>
  );
}
