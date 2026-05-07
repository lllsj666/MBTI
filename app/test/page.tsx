"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { questions, CHOICES, calculateMBTI, STORAGE_KEYS } from "@/app/data/questions";

const total = questions.length;
const SEGMENTS = [
  { start: 0, end: 8, color: "from-violet-400 to-violet-300", dot: "bg-violet-400", label: "社交能量", dim: "EI" },
  { start: 9, end: 17, color: "from-emerald-400 to-emerald-300", dot: "bg-emerald-400", label: "信息偏好", dim: "SN" },
  { start: 18, end: 26, color: "from-amber-400 to-amber-300", dot: "bg-amber-400", label: "决策方式", dim: "TF" },
  { start: 27, end: 35, color: "from-sky-400 to-sky-300", dot: "bg-sky-400", label: "生活节奏", dim: "JP" },
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
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-violet-400 border-t-transparent" />
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

  if (ceremony) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="animate-[fadeIn_0.3s_ease-out]">
          <div className="mb-6 flex gap-3">
            {["bg-violet-400", "bg-emerald-400", "bg-amber-400", "bg-sky-400"].map((color, i) => (
              <div key={i} className={`h-4 w-4 rounded-full opacity-80 ${color} animate-[fadeIn_0.3s_ease-out_both]`} style={{ animationDelay: `${0.15 * i}s` }} />
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
      <div className="flex items-center justify-between border-b border-black/5 bg-white/80 backdrop-blur-xl px-4 py-2.5 sm:px-5 sm:py-3">
        <Link href="/" className="text-sm text-slate-500 transition hover:text-slate-900">← 返回</Link>
        <span className="text-xs text-slate-400">{dimLabel[q.dimension]} · {currentIndex + 1}/{total}</span>
        <button onClick={handleRestart} className="text-xs text-slate-400 transition hover:text-rose-400">重新开始</button>
      </div>

      {/* Progress bar — elegant gradient segments */}
      <div className="relative h-1 w-full bg-slate-100">
        {SEGMENTS.map(({ start, end, color }) => (
          <div
            key={start}
            className={`absolute top-0 h-full rounded-full bg-gradient-to-r ${color}`}
            style={{ left: `${(start / total) * 100}%`, width: `${((end - start + 1) / total) * 100}%` }}
          />
        ))}
        <div className="absolute top-0 h-full bg-white/50 transition-all duration-500" style={{ left: `${progress}%`, right: 0 }} />
        <div className={`absolute top-0 h-full w-1 rounded-full ${currentSeg.dot} shadow-sm transition-all duration-300`} style={{ left: `calc(${(currentIndex / total) * 100}% - 2px)` }} />
      </div>

      {/* Question area */}
      <div className="flex flex-1 flex-col px-4 py-4 sm:px-5 sm:py-6">
        <div className="mx-auto flex w-full max-w-xl flex-1 flex-col">
          <div className="flex-1 overflow-hidden">
            <div
              className="transition-all duration-200 ease-out"
              style={{ transform: animating ? `translateX(${slideDir * -20}px)` : "translateX(0)", opacity: animating ? 0 : 1 }}
            >
              <h2 className="mb-4 text-center text-base font-semibold leading-relaxed text-slate-800 sm:mb-5 sm:text-xl">
                {q.question}
              </h2>

              {/* A/B cards */}
              <div className="mb-4 grid gap-3 sm:mb-5">
                <button
                  onClick={() => handleChoose(2, currentIndex === total - 1)}
                  className={`rounded-2xl border p-4 text-left backdrop-blur-xl transition-all active:scale-[0.98] sm:rounded-3xl sm:p-5 ${
                    isSelectedA ? "border-violet-300 bg-violet-50/70 ring-1 ring-violet-200 shadow-md" : "border-white/60 bg-white/70 hover:border-violet-200 hover:shadow-md hover:scale-[1.005] shadow-sm"
                  }`}>
                  <span className="mb-1.5 block text-[10px] font-semibold tracking-wider text-violet-500 uppercase sm:mb-2 sm:text-[11px]">A</span>
                  <p className="text-sm leading-relaxed text-slate-700 sm:text-[15px]">{q.optionA}</p>
                </button>
                <button
                  onClick={() => handleChoose(-2, currentIndex === total - 1)}
                  className={`rounded-2xl border p-4 text-left backdrop-blur-xl transition-all active:scale-[0.98] sm:rounded-3xl sm:p-5 ${
                    isSelectedB ? "border-amber-300 bg-amber-50/70 ring-1 ring-amber-200 shadow-md" : "border-white/60 bg-white/70 hover:border-amber-200 hover:shadow-md hover:scale-[1.005] shadow-sm"
                  }`}>
                  <span className="mb-1.5 block text-[10px] font-semibold tracking-wider text-amber-500 uppercase sm:mb-2 sm:text-[11px]">B</span>
                  <p className="text-sm leading-relaxed text-slate-700 sm:text-[15px]">{q.optionB}</p>
                </button>
              </div>

              {/* Choice buttons — 更像 deeper, 有点像 lighter */}
              <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                {CHOICES.map((ch) => {
                  const isActive = selected === ch.value;
                  const isLeft = ch.value > 0;
                  const isStrong = Math.abs(ch.value) === 2;
                  const side = isLeft ? "violet" : "amber";
                  return (
                    <button key={ch.value} onClick={() => handleChoose(ch.value, currentIndex === total - 1)}
                      className={`rounded-xl border py-2.5 text-center transition-all active:scale-[0.96] sm:py-3 ${
                        isActive
                          ? `border-${side}-400 bg-${side}-500 text-white shadow-md`
                          : isStrong
                            ? `border-${side}-200 bg-${side}-50/70 text-${side}-700 hover:border-${side}-300 hover:bg-${side}-50 shadow-sm`
                            : `border-${side}-100 bg-white/80 text-${side}-600 hover:border-${side}-200 hover:bg-${side}-50/40`
                      }`}>
                      <span className={`block text-sm font-medium ${isStrong ? "sm:text-[15px]" : "sm:text-sm"}`}>{ch.label}</span>
                      <span className={`mt-0.5 block text-[10px] sm:text-[11px] ${isActive ? "opacity-80" : isStrong ? "opacity-70" : "opacity-50"}`}>{ch.sublabel}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-auto space-y-2 pt-4 sm:space-y-3 sm:pt-6">
            {currentIndex > 0 && (
              <button onClick={handlePrev} className="w-full rounded-xl border border-slate-200 bg-white/70 px-5 py-2.5 text-sm font-medium text-slate-600 backdrop-blur-sm transition hover:border-slate-300 hover:text-slate-900 active:scale-[0.98] sm:px-6 sm:py-3">
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
