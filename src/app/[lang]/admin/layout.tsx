import type { Metadata } from "next";
import type { Locale } from "@lib/getDictionnary";

export const metadata: Metadata = {
  title: "Madle — Admin",
};

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode; params: { lang: Locale } }>) {
  return <main className="min-h-screen min-w-screen overflow-x-hidden">{children}</main>;
}
