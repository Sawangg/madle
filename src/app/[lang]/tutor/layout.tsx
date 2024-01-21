import "@styles/globals.css";
import type React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Madle - Student part",
  description: "Madle internship platform",
};

export default function TutorLayout({ children }: { children: React.ReactNode; params: { lang: string } }) {
  return <body>{children}</body>;
}
