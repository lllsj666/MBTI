"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { questions, CHOICES, calculateMBTI, STORAGE_KEYS } from "@/app/data/questions";

const total = questions.length;
const SEGMENTS = [
  { start: 0, end: 8, color: "bg-violet-500", label: "社交能量", dim: "EI" },
  { start: 9, end: 17, color: "bg-emerald-500", label: "信息偏好", dim: "SN" },
  { start: 18, end: 26, color: "bg-amber-500", label: "决策方式", dim: "TF" },
  { start: 27, end: 35, color: "bg-sky-500", label: "生活节奏", dim: "JP" },
];

const dimLabel: Record<string, string> = { EI: "社交能量", SN: "信息偏好", TF: "决策方式", JP: "生活节奏" };

export default function TestPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [scores, setScores] = useState<Record<string, number>>({});
  const [loaded, setLoaded] = useState(false);
  const [slideDir, setSlideDir] = useState<1 | -1>(1);
  const [animating, setAnimating] = useState(false);
  const [ceremony, setCeremony] = useState(false);

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

  const goToResult = useCallback((finalScores: Record<string, number>) => {
    const result = calculateMBTI(finalScores);
    try {
      localStorage.setItem(STORAGE_KEYS.result, result.type);
      localStorage.setItem(STORAGE_KEYS.tendency, JSON.stringify(result));
    } catch { /* ignore */ }
    router.push(`/result?type=${result.type}`);
  }, [router]);

  const handleChoose = useCallback(
    (choiceValue: number, isLast: boolean) => {
      if (animating) return;
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

      if (isLast) {
        // Ceremony
        setCeremony(true);
        setTimeout(() => goToResult(nextScores), 1300);
      } else {
        setSlideDir(1);
        setAnimating(true);
        setTimeout(() => {
          setCurrentIndex((p) => p + 1);
          setAnimating(false);
        }, 200);
      }
    },
    [currentIndex, answers, scores, animating, goToResult]
  );

  const handlePrev = useCallback(() => {
    if (currentIndex === 0 || animating) return;
    setSlideDir(-1);
    setAnimating(true);
    setTimeout(() => {
      setCurrentIndex((p) => p - 1);
      setAnimating(false);
    }, 200);
  }, [currentIndex, animating]);

  const handleRestart = useCallback(() => {
    setCurrentIndex(0); setAnswers({}); setScores({}); setCeremony(false);
    try { localStorage.removeItem(STORAGE_KEYS.answers); localStorage.removeItem(STORAGE_KEYS.scores); localStorage.removeItem(STORAGE_KEYS.result); localStorage.removeItem(STORAGE_KEYS.tendency); } catch { /* ignore */ }
  }, []);

  if (!loaded) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-violet-500 border-t-transparent" />
      </main>
    );
  }

  const q = questions[currentIndex];
  const answeredCount = Object.keys(answers).length;
  const progress = ((answeredCount) / total) * 100;
  const selected = answers[q.id] ?? null;
  const isSelectedA = selected !== null && selected > 0;
  const isSelectedB = selected !== null && selected < 0;
  const currentSeg = SEGMENTS.find((s) => currentIndex >= s.start && currentIndex <= s.end) || SEGMENTS[0];

  // Ceremony overlay
  if (ceremony) {
    return (
      <main className="relative flex min-h-screen items-center justify-center bg-slate-50">
        {/* Dots converging */}
        <div className="animate-[fadeIn_0.3s_ease-out]">
          <div className="flex gap-3 mb-6">
            {["bg-violet-500", "bg-emerald-500", "bg-amber-500", "bg-sky-500"].map((color, i) => (
              <div
                key={i}
                className={`h-4 w-4 rounded-full opacity-80 ${color} animate-[fadeIn_0.3s_ease-out_both]`}
                style={{ animationDelay: `${0.15 * i}s` }}
              />
            ))}
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white/90 p-8 text-center shadow-2xl backdrop-blur-xl animate-[fadeIn_0.5s_ease-out_0.4s_both]">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-violet-100 to-emerald-100">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#7C5CFF" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
            </div>
            <p className="text-lg font-bold text-slate-900">正在生成你的性格报告</p>
            <p className="mt-2 text-sm text-slate-500">稍等片刻...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col bg-slate-50">
      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-black/5 bg-white/80 backdrop-blur-xl px-5 py-3">
        <Link href="/" className="text-sm text-slate-500 transition hover:text-slate-900">← 返回</Link>
        <span className="text-xs text-slate-400">{dimLabel[q.dimension]} · 第 {currentIndex + 1}/{total} 题</span>
        <button onClick={handleRestart} className="text-xs text-slate-400 transition hover:text-rose-400">重新开始</button>
      </div>

      {/* Segmented progress bar */}
      <div className="relative h-1.5 w-full bg-slate-200">
        {SEGMENTS.map(({ start, end, color }) => (
          <div
            key={start}
            className={`absolute top-0 h-full ${color}`}
            style={{
              left: `${(start / total) * 100}%`,
              width: `${((end - start + 1) / total) * 100}%`,
            }}
          />
        ))}
        {/* Current highlight */}
        <div className={`absolute top-0 h-full ${currentSeg.color} opacity-40 transition-all`} style={{ left: `${(currentIndex / total) * 100}%`, width: `${(1 / total) * 100}%` }} />
        {/* Filled progress */}
        <div className="absolute top-0 h-full bg-white/60 transition-all duration-500" style={{ left: `${progress}%`, right: 0 }} />
      </div>

      {/* Question */}
      <div className="flex flex-1 flex-col px-5 py-5 sm:py-8">
        <div className="mx-auto flex w-full max-w-lg flex-1 flex-col">
          {/* Slide container */}
          <div className="flex-1 overflow-hidden">
            <div
              className="transition-transform duration-200 ease-out"
              style={{ transform: animating ? `translateX(${slideDir * -30}px)` : "translateX(0)", opacity: animating ? 0 : 1 }}
            >
              <h2 className="mb-5 text-center text-lg font-semibold leading-relaxed text-slate-800 sm:text-xl">{q.question}</h2>

              {/* A/B glass cards */}
              <div className="mb-5 grid gap-3 sm:grid-cols-2">
                <button
                  onClick={() => handleChoose(2, currentIndex === total - 1)}
                  className={`rounded-3xl border p-5 text-left backdrop-blur-xl transition-all active:scale-[0.98] ${
                    isSelectedA ? "border-violet-400 bg-violet-50/60 ring-2 ring-violet-200 shadow-md" : "border-white/60 bg-white/70 hover:border-violet-300 hover:shadow-lg hover:scale-[1.01] shadow-sm"
                  }`}>
                  <span className="mb-2 block text-[11px] font-semibold tracking-wider text-violet-500 uppercase">A</span>
                  <p className="text-sm leading-relaxed text-slate-700">{q.optionA}</p>
                </button>
                <button
                  onClick={() => handleChoose(-2, currentIndex === total - 1)}
                  className={`rounded-3xl border p-5 text-left backdrop-blur-xl transition-all active:scale-[0.98] ${
                    isSelectedB ? "border-amber-400 bg-amber-50/60 ring-2 ring-amber-200 shadow-md" : "border-white/60 bg-white/70 hover:border-amber-300 hover:shadow-lg hover:scale-[1.01] shadow-sm"
                  }`}>
                  <span className="mb-2 block text-[11px] font-semibold tracking-wider text-amber-500 uppercase">B</span>
                  <p className="text-sm leading-relaxed text-slate-700">{q.optionB}</p>
                </button>
              </div>

              {/* Choice buttons */}
              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                {CHOICES.map((ch) => {
                  const isActive = selected === ch.value;
                  const isLeft = ch.value > 0;
                  return (
                    <button key={ch.value} onClick={() => handleChoose(ch.value, currentIndex === total - 1)}
                      className={`rounded-xl border p-2.5 text-center transition-all active:scale-[0.96] ${
                        isActive ? (isLeft ? "border-violet-400 bg-violet-500 text-white shadow-md" : "border-amber-400 bg-amber-500 text-white shadow-md")
                        : isLeft ? "border-violet-200 bg-white/70 text-violet-600 hover:border-violet-400 hover:bg-violet-50" : "border-amber-200 bg-white/70 text-amber-600 hover:border-amber-400 hover:bg-amber-50"
                      }`}>
                      <span className="block text-sm font-medium">{ch.label}</span>
                      <span className={`mt-0.5 block text-[10px] ${isActive ? "opacity-80" : isLeft ? "text-violet-400" : "text-amber-400"}`}>{ch.sublabel}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-auto space-y-3 pt-6">
            {currentIndex > 0 && (
              <button onClick={handlePrev} className="w-full rounded-xl border border-slate-200 bg-white/70 px-6 py-3 text-sm font-medium text-slate-600 backdrop-blur-sm transition hover:border-slate-300 hover:text-slate-900 active:scale-[0.98]">
                ← 上一题
              </button>
            )}
            <p className="text-center text-[11px] leading-relaxed text-slate-400">
              基于 MBTI 四维行为偏好估算，一种理解自己的角度，不是固定标签。
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
