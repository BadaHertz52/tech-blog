import type { Metadata } from "next";
import localFont from "next/font/local";

import Footer from "@/components/Footer";

import "./globals.css";

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
    <html lang="ko" className={pretendard.variable}>
      <body className={pretendard.className}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
