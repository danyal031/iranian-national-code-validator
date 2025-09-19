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
  title: "اعتبارسنجی کد ملی ایران | Iranian National Code Validator",
  description:
    "ابزار حرفه‌ای برای اعتبارسنجی کدهای ملی ایرانی با رابط کاربری زیبا و پشتیبانی از فارسی",
  keywords: "کد ملی, اعتبارسنجی, ایران, national code, validation, iran",
  openGraph: {
    title: "اعتبارسنجی کد ملی ایران",
    description: "ابزار حرفه‌ای برای اعتبارسنجی کدهای ملی ایرانی",
    type: "website",
    locale: "fa_IR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{
          fontFamily:
            "Vazirmatn, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif",
        }}
      >
        {children}
      </body>
    </html>
  );
}
