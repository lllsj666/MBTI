export default function Home() {
  return (
    <main className="flex-1">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-zinc-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <span className="text-lg font-semibold tracking-tight text-zinc-900">
            TypeMind
          </span>
          <a
            href="#start"
            className="rounded-full bg-zinc-900 px-5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-zinc-800 hover:shadow-md"
          >
            开始测试
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-zinc-50 to-white px-6 pb-24 pt-20 sm:pb-32 sm:pt-28">
        {/* Subtle decoration */}
        <div className="pointer-events-none absolute -top-24 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-indigo-50/60 blur-3xl" />

        <div className="relative mx-auto max-w-3xl text-center">
          <p className="mb-4 text-sm font-medium tracking-widest text-indigo-600 uppercase">
            MBTI Personality Assessment
          </p>
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-zinc-900 leading-tight sm:text-5xl lg:text-6xl">
            发现你的
            <br />
            <span className="text-indigo-600">性格类型</span>
          </h1>
          <p className="mx-auto mb-10 max-w-xl text-base text-zinc-500 leading-relaxed sm:text-lg">
            基于荣格心理学理论，通过专业的 MBTI 性格测试，
            帮助你深入了解自己的思维方式、行为模式与内在潜能。
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              href="#start"
              className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-8 py-3.5 text-sm font-medium text-white shadow-sm transition hover:bg-zinc-800 hover:shadow-md"
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
            </a>
            <a
              href="#features"
              className="inline-flex items-center rounded-xl px-8 py-3.5 text-sm font-medium text-zinc-600 transition hover:text-zinc-900"
            >
              了解更多
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-white px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 text-center">
            <p className="mb-3 text-sm font-medium tracking-widest text-indigo-600 uppercase">
              Why MBTI
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
              为什么了解性格类型很重要？
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-indigo-600"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                ),
                title: "科学测评",
                desc: "基于荣格心理学经典理论，结合现代统计学方法，提供可靠的性格分析结果。",
              },
              {
                icon: (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-indigo-600"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                  </svg>
                ),
                title: "深度报告",
                desc: "获取详细的性格分析报告，涵盖你的优势、盲点、沟通风格与职业倾向。",
              },
              {
                icon: (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-indigo-600"
                  >
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                ),
                title: "自我成长",
                desc: "通过认识自我，找到适合的发展方向，改善人际关系，实现个人突破。",
              },
            ].map(({ icon, title, desc }) => (
              <div
                key={title}
                className="group rounded-2xl border border-zinc-100 bg-white p-8 shadow-sm transition hover:border-zinc-200 hover:shadow-md"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50">
                  {icon}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-zinc-900">
                  {title}
                </h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="bg-zinc-50 px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-3 text-sm font-medium tracking-widest text-indigo-600 uppercase">
            How It Works
          </p>
          <h2 className="mb-14 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
            三步开始你的自我探索
          </h2>

          <div className="grid gap-8 sm:grid-cols-3">
            {[
              {
                step: "01",
                title: "完成测试",
                desc: "回答一系列关于日常偏好的问题，大约需要 12 分钟。",
              },
              {
                step: "02",
                title: "获取结果",
                desc: "即时生成你的四字母性格类型与详细分析报告。",
              },
              {
                step: "03",
                title: "认识自己",
                desc: "深入了解你的性格特质，开启有意识的自我成长。",
              },
            ].map(({ step, title, desc }) => (
              <div key={step} className="relative">
                <span className="mb-4 block text-4xl font-bold tracking-tight text-zinc-200">
                  {step}
                </span>
                <h3 className="mb-2 text-lg font-semibold text-zinc-900">
                  {title}
                </h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
            准备好了吗？
          </h2>
          <p className="mb-8 text-zinc-500 leading-relaxed">
            只需12分钟，发现属于你的性格密码。完全免费，无需注册。
          </p>
          <a
            href="#start"
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-8 py-3.5 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700 hover:shadow-md"
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
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-100 bg-white px-6 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-zinc-400 sm:flex-row">
          <span>TypeMind &copy; {new Date().getFullYear()}</span>
          <div className="flex gap-6">
            <a href="#" className="transition hover:text-zinc-600">
              关于
            </a>
            <a href="#" className="transition hover:text-zinc-600">
              隐私政策
            </a>
            <a href="#" className="transition hover:text-zinc-600">
              联系我们
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
