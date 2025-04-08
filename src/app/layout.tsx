import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "김치 지도 - 지역별 김치 생산자 정보",
  description: "대한민국 각 지역의 특색있는 김치와 생산자 정보를 제공하는 플랫폼입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#fcfcfd] dark:bg-gray-900 text-gray-900 dark:text-white`}
      >
        {children}
        {/* 다크모드 스크립트를 NEXT_BODY_TAGS에 삽입 - 하이드레이션 이후 실행 */}
        <Script id="dark-mode-script" strategy="afterInteractive">
          {`
            (function() {
              try {
                var mode = localStorage.getItem('darkMode');
                if (mode === 'true') {
                  document.documentElement.classList.add('dark');
                } else if (mode === 'false') {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            })();
          `}
        </Script>
      </body>
    </html>
  );
}
