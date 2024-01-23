import type React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Madle — Admin",
};

export default function AdminLayout({ children }: { children: React.ReactNode; params: { lang: string } }) {
  return <main className="min-h-screen min-w-screen overflow-x-hidden">{children}</main>;
}
