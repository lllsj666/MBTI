"use client";

import { useState, useEffect, useCallback, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { mbtiResults, type MBTIResult } from "@/app/data/mbti-results";
import { STORAGE_KEYS, type MBTIResult2 } from "@/app/data/questions";
import { getMbtiTheme, getDefaultDimensionScores, type DimensionScore } from "@/app/data/mbti-themes";
import { SectionHeader } from "@/components/SectionHeader";
import { RelationshipSection } from "@/components/RelationshipSection";
import { SwipeableDeck, type DeckCard } from "@/components/SwipeableDeck";

function ResultContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [result, setResult] = useState<MBTIResult | null>(null);
  const [tendency, setTendency] = useState<MBTIResult2 | null>(null);
  const [isExample, setIsExample] = useState(false);
  const [shareText, setShareText] = useState("复制结果链接");
  const [loaded, setLoaded] = useState(false);
  const [dimModal, setDimModal] = useState<DimensionScore | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let type = searchParams.get("type")?.toUpperCase() ?? "";
    if (type && mbtiResults[type]) {
      setResult(mbtiResults[type]);
      setIsExample(false);
    } else {
      try {
        const saved = localStorage.getItem(STORAGE_KEYS.result);
        if (saved && mbtiResults[saved]) { type = saved; setResult(mbtiResults[type]); setIsExample(false); }
        else { setResult(mbtiResults["INFJ"]); setIsExample(true); }
      } catch { setResult(mbtiResults["INFJ"]); setIsExample(true); }
    }
    try {
      const s = localStorage.getItem(STORAGE_KEYS.tendency);
      if (s) setTendency(JSON.parse(s));
    } catch { /* ignore */ }
    setLoaded(true);
  }, [searchParams]);

  const handleRestart = useCallback(() => {
    try { localStorage.removeItem(STORAGE_KEYS.answers); localStorage.removeItem(STORAGE_KEYS.scores); localStorage.removeItem(STORAGE_KEYS.result); localStorage.removeItem(STORAGE_KEYS.tendency); } catch { /* ignore */ }
    router.push("/test");
  }, [router]);

  const handleShare = useCallback(async () => {
    if (!result) return;
    try { await navigator.clipboard.writeText(`${window.location.origin}/result?type=${result.type}`); setShareText("已复制链接"); setTimeout(() => setShareText("复制结果链接"), 2000); } catch { setShareText("复制失败"); setTimeout(() => setShareText("复制结果链接"), 2000); }
  }, [result]);

  const scrollToContent = useCallback(() => {
    contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  if (!loaded || !result) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#7C5CFF] border-t-transparent" />
      </main>
    );
  }

  const camp = getMbtiTheme(result.type);
  const t = camp.theme;
  const isExampleScores = !tendency;

  const dimScores: DimensionScore[] = tendency
    ? tendency.tendencies.map((td) => {
        const total = td.leftScore + td.rightScore || 1;
        const leftPct = Math.round((td.leftScore / total) * 100);
        const baseMap: Record<string, { dimension: string; label: string; left: { letter: string; label: string }; right: { letter: string; label: string } }> = {
          EI: { dimension: "EI", label: "社交能量", left: { letter: "E", label: "外向" }, right: { letter: "I", label: "内向" } },
          SN: { dimension: "SN", label: "信息偏好", left: { letter: "S", label: "实感" }, right: { letter: "N", label: "直觉" } },
          TF: { dimension: "TF", label: "决策方式", left: { letter: "T", label: "思考" }, right: { letter: "F", label: "情感" } },
          JP: { dimension: "JP", label: "生活节奏", left: { letter: "J", label: "判断" }, right: { letter: "P", label: "知觉" } },
        };
        const b = baseMap[td.dimension];
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
    <main className={`relative min-h-screen ${t.pageBg}`}>
      {/* Background glows */}
      <div className={`pointer-events-none fixed -top-32 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full opacity-[0.07] blur-[120px] animate-[floatSlow_30s_ease-in-out_infinite] ${t.accentDot}`} />
      <div className="pointer-events-none fixed top-1/3 -right-20 h-[400px] w-[400px] rounded-full bg-slate-200/20 blur-[100px] animate-[floatSlow_25s_ease-in-out_infinite_reverse]" />

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between border-b border-black/5 bg-white/80 backdrop-blur-xl px-5 py-3.5">
        <Link href="/" className="text-sm text-slate-500 transition hover:text-slate-900">← 返回首页</Link>
        <span className="text-sm font-medium text-slate-800">TypeMind</span>
        <button onClick={handleRestart} className="text-sm text-slate-500 transition hover:text-[#7C5CFF]">重新测试</button>
      </div>

      {/* ===== 1. Hero Card (clickable) ===== */}
      <section className="relative z-10 px-5 pt-8 sm:pt-10">
        <div className="mx-auto max-w-2xl">
          {isExample && (
            <div className="mb-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-center text-sm text-amber-700">
              这是示例报告。完成测试后可生成你的专属结果。
            </div>
          )}

          <button
            type="button"
            onClick={scrollToContent}
            className={`group w-full overflow-hidden rounded-3xl border ${t.cardBorder} bg-white/80 text-left shadow-xl shadow-slate-200/30 backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-200/40`}
          >
            <div className={`relative overflow-hidden bg-gradient-to-br ${t.heroGradient} px-6 py-7 text-center sm:px-10 sm:py-10`}>
              <div className={`pointer-events-none absolute -top-12 left-1/2 h-[180px] w-[280px] -translate-x-1/2 rounded-full opacity-10 blur-[60px] ${t.accentDot}`} />
              <p className="relative mb-1 text-[11px] text-slate-400">你的 TypeMind 结果卡</p>
              <span className={`relative mb-3 inline-block rounded-full ${t.badge} px-3 py-0.5 text-xs font-medium`}>{camp.label}</span>
              <p className={`relative mb-0.5 text-5xl font-bold tracking-widest sm:text-6xl bg-gradient-to-br ${t.primaryText} bg-clip-text text-transparent`}>{result.type}</p>
              <p className="relative mb-3 text-lg font-semibold text-slate-800 sm:text-xl">{result.name}</p>
              <div className="relative flex flex-wrap justify-center gap-1.5">
                {result.keywords.map((kw) => (
                  <span key={kw} className={`rounded-full border ${t.cardBorder} bg-white/60 px-2.5 py-0.5 text-xs text-slate-500 backdrop-blur-sm`}>{kw}</span>
                ))}
              </div>

              {/* Dimension chips */}
              <div className="relative mt-4 flex justify-center gap-2 overflow-x-auto pb-1">
                {winnerChips.map(({ dim, letter, pct, full }) => (
                  <button
                    key={dim}
                    onClick={(e) => { e.stopPropagation(); setDimModal(full); }}
                    className={`shrink-0 rounded-full border ${t.cardBorder} bg-white/70 px-3 py-1 text-xs backdrop-blur-sm transition hover:-translate-y-0.5 hover:shadow-sm`}
                  >
                    <span className="font-bold text-slate-700">{letter}</span>
                    <span className="ml-1 text-slate-400">{pct}%</span>
                  </button>
                ))}
              </div>

              <p className="relative mt-4 text-[11px] text-slate-400 group-hover:text-slate-500 transition">点击查看完整解读 ↓</p>
            </div>
            <div className="border-t border-black/5 px-6 py-4 sm:px-10">
              <p className="line-clamp-2 text-sm leading-relaxed text-slate-500">{result.summary}</p>
            </div>
          </button>
        </div>
      </section>

      {/* Content anchor */}
      <div ref={contentRef} className="scroll-mt-20" />

      {/* ===== 2. Core Snapshot ===== */}
      <section className="relative z-10 px-5 pt-8">
        <div className="mx-auto max-w-2xl">
          <SectionHeader eyebrow="Core Snapshot" title="先看最像你的地方" description="你最常被感受到的样子。" />
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className={`rounded-2xl border ${t.cardBorder} bg-white/80 backdrop-blur-sm p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md`}>
              <h3 className="mb-1 text-sm font-semibold text-emerald-600">你的优势</h3>
              <p className="mb-3 text-xs text-slate-400">你身上自然会发光的部分。</p>
              <ul className="space-y-2">
                {result.strengths.map((s) => (
                  <li key={s} className="flex items-start gap-2 text-sm leading-relaxed text-slate-600"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />{s}</li>
                ))}
              </ul>
            </div>
            <div className={`rounded-2xl border ${t.cardBorder} bg-white/80 backdrop-blur-sm p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md`}>
              <h3 className="mb-1 text-sm font-semibold text-amber-600">你需要注意</h3>
              <p className="mb-3 text-xs text-slate-400">压力下容易被你自己忽略的地方。</p>
              <ul className="space-y-2">
                {result.cautions.map((c) => (
                  <li key={c} className="flex items-start gap-2 text-sm leading-relaxed text-slate-600"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 3. Relationship Snapshot ===== */}
      <section className="relative z-10 px-5 py-8">
        <div className="mx-auto max-w-2xl">
          <SectionHeader eyebrow="Relationship Snapshot" title="你和不同类型的相处节奏" description="提前看见你们的默契与磨合。" />
          <div className="mt-5">
            <RelationshipSection matches={result.matches} challengingMatches={result.challengingMatches} />
          </div>
        </div>
      </section>

      {/* ===== 4. Deep Reading — Swipeable Deck ===== */}
      <section className="relative z-10 px-5 py-8">
        <div className="mx-auto max-w-2xl">
          <SectionHeader eyebrow="Deep Reading" title="更具体地理解你的生活模式" description="关于你在关系、金钱、方向和当下的样子。" />
          <div className={`mt-5 rounded-3xl border ${t.cardBorder} bg-white/80 p-6 shadow-sm backdrop-blur-sm`}>
            <SwipeableDeck
              accentClass={t.accentDot}
              cards={insights.map(({ label, content }): DeckCard => ({ key: label, title: label, content }))}
            />
          </div>
        </div>
      </section>

      {/* ===== 5. Actions ===== */}
      <section className="relative z-10 px-5 py-5">
        <div className="mx-auto flex max-w-2xl flex-col gap-3 sm:flex-row">
          <button onClick={handleRestart} className={`flex-1 rounded-xl border ${t.cardBorder} bg-white/80 backdrop-blur-sm px-6 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md active:scale-[0.98]`}>重新测试</button>
          <button onClick={handleShare} className={`flex-1 rounded-xl ${t.button} px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md active:scale-[0.98]`}>{shareText}</button>
        </div>
      </section>

      {/* About */}
      <section className="relative z-10 px-5 pb-10">
        <div className="mx-auto max-w-2xl">
          <SectionHeader title="关于这个结果" description="一种理解自己的角度，而不是定义。测试免费，不构成诊断。" />
          <div className="mt-4 flex flex-col items-center gap-3">
            <p className="text-xs text-slate-400">当前为免费测试版，内容会持续优化。你可以截图保存，或复制链接分享给朋友。</p>
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-black/5 px-5 py-7">
        <div className="text-center text-xs text-slate-400">TypeMind · MBTI 性格测试</div>
      </footer>

      {/* Dimension detail modal */}
      {dimModal && (
        <div className="fixed inset-0 z-50 flex animate-[fadeIn_0.2s_ease-out] items-end justify-center bg-slate-900/40 backdrop-blur-sm md:items-center md:p-4" onClick={() => setDimModal(null)}>
          <div onClick={(e) => e.stopPropagation()} className="relative flex max-h-[85vh] w-full animate-[slideUp_0.25s_ease-out] flex-col overflow-hidden rounded-t-3xl bg-white/95 shadow-2xl backdrop-blur-xl md:max-w-md md:rounded-3xl">
            <button onClick={() => setDimModal(null)} className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-600">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            </button>
            <div className={`shrink-0 bg-gradient-to-br ${t.heroGradient} px-6 pb-5 pt-8 text-center`}>
              <span className={`mb-3 inline-block rounded-full ${t.badge} px-3 py-0.5 text-xs font-medium`}>{dimModal.label}</span>
              <h2 className="text-2xl font-bold text-slate-800">
                {dimModal.left.label}({dimModal.left.letter}) / {dimModal.right.label}({dimModal.right.letter})
              </h2>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-5">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <span className="w-8 text-right font-medium text-slate-600">{dimModal.left.letter}</span>
                  <div className="relative h-2.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                    <div className={`absolute left-0 top-0 h-full rounded-full ${t.accentDot}`} style={{ width: `${dimModal.left.pct}%` }} />
                  </div>
                  <span className="w-8 font-medium text-slate-600">{dimModal.right.letter}</span>
                </div>
                <p className="text-center text-sm text-slate-500">{dimModal.left.pct}% / {dimModal.right.pct}%</p>
                <p className="text-sm leading-relaxed text-slate-600">
                  这个维度反映你 {dimModal.label} 的自然倾向。如果分差较小，说明你在不同场景中可能会灵活切换。
                </p>
                {isExampleScores && <p className="text-center text-xs text-amber-600">示例倾向 · 完成测试后显示真实分数</p>}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={<main className="flex min-h-screen items-center justify-center bg-slate-50"><div className="h-8 w-8 animate-spin rounded-full border-2 border-[#7C5CFF] border-t-transparent" /></main>}>
      <ResultContent />
    </Suspense>
  );
}
