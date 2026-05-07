"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import { motion, useAnimation, type Variants } from "framer-motion";
import { getDefaultDimensionScores } from "@/app/data/mbti-themes";
import { mbtiResults } from "@/app/data/mbti-results";

const fadeUp: Variants = {
  offscreen: { opacity: 0, y: 24 },
  onscreen: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const stagger = { onscreen: { transition: { staggerChildren: 0.08 } } };

const dimChips = [{ label: "社交能量" },{ label: "信息偏好" },{ label: "决策方式" },{ label: "生活节奏" }];

const dimCards = [
  { grad: "from-violet-100/60 to-purple-50/40", title: "社交能量", desc: "你从人群还是独处中恢复状态" },
  { grad: "from-emerald-100/60 to-teal-50/40", title: "信息偏好", desc: "你更关注现实细节还是潜在可能" },
  { grad: "from-amber-100/60 to-yellow-50/40", title: "决策方式", desc: "你更常先看逻辑还是先照顾感受" },
  { grad: "from-sky-100/60 to-blue-50/40", title: "生活节奏", desc: "你偏好提前规划还是保留弹性" },
];

// 4 random accent colors
const ACCENTS = [
  { key:"violet", textGrad:"from-violet-400 to-fuchsia-400", btnGrad:"from-violet-500 to-fuchsia-600", glow:"bg-violet-300/15", shadow:"shadow-violet-200/40", border:"border-violet-200/60", badge:"bg-violet-100/60 text-violet-700" },
  { key:"sky",    textGrad:"from-sky-400 to-blue-500",      btnGrad:"from-sky-500 to-blue-600",      glow:"bg-sky-300/15",    shadow:"shadow-sky-200/40",    border:"border-sky-200/60",    badge:"bg-sky-100/60 text-sky-700" },
  { key:"amber",  textGrad:"from-amber-300 to-yellow-400",   btnGrad:"from-amber-500 to-orange-500",  glow:"bg-amber-300/15",  shadow:"shadow-amber-200/40",  border:"border-amber-200/60",  badge:"bg-amber-100/60 text-amber-700" },
  { key:"emerald",textGrad:"from-emerald-400 to-teal-400",   btnGrad:"from-emerald-500 to-teal-600",  glow:"bg-emerald-300/15",shadow:"shadow-emerald-200/40",border:"border-emerald-200/60",badge:"bg-emerald-100/60 text-emerald-700" },
];

const allTypes = Object.keys(mbtiResults);

export default function Home() {
  const ctrls = useAnimation();

  const accent = useMemo(() => ACCENTS[Math.floor(Math.random() * ACCENTS.length)], []);
  const randomExample = useMemo(() => {
    const t = allTypes[Math.floor(Math.random() * allTypes.length)];
    const data = mbtiResults[t];
    const dims = getDefaultDimensionScores(t);
    const chips = dims.map((d) => {
      const isLeft = d.left.pct >= d.right.pct;
      return { letter: isLeft ? d.left.letter : d.right.letter, pct: isLeft ? d.left.pct : d.right.pct };
    });
    return { type: t, name: data.name, keywords: data.keywords.slice(0,4), chips };
  }, []);

  useEffect(() => { ctrls.start("onscreen"); }, [ctrls]);

  return (
    <main className="relative flex-1 overflow-hidden bg-[var(--bg)] text-[var(--text)]">
      {/* Ambient glows */}
      <div className="pointer-events-none fixed -top-40 -left-20 h-[600px] w-[600px] rounded-full bg-violet-300/10 blur-[140px]" />
      <div className="pointer-events-none fixed -top-20 right-0 h-[500px] w-[500px] rounded-full bg-amber-200/10 blur-[130px]" />
      <div className="pointer-events-none fixed top-1/3 -left-10 h-[400px] w-[400px] rounded-full bg-sky-200/10 blur-[120px]" />

      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--surface)] backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight text-[var(--text)]">
            <span className={`h-2.5 w-2.5 rounded-full bg-gradient-to-r ${accent.textGrad}`} />
            覆
          </Link>
          <Link href="/test" className={`rounded-full bg-gradient-to-r ${accent.btnGrad} px-5 py-2 text-sm font-medium text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md active:scale-95`}>
            开始测试
          </Link>
        </div>
      </nav>

      {/* Hero + Preview — PC: card LEFT, text RIGHT (swapped) */}
      <section className="relative z-10 mx-auto max-w-6xl px-5 pb-16 pt-12 sm:pt-20 lg:flex lg:flex-row-reverse lg:items-center lg:gap-16 lg:pb-24 lg:pt-24">
        {/* Right: text (desktop) / Top: text (mobile via flex-row-reverse) */}
        <motion.div className="flex-1 text-center lg:text-left" initial="offscreen" animate="onscreen" variants={stagger}>
          <motion.p variants={fadeUp} className="mb-4 text-xs font-medium tracking-widest text-[var(--muted)] uppercase">
            MBTI-覆 · 性格地图
          </motion.p>
          <motion.h1 variants={fadeUp} className="mb-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            你是怎样和世界
            <span className={`bg-gradient-to-r ${accent.textGrad} bg-clip-text text-transparent`}>相处</span>
            的？
          </motion.h1>
          <motion.p variants={fadeUp} className="mx-auto mb-6 max-w-md text-base leading-relaxed text-[var(--muted)] sm:text-lg lg:mx-0">
            回答 36 个轻松场景题，从社交能量、信息偏好、决策方式和生活节奏里，翻开你更真实的性格底色。
          </motion.p>
          <motion.div variants={fadeUp} className="mb-8 flex flex-wrap justify-center gap-2 lg:justify-start">
            {dimChips.map(({ label }) => (
              <span key={label} className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-xs text-[var(--muted)] backdrop-blur-sm">{label}</span>
            ))}
          </motion.div>
          <motion.div variants={fadeUp} className="flex justify-center lg:justify-start">
            <Link href="/test" className={`inline-flex items-center gap-2 rounded-xl bg-gradient-to-r ${accent.btnGrad} px-8 py-3.5 text-sm font-medium text-white shadow-lg ${accent.shadow} transition hover:-translate-y-0.5 hover:shadow-xl active:scale-95`}>
              开始测试
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </motion.div>
          <motion.p variants={fadeUp} className="mt-5 text-center text-xs text-[var(--muted)] lg:text-left">约 5-7 分钟 · 免费 · 无需注册 · 仅供自我探索参考</motion.p>
        </motion.div>

        {/* Left: preview card (desktop) / Bottom: card (mobile) */}
        <motion.div className="mb-12 flex-1 lg:mb-0" initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.2 } }}>
          <div className={`relative overflow-hidden rounded-3xl border ${accent.border} bg-[var(--surface)] shadow-xl backdrop-blur-xl`}>
            {/* Accent glow */}
            <div className={`pointer-events-none absolute -top-16 left-1/2 h-[200px] w-[300px] -translate-x-1/2 rounded-full ${accent.glow} blur-[80px]`} />
            <div className="relative p-6 sm:p-8">
              <span className={`mb-4 inline-block rounded-full ${accent.badge} px-3 py-0.5 text-xs font-medium`}>
                {randomExample.name}
              </span>
              <p className="mb-1 text-6xl font-black tracking-widest text-[var(--text)]">{randomExample.type}</p>
              <p className="mb-4 text-sm text-[var(--muted)]">{randomExample.name}</p>
              <div className="mb-5 flex flex-wrap gap-1.5">
                {randomExample.keywords.map((k: string) => (
                  <span key={k} className={`rounded-full border ${accent.border} bg-[var(--surface)] px-2.5 py-0.5 text-xs text-[var(--muted)]`}>{k}</span>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {randomExample.chips.map(({ letter, pct }: { letter: string; pct: number }) => (
                  <div key={letter} className="flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-xs">
                    <span className="font-bold text-[var(--text)]">{letter}</span>
                    <span className="text-[var(--muted)]">{pct}%</span>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-sm leading-relaxed text-[var(--muted)]">
                完成测试即可查看你的专属结果，包含优势、默契类型、关系模式和生活建议。
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Dimensions */}
      <motion.section className="relative z-10 px-5 py-16 sm:py-20" initial="offscreen" whileInView="onscreen" viewport={{ once: true }} variants={stagger}>
        <motion.h2 variants={fadeUp} className="mb-12 text-center text-2xl font-bold tracking-tight sm:text-3xl">这次测试会看见什么？</motion.h2>
        <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {dimCards.map(({ grad, title, desc }) => (
            <motion.div key={title} variants={fadeUp}
              className="group rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className={`mb-4 h-2 w-16 rounded-full bg-gradient-to-r ${grad}`} />
              <h3 className="mb-2 text-base font-semibold text-[var(--text)]">{title}</h3>
              <p className="text-sm leading-relaxed text-[var(--muted)]">{desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA */}
      <motion.section className="relative z-10 px-5 pb-16 sm:pt-4" initial="offscreen" whileInView="onscreen" viewport={{ once: true }}>
        <motion.div variants={fadeUp} className="mx-auto max-w-xl rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 text-center shadow-sm backdrop-blur-xl sm:p-10">
          <p className="mb-2 text-xs font-medium tracking-widest text-[var(--muted)] uppercase">Ready?</p>
          <h2 className="mb-4 text-2xl font-bold tracking-tight sm:text-3xl">
            准备好看见你的<span className={`bg-gradient-to-r ${accent.textGrad} bg-clip-text text-transparent`}>性格底色</span>了吗？
          </h2>
          <p className="mb-6 text-sm leading-relaxed text-[var(--muted)]">36 个场景题，约 5-7 分钟。免费，无需注册。</p>
          <Link href="/test" className={`inline-flex items-center gap-2 rounded-xl bg-gradient-to-r ${accent.btnGrad} px-8 py-3.5 text-sm font-medium text-white shadow-lg ${accent.shadow} transition hover:-translate-y-0.5 hover:shadow-xl active:scale-95`}>
            开始测试 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
        </motion.div>
        <p className="mt-6 text-center text-xs leading-relaxed text-[var(--muted)]">基于 MBTI 四维行为偏好估算，一种理解自己的角度，不是固定标签。</p>
      </motion.section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[var(--border)] bg-[var(--surface)]/40 px-5 py-8 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-[var(--muted)] sm:flex-row">
          <span className="flex items-center gap-1.5 font-semibold"><span className={`h-2 w-2 rounded-full bg-gradient-to-r ${accent.textGrad}`} />MBTI 性格测试-覆</span>
          <div className="flex gap-6"><a href="#" className="transition hover:text-[var(--text)]">关于</a><a href="#" className="transition hover:text-[var(--text)]">隐私政策</a><a href="#" className="transition hover:text-[var(--text)]">联系我们</a></div>
        </div>
      </footer>
    </main>
  );
}
