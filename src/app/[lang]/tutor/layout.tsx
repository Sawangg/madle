import "@styles/globals.css";
import type React from "react";
import type { Metadata } from "next";
import Header from "@src/app/modules/Header";

export const metadata: Metadata = {
  title: "Madle - Student part",
  description: "Madle internship platform",
};

export default function TutorLayout({ children }: { children: React.ReactNode; params: { lang: string } }) {
  return (
    <body>
      <Header />
      {children}
    </body>
  );
}
