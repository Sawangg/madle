import "@styles/globals.css";
import type React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Madle - Admin part",
  description: "Madle administration platform",
};

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode; params: { lang: string } }>) {
  return <>{children}</>;
}
