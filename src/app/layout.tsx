import type { Metadata } from "next";
import localFont from "next/font/local";

import Footer from "@/components/Footer";

import "./globals.css";

import clsx from "clsx";

import Header from "@/components/Header";

const pretendard = localFont({
  src: "../assets/fonts/pretendard/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "BADA - Tech Blog",
  description: "개발자 기술 블로그",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={clsx(pretendard.variable, "bg-gray-300")}>
      <body
        className={clsx(
          pretendard.className,
          "mx-auto flex min-h-screen max-w-[1440px] flex-col text-text-primary"
        )}
      >
        <Header />
        <main className="relative flex flex-1 items-center justify-center bg-bg-white-anti-gray p-lg md:p-xl">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
