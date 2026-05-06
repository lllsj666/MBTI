import Link from "next/link";

export default function Home() {
  return (
    <main className="relative flex-1 overflow-hidden bg-slate-50 text-[#26222E]">
      {/* Multi-layer glows */}
      <div className="pointer-events-none fixed -top-40 -left-20 h-[600px] w-[600px] animate-[floatSlow_30s_ease-in-out_infinite] rounded-full bg-violet-200/25 blur-[140px]" />
      <div className="pointer-events-none fixed -top-20 right-0 h-[500px] w-[500px] animate-[floatSlow_25s_ease-in-out_infinite_reverse] rounded-full bg-emerald-200/20 blur-[130px]" />
      <div className="pointer-events-none fixed top-1/3 -left-10 h-[400px] w-[400px] animate-[floatSlow_35s_ease-in-out_infinite] rounded-full bg-sky-200/20 blur-[120px]" />
      <div className="pointer-events-none fixed top-1/2 right-0 h-[350px] w-[350px] animate-[floatSlow_28s_ease-in-out_infinite_reverse] rounded-full bg-amber-200/20 blur-[110px]" />

      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-white/40 bg-white/70 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight text-slate-900">
            <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-violet-500 to-emerald-500" />
            TypeMind
          </Link>
          <Link
            href="/test"
            className="rounded-full bg-slate-900 px-5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800 hover:-translate-y-0.5 hover:shadow-md active:scale-95"
          >
            开始测试
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 px-5 pb-14 pt-16 sm:pb-24 sm:pt-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-4 text-xs font-medium tracking-widest text-slate-400 uppercase">
            TypeMind · MBTI 性格地图
          </p>
          <h1 className="mb-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl">
            你是怎样和世界
            <span className="bg-gradient-to-r from-violet-500 via-purple-500 to-emerald-500 bg-clip-text text-transparent">
              相处
            </span>
            的？
          </h1>
          <p className="mx-auto mb-6 max-w-lg text-base leading-relaxed text-slate-500 sm:text-lg">
            回答 36 个轻松场景题，从社交能量、信息偏好、决策方式和生活节奏里，看见你的 MBTI 性格倾向。
          </p>

          {/* Dimension chips */}
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {[
              { label: "社交能量", color: "hover:border-violet-300 hover:text-violet-600" },
              { label: "信息偏好", color: "hover:border-emerald-300 hover:text-emerald-600" },
              { label: "决策方式", color: "hover:border-amber-300 hover:text-amber-600" },
              { label: "生活节奏", color: "hover:border-sky-300 hover:text-sky-600" },
            ].map(({ label, color }) => (
              <span
                key={label}
                className={`rounded-full border border-slate-200 bg-white/60 px-3 py-1 text-xs text-slate-500 backdrop-blur-sm transition ${color}`}
              >
                {label}
              </span>
            ))}
          </div>

          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/test"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-8 py-3.5 text-sm font-medium text-white shadow-lg shadow-violet-200/50 transition hover:from-violet-700 hover:to-purple-700 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet-200/60 active:scale-95"
            >
              开始测试
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/result?type=INFJ"
              className="inline-flex items-center rounded-xl border border-slate-200 bg-white/70 px-8 py-3.5 text-sm font-medium text-slate-600 backdrop-blur-sm transition hover:border-slate-300 hover:-translate-y-0.5 hover:text-slate-900 hover:shadow-sm active:scale-95"
            >
              查看示例结果
            </Link>
          </div>
          <p className="mt-5 text-xs text-slate-400">约 5-7 分钟 · 免费 · 无需注册 · 仅供自我探索参考</p>
        </div>
      </section>

      {/* Dimensions preview */}
      <section className="relative z-10 px-5 py-16 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-12 text-center text-2xl font-bold tracking-tight sm:text-3xl">
            这次测试会看见什么？
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { color: "from-violet-100 to-purple-50", accent: "text-violet-600", title: "社交能量", desc: "你从人群还是独处中恢复状态" },
              { color: "from-emerald-100 to-teal-50", accent: "text-emerald-600", title: "信息偏好", desc: "你更关注现实细节还是潜在可能" },
              { color: "from-amber-100 to-yellow-50", accent: "text-amber-600", title: "决策方式", desc: "你更常先看逻辑还是先照顾感受" },
              { color: "from-sky-100 to-blue-50", accent: "text-sky-600", title: "生活节奏", desc: "你偏好提前规划还是保留弹性" },
            ].map(({ color, accent, title, desc }) => (
              <div
                key={title}
                className="group rounded-3xl border border-white/60 bg-white/70 p-6 shadow-xl shadow-slate-200/40 backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-200/50"
              >
                <div className={`mb-4 h-2 w-16 rounded-full bg-gradient-to-r ${color}`} />
                <h3 className={`mb-2 text-base font-semibold ${accent}`}>{title}</h3>
                <p className="text-sm leading-relaxed text-slate-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preview card */}
      <section className="relative z-10 px-5 py-16 sm:py-24">
        <div className="mx-auto max-w-lg">
          <h2 className="mb-8 text-center text-2xl font-bold tracking-tight sm:text-3xl">
            得到的不只是四个字母
          </h2>

          <Link
            href="/result?type=INFJ"
            className="group relative block overflow-hidden rounded-3xl border border-emerald-200/60 bg-white/80 shadow-xl shadow-emerald-100/30 backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-100/40"
          >
            {/* Inner glow */}
            <div className="pointer-events-none absolute -top-16 left-1/2 h-[200px] w-[300px] -translate-x-1/2 rounded-full bg-emerald-200/30 blur-[80px] transition group-hover:bg-emerald-200/40" />

            <div className="relative grid gap-6 p-6 sm:grid-cols-[1fr_auto] sm:p-8">
              {/* Left */}
              <div>
                <span className="mb-3 inline-block rounded-full bg-emerald-100 px-3 py-0.5 text-xs font-medium text-emerald-700">
                  绿人 · 外交家
                </span>
                <p className="mb-2 text-5xl font-bold tracking-widest text-slate-900">INFJ</p>
                <div className="mb-3 flex flex-wrap gap-1.5">
                  {["共情", "洞察", "理想感", "深度关系"].map((k) => (
                    <span key={k} className="rounded-full border border-emerald-200 bg-white/70 px-2.5 py-0.5 text-xs text-slate-500">
                      {k}
                    </span>
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-slate-500">
                  你的优势、需要注意的地方、默契类型、磨合类型、关系模式和生活建议。
                </p>
                <p className="mt-3 text-xs font-medium text-emerald-600 transition group-hover:translate-x-1">
                  查看完整示例 →
                </p>
              </div>

              {/* Right — dimension chips */}
              <div className="flex flex-row justify-start gap-2 sm:flex-col sm:justify-center">
                {[
                  { dim: "I", pct: 71 },
                  { dim: "N", pct: 71 },
                  { dim: "F", pct: 60 },
                  { dim: "J", pct: 69 },
                ].map(({ dim, pct }) => (
                  <div key={dim} className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/60 px-3 py-1.5 text-xs backdrop-blur-sm">
                    <span className="font-bold text-slate-700">{dim}</span>
                    <span className="text-slate-400">{pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 px-5 py-16 sm:pt-8 sm:pb-24">
        <div className="mx-auto max-w-xl">
          <div className="rounded-3xl border border-white/60 bg-white/70 p-8 text-center shadow-xl shadow-slate-200/40 backdrop-blur-xl sm:p-10">
            <p className="mb-2 text-xs font-medium tracking-widest text-slate-400 uppercase">Ready?</p>
            <h2 className="mb-4 text-2xl font-bold tracking-tight sm:text-3xl">
              准备好看见你的<span className="bg-gradient-to-r from-violet-500 to-emerald-500 bg-clip-text text-transparent">性格底色</span>了吗？
            </h2>
            <p className="mb-6 text-sm leading-relaxed text-slate-500">36 个场景题，约 5-7 分钟。免费，无需注册。</p>
            <Link
              href="/test"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-8 py-3.5 text-sm font-medium text-white shadow-lg shadow-violet-200/50 transition hover:from-violet-700 hover:to-purple-700 hover:-translate-y-0.5 hover:shadow-xl active:scale-95"
            >
              开始测试
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <p className="mt-6 text-center text-xs leading-relaxed text-slate-400">
            基于 MBTI 四维行为偏好估算，一种理解自己的角度，不是固定标签。
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-200/50 bg-white/40 px-5 py-8 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-slate-400 sm:flex-row">
          <span className="flex items-center gap-1.5 font-semibold text-slate-600">
            <span className="h-2 w-2 rounded-full bg-gradient-to-br from-violet-500 to-emerald-500" />
            TypeMind
          </span>
          <div className="flex gap-6">
            <a href="#" className="transition hover:text-slate-600">关于</a>
            <a href="#" className="transition hover:text-slate-600">隐私政策</a>
            <a href="#" className="transition hover:text-slate-600">联系我们</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
