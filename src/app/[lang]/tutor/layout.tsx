import type { Metadata } from "next";
import type { Locale } from "@lib/getDictionnary";
import "@styles/globals.css";

export const metadata: Metadata = {
  title: "Madle - Student part",
  description: "Madle internship platform",
};

export default function TutorLayout({ children }: { children: React.ReactNode; params: { lang: Locale } }) {
  return <body>{children}</body>;
}
