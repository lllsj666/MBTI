"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { questions, CHOICES, calculateMBTI, STORAGE_KEYS } from "@/app/data/questions";

const total = questions.length;
const dimLabel: Record<string, string> = { EI: "社交能量", SN: "信息偏好", TF: "决策方式", JP: "生活节奏" };

export default function TestPage() {
  const router = useRouter();
  const [ci, setCi] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [scores, setScores] = useState<Record<string, number>>({});
  const [loaded, setLoaded] = useState(false);
  const [slideDir, setSlideDir] = useState<1 | -1>(1);
  const [animating, setAnimating] = useState(false);
  const [ceremony, setCeremony] = useState(false);

  useEffect(() => {
    try { const a=localStorage.getItem(STORAGE_KEYS.answers);const s=localStorage.getItem(STORAGE_KEYS.scores);if(a)setAnswers(JSON.parse(a));if(s)setScores(JSON.parse(s)); } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if(!loaded)return;
    try { localStorage.setItem(STORAGE_KEYS.answers,JSON.stringify(answers));localStorage.setItem(STORAGE_KEYS.scores,JSON.stringify(scores)); } catch {}
  }, [answers,scores,loaded]);

  const goToResult = useCallback((s: Record<string,number>)=>{
    const r=calculateMBTI(s);
    try{localStorage.setItem(STORAGE_KEYS.result,r.type);localStorage.setItem(STORAGE_KEYS.tendency,JSON.stringify(r));}catch{}
    router.push(`/result?type=${r.type}`);
  },[router]);

  const handleChoose = useCallback((val:number,isLast:boolean)=>{
    if(animating)return;
    const q=questions[ci];const prev=answers[q.id];let ns={...scores};
    if(prev!==undefined){const pl=prev>0?q.optionAType:q.optionBType;ns[pl]=Math.max(0,(ns[pl]??0)-Math.abs(prev));}
    const letter=val>0?q.optionAType:q.optionBType;ns[letter]=(ns[letter]??0)+Math.abs(val);
    setAnswers(p=>({...p,[q.id]:val}));setScores(ns);
    if(isLast){setCeremony(true);setTimeout(()=>goToResult(ns),1300);}
    else{setSlideDir(1);setAnimating(true);setTimeout(()=>{setCi(p=>p+1);setAnimating(false);},200);}
  },[ci,answers,scores,animating,goToResult]);

  const handlePrev = useCallback(()=>{
    if(ci===0||animating)return;
    setSlideDir(-1);setAnimating(true);setTimeout(()=>{setCi(p=>p-1);setAnimating(false);},200);
  },[ci,animating]);

  const handleRestart = useCallback(()=>{
    setCi(0);setAnswers({});setScores({});setCeremony(false);
    try{localStorage.removeItem(STORAGE_KEYS.answers);localStorage.removeItem(STORAGE_KEYS.scores);localStorage.removeItem(STORAGE_KEYS.result);localStorage.removeItem(STORAGE_KEYS.tendency);}catch{}
  },[]);

  if(!loaded)return<main className="flex min-h-screen items-center justify-center bg-[var(--bg)]"><div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--accent)] border-t-transparent"/></main>;

  const q=questions[ci];
  const progress=((ci+(answers[q.id]!==undefined?1:0))/total)*100;
  const selected=answers[q.id]??null;
  const isSelectedA=selected!==null&&selected>0;
  const isSelectedB=selected!==null&&selected<0;

  if(ceremony)return(
    <main className="flex min-h-screen items-center justify-center bg-[var(--bg)]">
      <div className="animate-[fadeIn_0.3s_ease-out] text-center">
        <div className="mb-6 flex justify-center gap-3">{["violet","emerald","amber","sky"].map((c,i)=><div key={i} className={`h-4 w-4 rounded-full bg-${c}-400 animate-[fadeIn_0.3s_ease-out_both]`} style={{animationDelay:`${0.15*i}s`}}/>)}</div>
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow-xl backdrop-blur-xl animate-[fadeIn_0.5s_ease-out_0.4s_both]">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-violet-100 to-emerald-100"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg></div>
          <p className="text-lg font-bold text-[var(--text)]">正在生成你的性格报告</p><p className="mt-2 text-sm text-[var(--muted)]">稍等...</p>
        </div>
      </div>
    </main>
  );

  return (
    <main className="flex min-h-screen flex-col bg-[var(--bg)]">
      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--surface)]/80 backdrop-blur-xl px-4 py-2 sm:px-6 sm:py-3">
        <Link href="/" className="text-xs text-[var(--muted)] transition hover:text-[var(--text)] sm:text-sm">← 返回</Link>
        <span className="text-[11px] text-[var(--muted)] sm:text-xs">{dimLabel[q.dimension]} · {String(ci+1).padStart(2,"0")}/{total}</span>
        <button onClick={handleRestart} className="text-[11px] text-[var(--muted)] transition hover:text-rose-400 sm:text-xs">重新开始</button>
      </div>

      {/* Progress bar */}
      <div className="relative h-1 w-full bg-[var(--border)]">
        <div className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 shadow-sm transition-all duration-500 ease-out" style={{width:`${progress}%`}}/>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col px-4 py-4 sm:px-6 sm:py-10">
        <div className="mx-auto flex w-full max-w-[840px] flex-1 flex-col">
          {/* Slide wrapper */}
          <div className="flex-1" style={{transform:animating?`translateX(${slideDir*-12}px)`:"none",opacity:animating?0:1,transition:"all 0.2s ease-out"}}>
            {/* Question */}
            <h2 className="mb-4 text-center text-base font-semibold leading-relaxed text-[var(--text)] sm:mb-8 sm:text-2xl">{q.question}</h2>

            {/* A/B description cards */}
            <div className="mb-4 grid gap-2 sm:mb-8 sm:grid-cols-2 sm:gap-4">
              <div className={`rounded-2xl border p-3 backdrop-blur-sm transition-all sm:p-6 ${
                isSelectedA?"border-violet-300/60 bg-violet-50/40 ring-1 ring-violet-200/50":"border-[var(--border)] bg-[var(--surface)] hover:border-violet-200/60"
              }`}>
                <span className="mb-1 block text-[10px] font-semibold tracking-wider text-violet-500 sm:mb-2 sm:text-xs">A</span>
                <p className="text-[13px] leading-relaxed text-[var(--text)] sm:text-base">{q.optionA}</p>
              </div>
              <div className={`rounded-2xl border p-3 backdrop-blur-sm transition-all sm:p-6 ${
                isSelectedB?"border-amber-300/60 bg-amber-50/40 ring-1 ring-amber-200/50":"border-[var(--border)] bg-[var(--surface)] hover:border-amber-200/60"
              }`}>
                <span className="mb-1 block text-[10px] font-semibold tracking-wider text-amber-500 sm:mb-2 sm:text-xs">B</span>
                <p className="text-[13px] leading-relaxed text-[var(--text)] sm:text-base">{q.optionB}</p>
              </div>
            </div>

            {/* Option buttons */}
            <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 sm:gap-3">
              {CHOICES.map((ch) => {
                const isActive = selected === ch.value;
                const isLeft = ch.value > 0;
                const isStrong = Math.abs(ch.value) === 2;
                const side = isLeft?"violet":"amber";
                return (
                  <button key={ch.value} onClick={()=>handleChoose(ch.value,ci===total-1)}
                    className={`rounded-xl border py-2.5 text-center transition-all active:scale-[0.98] sm:py-3.5 ${
                      isActive
                        ?`border-${side}-400 bg-${side}-500 text-white shadow-sm`
                        :isStrong
                          ?`border-${side}-200/60 bg-${side}-50/30 text-${side}-700 hover:border-${side}-300`
                          :`border-[var(--border)] bg-[var(--surface)]/60 text-[var(--muted)] hover:border-${side}-200/50 hover:text-${side}-600`
                    }`}>
                    <span className={`block text-[13px] font-medium ${isStrong?"sm:text-[15px]":""}`}>{ch.label}</span>
                    <span className={`mt-0.5 block text-[10px] sm:text-[11px] ${isActive?"opacity-80":isStrong?"opacity-55":"opacity-40"}`}>{ch.sublabel}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom nav */}
          <div className="mt-3 space-y-2 sm:mt-8 sm:space-y-3">
            <button onClick={handlePrev} disabled={ci===0}
              className={`w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-5 py-2.5 text-[13px] font-medium backdrop-blur-sm transition active:scale-[0.98] sm:px-6 sm:py-3 sm:text-sm ${
                ci===0?"cursor-not-allowed text-[var(--muted)]/40":"text-[var(--muted)] hover:border-[var(--accent)]/30 hover:text-[var(--text)]"
              }`}>← 上一题</button>
            <p className="text-center text-[10px] leading-relaxed text-[var(--muted)] sm:text-[11px] hidden sm:block">基于 MBTI 四维行为偏好估算，这只是参考，不是标签。</p>
          </div>
        </div>
      </div>
    </main>
  );
}
