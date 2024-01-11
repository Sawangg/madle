import "@styles/globals.css";
import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@src/app/modules/Header";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Madle - Student part",
  description: "Madle internship platform",
};

export default function StudentLayout({ children, params }: { children: React.ReactNode; params: { lang: string } }) {
  return (
    <html lang={params.lang} className={`overflow-hidden scroll-smooth ${inter.className}`}>
      <Header />
      {children}
    </html>
  );
}
