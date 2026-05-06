"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { mbtiResults, type MBTIResult } from "@/app/data/mbti-results";
import { STORAGE_KEYS } from "@/app/data/questions";

function ResultContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [result, setResult] = useState<MBTIResult | null>(null);
  const [isExample, setIsExample] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [shareText, setShareText] = useState("分享结果");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let type = searchParams.get("type")?.toUpperCase() ?? "";

    if (type && mbtiResults[type]) {
      setResult(mbtiResults[type]);
      setIsExample(false);
    } else {
      // Try localStorage
      try {
        const saved = localStorage.getItem(STORAGE_KEYS.result);
        if (saved && mbtiResults[saved]) {
          type = saved;
          setResult(mbtiResults[type]);
          setIsExample(false);
          setLoaded(true);
          return;
        }
      } catch {
        // ignore
      }
      // Fallback to INFJ example
      setResult(mbtiResults["INFJ"]);
      setIsExample(true);
    }
    setLoaded(true);
  }, [searchParams]);

  const handleRestart = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEYS.answers);
      localStorage.removeItem(STORAGE_KEYS.scores);
      localStorage.removeItem(STORAGE_KEYS.result);
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
      setTimeout(() => setShareText("分享结果"), 2000);
    } catch {
      setShareText("复制失败");
      setTimeout(() => setShareText("分享结果"), 2000);
    }
  }, [result]);

  if (!loaded || !result) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0b0711]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-violet-500 border-t-transparent" />
      </main>
    );
  }

  const lockedItems = [
    "深度性格剖析",
    "财富机会与消费盲点",
    "姻缘模式与适配伴侣",
    "事业突破方向",
    "2026 年运势关键词",
    "专属行动建议",
  ];

  return (
    <main className="min-h-screen bg-[#0b0711] text-white">
      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-white/5 px-6 py-4">
        <Link
          href="/"
          className="text-sm text-zinc-400 transition hover:text-white"
        >
          ← 返回首页
        </Link>
        <span className="text-sm font-medium text-zinc-300">TypeMind</span>
        <button
          onClick={handleRestart}
          className="text-sm text-zinc-400 transition hover:text-white"
        >
          重新测试
        </button>
      </div>

      {/* Hero result card */}
      <section className="relative overflow-hidden px-6 pb-8 pt-12 sm:pt-16">
        <div className="pointer-events-none absolute -top-20 left-1/2 h-[300px] w-[400px] -translate-x-1/2 rounded-full bg-violet-500/15 blur-[100px]" />

        <div className="relative mx-auto max-w-lg">
          {isExample && (
            <div className="mb-6 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-center text-sm text-amber-400">
              这是示例报告。完成测试后可生成你的专属结果。
            </div>
          )}

          <div className="mb-2 text-center text-sm text-zinc-500">
            你的 TypeMind 测试结果
          </div>

          {/* Main result card */}
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-sm">
            {/* Type header */}
            <div className="bg-gradient-to-r from-violet-600/30 via-fuchsia-600/30 to-amber-500/20 px-6 py-8 text-center sm:px-8 sm:py-10">
              <p className="mb-3 text-5xl font-bold tracking-widest sm:text-6xl">
                {result.type}
              </p>
              <p className="mb-4 text-xl font-semibold sm:text-2xl">
                {result.name}
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {result.keywords.map((kw) => (
                  <span
                    key={kw}
                    className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-zinc-200"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="px-6 py-6 sm:px-8 sm:py-8">
              <h3 className="mb-3 text-sm font-semibold text-amber-400">
                性格核心
              </h3>
              <p className="text-sm leading-relaxed text-zinc-300">
                {result.summary}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Strengths & Cautions */}
      <section className="px-6 py-8">
        <div className="mx-auto max-w-lg space-y-4">
          {/* Strengths */}
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04] p-6">
            <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-emerald-400">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              你的优势
            </h3>
            <ul className="space-y-2">
              {result.strengths.map((s) => (
                <li key={s} className="flex items-start gap-3 text-sm text-zinc-300">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Cautions */}
          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/[0.04] p-6">
            <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-amber-400">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              你需要注意
            </h3>
            <ul className="space-y-2">
              {result.cautions.map((c) => (
                <li key={c} className="flex items-start gap-3 text-sm text-zinc-300">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Free insights */}
      <section className="px-6 py-8">
        <div className="mx-auto max-w-lg space-y-4">
          {[
            { label: "财运倾向", icon: "✦", content: result.wealth },
            { label: "姻缘关系", icon: "♥", content: result.love },
            { label: "事业方向", icon: "◆", content: result.career },
            { label: "近期好运建议", icon: "★", content: result.luck },
          ].map(({ label, icon, content }) => (
            <div
              key={label}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm"
            >
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-violet-400">
                <span>{icon}</span>
                {label}
              </h3>
              <p className="text-sm leading-relaxed text-zinc-400">{content}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Locked content */}
      <section className="px-6 py-8">
        <div className="mx-auto max-w-lg">
          <h3 className="mb-4 text-center text-sm font-semibold text-zinc-500">
            你的完整人生能量报告已生成
          </h3>
          <div className="mb-6 space-y-3">
            {lockedItems.map((item) => (
              <div
                key={item}
                className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.02] px-5 py-4"
              >
                <span className="text-lg">🔒</span>
                <span className="text-sm text-zinc-500">{item}</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 py-4 text-sm font-semibold text-black shadow-lg shadow-amber-500/20 transition hover:shadow-xl hover:shadow-amber-500/30 active:scale-[0.98]"
          >
            解锁完整报告 ¥9.9
          </button>
        </div>
      </section>

      {/* Action buttons */}
      <section className="px-6 py-8">
        <div className="mx-auto flex max-w-lg flex-col gap-3 sm:flex-row">
          <button
            onClick={handleRestart}
            className="flex-1 rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3.5 text-sm font-medium text-zinc-300 transition hover:border-white/20 hover:bg-white/[0.06] active:scale-[0.98]"
          >
            重新测试
          </button>
          <button
            onClick={handleShare}
            className="flex-1 rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3.5 text-sm font-medium text-zinc-300 transition hover:border-white/20 hover:bg-white/[0.06] active:scale-[0.98]"
          >
            {shareText}
          </button>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-lg rounded-2xl border border-white/5 bg-white/[0.02] p-6 text-center backdrop-blur-sm">
          <p className="text-xs leading-relaxed text-zinc-500">
            本测试仅用于娱乐和自我探索参考，不构成心理诊断、投资建议、婚恋建议或人生决策依据。
          </p>
        </div>
      </section>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-6"
          onClick={() => setShowModal(false)}
        >
          <div
            className="w-full max-w-sm rounded-3xl border border-white/10 bg-[#1a1025] p-8 text-center shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 text-4xl">✨</div>
            <h3 className="mb-3 text-lg font-bold">完整报告即将开放</h3>
            <p className="mb-6 text-sm leading-relaxed text-zinc-400">
              未来将包含财运、姻缘、事业、年度运势和 AI
              个性化建议。当前版本为免费测试版，你可以先截图保存当前结果，或复制链接分享给朋友。
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 py-3 text-sm font-medium text-white shadow-lg shadow-violet-500/20 transition hover:shadow-xl active:scale-[0.98]"
            >
              我知道了
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default function ResultPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[#0b0711]">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-violet-500 border-t-transparent" />
        </main>
      }
    >
      <ResultContent />
    </Suspense>
  );
}
