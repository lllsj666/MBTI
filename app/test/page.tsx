"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  questions,
  calculateMBTI,
  STORAGE_KEYS,
} from "@/app/data/questions";

export default function TestPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [scores, setScores] = useState<Record<string, number>>({});
  const [loaded, setLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedAnswers = localStorage.getItem(STORAGE_KEYS.answers);
      const savedScores = localStorage.getItem(STORAGE_KEYS.scores);
      if (savedAnswers) setAnswers(JSON.parse(savedAnswers));
      if (savedScores) setScores(JSON.parse(savedScores));
    } catch {
      // ignore
    }
    setLoaded(true);
  }, []);

  // Persist to localStorage
  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEYS.answers, JSON.stringify(answers));
      localStorage.setItem(STORAGE_KEYS.scores, JSON.stringify(scores));
    } catch {
      // ignore
    }
  }, [answers, scores, loaded]);

  const handleSelect = useCallback(
    (value: string) => {
      const question = questions[currentIndex];
      const prevValue = answers[question.id];

      setAnswers((prev) => ({ ...prev, [question.id]: value }));

      setScores((prev) => {
        const next = { ...prev };
        // Remove old answer score
        if (prevValue) {
          next[prevValue] = Math.max(0, (next[prevValue] ?? 0) - 1);
        }
        // Add new answer score
        next[value] = (next[value] ?? 0) + 1;
        return next;
      });

      // Move to next question or finish
      if (currentIndex < questions.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        // Calculate final type
        const type = calculateMBTI(scores);
        // Apply the current answer to scores for calculation
        const finalScores = { ...scores };
        if (prevValue) {
          finalScores[prevValue] = Math.max(0, (finalScores[prevValue] ?? 0) - 1);
        }
        finalScores[value] = (finalScores[value] ?? 0) + 1;
        const finalType = calculateMBTI(finalScores);

        try {
          localStorage.setItem(STORAGE_KEYS.result, finalType);
        } catch {
          // ignore
        }
        router.push(`/result?type=${finalType}`);
      }
    },
    [currentIndex, answers, scores, router]
  );

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex]);

  const handleRestart = useCallback(() => {
    setCurrentIndex(0);
    setAnswers({});
    setScores({});
    try {
      localStorage.removeItem(STORAGE_KEYS.answers);
      localStorage.removeItem(STORAGE_KEYS.scores);
      localStorage.removeItem(STORAGE_KEYS.result);
    } catch {
      // ignore
    }
  }, []);

  if (!loaded) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0b0711]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-violet-500 border-t-transparent" />
      </main>
    );
  }

  const question = questions[currentIndex];
  const progress = ((currentIndex + (answers[question.id] ? 1 : 0)) / questions.length) * 100;
  const selectedValue = answers[question.id] ?? null;

  return (
    <main className="flex min-h-screen flex-col bg-[#0b0711] text-white">
      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-white/5 px-6 py-4">
        <Link
          href="/"
          className="text-sm text-zinc-400 transition hover:text-white"
        >
          ← 返回首页
        </Link>
        <span className="text-sm text-zinc-500">
          {currentIndex + 1} / {questions.length}
        </span>
        <button
          onClick={handleRestart}
          className="text-sm text-zinc-500 transition hover:text-red-400"
        >
          重新开始
        </button>
      </div>

      {/* Progress bar */}
      <div className="h-1 w-full bg-white/5">
        <div
          className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Question area */}
      <div className="flex flex-1 flex-col px-6 py-10 sm:py-16">
        <div className="mx-auto w-full max-w-lg flex-1 flex flex-col justify-center">
          {/* Question number badge */}
          <div className="mb-8 text-center">
            <span className="inline-block rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1 text-xs font-medium text-violet-400">
              第 {currentIndex + 1} 题
            </span>
          </div>

          {/* Question text */}
          <h2 className="mb-10 text-center text-xl font-semibold leading-relaxed sm:text-2xl">
            {question.question}
          </h2>

          {/* Options */}
          <div className="space-y-4">
            {question.options.map((opt, idx) => {
              const isSelected = selectedValue === opt.value;
              const labels = ["A", "B"];
              return (
                <button
                  key={opt.value}
                  onClick={() => handleSelect(opt.value)}
                  className={`w-full rounded-2xl border p-5 text-left transition-all active:scale-[0.98] ${
                    isSelected
                      ? "border-violet-500 bg-violet-500/10 shadow-lg shadow-violet-500/10"
                      : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]"
                  }`}
                >
                  <span className="flex items-start gap-4">
                    <span
                      className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                        isSelected
                          ? "bg-violet-500 text-white"
                          : "bg-white/10 text-zinc-400"
                      }`}
                    >
                      {labels[idx]}
                    </span>
                    <span className="text-sm leading-relaxed text-zinc-200 sm:text-base">
                      {opt.text}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom nav */}
        <div className="mx-auto mt-8 w-full max-w-lg">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`w-full rounded-xl border px-6 py-3 text-sm font-medium transition ${
              currentIndex === 0
                ? "cursor-not-allowed border-white/5 text-zinc-600"
                : "border-white/10 text-zinc-400 hover:border-white/20 hover:text-white active:scale-[0.98]"
            }`}
          >
            上一题
          </button>
        </div>
      </div>
    </main>
  );
}
