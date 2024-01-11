import type React from "react";
import { getDictionnary, type Locale } from "@lib/getDictionnary";

export default async function Page({ params }: { params: { lang: string } }) {
  const dictionary = await getDictionnary(params.lang as Locale);
  console.log(dictionary);

  return (
    <main>
      <h1>Hello</h1>
    </main>
  );
}
