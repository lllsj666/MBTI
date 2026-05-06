import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MBTI-覆 | 用 3 分钟，更了解你自己",
  description:
    "通过 36 道轻量问题，了解你的 MBTI 性格倾向、关系模式和适合的相处方式。免费测试，无需注册，仅供自我探索参考。",
  keywords: [
    "MBTI测试",
    "性格测试",
    "人格测试",
    "MBTI-覆",
    "自我探索",
  ],
  openGraph: {
    title: "MBTI-覆 | 用 3 分钟，更了解你自己",
    description:
      "完成 36 道题，获取你的 MBTI 性格类型、关系模式、适合方向和相处建议。",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
