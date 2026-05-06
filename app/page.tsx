import Link from "next/link";

export default function Home() {
  return (
    <main className="flex-1 bg-[#FAFAFB] text-[#26222E]">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-black/5 bg-[#FAFAFB]/80 backdrop-blur-lg">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <Link
            href="/"
            className="text-xl font-bold tracking-tight text-[#7C5CFF]"
          >
            TypeMind
          </Link>
          <Link
            href="/test"
            className="rounded-full bg-[#7C5CFF] px-5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-[#6A4DE6] hover:shadow-md active:scale-95"
          >
            开始测试
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 pb-16 pt-16 sm:pb-24 sm:pt-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-4 text-sm font-medium tracking-widest text-[#7C5CFF] uppercase">
            MBTI Personality Test
          </p>
          <h1 className="mb-6 text-3xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            用 3 分钟，
            <br />
            <span className="text-[#7C5CFF]">更了解你自己</span>
          </h1>
          <p className="mx-auto mb-10 max-w-lg text-base leading-relaxed text-[#6F6877] sm:text-lg">
            通过 36 道轻量问题，了解你的 MBTI 性格倾向、关系模式、
            适合的相处方式与生活建议。
          </p>

          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/test"
              className="inline-flex items-center gap-2 rounded-xl bg-[#7C5CFF] px-8 py-3.5 text-sm font-medium text-white shadow-sm transition hover:bg-[#6A4DE6] hover:shadow-md active:scale-95"
            >
              开始测试
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
              className="inline-flex items-center rounded-xl border border-[#E0DCE8] px-8 py-3.5 text-sm font-medium text-[#6F6877] transition hover:border-[#7C5CFF] hover:text-[#7C5CFF] active:scale-95"
            >
              查看结果示例
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              从性格开始，理解你的
              <span className="text-[#7C5CFF]">相处方式</span>
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
                color: "#7C5CFF",
                bg: "#F4F0FA",
                title: "性格特点",
                desc: "了解你更自然的思考方式、情绪反应和人际风格。",
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
                color: "#E87BA8",
                bg: "#FDF2F7",
                title: "关系模式",
                desc: "看看你在亲密关系和朋友相处中更在意什么。",
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
                color: "#5B9FED",
                bg: "#F0F5FD",
                title: "适合方向",
                desc: "参考你更容易投入、发挥优势的工作和生活节奏。",
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
                color: "#F0A55A",
                bg: "#FEF7F0",
                title: "生活建议",
                desc: "给你一些近期可以尝试的小行动，而不是绝对预测。",
              },
            ].map(({ icon, color, bg, title, desc }) => (
              <div
                key={title}
                className="group rounded-2xl border border-black/5 bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <div
                  className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ backgroundColor: bg, color }}
                >
                  {icon}
                </div>
                <h3 className="mb-2 text-lg font-semibold">{title}</h3>
                <p className="text-sm leading-relaxed text-[#6F6877]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="bg-white px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-14 text-2xl font-bold tracking-tight sm:text-3xl">
            三步完成
          </h2>

          <div className="grid gap-8 sm:grid-cols-3">
            {[
              {
                step: "01",
                title: "完成测试",
                desc: "回答 36 道日常偏好问题，大约需要 3 分钟。",
              },
              {
                step: "02",
                title: "获得类型",
                desc: "系统会根据四个 MBTI 维度计算你的性格类型。",
              },
              {
                step: "03",
                title: "查看结果",
                desc: "查看你的性格特点、关系模式、适合方向和相处建议。",
              },
            ].map(({ step, title, desc }) => (
              <div
                key={step}
                className="relative rounded-2xl border border-black/5 bg-[#FAFAFB] p-8"
              >
                <span className="mb-4 block text-4xl font-bold tracking-tight text-[#E0DCE8]">
                  {step}
                </span>
                <h3 className="mb-2 text-lg font-semibold">{title}</h3>
                <p className="text-sm leading-relaxed text-[#6F6877]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-2xl font-bold tracking-tight sm:text-3xl">
            准备好更了解自己了吗？
          </h2>
          <p className="mb-8 leading-relaxed text-[#6F6877]">
            只需 3 分钟，完成 36 道题，获取你的专属性格分析。完全免费，无需注册。
          </p>
          <Link
            href="/test"
            className="inline-flex items-center gap-2 rounded-xl bg-[#7C5CFF] px-8 py-3.5 text-sm font-medium text-white shadow-sm transition hover:bg-[#6A4DE6] hover:shadow-md active:scale-95"
          >
            开始测试
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
        <div className="mx-auto max-w-2xl rounded-2xl border border-black/5 bg-white p-6 text-center">
          <p className="text-xs leading-relaxed text-[#B0A8BA]">
            本测试仅用于娱乐和自我探索参考，不构成心理诊断、投资建议、婚恋建议或人生决策依据。
            请把结果当作理解自己的一个角度，而不是唯一答案。
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-black/5 px-6 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-[#B0A8BA] sm:flex-row">
          <span className="font-semibold text-[#7C5CFF]">TypeMind</span>
          <div className="flex gap-6">
            <a href="#" className="transition hover:text-[#6F6877]">
              关于
            </a>
            <a href="#" className="transition hover:text-[#6F6877]">
              隐私政策
            </a>
            <a href="#" className="transition hover:text-[#6F6877]">
              联系我们
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
