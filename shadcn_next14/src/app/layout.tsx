import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

import { Inter as FontSans } from "next/font/google"
 
import { cn } from "@/lib/utils"
import AnimatedFavicon from './common/AnimatedFavicon';

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})




export const metadata: Metadata = {
  title: "LanguageTool",
  description: `
  這是一個語言學習工具，提供多語翻譯功能，類似題字卡記事本，並加入了按鈕語音翻譯以及自定義複製語系文字等功能，幫助您輕鬆學習不同語言。作者會不斷更新和改善這個工  具，希望大家都能體驗到更好的產品 英文
  This is a language learning tool that offers multi-language translation features, similar to flashcards and a notepad. It also includes voice   translation buttons and the ability to customize and copy text in different languages, helping you easily learn various languages. The author is   committed to continuously updating and improving this tool, and hopes everyone can experience a better product.
  `,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <head>
        <link rel="icon" href="/Boli.gif" type="image/gif" />
      </head> */}
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
      <AnimatedFavicon />
      {children}
      </body>

      {/* <body className={inter.className}>{children}</body> */}
    </html>
  );
}
