import AntdProvider from "@/components/AntdProvider";
import { CacheRouterProvider } from "@/components/CacheRouter";
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
  title: "B端后台管理系统",
  description: "Next.js B端后台管理系统",
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
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <AntdProvider>
          <CacheRouterProvider defaultActiveKey="/customer">
            <nav className="border-b border-zinc-200 bg-zinc-900 px-4 py-3 text-center text-sm font-medium text-white">
              我是全局导航栏
            </nav>
            {children}
          </CacheRouterProvider>
        </AntdProvider>
      </body>
    </html>
  );
}
