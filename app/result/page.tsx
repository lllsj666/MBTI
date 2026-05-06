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
          setLoaded(true);
          return;
        }
      } catch {
        // ignore
      }
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

  const sections = [
    { label: "财富观与消费倾向", icon: "✦", content: result.wealth },
    { label: "亲密关系模式", icon: "♥", content: result.love },
    { label: "适合的发展方向", icon: "◆", content: result.career },
    { label: "近期生活建议", icon: "★", content: result.luck },
  ];

  return (
    <main className="min-h-screen bg-[#FAFAFB]">
      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-black/5 bg-white px-6 py-4">
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

      {/* Result header */}
      <section className="px-6 pb-6 pt-10 sm:pt-14">
        <div className="mx-auto max-w-lg">
          {isExample && (
            <div className="mb-6 rounded-xl border border-[#F0A55A]/30 bg-[#FEF7F0] px-4 py-3 text-center text-sm text-[#C88A3A]">
              这是示例报告。完成测试后可生成你的专属结果。
            </div>
          )}

          <p className="mb-2 text-center text-sm text-[#B0A8BA]">
            你的 TypeMind 测试结果
          </p>

          {/* Type card */}
          <div className="overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm">
            <div className="bg-gradient-to-br from-[#F4F0FA] via-white to-[#FDF2F7] px-6 py-8 text-center sm:px-8 sm:py-10">
              <p className="mb-3 text-5xl font-bold tracking-widest text-[#26222E] sm:text-6xl">
                {result.type}
              </p>
              <p className="mb-4 text-xl font-semibold text-[#26222E] sm:text-2xl">
                {result.name}
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {result.keywords.map((kw) => (
                  <span
                    key={kw}
                    className="rounded-full border border-[#E0DCE8] bg-white px-3 py-1 text-xs text-[#6F6877]"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>

            <div className="px-6 py-6 sm:px-8 sm:py-8">
              <h3 className="mb-3 text-sm font-semibold text-[#7C5CFF]">
                性格特点
              </h3>
              <p className="text-sm leading-relaxed text-[#4A4458]">
                {result.summary}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Strengths & Cautions */}
      <section className="px-6 py-6">
        <div className="mx-auto max-w-lg space-y-4">
          <div className="rounded-2xl border border-[#E0DCE8] bg-white p-6 shadow-sm">
            <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-[#5B9FED]">
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
                <li
                  key={s}
                  className="flex items-start gap-3 text-sm text-[#4A4458]"
                >
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#5B9FED]" />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-[#E0DCE8] bg-white p-6 shadow-sm">
            <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-[#F0A55A]">
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
                <li
                  key={c}
                  className="flex items-start gap-3 text-sm text-[#4A4458]"
                >
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#F0A55A]" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Insight sections */}
      <section className="px-6 py-6">
        <div className="mx-auto max-w-lg space-y-4">
          {sections.map(({ label, icon, content }) => (
            <div
              key={label}
              className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm"
            >
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#7C5CFF]">
                <span>{icon}</span>
                {label}
              </h3>
              <p className="text-sm leading-relaxed text-[#6F6877]">
                {content}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Matches */}
      {result.matches && result.matches.length > 0 && (
        <section className="px-6 py-6">
          <div className="mx-auto max-w-lg">
            <h3 className="mb-1 text-lg font-bold text-[#26222E]">
              你可能更容易产生默契的类型
            </h3>
            <p className="mb-5 text-sm leading-relaxed text-[#B0A8BA]">
              以下推荐仅作为相处参考，真正合适的关系仍然取决于沟通、边界和共同成长。
            </p>
            <div className="space-y-3">
              {result.matches.map((m) => (
                <div
                  key={m.type}
                  className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm"
                >
                  <div className="mb-1 flex items-center gap-2">
                    <span className="text-sm font-bold text-[#7C5CFF]">
                      {m.type}
                    </span>
                    <span className="text-sm font-medium text-[#26222E]">
                      {m.title}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-[#6F6877]">
                    {m.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Actions */}
      <section className="px-6 py-6">
        <div className="mx-auto flex max-w-lg flex-col gap-3 sm:flex-row">
          <button
            onClick={handleRestart}
            className="flex-1 rounded-xl border border-[#E0DCE8] bg-white px-6 py-3.5 text-sm font-medium text-[#26222E] shadow-sm transition hover:border-[#7C5CFF] hover:text-[#7C5CFF] active:scale-[0.98]"
          >
            重新测试
          </button>
          <button
            onClick={handleShare}
            className="flex-1 rounded-xl bg-[#7C5CFF] px-6 py-3.5 text-sm font-medium text-white shadow-sm transition hover:bg-[#6A4DE6] active:scale-[0.98]"
          >
            {shareText}
          </button>
        </div>
      </section>

      {/* Beta notice */}
      <section className="px-6 pb-8">
        <div className="mx-auto max-w-lg text-center">
          <p className="text-xs leading-relaxed text-[#B0A8BA]">
            当前为免费测试版，内容会持续优化。你可以截图保存，或复制链接分享给朋友。
          </p>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-lg rounded-2xl border border-black/5 bg-white p-6 text-center">
          <p className="text-xs leading-relaxed text-[#B0A8BA]">
            本测试仅用于娱乐和自我探索参考，不构成心理诊断、投资建议、婚恋建议或人生决策依据。
            请把结果当作理解自己的一个角度，而不是唯一答案。
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-black/5 px-6 py-8">
        <div className="text-center text-xs text-[#B0A8BA]">
          TypeMind · MBTI 性格测试
        </div>
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
