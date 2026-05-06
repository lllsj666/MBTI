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
  title: "TypeMind - MBTI 性格与人生能量测试",
  description:
    "通过 20 道题测试你的 MBTI 性格类型，探索你的性格优势、财运倾向、姻缘关系、事业方向与近期好运建议。",
  keywords: [
    "MBTI测试",
    "性格测试",
    "财运测试",
    "姻缘测试",
    "运势测试",
    "人格测试",
    "TypeMind",
  ],
  openGraph: {
    title: "TypeMind - 测出你的性格类型与人生能量",
    description:
      "完成 20 道题，获取你的 MBTI 类型、性格优势、财运倾向、姻缘关系与好运建议。",
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
