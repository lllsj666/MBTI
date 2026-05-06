"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { mbtiResults, type MBTIResult } from "@/app/data/mbti-results";
import { STORAGE_KEYS, type MBTIResult2, type TendencyDetail } from "@/app/data/questions";
import { getMbtiTheme } from "@/app/data/mbti-themes";
import { SectionHeader } from "@/components/SectionHeader";
import { RelationshipSection } from "@/components/RelationshipSection";

function strengthBarLabel(diff: number): string {
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
  const tendencies: TendencyDetail[] | null = tendency?.tendencies ?? null;

  const insights = [
    { label: "亲密关系模式", content: result.love },
    { label: "金钱观与资源管理", content: result.wealth },
    { label: "适合的发展方向", content: result.career },
    { label: "近期生活建议", content: result.luck },
  ];

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

      {/* ===== 1. Hero card ===== */}
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
                    const total = td.leftScore + td.rightScore || 1;
                    const leftPct = Math.round((td.leftScore / total) * 100);
                    return (
                      <div key={td.dimension} className="flex items-center gap-2 text-[11px]">
                        <span className="w-8 shrink-0 text-[#B0A8BA]">{td.dimension}</span>
                        <div className="flex flex-1 items-center gap-1.5">
                          <span className={`w-4 text-right ${td.winner === td.leftType ? "font-semibold text-[#26222E]" : "text-[#B0A8BA]"}`}>
                            {td.leftType}
                          </span>
                          <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-[#E8E4ED]">
                            <div
                              className="absolute left-0 top-0 h-full rounded-full bg-[#7C5CFF]"
                              style={{ width: `${leftPct}%` }}
                            />
                          </div>
                          <span className={`w-4 ${td.winner === td.rightType ? "font-semibold text-[#26222E]" : "text-[#B0A8BA]"}`}>
                            {td.rightType}
                          </span>
                        </div>
                        <span className="w-8 shrink-0 text-right text-[#B0A8BA]">
                          {strengthBarLabel(Math.abs(td.leftScore - td.rightScore))}
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

      {/* ===== 2. Core Snapshot ===== */}
      <section className="px-5 py-6">
        <div className="mx-auto max-w-2xl">
          <SectionHeader
            eyebrow="Core Snapshot"
            title="先看最像你的地方"
            description="这里总结的是你更稳定、更容易被别人感受到的性格特征，以及在日常相处中可能需要留意的部分。"
          />

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {/* Strengths */}
            <div className={`rounded-2xl border ${t.cardBorder} bg-white p-5 shadow-sm`}>
              <h3 className="mb-1 text-sm font-semibold text-emerald-600">你的优势</h3>
              <p className="mb-3 text-xs text-[#B0A8BA]">这些是你更容易自然发挥出来的能力。</p>
              <ul className="space-y-2">
                {result.strengths.map((s) => (
                  <li key={s} className="flex items-start gap-2 text-sm leading-relaxed text-[#4A4458]">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            {/* Cautions */}
            <div className={`rounded-2xl border ${t.cardBorder} bg-white p-5 shadow-sm`}>
              <h3 className="mb-1 text-sm font-semibold text-amber-600">你需要注意</h3>
              <p className="mb-3 text-xs text-[#B0A8BA]">这些不是缺点，而是你在压力或关系中可能更容易忽略的地方。</p>
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
        </div>
      </section>

      {/* ===== 3. Relationship Snapshot ===== */}
      <section className="px-5 py-6">
        <div className="mx-auto max-w-2xl">
          <SectionHeader
            eyebrow="Relationship Snapshot"
            title="你和不同类型的相处节奏"
            description="这里不是判断谁适不适合你，而是帮助你提前看见可能的默契点和磨合点。"
          />

          <div className="mt-6">
            <RelationshipSection
              matches={result.matches}
              challengingMatches={result.challengingMatches}
            />
          </div>
        </div>
      </section>

      {/* ===== 4. Deep Reading ===== */}
      <section className="px-5 py-6">
        <div className="mx-auto max-w-2xl">
          <SectionHeader
            eyebrow="Deep Reading"
            title="更具体地理解你的生活模式"
            description="下面的内容会从关系、金钱观、发展方向和近期建议四个角度，给你一些更生活化的参考。"
          />

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {insights.map(({ label, content }) => (
              <div key={label} className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
                <h3 className={`mb-2 text-sm font-semibold ${t.primaryText}`}>{label}</h3>
                <p className="line-clamp-4 text-sm leading-relaxed text-[#6F6877]">{content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 5. Actions ===== */}
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
        <div className="mx-auto max-w-2xl">
          <SectionHeader
            title="关于这个结果"
            description="本测试基于 MBTI 四个维度的行为偏好进行估算，更适合作为自我探索参考，而不是固定标签。你可以把它当作理解自己的一个角度，而不是对自己的限制。"
          />
          <div className="mt-4 rounded-2xl border border-black/5 bg-white p-5 text-center">
            <p className="text-xs leading-relaxed text-[#B0A8BA]">
              测试免费，无需注册，不构成心理诊断或人生决策依据。
            </p>
          </div>
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
