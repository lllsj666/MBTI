import Link from "next/link";

export default function Home() {
  return (
    <main className="flex-1 bg-[#0b0711] text-white">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-[#0b0711]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <Link
            href="/"
            className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-xl font-bold text-transparent"
          >
            TypeMind
          </Link>
          <Link
            href="/test"
            className="rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-5 py-2 text-sm font-medium text-white shadow-lg shadow-violet-500/20 transition hover:shadow-xl hover:shadow-violet-500/30 active:scale-95"
          >
            开始测试
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden px-6 pb-20 pt-16 sm:pb-28 sm:pt-24">
        {/* Background glows */}
        <div className="pointer-events-none absolute -top-32 left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-violet-500/20 blur-[120px]" />
        <div className="pointer-events-none absolute top-20 right-0 h-[300px] w-[400px] rounded-full bg-fuchsia-500/10 blur-[100px]" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-[300px] w-[400px] rounded-full bg-indigo-500/10 blur-[100px]" />

        <div className="relative mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-sm text-amber-400">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            MBTI 性格与人生能量探索
          </div>

          <h1 className="mb-6 text-3xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            测出你的
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-amber-400 bg-clip-text text-transparent">
              性格类型
            </span>
            ，解锁你的
            <br />
            <span className="bg-gradient-to-r from-amber-400 via-fuchsia-400 to-violet-400 bg-clip-text text-transparent">
              财富、姻缘与运势密码
            </span>
          </h1>

          <p className="mx-auto mb-10 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg">
            基于 MBTI
            性格维度，结合情感、财富、事业与运势模型，生成你的专属人生探索报告。
          </p>

          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/test"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-3.5 text-sm font-medium text-white shadow-lg shadow-violet-500/25 transition hover:shadow-xl hover:shadow-violet-500/40 active:scale-95"
            >
              开始免费测试
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/result?type=INFJ"
              className="inline-flex items-center rounded-xl border border-zinc-600 px-8 py-3.5 text-sm font-medium text-zinc-300 transition hover:border-zinc-400 hover:text-white active:scale-95"
            >
              查看报告示例
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <p className="mb-3 text-sm font-medium tracking-widest text-amber-400 uppercase">
              不只是 MBTI
            </p>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
              而是你的
              <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                个人能量地图
              </span>
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: (
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                ),
                color: "violet",
                title: "性格核心",
                desc: "了解你的思维方式、情绪模式、人际风格与隐藏优势。",
              },
              {
                icon: (
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="6" x2="12" y2="18" />
                    <line x1="6" y1="12" x2="18" y2="12" />
                  </svg>
                ),
                color: "amber",
                title: "财运倾向",
                desc: "探索你更适合的财富路径、赚钱方式与需要避开的消费盲点。",
              },
              {
                icon: (
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                ),
                color: "fuchsia",
                title: "姻缘关系",
                desc: "分析你的恋爱模式、适配伴侣类型与关系中的关键课题。",
              },
              {
                icon: (
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                ),
                color: "indigo",
                title: "近期运势",
                desc: "从性格能量角度，给出适合你的行动建议与好运方向。",
              },
            ].map(({ icon, color, title, desc }) => (
              <div
                key={title}
                className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition hover:border-white/20 hover:bg-white/[0.07]"
              >
                <div
                  className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-${color}-500/10 text-${color}-400`}
                >
                  {icon}
                </div>
                <h3 className="mb-2 text-lg font-semibold">{title}</h3>
                <p className="text-sm leading-relaxed text-zinc-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="relative overflow-hidden px-6 py-16 sm:py-24">
        <div className="pointer-events-none absolute top-0 right-1/2 h-[300px] w-[500px] translate-x-1/2 rounded-full bg-violet-500/10 blur-[100px]" />

        <div className="relative mx-auto max-w-4xl text-center">
          <p className="mb-3 text-sm font-medium tracking-widest text-amber-400 uppercase">
            三步开始
          </p>
          <h2 className="mb-14 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
            开启你的自我探索之旅
          </h2>

          <div className="grid gap-8 sm:grid-cols-3">
            {[
              {
                step: "01",
                title: "完成测试",
                desc: "回答 20 道关于日常偏好的问题，大约需要 3 分钟。",
              },
              {
                step: "02",
                title: "获得类型",
                desc: "系统会根据四个性格维度计算你的 MBTI 类型。",
              },
              {
                step: "03",
                title: "查看报告",
                desc: "获取基础性格分析，并预览财运、姻缘、事业与运势内容。",
              },
            ].map(({ step, title, desc }) => (
              <div
                key={step}
                className="relative rounded-2xl border border-white/5 bg-white/[0.03] p-8 backdrop-blur-sm"
              >
                <span className="mb-4 block text-4xl font-bold tracking-tight text-white/10">
                  {step}
                </span>
                <h3 className="mb-2 text-lg font-semibold">{title}</h3>
                <p className="text-sm leading-relaxed text-zinc-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-2xl font-bold tracking-tight sm:text-3xl">
            准备好发现你的
            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              性格密码
            </span>
            了吗？
          </h2>
          <p className="mb-8 leading-relaxed text-zinc-400">
            只需 3 分钟，完成 20
            道题，即可获得你的专属性格分析报告。完全免费，无需注册。
          </p>
          <Link
            href="/test"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-3.5 text-sm font-medium text-white shadow-lg shadow-violet-500/25 transition hover:shadow-xl hover:shadow-violet-500/40 active:scale-95"
          >
            开始免费测试
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="px-6 pb-16 sm:pb-24">
        <div className="mx-auto max-w-2xl rounded-2xl border border-white/5 bg-white/[0.02] p-6 text-center backdrop-blur-sm">
          <p className="text-xs leading-relaxed text-zinc-500">
            本测试仅用于娱乐和自我探索参考，不构成心理诊断、投资建议、婚恋建议或人生决策依据。
            测试结果基于 MBTI 理论模型，每个人的性格都是独特且复杂的，
            请理性看待测试结果。
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 px-6 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-zinc-500 sm:flex-row">
          <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text font-semibold text-transparent">
            TypeMind
          </span>
          <div className="flex gap-6">
            <a href="#" className="transition hover:text-zinc-300">
              关于
            </a>
            <a href="#" className="transition hover:text-zinc-300">
              隐私政策
            </a>
            <a href="#" className="transition hover:text-zinc-300">
              联系我们
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
