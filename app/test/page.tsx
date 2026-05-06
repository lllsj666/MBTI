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
        if (prevValue) {
          next[prevValue] = Math.max(0, (next[prevValue] ?? 0) - 1);
        }
        next[value] = (next[value] ?? 0) + 1;
        return next;
      });

      if (currentIndex < questions.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
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
      <main className="flex min-h-screen items-center justify-center bg-[#FAFAFB]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#7C5CFF] border-t-transparent" />
      </main>
    );
  }

  const question = questions[currentIndex];
  const progress =
    ((currentIndex + (answers[question.id] ? 1 : 0)) / questions.length) * 100;
  const selectedValue = answers[question.id] ?? null;

  return (
    <main className="flex min-h-screen flex-col bg-[#FAFAFB]">
      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-black/5 bg-white px-6 py-4">
        <Link
          href="/"
          className="text-sm text-[#6F6877] transition hover:text-[#26222E]"
        >
          ← 返回首页
        </Link>
        <span className="text-sm text-[#B0A8BA]">
          {currentIndex + 1} / {questions.length}
        </span>
        <button
          onClick={handleRestart}
          className="text-sm text-[#B0A8BA] transition hover:text-[#E87BA8]"
        >
          重新开始
        </button>
      </div>

      {/* Progress bar */}
      <div className="h-1 w-full bg-[#E0DCE8]">
        <div
          className="h-full bg-[#7C5CFF] transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Question area */}
      <div className="flex flex-1 flex-col px-6 py-10 sm:py-16">
        <div className="mx-auto flex w-full max-w-lg flex-1 flex-col justify-center">
          <div className="mb-8 text-center">
            <span className="inline-block rounded-full border border-[#7C5CFF]/30 bg-[#F4F0FA] px-4 py-1 text-xs font-medium text-[#7C5CFF]">
              第 {currentIndex + 1} 题
            </span>
          </div>

          <h2 className="mb-10 text-center text-xl font-semibold leading-relaxed text-[#26222E] sm:text-2xl">
            {question.question}
          </h2>

          <div className="space-y-3">
            {question.options.map((opt, idx) => {
              const isSelected = selectedValue === opt.value;
              const labels = ["A", "B"];
              return (
                <button
                  key={opt.value}
                  onClick={() => handleSelect(opt.value)}
                  className={`w-full rounded-2xl border bg-white p-5 text-left shadow-sm transition-all active:scale-[0.98] ${
                    isSelected
                      ? "border-[#7C5CFF] ring-2 ring-[#7C5CFF]/10 shadow-md"
                      : "border-black/5 hover:border-[#7C5CFF]/40 hover:shadow-md"
                  }`}
                >
                  <span className="flex items-start gap-4">
                    <span
                      className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                        isSelected
                          ? "bg-[#7C5CFF] text-white"
                          : "bg-[#F4F0FA] text-[#7C5CFF]"
                      }`}
                    >
                      {labels[idx]}
                    </span>
                    <span className="text-sm leading-relaxed text-[#26222E] sm:text-base">
                      {opt.text}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mx-auto mt-8 w-full max-w-lg">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`w-full rounded-xl border px-6 py-3 text-sm font-medium transition ${
              currentIndex === 0
                ? "cursor-not-allowed border-[#E0DCE8] text-[#B0A8BA]"
                : "border-[#E0DCE8] bg-white text-[#6F6877] hover:border-[#7C5CFF]/30 hover:text-[#7C5CFF] active:scale-[0.98]"
            }`}
          >
            上一题
          </button>
        </div>
      </div>
    </main>
  );
}
