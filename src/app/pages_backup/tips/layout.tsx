import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import TipsAppShell from "@/components/TipsAppShell";
import ThemeProvider from "@/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GuestMe чаевые | Портал официанта",
  description: "Личный кабинет официанта для управления чаевыми и отзывами",
};

export default function TipsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider>
      <TipsAppShell>
        {children}
      </TipsAppShell>
    </ThemeProvider>
  );
}