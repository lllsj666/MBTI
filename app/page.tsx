"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import Link from "next/link";
import { motion, useAnimation, type Variants } from "framer-motion";
import { getMbtiTheme, getDefaultDimensionScores } from "@/app/data/mbti-themes";
import { mbtiResults } from "@/app/data/mbti-results";

const fadeUp: Variants = {
  offscreen: { opacity: 0, y: 24 },
  onscreen: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger = { onscreen: { transition: { staggerChildren: 0.08 } } };

const dimChips = [
  { label: "社交能量", hover: "hover:border-violet-300 hover:text-violet-600" },
  { label: "信息偏好", hover: "hover:border-emerald-300 hover:text-emerald-600" },
  { label: "决策方式", hover: "hover:border-amber-300 hover:text-amber-600" },
  { label: "生活节奏", hover: "hover:border-sky-300 hover:text-sky-600" },
];

const dimCards = [
  { color: "from-violet-100 to-purple-50", accent: "text-violet-600", title: "社交能量", desc: "你从人群还是独处中恢复状态" },
  { color: "from-emerald-100 to-teal-50", accent: "text-emerald-600", title: "信息偏好", desc: "你更关注现实细节还是潜在可能" },
  { color: "from-amber-100 to-yellow-50", accent: "text-amber-600", title: "决策方式", desc: "你更常先看逻辑还是先照顾感受" },
  { color: "from-sky-100 to-blue-50", accent: "text-sky-600", title: "生活节奏", desc: "你偏好提前规划还是保留弹性" },
];

const allTypes = Object.keys(mbtiResults);

export default function Home() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isDesktop, setIsDesktop] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const ctrls = useAnimation();
  const randomExample = useMemo(() => {
    const t = allTypes[Math.floor(Math.random() * allTypes.length)];
    const data = mbtiResults[t];
    const camp = getMbtiTheme(t);
    const dims = getDefaultDimensionScores(t);
    const chips = dims.map((d) => {
      const isLeft = d.left.pct >= d.right.pct;
      return { letter: isLeft ? d.left.letter : d.right.letter, pct: isLeft ? d.left.pct : d.right.pct };
    });
    return { type: t, name: data.name, keywords: data.keywords.slice(0, 4), camp, chips };
  }, []);

  useEffect(() => {
    setIsDesktop(window.innerWidth > 768);
    const onResize = () => setIsDesktop(window.innerWidth > 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    ctrls.start("onscreen");
  }, [ctrls]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDesktop || !heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  return (
    <main className="relative flex-1 overflow-hidden bg-slate-50 text-[#26222E]" onMouseMove={handleMouseMove}>
      {/* Parallax glows */}
      <div
        className="pointer-events-none fixed -top-40 -left-20 h-[600px] w-[600px] rounded-full bg-violet-200/25 blur-[140px] transition-transform duration-[2s] ease-out"
        style={{ transform: isDesktop ? `translate(${mousePos.x * -20}px, ${mousePos.y * -20}px)` : "none" }}
      />
      <div
        className="pointer-events-none fixed -top-20 right-0 h-[500px] w-[500px] rounded-full bg-emerald-200/20 blur-[130px] transition-transform duration-[2s] ease-out"
        style={{ transform: isDesktop ? `translate(${mousePos.x * 15}px, ${mousePos.y * -15}px)` : "none" }}
      />
      <div
        className="pointer-events-none fixed top-1/3 -left-10 h-[400px] w-[400px] rounded-full bg-sky-200/20 blur-[120px]"
      />
      <div
        className="pointer-events-none fixed top-1/2 right-0 h-[350px] w-[350px] rounded-full bg-amber-200/20 blur-[110px]"
      />

      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-white/40 bg-white/70 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight text-slate-900">
            <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-violet-500 to-emerald-500" />
            覆
          </Link>
          <Link href="/test" className="rounded-full bg-slate-900 px-5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800 hover:-translate-y-0.5 hover:shadow-md active:scale-95">
            开始测试
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <motion.section ref={heroRef} className="relative z-10 px-5 pb-14 pt-16 sm:pb-24 sm:pt-24" initial="offscreen" animate="onscreen" variants={stagger}>
        <div className="mx-auto max-w-2xl text-center">
          <motion.p variants={fadeUp} className="mb-4 text-xs font-medium tracking-widest text-slate-400 uppercase">
            MBTI-覆 · 性格地图
          </motion.p>
          <motion.h1 variants={fadeUp} className="mb-5 text-5xl font-bold leading-tight tracking-tight sm:text-6xl md:text-7xl">
            你是怎样和世界
            <span className="bg-gradient-to-r from-violet-500 via-purple-500 to-emerald-500 bg-clip-text text-transparent">相处</span>
            的？
          </motion.h1>
          <motion.p variants={fadeUp} className="mx-auto mb-6 max-w-lg text-base leading-relaxed text-slate-500 sm:text-lg">
            回答 36 个轻松场景题，从社交能量、信息偏好、决策方式和生活节奏里，翻开你更真实的性格底色。
          </motion.p>

          <motion.div variants={fadeUp} className="mb-8 flex flex-wrap justify-center gap-2">
            {dimChips.map(({ label, hover }) => (
              <span key={label} className={`rounded-full border border-slate-200 bg-white/60 px-3 py-1 text-xs text-slate-500 backdrop-blur-sm transition ${hover}`}>{label}</span>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link href="/test" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-8 py-3.5 text-sm font-medium text-white shadow-lg shadow-violet-200/50 transition hover:from-violet-700 hover:to-purple-700 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet-200/60 active:scale-95">
              开始测试
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </motion.div>
          <motion.p variants={fadeUp} className="mt-5 text-xs text-slate-400">约 5-7 分钟 · 免费 · 无需注册 · 仅供自我探索参考</motion.p>
        </div>
      </motion.section>

      {/* Dimensions preview */}
      <motion.section className="relative z-10 px-5 py-16 sm:py-24" initial="offscreen" whileInView="onscreen" viewport={{ once: true, margin: "-80px" }} variants={stagger}>
        <motion.h2 variants={fadeUp} className="mb-12 text-center text-2xl font-bold tracking-tight sm:text-3xl">这次测试会看见什么？</motion.h2>
        <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {dimCards.map(({ color, accent, title, desc }) => (
            <motion.div
              key={title} variants={fadeUp}
              className="group rounded-3xl border border-white/60 bg-white/70 p-6 shadow-xl shadow-slate-200/40 backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-200/50"
            >
              <div className={`mb-4 h-2 w-16 rounded-full bg-gradient-to-r ${color}`} />
              <h3 className={`mb-2 text-base font-semibold ${accent}`}>{title}</h3>
              <p className="text-sm leading-relaxed text-slate-500">{desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Preview — random display card */}
      <motion.section className="relative z-10 px-5 py-16 sm:py-24" initial="offscreen" whileInView="onscreen" viewport={{ once: true, margin: "-80px" }}>
        <motion.h2 variants={fadeUp} className="mb-8 text-center text-2xl font-bold tracking-tight sm:text-3xl">得到的不只是四个字母</motion.h2>
        <motion.div variants={fadeUp} className="mx-auto max-w-lg">
          <div className="relative overflow-hidden rounded-3xl border border-slate-200/60 bg-white/80 shadow-xl shadow-slate-200/30 backdrop-blur-xl">
            <div className="pointer-events-none absolute -top-16 left-1/2 h-[200px] w-[300px] -translate-x-1/2 rounded-full bg-slate-200/20 blur-[80px]" />
            <div className="relative grid gap-6 p-6 sm:grid-cols-[1fr_auto] sm:p-8">
              <div>
                <span className={`mb-3 inline-block rounded-full ${randomExample.camp.theme.badge} px-3 py-0.5 text-xs font-medium`}>
                  {randomExample.camp.label}
                </span>
                <p className="mb-2 text-5xl font-bold tracking-widest text-slate-900">{randomExample.type}</p>
                <p className="mb-1 text-sm text-slate-500">{randomExample.name}</p>
                <div className="mb-3 flex flex-wrap gap-1.5">
                  {randomExample.keywords.map((k: string) => (
                    <span key={k} className="rounded-full border border-slate-200 bg-white/70 px-2.5 py-0.5 text-xs text-slate-500">{k}</span>
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-slate-400">你的优势、需要注意的地方、默契类型、磨合类型、关系模式和生活建议。完成测试即可查看你的专属结果。</p>
              </div>
              <div className="flex flex-row justify-start gap-2 sm:flex-col sm:justify-center">
                {randomExample.chips.map(({ letter, pct }: { letter: string; pct: number }) => (
                  <div key={letter} className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/60 px-3 py-1.5 text-xs backdrop-blur-sm"><span className="font-bold text-slate-700">{letter}</span><span className="text-slate-400">{pct}%</span></div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* CTA */}
      <motion.section className="relative z-10 px-5 pb-16 sm:pt-8" initial="offscreen" whileInView="onscreen" viewport={{ once: true, margin: "-80px" }}>
        <motion.div variants={fadeUp} className="mx-auto max-w-xl rounded-3xl border border-white/60 bg-white/70 p-8 text-center shadow-xl shadow-slate-200/40 backdrop-blur-xl sm:p-10">
          <p className="mb-2 text-xs font-medium tracking-widest text-slate-400 uppercase">Ready?</p>
          <h2 className="mb-4 text-2xl font-bold tracking-tight sm:text-3xl">准备好看见你的<span className="bg-gradient-to-r from-violet-500 to-emerald-500 bg-clip-text text-transparent">性格底色</span>了吗？</h2>
          <p className="mb-6 text-sm leading-relaxed text-slate-500">36 个场景题，约 5-7 分钟。免费，无需注册。</p>
          <Link href="/test" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-8 py-3.5 text-sm font-medium text-white shadow-lg shadow-violet-200/50 transition hover:from-violet-700 hover:to-purple-700 hover:-translate-y-0.5 hover:shadow-xl active:scale-95">
            开始测试 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
        </motion.div>
        <p className="mt-6 text-center text-xs leading-relaxed text-slate-400">基于 MBTI 四维行为偏好估算，一种理解自己的角度，不是固定标签。</p>
      </motion.section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-200/50 bg-white/40 px-5 py-8 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-slate-400 sm:flex-row">
          <span className="flex items-center gap-1.5 font-semibold text-slate-600"><span className="h-2 w-2 rounded-full bg-gradient-to-br from-violet-500 to-emerald-500" />MBTI 性格测试-覆</span>
          <div className="flex gap-6"><a href="#" className="transition hover:text-slate-600">关于</a><a href="#" className="transition hover:text-slate-600">隐私政策</a><a href="#" className="transition hover:text-slate-600">联系我们</a></div>
        </div>
      </footer>
    </main>
  );
}
