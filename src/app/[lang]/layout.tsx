import "@styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { Locale } from "@lib/getDictionnary";
import { Header } from "../modules/Header";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Madle",
  description: "Madle internship platform",
};

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: Locale };
}>) {
  return (
    <html lang={params.lang} className={`${inter.className}`}>
      <body className="flex min-h-screen min-w-screen flex-col overflow-x-hidden">
        <Header lang={params.lang} />
        {children}
      </body>
    </html>
  );
}
