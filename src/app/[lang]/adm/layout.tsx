import "@styles/globals.css";
import type React from "react";
import type { Metadata } from "next";
import Header from "@src/app/modules/Header";

export const metadata: Metadata = {
  title: "Madle - Admin part",
  description: "Madle administration platform",
};

export default function AdminLayout({ children }: { children: React.ReactNode; params: { lang: string } }) {
  return (
    <body>
      <Header />
      {children}
    </body>
  );
}
