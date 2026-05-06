"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { questions, CHOICES, calculateMBTI, STORAGE_KEYS } from "@/app/data/questions";

const total = questions.length;

export default function TestPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [scores, setScores] = useState<Record<string, number>>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const a = localStorage.getItem(STORAGE_KEYS.answers);
      const s = localStorage.getItem(STORAGE_KEYS.scores);
      if (a) setAnswers(JSON.parse(a));
      if (s) setScores(JSON.parse(s));
    } catch { /* ignore */ }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEYS.answers, JSON.stringify(answers));
      localStorage.setItem(STORAGE_KEYS.scores, JSON.stringify(scores));
    } catch { /* ignore */ }
  }, [answers, scores, loaded]);

  const handleChoose = useCallback(
    (choiceValue: number) => {
      const q = questions[currentIndex];
      const prev = answers[q.id];
      let nextScores = { ...scores };
      if (prev !== undefined) {
        const pl = prev > 0 ? q.optionAType : q.optionBType;
        nextScores[pl] = Math.max(0, (nextScores[pl] ?? 0) - Math.abs(prev));
      }
      const letter = choiceValue > 0 ? q.optionAType : q.optionBType;
      nextScores[letter] = (nextScores[letter] ?? 0) + Math.abs(choiceValue);
      setAnswers((p) => ({ ...p, [q.id]: choiceValue }));
      setScores(nextScores);
      if (currentIndex < total - 1) {
        setCurrentIndex((p) => p + 1);
      } else {
        const result = calculateMBTI(nextScores);
        try {
          localStorage.setItem(STORAGE_KEYS.result, result.type);
          localStorage.setItem(STORAGE_KEYS.tendency, JSON.stringify(result));
        } catch { /* ignore */ }
        router.push(`/result?type=${result.type}`);
      }
    },
    [currentIndex, answers, scores, router]
  );

  const handlePrev = useCallback(() => { if (currentIndex > 0) setCurrentIndex((p) => p - 1); }, [currentIndex]);
  const handleRestart = useCallback(() => {
    setCurrentIndex(0); setAnswers({}); setScores({});
    try { localStorage.removeItem(STORAGE_KEYS.answers); localStorage.removeItem(STORAGE_KEYS.scores); localStorage.removeItem(STORAGE_KEYS.result); localStorage.removeItem(STORAGE_KEYS.tendency); } catch { /* ignore */ }
  }, []);

  if (!loaded) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FAFAFB]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#7C5CFF] border-t-transparent" />
      </main>
    );
  }

  const q = questions[currentIndex];
  const progress = ((currentIndex + (answers[q.id] !== undefined ? 1 : 0)) / total) * 100;
  const selected = answers[q.id] ?? null;
  const isSelectedA = selected !== null && selected > 0;
  const isSelectedB = selected !== null && selected < 0;

  const dimLabel: Record<string, string> = { EI: "社交能量", SN: "信息偏好", TF: "决策方式", JP: "生活节奏" };

  return (
    <main className="flex min-h-screen flex-col bg-[#FAFAFB]">
      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-black/5 bg-white/80 backdrop-blur-lg px-5 py-3.5">
        <Link href="/" className="text-sm text-[#6F6877] transition hover:text-[#26222E]">← 返回</Link>
        <span className="text-xs text-[#B0A8BA]">{currentIndex + 1} / {total}</span>
        <button onClick={handleRestart} className="text-xs text-[#B0A8BA] transition hover:text-[#E87BA8]">重新开始</button>
      </div>

      {/* Progress bar + dimension label */}
      <div className="h-1 w-full bg-[#E0DCE8]">
        <div className="h-full bg-[#7C5CFF] transition-all duration-300" style={{ width: `${progress}%` }} />
      </div>
      <div className="flex items-center justify-between bg-white/60 backdrop-blur-sm px-5 py-2">
        <span className="text-[11px] text-[#B0A8BA]">{dimLabel[q.dimension]}</span>
        <span className="text-[11px] text-[#B0A8BA]">第 {currentIndex + 1} / {total} 题</span>
      </div>

      {/* Question */}
      <div className="flex flex-1 flex-col px-5 py-6 sm:py-8">
        <div className="mx-auto flex w-full max-w-lg flex-1 flex-col">
          <h2 className="mb-6 text-center text-lg font-semibold leading-relaxed text-[#26222E] sm:text-xl">{q.question}</h2>

          {/* A/B cards */}
          <div className="mb-5 grid gap-3 sm:grid-cols-2">
            <div className={`rounded-2xl border p-4 sm:p-5 transition-all ${isSelectedA ? "border-violet-400 bg-violet-50/60 ring-1 ring-violet-200" : "border-black/5 bg-white/80 backdrop-blur-sm hover:border-violet-200"}`}>
              <span className="mb-1.5 block text-[11px] font-semibold tracking-wider text-violet-500 uppercase">A</span>
              <p className="text-sm leading-relaxed text-[#4A4458]">{q.optionA}</p>
            </div>
            <div className={`rounded-2xl border p-4 sm:p-5 transition-all ${isSelectedB ? "border-amber-400 bg-amber-50/60 ring-1 ring-amber-200" : "border-black/5 bg-white/80 backdrop-blur-sm hover:border-amber-200"}`}>
              <span className="mb-1.5 block text-[11px] font-semibold tracking-wider text-amber-500 uppercase">B</span>
              <p className="text-sm leading-relaxed text-[#4A4458]">{q.optionB}</p>
            </div>
          </div>

          {/* Choice buttons */}
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {CHOICES.map((ch) => {
              const isActive = selected === ch.value;
              const isLeft = ch.value > 0;
              return (
                <button
                  key={ch.value}
                  onClick={() => handleChoose(ch.value)}
                  className={`rounded-xl border p-3 text-center transition-all active:scale-[0.96] ${
                    isActive
                      ? isLeft ? "border-violet-400 bg-violet-500 text-white shadow-md" : "border-amber-400 bg-amber-500 text-white shadow-md"
                      : isLeft ? "border-violet-200 bg-white text-violet-600 hover:border-violet-400 hover:bg-violet-50" : "border-amber-200 bg-white text-amber-600 hover:border-amber-400 hover:bg-amber-50"
                  }`}
                >
                  <span className="block text-sm font-medium">{ch.label}</span>
                  <span className={`mt-0.5 block text-[10px] ${isActive ? "opacity-80" : isLeft ? "text-violet-400" : "text-amber-400"}`}>{ch.sublabel}</span>
                </button>
              );
            })}
          </div>

          {/* Bottom */}
          <div className="mt-auto space-y-3 pt-6">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`w-full rounded-xl border px-6 py-3 text-sm font-medium transition ${
                currentIndex === 0 ? "cursor-not-allowed border-[#E0DCE8] text-[#B0A8BA]" : "border-[#E0DCE8] bg-white/80 backdrop-blur-sm text-[#6F6877] hover:border-[#7C5CFF]/30 hover:text-[#7C5CFF] active:scale-[0.98]"
              }`}
            >
              上一题
            </button>
            <p className="text-center text-[11px] leading-relaxed text-[#B0A8BA]">
              本测试基于 MBTI 四个维度的行为偏好进行估算，结果更适合作为自我探索参考，而不是固定标签。
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
