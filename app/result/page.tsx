"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { mbtiResults, type MBTIResult } from "@/app/data/mbti-results";
import { STORAGE_KEYS, type MBTIResult2, type TendencyDetail } from "@/app/data/questions";
import { getMbtiTheme } from "@/app/data/mbti-themes";

function strengthBar(diff: number): string {
  if (diff <= 2) return "轻微";
  if (diff <= 7) return "明显";
  return "强烈";
}

function ResultContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [result, setResult] = useState<MBTIResult | null>(null);
  const [tendency, setTendency] = useState<MBTIResult2 | null>(null);
  const [isExample, setIsExample] = useState(false);
  const [shareText, setShareText] = useState("复制结果链接");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let type = searchParams.get("type")?.toUpperCase() ?? "";

    if (type && mbtiResults[type]) {
      setResult(mbtiResults[type]);
      setIsExample(false);
    } else {
      try {
        const saved = localStorage.getItem(STORAGE_KEYS.result);
        if (saved && mbtiResults[saved]) {
          type = saved;
          setResult(mbtiResults[type]);
          setIsExample(false);
        } else {
          setResult(mbtiResults["INFJ"]);
          setIsExample(true);
        }
      } catch {
        setResult(mbtiResults["INFJ"]);
        setIsExample(true);
      }
    }

    try {
      const saved = localStorage.getItem(STORAGE_KEYS.tendency);
      if (saved) setTendency(JSON.parse(saved));
    } catch {
      // ignore
    }

    setLoaded(true);
  }, [searchParams]);

  const handleRestart = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEYS.answers);
      localStorage.removeItem(STORAGE_KEYS.scores);
      localStorage.removeItem(STORAGE_KEYS.result);
      localStorage.removeItem(STORAGE_KEYS.tendency);
    } catch {
      // ignore
    }
    router.push("/test");
  }, [router]);

  const handleShare = useCallback(async () => {
    if (!result) return;
    const url = `${window.location.origin}/result?type=${result.type}`;
    try {
      await navigator.clipboard.writeText(url);
      setShareText("已复制链接");
      setTimeout(() => setShareText("复制结果链接"), 2000);
    } catch {
      setShareText("复制失败");
      setTimeout(() => setShareText("复制结果链接"), 2000);
    }
  }, [result]);

  if (!loaded || !result) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FAFAFB]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#7C5CFF] border-t-transparent" />
      </main>
    );
  }

  const camp = getMbtiTheme(result.type);
  const t = camp.theme;

  const insights = [
    { label: "亲密关系模式", content: result.love },
    { label: "财富观与消费倾向", content: result.wealth },
    { label: "适合的发展方向", content: result.career },
    { label: "近期生活建议", content: result.luck },
  ];

  // Tendency details
  const tendencies: TendencyDetail[] | null = tendency?.tendencies ?? null;

  return (
    <main className={`min-h-screen ${t.pageBg}`}>
      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-black/5 bg-white px-5 py-3.5">
        <Link
          href="/"
          className="text-sm text-[#6F6877] transition hover:text-[#26222E]"
        >
          ← 返回首页
        </Link>
        <span className="text-sm font-medium text-[#26222E]">TypeMind</span>
        <button
          onClick={handleRestart}
          className="text-sm text-[#6F6877] transition hover:text-[#7C5CFF]"
        >
          重新测试
        </button>
      </div>

      {/* 1. Hero card */}
      <section className="px-5 pb-4 pt-8 sm:pt-10">
        <div className="mx-auto max-w-2xl">
          {isExample && (
            <div className="mb-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-center text-sm text-amber-700">
              这是示例报告。完成测试后可生成你的专属结果。
            </div>
          )}

          <p className="mb-2 text-center text-xs text-[#B0A8BA]">
            你的 TypeMind 测试结果
          </p>

          <div className={`overflow-hidden rounded-3xl border ${t.cardBorder} bg-white shadow-sm`}>
            <div className={`bg-gradient-to-br ${t.heroGradient} px-6 py-7 text-center sm:px-10 sm:py-10`}>
              <span className={`mb-3 inline-block rounded-full ${t.badge} px-3 py-0.5 text-xs font-medium`}>
                {camp.label}
              </span>
              <p className="mb-1.5 text-5xl font-bold tracking-widest text-[#26222E] sm:text-6xl">
                {result.type}
              </p>
              <p className="mb-4 text-lg font-semibold text-[#26222E] sm:text-xl">
                {result.name}
              </p>
              <div className="flex flex-wrap justify-center gap-1.5">
                {result.keywords.map((kw) => (
                  <span
                    key={kw}
                    className={`rounded-full border ${t.cardBorder} bg-white px-2.5 py-0.5 text-xs text-[#6F6877]`}
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>

            {/* Tendency bars */}
            {tendencies && !isExample && (
              <div className="border-t border-black/5 px-6 py-5 sm:px-10">
                <div className="space-y-2.5">
                  {tendencies.map((td) => {
                    const [a, b] = [td.leftType, td.rightType];
                    const total = td.leftScore + td.rightScore || 1;
                    const leftPct = Math.round((td.leftScore / total) * 100);
                    const winner = td.winner;
                    return (
                      <div key={td.dimension} className="flex items-center gap-2 text-[11px]">
                        <span className="w-8 shrink-0 text-[#B0A8BA]">{td.dimension}</span>
                        <div className="flex flex-1 items-center gap-1.5">
                          <span className={`w-4 text-right ${winner === a ? "font-semibold text-[#26222E]" : "text-[#B0A8BA]"}`}>
                            {a}
                          </span>
                          <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-[#E8E4ED]">
                            <div
                              className="absolute left-0 top-0 h-full rounded-full bg-[#7C5CFF]"
                              style={{ width: `${leftPct}%` }}
                            />
                          </div>
                          <span className={`w-4 ${winner === b ? "font-semibold text-[#26222E]" : "text-[#B0A8BA]"}`}>
                            {b}
                          </span>
                        </div>
                        <span className="w-8 shrink-0 text-right text-[#B0A8BA]">
                          {strengthBar(td.leftScore + td.rightScore === 0 ? 0 : Math.abs(td.leftScore - td.rightScore))}
                        </span>
                      </div>
                    );
                  })}
                </div>
                {tendencies.some((td) => Math.abs(td.leftScore - td.rightScore) <= 2) && (
                  <p className="mt-3 text-[11px] leading-relaxed text-[#B0A8BA]">
                    部分维度比较接近，你在不同场景下可能会有不同表现。
                  </p>
                )}
              </div>
            )}

            {/* Summary */}
            <div className="border-t border-black/5 px-6 py-5 sm:px-10 sm:py-6">
              <h3 className={`mb-2 text-xs font-semibold ${t.primaryText}`}>性格特点</h3>
              <p className="text-sm leading-relaxed text-[#4A4458]">{result.summary}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Strengths & Cautions side by side */}
      <section className="px-5 py-4">
        <div className="mx-auto grid max-w-2xl gap-4 sm:grid-cols-2">
          <div className={`rounded-2xl border ${t.cardBorder} bg-white p-5 shadow-sm`}>
            <h3 className="mb-3 flex items-center gap-1.5 text-sm font-semibold text-emerald-600">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              你的优势
            </h3>
            <ul className="space-y-2">
              {result.strengths.map((s) => (
                <li key={s} className="flex items-start gap-2 text-sm leading-relaxed text-[#4A4458]">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div className={`rounded-2xl border ${t.cardBorder} bg-white p-5 shadow-sm`}>
            <h3 className="mb-3 flex items-center gap-1.5 text-sm font-semibold text-amber-600">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              你需要注意
            </h3>
            <ul className="space-y-2">
              {result.cautions.map((c) => (
                <li key={c} className="flex items-start gap-2 text-sm leading-relaxed text-[#4A4458]">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 3. Relationship overview — matches + challenging side by side */}
      <section className="px-5 py-4">
        <div className="mx-auto grid max-w-2xl gap-4 sm:grid-cols-2">
          {/* Matches */}
          {result.matches && result.matches.length > 0 && (
            <div>
              <h3 className="mb-1 text-sm font-bold text-[#26222E]">
                你可能更容易产生默契的类型
              </h3>
              <p className="mb-3 text-xs leading-relaxed text-[#B0A8BA]">
                以下推荐仅作为相处参考，真正合适的关系仍然取决于沟通和边界。
              </p>
              <div className="space-y-2">
                {result.matches.map((m) => (
                  <div
                    key={m.type}
                    className={`rounded-xl border ${t.cardBorder} bg-white p-4 shadow-sm`}
                  >
                    <div className="mb-0.5 flex items-center gap-2">
                      <span className={`text-sm font-bold ${t.primaryText}`}>{m.type}</span>
                      <span className="text-xs font-medium text-[#4A4458]">{m.title}</span>
                    </div>
                    <p className="line-clamp-2 text-xs leading-relaxed text-[#8A8298]">
                      {m.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Challenging */}
          {result.challengingMatches && result.challengingMatches.length > 0 && (
            <div>
              <h3 className="mb-1 text-sm font-bold text-[#26222E]">
                你可能需要更多磨合的类型
              </h3>
              <p className="mb-3 text-xs leading-relaxed text-[#B0A8BA]">
                以下类型并不是不适合，而是在相处节奏、表达方式上可能需要更多沟通。
              </p>
              <div className="space-y-2">
                {result.challengingMatches.map((m) => (
                  <div
                    key={m.type}
                    className="rounded-xl border border-[#E8E4ED] bg-[#F8F7FA] p-4"
                  >
                    <div className="mb-0.5 flex items-center gap-2">
                      <span className="text-sm font-bold text-[#6F6877]">{m.type}</span>
                      <span className="text-xs font-medium text-[#4A4458]">{m.title}</span>
                    </div>
                    <p className="line-clamp-2 text-xs leading-relaxed text-[#8A8298]">
                      {m.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4. Deep analysis — 2x2 grid */}
      <section className="px-5 py-4">
        <div className="mx-auto grid max-w-2xl gap-4 sm:grid-cols-2">
          {insights.map(({ label, content }) => (
            <div key={label} className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
              <h3 className={`mb-2 text-sm font-semibold ${t.primaryText}`}>{label}</h3>
              <p className="line-clamp-4 text-sm leading-relaxed text-[#6F6877]">{content}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Actions */}
      <section className="px-5 py-5">
        <div className="mx-auto flex max-w-2xl flex-col gap-3 sm:flex-row">
          <button
            onClick={handleRestart}
            className={`flex-1 rounded-xl border ${t.cardBorder} bg-white px-6 py-3 text-sm font-medium text-[#26222E] shadow-sm transition hover:text-[#7C5CFF] active:scale-[0.98]`}
          >
            重新测试
          </button>
          <button
            onClick={handleShare}
            className={`flex-1 rounded-xl ${t.button} px-6 py-3 text-sm font-medium text-white shadow-sm transition active:scale-[0.98]`}
          >
            {shareText}
          </button>
        </div>
      </section>

      {/* Beta notice */}
      <section className="px-5 pb-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs leading-relaxed text-[#B0A8BA]">
            当前为免费测试版，内容会持续优化。你可以截图保存，或复制链接分享给朋友。
          </p>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="px-5 pb-10">
        <div className="mx-auto max-w-2xl rounded-2xl border border-black/5 bg-white p-5 text-center">
          <p className="text-xs leading-relaxed text-[#B0A8BA]">
            本测试基于 MBTI 四个维度的行为偏好进行估算，
            结果更适合作为自我探索参考，而不是固定标签。
            测试免费，无需注册，不构成心理诊断或人生决策依据。
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-black/5 px-5 py-7">
        <div className="text-center text-xs text-[#B0A8BA]">TypeMind · MBTI 性格测试</div>
      </footer>
    </main>
  );
}

export default function ResultPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[#FAFAFB]">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#7C5CFF] border-t-transparent" />
        </main>
      }
    >
      <ResultContent />
    </Suspense>
  );
}
