import Link from "next/link";

export default function Home() {
  return (
    <main className="relative flex-1 bg-[#FAFAFB] text-[#26222E]">
      {/* Subtle top glow */}
      <div className="pointer-events-none fixed -top-24 left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-violet-100/30 blur-[120px]" />

      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-black/5 bg-[#FAFAFB]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5">
          <Link href="/" className="text-lg font-bold tracking-tight text-[#7C5CFF]">TypeMind</Link>
          <Link
            href="/test"
            className="rounded-full bg-[#7C5CFF] px-5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-[#6A4DE6] hover:-translate-y-0.5 hover:shadow-md active:scale-95"
          >
            开始测试
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 px-5 pb-12 pt-14 sm:pb-20 sm:pt-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-4 text-xs font-medium tracking-widest text-[#7C5CFF] uppercase">TypeMind MBTI Test</p>
          <h1 className="mb-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            你是怎样和世界<span className="text-[#7C5CFF]">相处</span>的？
          </h1>
          <p className="mx-auto mb-8 max-w-lg text-base leading-relaxed text-[#6F6877] sm:text-lg">
            回答 36 个轻松场景题，从社交能量、信息偏好、决策方式和生活节奏里，看见你的 MBTI 性格倾向。
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/test"
              className="inline-flex items-center gap-2 rounded-xl bg-[#7C5CFF] px-8 py-3.5 text-sm font-medium text-white shadow-sm transition hover:bg-[#6A4DE6] hover:-translate-y-0.5 hover:shadow-md active:scale-95"
            >
              开始测试
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/result?type=INFJ"
              className="inline-flex items-center rounded-xl border border-[#E0DCE8] bg-white/60 px-8 py-3.5 text-sm font-medium text-[#6F6877] backdrop-blur-sm transition hover:border-[#7C5CFF] hover:-translate-y-0.5 hover:text-[#7C5CFF] hover:shadow-sm active:scale-95"
            >
              查看示例结果
            </Link>
          </div>
          <p className="mt-5 text-xs text-[#B0A8BA]">约 5-7 分钟 · 免费 · 无需注册 · 仅供自我探索参考</p>
        </div>
      </section>

      {/* Four dimensions */}
      <section className="relative z-10 px-5 py-12 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-10 text-center text-2xl font-bold tracking-tight sm:text-3xl">这次测试会看见什么？</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>), color: "#7C5CFF", bg: "#F4F0FA", title: "社交能量", desc: "你从人群还是独处中恢复状态" },
              { icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>), color: "#5B9FED", bg: "#F0F5FD", title: "信息偏好", desc: "你更关注现实细节还是潜在可能" },
              { icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20V10M18 20V4M6 20v-4"/></svg>), color: "#E87BA8", bg: "#FDF2F7", title: "决策方式", desc: "你更常先看逻辑还是先照顾感受" },
              { icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>), color: "#F0A55A", bg: "#FEF7F0", title: "生活节奏", desc: "你偏好提前规划还是保留弹性" },
            ].map(({ icon, color, bg, title, desc }) => (
              <div key={title} className="rounded-2xl border border-black/5 bg-white/70 p-5 shadow-sm backdrop-blur-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl" style={{ backgroundColor: bg, color }}>{icon}</div>
                <h3 className="mb-1 text-sm font-semibold">{title}</h3>
                <p className="text-xs leading-relaxed text-[#6F6877]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preview card — clickable, links to /result?type=INFJ */}
      <section className="relative z-10 px-5 py-12 sm:py-20">
        <div className="mx-auto max-w-lg">
          <h2 className="mb-6 text-center text-2xl font-bold tracking-tight sm:text-3xl">得到的不只是四个字母</h2>
          <Link
            href="/result?type=INFJ"
            className="group block overflow-hidden rounded-3xl border border-emerald-200 bg-white/80 shadow-lg backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-violet-50 px-6 py-6 text-center">
              <div className="pointer-events-none absolute -top-12 left-1/2 h-[160px] w-[260px] -translate-x-1/2 rounded-full bg-emerald-200/20 blur-[60px]" />
              <span className="relative mb-2 inline-block rounded-full bg-emerald-100 px-3 py-0.5 text-xs font-medium text-emerald-700">绿人 · 外交家</span>
              <p className="relative mb-1 text-4xl font-bold tracking-widest">INFJ</p>
              <div className="relative mt-3 flex flex-wrap justify-center gap-1.5">
                {["共情", "洞察", "理想感", "深度关系"].map((k) => (
                  <span key={k} className="rounded-full border border-emerald-200 bg-white/70 px-2.5 py-0.5 text-xs text-[#6F6877] backdrop-blur-sm">{k}</span>
                ))}
              </div>
            </div>
            <div className="px-6 py-5">
              <p className="text-sm leading-relaxed text-[#6F6877]">结果会包含你的优势、需要注意的地方、默契类型、磨合类型、关系模式和生活建议。</p>
              <p className="mt-2 text-xs text-[#B0A8BA] group-hover:text-emerald-600 transition">点击查看完整示例 →</p>
            </div>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 px-5 py-12 sm:py-20">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="mb-4 text-2xl font-bold tracking-tight sm:text-3xl">准备好看见你的<span className="text-[#7C5CFF]">性格底色</span>了吗？</h2>
          <p className="mb-8 leading-relaxed text-[#6F6877]">36 个场景题，约 5-7 分钟。免费，无需注册。</p>
          <Link
            href="/test"
            className="inline-flex items-center gap-2 rounded-xl bg-[#7C5CFF] px-8 py-3.5 text-sm font-medium text-white shadow-sm transition hover:bg-[#6A4DE6] hover:-translate-y-0.5 hover:shadow-md active:scale-95"
          >
            开始测试
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="relative z-10 px-5 pb-12">
        <div className="mx-auto max-w-lg rounded-2xl border border-black/5 bg-white/60 p-5 text-center backdrop-blur-sm">
          <p className="text-xs leading-relaxed text-[#B0A8BA]">
            本测试基于 MBTI 四个维度的行为偏好进行估算，结果更适合作为自我探索参考，而不是固定标签。
            测试免费，无需注册，不构成心理诊断或人生决策依据。
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-black/5 px-5 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-[#B0A8BA] sm:flex-row">
          <span className="font-semibold text-[#7C5CFF]">TypeMind</span>
          <div className="flex gap-6">
            <a href="#" className="transition hover:text-[#6F6877]">关于</a>
            <a href="#" className="transition hover:text-[#6F6877]">隐私政策</a>
            <a href="#" className="transition hover:text-[#6F6877]">联系我们</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
