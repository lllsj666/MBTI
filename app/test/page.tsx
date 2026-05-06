"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  questions,
  OPTIONS,
  applyScore,
  calculateMBTI,
  STORAGE_KEYS,
} from "@/app/data/questions";

export default function TestPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
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
    (optionScore: number) => {
      const question = questions[currentIndex];
      const prevScore = answers[question.id];

      setAnswers((prev) => ({ ...prev, [question.id]: optionScore }));

      // If re-selecting, remove previous contribution first
      let updatedScores = { ...scores };
      if (prevScore !== undefined) {
        // Reverse the previous score contribution
        const reverseScore = -prevScore;
        updatedScores = applyScore(updatedScores, question.direction, reverseScore);
      }
      // Apply new score
      updatedScores = applyScore(updatedScores, question.direction, optionScore);
      setScores(updatedScores);

      if (currentIndex < questions.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        // Finish — calculate final
        const result = calculateMBTI(updatedScores);
        try {
          localStorage.setItem(STORAGE_KEYS.result, result.type);
          localStorage.setItem(STORAGE_KEYS.tendency, JSON.stringify(result));
        } catch {
          // ignore
        }
        router.push(`/result?type=${result.type}`);
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
      localStorage.removeItem(STORAGE_KEYS.tendency);
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
  const progress = ((currentIndex + (answers[question.id] !== undefined ? 1 : 0)) / questions.length) * 100;
  const selectedScore = answers[question.id] ?? null;

  const choiceLabels = ["A", "B", "C", "D"];
  const choiceBgs = [
    "bg-violet-50 border-violet-200 text-violet-700",
    "bg-blue-50 border-blue-200 text-blue-700",
    "bg-amber-50 border-amber-200 text-amber-700",
    "bg-rose-50 border-rose-200 text-rose-700",
  ];
  const choiceActiveBgs = [
    "bg-violet-500 text-white border-violet-500",
    "bg-blue-500 text-white border-blue-500",
    "bg-amber-500 text-white border-amber-500",
    "bg-rose-500 text-white border-rose-500",
  ];

  return (
    <main className="flex min-h-screen flex-col bg-[#FAFAFB]">
      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-black/5 bg-white px-5 py-4">
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
      <div className="flex flex-1 flex-col px-5 py-8 sm:py-12">
        <div className="mx-auto flex w-full max-w-lg flex-1 flex-col justify-center">
          {/* Badge */}
          <div className="mb-6 text-center">
            <span className="inline-block rounded-full border border-[#7C5CFF]/30 bg-[#F4F0FA] px-4 py-1 text-xs font-medium text-[#7C5CFF]">
              第 {currentIndex + 1} 题
            </span>
          </div>

          {/* Question */}
          <h2 className="mb-10 text-center text-lg font-semibold leading-relaxed text-[#26222E] sm:text-xl">
            {question.question}
          </h2>

          {/* 4-level Options */}
          <div className="space-y-2.5">
            {OPTIONS.map((opt, idx) => {
              const isSelected = selectedScore === opt.score;
              return (
                <button
                  key={opt.score}
                  onClick={() => handleSelect(opt.score)}
                  className={`w-full rounded-2xl border bg-white p-4 text-left shadow-sm transition-all active:scale-[0.98] ${
                    isSelected
                      ? "border-[#7C5CFF] ring-2 ring-[#7C5CFF]/10 shadow-md"
                      : "border-black/5 hover:border-[#7C5CFF]/30 hover:shadow-md"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold border transition-colors ${
                        isSelected
                          ? choiceActiveBgs[idx]
                          : choiceBgs[idx]
                      }`}
                    >
                      {choiceLabels[idx]}
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

        {/* Bottom nav */}
        <div className="mx-auto mt-6 w-full max-w-lg">
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
