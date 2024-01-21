import "@styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@src/app/modules/Header";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Madle",
  description: "Madle internship platform",
};

export default function RootLayout({ children, params }: { children: React.ReactNode; params: { lang: string } }) {
  return (
    <html lang={params.lang} className={`${inter.className}`}>
      <body className="flex min-h-screen min-w-screen flex-col overflow-x-hidden">
        <Header />
        {children}
      </body>
    </html>
  );
}
